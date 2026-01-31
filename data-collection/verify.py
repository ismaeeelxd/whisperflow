import streamlit as st
import pandas as pd
import os
import re

st.set_page_config(layout="wide", page_title="Audio Verifier", page_icon="🎧")

def inject_custom_css(direction="rtl"):
    alignment = "right" if direction == "rtl" else "left"
    st.markdown(f"""
    <style>
    textarea {{
        direction: {direction} !important;
        text-align: {alignment} !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        font-size: 20px !important;
        line-height: 1.6 !important;
    }}
    button {{
        height: 3em;
    }}
    </style>
    """, unsafe_allow_html=True)

def get_resume_index(df):
    if 'verified' not in df.columns:
        df['verified'] = False
    unverified = df[df['verified'] == False]
    if unverified.empty:
        return len(df) - 1
    return unverified.index[0]

def load_data(csv_path):
    if not os.path.exists(csv_path):
        st.error(f"Could not find {csv_path}.")
        return None
    
    df = pd.read_csv(csv_path)
    
    # --- NEW: SORT BY FILENAME ---
    # This forces chunk_0000 to come before chunk_0001, regardless of CSV order
    if 'Filename' in df.columns:
        df = df.sort_values(by='Filename').reset_index(drop=True)
    # -----------------------------

    if 'verified' not in df.columns:
        df['verified'] = False
        # Save the sorted order back to disk immediately
        df.to_csv(csv_path, index=False)
    
    return df

def save_data():
    st.session_state.df.to_csv(st.session_state.csv_file, index=False)
    st.toast("Saved!", icon="💾")

def delete_current_row():
    st.session_state.df = st.session_state.df.drop(
        st.session_state.df.index[st.session_state.current_index]
    ).reset_index(drop=True)
    save_data()
    if st.session_state.current_index >= len(st.session_state.df):
        st.session_state.current_index = max(0, len(st.session_state.df) - 1)
    st.rerun()

# --- SETUP ---
if 'setup_complete' not in st.session_state:
    st.session_state.setup_complete = False

if not st.session_state.setup_complete:
    st.title("🎧 Audio Verifier Setup")
    st.markdown("---")
    
    default_audio_folder = os.path.join(os.path.dirname(__file__), "temp_clips")
    default_csv_file = os.path.join(os.path.dirname(__file__), "transcriptions.csv")
    
    col1, col2 = st.columns(2)
    with col1:
        audio_folder = st.text_input("Audio Folder Path:", value=default_audio_folder)
    with col2:
        csv_file = st.text_input("CSV File Path:", value=default_csv_file)
    
    if st.button("🚀 Start Verification", type="primary", use_container_width=True):
        if os.path.exists(audio_folder) and os.path.exists(csv_file):
            st.session_state.audio_folder = audio_folder
            st.session_state.csv_file = csv_file
            st.session_state.df = load_data(csv_file)
            st.session_state.current_index = get_resume_index(st.session_state.df)
            st.session_state.setup_complete = True
            st.rerun()

else:
    # --- MAIN APP ---
    df = st.session_state.df
    
    with st.sidebar:
        st.header("🔍 Global Search & Replace")
        search_term = st.text_input("Find:")
        replace_term = st.text_input("Replace with:")
        
        bs_mode = st.checkbox("BS (Whole Word Only)", value=False)

        if search_term:
            if bs_mode:
                pattern = rf"\b{re.escape(search_term)}\b"
                matches = df[df['Transcription'].str.contains(pattern, regex=True, na=False)]
            else:
                matches = df[df['Transcription'].str.contains(search_term, regex=False, na=False, case=False)]
            
            st.write(f"Found **{len(matches)}** occurrences.")
            
            if not matches.empty:
                st.caption("Matches preview:")
                for i in range(min(2, len(matches))):
                    st.text(f"...{matches.iloc[i]['Transcription'][:40]}...")
                
                col_rep1, col_rep2 = st.columns(2)
                with col_rep1:
                    if st.button("Replace All"):
                        if bs_mode:
                            st.session_state.df['Transcription'] = st.session_state.df['Transcription'].str.replace(pattern, replace_term, regex=True)
                        else:
                            st.session_state.df['Transcription'] = st.session_state.df['Transcription'].str.replace(search_term, replace_term, regex=False)
                        save_data()
                        st.rerun()
                
                with col_rep2:
                    if st.button("Replace Current"):
                        curr_txt = st.session_state.df.at[st.session_state.current_index, 'Transcription']
                        if bs_mode:
                            new_curr = re.sub(pattern, replace_term, curr_txt)
                        else:
                            new_curr = curr_txt.replace(search_term, replace_term)
                            
                        st.session_state.df.at[st.session_state.current_index, 'Transcription'] = new_curr
                        save_data()
                        st.rerun()

        st.divider()
        st.header("Navigation")
        total_clips = len(df)
        verified_count = df['verified'].sum()
        curr = st.session_state.current_index + 1
        st.progress(verified_count / total_clips)
        st.write(f"**Clip {curr} of {total_clips}**")
        
        new_index = st.number_input("Jump to #", min_value=1, max_value=total_clips, value=curr) - 1
        if new_index != st.session_state.current_index:
            st.session_state.current_index = new_index
            st.rerun()

        if st.button("⚙️ Change Paths", use_container_width=True):
            st.session_state.setup_complete = False
            st.rerun()

    # --- WORKSPACE ---
    if df is not None and not df.empty:
        row = df.iloc[st.session_state.current_index]
        filename = row['Filename']
        transcript = row['Transcription']
        is_verified = row.get('verified', False)

        col_header, col_status, col_toggle = st.columns([3, 1, 1])
        with col_header: 
            st.subheader(f"{filename}")
        
        with col_status: 
            if is_verified:
                st.success("✅ Verified")
            else:
                st.warning("⏳ Pending")

        with col_toggle:
            is_rtl = st.checkbox("🇪🇬 Arabic Mode", value=True)
            inject_custom_css("rtl" if is_rtl else "ltr")

        audio_path = os.path.join(st.session_state.audio_folder, filename)
        if os.path.exists(audio_path): 
            st.audio(audio_path)
        else: 
            st.error(f"⚠️ Audio file missing")

        new_text = st.text_area("Edit Transcription:", value=transcript, height=300, key=f"text_{st.session_state.current_index}")

        c1, c2, c3, c4 = st.columns([1, 1, 1, 1])
        with c1:
            if st.button("⬅️ Previous") and st.session_state.current_index > 0:
                st.session_state.current_index -= 1
                st.rerun()
        with c2:
            if st.button("💾 Save & Verify ✅", type="primary"):
                st.session_state.df.at[st.session_state.current_index, 'Transcription'] = new_text
                st.session_state.df.at[st.session_state.current_index, 'verified'] = True
                save_data()
                if st.session_state.current_index < total_clips - 1:
                    st.session_state.current_index += 1
                st.rerun()
        with c3:
            if st.button("➡️ Skip (Next)") and st.session_state.current_index < total_clips - 1:
                st.session_state.current_index += 1
                st.rerun()
        with c4:
            if st.button("🗑️ Delete Row"):
                delete_current_row()
    else:
        st.info("Dataset is empty.")