# AI Presentation Maker

This project generates a PowerPoint presentation (pptx), images for slides, and per-slide narration from a single input topic using **Google AI** for text and images and **gTTS** for narration.

## Quick start (Option 1: API Key)

1. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`.
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
3. Generate a presentation from CLI:
   ```bash
   python scripts/cli_generate.py --topic "Your Topic Here" --slides 8
   ```
4. Or run the Flask app:
   ```bash
   python app.py
   ```

Outputs will be in `outputs/<topic-slug>/` and include `presentation.pptx`, `images/`, and `audio/`.

## Notes
- This repository is configured for API-key mode (`GEMINI_API_KEY`).
- For production, consider using Google Cloud Vertex and service-account credentials.
