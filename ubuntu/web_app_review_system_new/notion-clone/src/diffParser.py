import streamlit as st
import json
from utils.diffToJson import parseDiffToJson

st.title("Git Diff to Parsed JSON")

diff_input = st.text_area("Paste your diff file here:", height=300)

if st.button("Parse Diff"):
    if diff_input:
        try:
            result = parseDiffToJson(diff_input)
            st.json(json.dumps(result, indent=2))
        except Exception as e:
            st.error(f"Error parsing diff: {str(e)}")
    else:
        st.warning("Please enter a diff to parse.")
