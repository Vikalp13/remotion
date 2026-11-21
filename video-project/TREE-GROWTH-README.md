# बीज से पेड़ तक — Hindi Tree Growth Explainer

A 60-second vertical educational animation explaining how a seed becomes a tree.

## Pipeline
- Remotion: 1080×1920 animated explainer and scene sequencing
- Pocket TTS Hindi repository: available in the account for a future natural-speech upgrade; the current GitHub Actions render uses espeak-ng because its Hindi model setup and model download are not part of this workflow yet
- FFmpeg: original ambient soundtrack generation and audio processing
- Noto fonts: Hindi text rendering

## Render locally
```bash
npm install
sudo apt-get install -y ffmpeg espeak-ng fonts-noto-core fonts-noto-extra
bash scripts/tree-audio.sh
npm run render:tree
```

## GitHub Actions
Push to `video/tree-growth-explainer` or manually run the workflow. Download the artifact named `tree-growth-hindi-explainer` from the Actions run, extract the ZIP, and open `tree-growth-hindi.mp4`.

## Accuracy notes
The animation is a simplified teaching model. Real germination timing and the order of visible structures vary by species. The key concepts shown are water uptake, radicle/root emergence, plumule/shoot growth, leaf development, photosynthesis, and later flowering/fruiting in many tree species.
