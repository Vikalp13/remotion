# भूत को लगी नौकरी — Hindi Comedy Short

A 50-second, 9:16 animated Hindi comedy short rendered with Remotion.

## What it includes
- Five animated scenes with original vector cartoon characters
- Hindi dialogue captions and synthesized Hindi narration
- Original synthesized background music
- 1080×1920 H.264 MP4 output

## Render
```bash
npm install
sudo apt-get install -y ffmpeg espeak-ng fonts-noto-core fonts-noto-extra
bash scripts/audio.sh
npm run render
```

The GitHub Actions workflow renders the MP4 after changes are pushed to `video/ghost-job-short` and uploads it as a downloadable workflow artifact.
