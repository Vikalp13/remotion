#!/usr/bin/env bash
set -euo pipefail
mkdir -p public out

TEXT='एक छोटे से बीज से विशाल पेड़ बनने की कहानी शुरू होती है। बीज के अंदर एक नन्हा भ्रूणीय पौधा होता है। जब बीज को पानी मिलता है, तो वह पानी सोखकर फूलता है और उसका बाहरी आवरण नरम होकर फटने लगता है। इसे अंकुरण कहते हैं। अंकुरण के लिए पानी, ऑक्सीजन और सही तापमान जरूरी हैं। सबसे पहले बीज से प्राथमिक जड़ बाहर निकलती है, जिसे रेडिकल कहते हैं। यह मिट्टी में नीचे की ओर बढ़ती है और पानी तथा खनिज सोखती है। इसके बाद अंकुर का ऊपरी भाग, यानी प्लूम्यूल, ऊपर की ओर बढ़ता है। नन्हा तना मिट्टी से बाहर आता है और पहली पत्तियाँ खुलती हैं। अब पत्तियाँ सूर्य के प्रकाश की मदद से पानी और हवा की कार्बन डाइऑक्साइड से भोजन बनाती हैं। इस प्रक्रिया को प्रकाश संश्लेषण कहते हैं। समय के साथ तना मोटा होता है, शाखाएँ फैलती हैं और पेड़ बड़ा होता जाता है। कई पेड़ों में फूल खिलते हैं और फल बनते हैं। फलों के अंदर नए बीज होते हैं। इस तरह एक बीज से नया पेड़ बनता है और जीवन चक्र फिर शुरू हो जाता है।'

echo "Generating Hindi voice with Pocket TTS Hindi (CPU, int8)..."
pocket-tts generate \
  --language hindi \
  --text "$TEXT" \
  --output-path public/voice.wav \
  --device cpu \
  --quantize

test -s public/voice.wav

# Gentle original ambient music, mixed quietly beneath the spoken narration.
ffmpeg -y \
  -f lavfi -i "sine=frequency=220:duration=60" \
  -f lavfi -i "sine=frequency=277.18:duration=60" \
  -f lavfi -i "sine=frequency=329.63:duration=60" \
  -filter_complex "[0:a]volume=0.035[a0];[1:a]volume=0.025[a1];[2:a]volume=0.018[a2];[a0][a1][a2]amix=inputs=3:duration=longest,lowpass=f=1200,afade=t=in:st=0:d=3,afade=t=out:st=55:d=5" \
  -t 60 -ac 2 public/music.wav
