import os
import time
import csv
import glob
import json
import logging
import yt_dlp
from pydub import AudioSegment
import google.generativeai as genai

API_KEYS = []

MODELS = [
    'gemini-2.5-flash',
]

OUTPUT_CSV = "transcriptions.csv"
TEMP_FOLDER = "temp_clips"
STATE_FILE = "processing_state.json"
MAX_REQUESTS_PER_MODEL = 20
CHUNK_LENGTH_MS = 30 * 1000 # 30 seconds clips

logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)

class StateManager:
    @staticmethod
    def load():
        if os.path.exists(STATE_FILE):
            try:
                with open(STATE_FILE, 'r') as f:
                    return json.load(f).get('last_processed_file')
            except Exception as e:
                logger.error(f"Error loading state: {e}")
        return None

    @staticmethod
    def save(filename):
        try:
            with open(STATE_FILE, 'w') as f:
                json.dump({'last_processed_file': filename}, f)
        except Exception as e:
            logger.error(f"Error saving state: {e}")

class TranscriptionManager:
    def __init__(self):
        self.api_key_idx = 0
        self.model_idx = 0
        self.request_count = 0
        self._model = None
        self._configure_api()

    def _configure_api(self):
        if self.api_key_idx >= len(API_KEYS):
            raise Exception("All API keys exhausted.")
        
        genai.configure(api_key=API_KEYS[self.api_key_idx])
        logger.info(f"Switched to API key {self.api_key_idx + 1}/{len(API_KEYS)}")

    def _get_model(self):
        if self._model is None or self.request_count >= MAX_REQUESTS_PER_MODEL:
            if self.request_count >= MAX_REQUESTS_PER_MODEL:
                self.model_idx += 1
                self.request_count = 0
                
                if self.model_idx >= len(MODELS):
                    logger.info("Models exhausted for current key. Switching key...")
                    self.model_idx = 0
                    self.api_key_idx += 1
                    self._configure_api()

            model_name = MODELS[self.model_idx]
            self._model = genai.GenerativeModel(model_name)
            logger.info(f"Using model: {model_name}")
            
        return self._model

    def _is_quota_error(self, error):
        indicators = ['quota', 'rate limit', 'resource exhausted', '429', 'too many requests']
        return any(i in str(error).lower() for i in indicators)

    def transcribe(self, file_path):
        max_retries = len(API_KEYS) * len(MODELS)
        attempts = 0
        
        while attempts < max_retries:
            audio_file = None
            try:
                # Upload
                audio_file = genai.upload_file(path=file_path)
                while audio_file.state.name == "PROCESSING":
                    time.sleep(1)
                    audio_file = genai.get_file(audio_file.name)

                prompt = """
                You are a verbatim transcriber. Listen to this audio clip which contains a mix of Egyptian Arabic (Masri) and English.
                1. Transcribe EXACTLY what is spoken. 
                2. If the speaker uses an English word, write it in English.
                3. If the speaker uses Egyptian Arabic, write it in Arabic script.
                4. DO NOT translate English terms to Arabic.
                5. DO NOT convert Egyptian slang to Modern Standard Arabic (Fusha). 
                Output only the transcription text.
                """

                model = self._get_model()
                response = model.generate_content([prompt, audio_file])
                text = response.text.strip()
                
                self.request_count += 1
                logger.debug(f"Requests: {self.request_count}/{MAX_REQUESTS_PER_MODEL}")
                
                try: audio_file.delete()
                except: pass
                
                return text

            except Exception as e:
                attempts += 1
                logger.error(f"Error: {e}")
                
                # Cleanup file on error
                if audio_file:
                    try: audio_file.delete()
                    except: pass

                if self._is_quota_error(e):
                    logger.warning("Quota error. Rotating resources...")
                    # Force model rotation
                    self.model_idx += 1
                    self.request_count = 0 
                    if self.model_idx >= len(MODELS):
                        self.model_idx = 0
                        self.api_key_idx += 1
                        try:
                            self._configure_api()
                        except:
                            return f"Error: All API keys exhausted - {e}"
                            
                    self._model = None # Force recreation
                    time.sleep(2)
                else:
                    return f"Error: {e}"

        return "Error: Max retries exhausted"

def download_audio(url, output_folder):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(output_folder, 'full_audio.%(ext)s'),
        'postprocessors': [{'key': 'FFmpegExtractAudio', 'preferredcodec': 'mp3', 'preferredquality': '192'}],
        'quiet': True
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    return os.path.join(output_folder, "full_audio.mp3")

def split_audio(file_path, output_folder):
    logger.info("Splitting audio...")
    audio = AudioSegment.from_mp3(file_path)
    chunks = []
    for i in range(0, len(audio), CHUNK_LENGTH_MS):
        chunk = audio[i:i + CHUNK_LENGTH_MS]
        chunk_name = f"chunk_{i//1000:04d}.mp3"
        chunk_path = os.path.join(output_folder, chunk_name)
        chunk.export(chunk_path, format="mp3")
        chunks.append(chunk_path)
    os.remove(file_path)
    return chunks

def main():
    if not os.path.exists(TEMP_FOLDER):
        os.makedirs(TEMP_FOLDER)

    url = "https://youtu.be/Lnq2xGqdFRo?si=0m6W0XvWqljRZBwW"
    audio_path = download_audio(url, TEMP_FOLDER)
    split_audio(audio_path, TEMP_FOLDER)
    clip_paths = sorted(glob.glob(os.path.join(TEMP_FOLDER, "*.mp3")))
    if not clip_paths:
        logger.info("No clips found.")
        return

    logger.info(f"Found {len(clip_paths)} clips.")

    manager = TranscriptionManager()
    last_processed = StateManager.load()
    start_processing = False
    
    file_mode = 'a' if os.path.exists(OUTPUT_CSV) and last_processed else 'w'
    
    if file_mode == 'w':
        start_processing = True
        logger.info("Starting fresh...")
    elif last_processed:
        logger.info(f"Resuming from: {last_processed}")

    with open(OUTPUT_CSV, file_mode, newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        if file_mode == 'w':
            writer.writerow(["Filename", "Transcription"])

        for index, clip in enumerate(clip_paths):
            filename = os.path.basename(clip)
            
            if not start_processing:
                if filename == last_processed:
                    start_processing = True
                continue
                
            logger.info(f"[{index+1}/{len(clip_paths)}] Processing {filename}...")
            
            transcript = manager.transcribe(clip)
            
            if transcript.startswith("Error: All API keys exhausted"):
                logger.error("Stopping: API Exhausted")
                break
                
            writer.writerow([filename, transcript])
            f.flush() 
            StateManager.save(filename)
            time.sleep(15)

    logger.info("Done")

if __name__ == "__main__":
    main()
