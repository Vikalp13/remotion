# बीज से पेड़ तक — Hindi Tree Growth Explainer

A 60-second vertical educational animation explaining how a seed becomes a tree.

## Production pipeline
- **Remotion:** 1080×1920 animation, scene sequencing, on-screen Hindi explanations
- **Pocket TTS Hindi:** Hindi narration generated from the full narration script using CPU inference and int8 quantization; no cloud TTS API
- **FFmpeg:** soft original ambient background music
- **Noto fonts:** Hindi text rendering

The GitHub Actions workflow clones and installs the user's Pocket TTS Hindi repository from https://github.com/builderAbhishek/pocket-tts-hindi and runs its documented `pocket-tts generate --language hindi` command. The first run downloads the Hindi model/tokenizer from Hugging Face, so it requires internet access and may take longer than a normal render.

## Render locally
Install Pocket TTS Hindi following its own README, then:
```bash
npm install
# Ensure ffmpeg and Noto Hindi fonts are installed.
bash scripts/tree-audio.sh
npm run render:tree
```

## GitHub Actions
Push to `video/tree-growth-explainer` or manually run the workflow. Download the artifact named `tree-growth-hindi-explainer` from the Actions run, extract the ZIP, and open `tree-growth-hindi.mp4`.

## Accuracy notes
The animation is a simplified teaching model. Real germination timing and the order of visible structures vary by species. The key concepts shown are water uptake, radicle/root emergence, plumule/shoot growth, leaf development, photosynthesis, and later flowering/fruiting in many tree species.
