import streamlit as st
import pandas as pd
import os

# --- CONFIGURATION ---
CSV_FILE = "transcriptions.csv"  
AUDIO_FOLDER = "temp_clips"    

st.set_page_config(layout="wide", page_title="Audio Verifier", page_icon="🎧")

def inject_custom_css(direction="rtl"):
    alignment = "right" if direction == "rtl" else "left"
    st.markdown(f"""
    <style>
    /* Target the text area for bigger font and Arabic direction */
    textarea {{
        direction: {direction} !important;
        text-align: {alignment} !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        font-size: 20px !important;
        line-height: 1.6 !important;
    }}
    /* Make the buttons bigger */
    button {{
        height: 3em;
    }}
    </style>
    """, unsafe_allow_html=True)

def load_data():
    if not os.path.exists(CSV_FILE):
        st.error(f"Could not find {CSV_FILE}. Make sure it is in this folder.")
        return None
    return pd.read_csv(CSV_FILE)

def save_data():
    st.session_state.df.to_csv(CSV_FILE, index=False)
    st.toast("Saved!", icon="💾")

def delete_current_row():
    # Remove the row at current_index
    st.session_state.df = st.session_state.df.drop(st.session_state.df.index[st.session_state.current_index]).reset_index(drop=True)
    save_data()
    # Adjust index if we deleted the last item
    if st.session_state.current_index >= len(st.session_state.df):
        st.session_state.current_index = max(0, len(st.session_state.df) - 1)
    st.rerun()

if 'df' not in st.session_state:
    st.session_state.df = load_data()
    st.session_state.current_index = 0

df = st.session_state.df

if df is not None and not df.empty:
    
    with st.sidebar:
        st.header("Navigation")
        
        total_clips = len(df)
        curr = st.session_state.current_index + 1
        progress = st.session_state.current_index / total_clips
        
        st.progress(progress)
        st.write(f"**Clip {curr} of {total_clips}**")
        
        # Jump to specific index
        new_index = st.number_input("Jump to #", min_value=1, max_value=total_clips, value=curr) - 1
        if new_index != st.session_state.current_index:
            st.session_state.current_index = new_index
            st.rerun()
            
        st.divider()
        st.info("💡 **Tip:** Use 'Right-to-Left' for Arabic flow. Use 'Left-to-Right' to fix English variable names.")

    # --- MAIN UI ---
    
    # Get current row data
    row = df.iloc[st.session_state.current_index]
    filename = row['Filename']
    transcript = row['Transcription']

    # Title & Audio
    col_header, col_toggle = st.columns([3, 1])
    with col_header:
        st.subheader(f"{filename}")
        
    with col_toggle:
        # The Toggle Switch
        is_rtl = st.checkbox("🇪🇬 Arabic Mode (RTL)", value=True)
        inject_custom_css("rtl" if is_rtl else "ltr")

    # Audio Player
    audio_path = os.path.join(AUDIO_FOLDER, filename)
    if os.path.exists(audio_path):
        st.audio(audio_path)
    else:
        st.error(f"⚠️ Audio file missing: {audio_path}")


    # --- TEXT EDITOR ---
    # We use a unique key based on index so the text box updates when we click Next
    new_text = st.text_area(
        "Edit Transcription:", 
        value=transcript, 
        height=200, 
        key=f"text_{st.session_state.current_index}"
    )

    # --- ACTION BUTTONS ---
    c1, c2, c3, c4 = st.columns([1, 1, 1, 1])

    with c1:
        if st.button("⬅️ Previous"):
            if st.session_state.current_index > 0:
                st.session_state.current_index -= 1
                st.rerun()

    with c2:
        if st.button("💾 Save & Next ➡️", type="primary"):
            # Update the DataFrame in memory
            st.session_state.df.at[st.session_state.current_index, 'Transcription'] = new_text
            # Save to Disk
            save_data()
            # Move Next
            if st.session_state.current_index < total_clips - 1:
                st.session_state.current_index += 1
                st.rerun()
            else:
                st.success("🎉 You reached the end of the dataset!")

    with c4:
        # The Danger Button (Red)
        if st.button("🗑️ Delete Row", type="secondary"):
            delete_current_row()

else:
    st.write("No data loaded. Check your CSV path.")