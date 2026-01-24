import streamlit as st
import pandas as pd
import os

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

def get_resume_index(df):
    """Find the first unverified row to resume from."""
    if 'verified' not in df.columns:
        df['verified'] = False
    
    # Find first unverified row
    unverified = df[df['verified'] == False]
    if unverified.empty:
        return len(df) - 1  # All verified, go to last
    return unverified.index[0]

def load_data(csv_path):
    if not os.path.exists(csv_path):
        st.error(f"Could not find {csv_path}. Make sure it exists.")
        return None
    
    df = pd.read_csv(csv_path)
    
    # Add verified column if it doesn't exist
    if 'verified' not in df.columns:
        df['verified'] = False
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

# --- INITIAL SETUP: Choose audio folder and CSV file ---
if 'setup_complete' not in st.session_state:
    st.session_state.setup_complete = False

if not st.session_state.setup_complete:
    st.title("🎧 Audio Verifier Setup")
    st.markdown("---")
    
    # Default paths (can be customized)
    default_audio_folder = os.path.join(os.path.dirname(__file__), "temp_clips")
    default_csv_file = os.path.join(os.path.dirname(__file__), "transcriptions.csv")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📁 Audio Folder")
        audio_folder = st.text_input(
            "Path to audio folder:",
            value=default_audio_folder,
            help="Enter the full path to the folder containing audio files"
        )
        
        if audio_folder and os.path.exists(audio_folder):
            files = [f for f in os.listdir(audio_folder) if f.endswith(('.mp3', '.wav', '.ogg', '.m4a'))]
            st.success(f"✅ Found {len(files)} audio files")
        elif audio_folder:
            st.error("❌ Folder not found")
    
    with col2:
        st.subheader("📄 CSV File")
        csv_file = st.text_input(
            "Path to CSV file:",
            value=default_csv_file,
            help="Enter the full path to the transcriptions CSV file"
        )
        
        if csv_file and os.path.exists(csv_file):
            temp_df = pd.read_csv(csv_file)
            verified_count = temp_df['verified'].sum() if 'verified' in temp_df.columns else 0
            st.success(f"✅ Found {len(temp_df)} rows ({verified_count} verified)")
        elif csv_file:
            st.error("❌ File not found")
    
    st.markdown("---")
    
    if st.button("🚀 Start Verification", type="primary", use_container_width=True):
        if not os.path.exists(audio_folder):
            st.error("Please provide a valid audio folder path")
        elif not os.path.exists(csv_file):
            st.error("Please provide a valid CSV file path")
        else:
            st.session_state.audio_folder = audio_folder
            st.session_state.csv_file = csv_file
            st.session_state.df = load_data(csv_file)
            
            if st.session_state.df is not None:
                # Resume from last unverified row
                st.session_state.current_index = get_resume_index(st.session_state.df)
                st.session_state.setup_complete = True
                st.rerun()

else:
    # --- MAIN VERIFICATION UI ---
    df = st.session_state.df
    
    if df is not None and not df.empty:
        
        with st.sidebar:
            st.header("Navigation")
            
            total_clips = len(df)
            verified_count = df['verified'].sum()
            curr = st.session_state.current_index + 1
            progress = verified_count / total_clips
            
            st.progress(progress)
            st.write(f"**Clip {curr} of {total_clips}**")
            st.write(f"**Verified: {int(verified_count)} / {total_clips}**")
            
            # Jump to specific index
            new_index = st.number_input("Jump to #", min_value=1, max_value=total_clips, value=curr) - 1
            if new_index != st.session_state.current_index:
                st.session_state.current_index = new_index
                st.rerun()
            
            st.divider()
            
            # Quick navigation buttons
            col_nav1, col_nav2 = st.columns(2)
            with col_nav1:
                if st.button("⏮️ First Unverified"):
                    resume_idx = get_resume_index(df)
                    st.session_state.current_index = resume_idx
                    st.rerun()
            with col_nav2:
                if st.button("⏭️ Last Row"):
                    st.session_state.current_index = len(df) - 1
                    st.rerun()
            
            st.divider()
            
            # Change paths button
            if st.button("⚙️ Change Paths", use_container_width=True):
                st.session_state.setup_complete = False
                st.rerun()
            
            st.divider()
            st.info("💡 **Tip:** Use 'Right-to-Left' for Arabic flow. Use 'Left-to-Right' to fix English variable names.")
            
            # Show current paths
            st.divider()
            st.caption(f"📁 {st.session_state.audio_folder}")
            st.caption(f"📄 {st.session_state.csv_file}")

        # --- MAIN UI ---
        
        # Get current row data
        row = df.iloc[st.session_state.current_index]
        filename = row['Filename']
        transcript = row['Transcription']
        is_verified = row.get('verified', False)

        # Title & Audio
        col_header, col_status, col_toggle = st.columns([3, 1, 1])
        with col_header:
            st.subheader(f"{filename}")
        
        with col_status:
            if is_verified:
                st.success("✅ Verified")
            else:
                st.warning("⏳ Pending")
            
        with col_toggle:
            is_rtl = st.checkbox("🇪🇬 Arabic Mode (RTL)", value=True)
            inject_custom_css("rtl" if is_rtl else "ltr")

        # Audio Player
        audio_path = os.path.join(st.session_state.audio_folder, filename)
        if os.path.exists(audio_path):
            st.audio(audio_path)
        else:
            st.error(f"⚠️ Audio file missing: {audio_path}")

        # --- TEXT EDITOR ---
        new_text = st.text_area(
            "Edit Transcription:", 
            value=transcript, 
            height=300, 
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
            if st.button("💾 Save & Verify ✅", type="primary"):
                # Update the DataFrame in memory
                st.session_state.df.at[st.session_state.current_index, 'Transcription'] = new_text
                st.session_state.df.at[st.session_state.current_index, 'verified'] = True
                # Save to Disk
                save_data()
                # Move Next
                if st.session_state.current_index < total_clips - 1:
                    st.session_state.current_index += 1
                    st.rerun()
                else:
                    st.success("🎉 You reached the end of the dataset!")

        with c3:
            if st.button("➡️ Skip (Next)"):
                if st.session_state.current_index < total_clips - 1:
                    st.session_state.current_index += 1
                    st.rerun()

        with c4:
            if st.button("🗑️ Delete Row", type="secondary"):
                delete_current_row()

    else:
        st.write("No data loaded. Check your CSV path.")