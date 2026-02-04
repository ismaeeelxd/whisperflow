import os
import csv
import time
import logging
import google.generativeai as genai
from google.api_core import exceptions

# 1. SETUP API KEYS
# Add all your API keys here
API_KEYS = []

# 2. CONFIGURATION
MODEL_NAME = 'gemini-2.5-flash' # Flash is recommended for large CSV tasks
INPUT_FILE = 'good.csv'
OUTPUT_FILE = 'translated_transcriptions.csv'

logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)

class KeyRotator:
    def __init__(self, keys):
        self.keys = keys
        self.current_index = 0
        self._configure()

    def _configure(self):
        # Configure the library with the current key
        genai.configure(api_key=self.keys[self.current_index])
        logger.info(f"--- Switched to API Key {self.current_index + 1}/{len(self.keys)} ---")

    def rotate(self):
        # Move to the next key and wrap around if at the end
        self.current_index = (self.current_index + 1) % len(self.keys)
        self._configure()

def get_translation_model():
    instruction = (
        "You are an expert academic translator specializing in Computer Science and Databases. "
        "I will provide a transcript segment containing a mix of Arabic and English. "
        "Tasks: 1. Translate Arabic to English. 2. KEEP technical English terms as-is. "
        "3. Maintain academic tone. 4. Output ONLY the English translation."
    )
    return genai.GenerativeModel(model_name=MODEL_NAME, system_instruction=instruction)

def main():
    if not os.path.exists(INPUT_FILE):
        logger.error(f"Error: {INPUT_FILE} not found.")
        return

    rotator = KeyRotator(API_KEYS)
    model = get_translation_model()

    with open(INPUT_FILE, 'r', encoding='utf-8') as infile, \
         open(OUTPUT_FILE, 'w', newline='', encoding='utf-8-sig') as outfile:
        
        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)
        writer.writeheader()

        for row in reader:
            filename = row['Filename']
            original_text = row['Transcription']
            
            translated_successfully = False
            attempts_per_row = 0

            # Retry logic with rotation if rate limits are hit
            while not translated_successfully and attempts_per_row < len(API_KEYS):
                try:
                    logger.info(f"Translating {filename}...")
                    response = model.generate_content(original_text)
                    row['Transcription'] = response.text.strip()
                    
                    writer.writerow(row)
                    outfile.flush()
                    translated_successfully = True
                    
                    # Small delay to respect RPM limits
                    time.sleep(1) 

                except exceptions.ResourceExhausted:
                    # Catch HTTP 429 errors (Rate Limit Exceeded)
                    logger.warning(f"Rate limit hit for Key {rotator.current_index + 1}. Rotating...")
                    rotator.rotate()
                    model = get_translation_model() # Re-initialize model with new key
                    attempts_per_row += 1
                    time.sleep(2) # Wait briefly before retrying

                except Exception as e:
                    logger.error(f"Critical error on {filename}: {e}")
                    writer.writerow(row) # Write original text so progress isn't lost
                    break

    logger.info(f"Done! Translated file saved as: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()