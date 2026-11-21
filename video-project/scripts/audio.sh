#!/usr/bin/env bash
set -euo pipefail
mkdir -p public out
TEXT='रात के बारह बजे पप्पू अकेला जा रहा था। तभी एक भूत निकला। भूत बोला, रुक जा इंसान, मैं तुझे खा जाऊँगा। पप्पू बोला, भाई, ई एम आई और बिजली का बिल भरता हूँ, तुझसे क्या डरूँ। भूत रोने लगा। बोला, दो सौ साल से नौकरी नहीं मिली। पप्पू उसे इंटरव्यू में ले गया। मैनेजर बोला, दो सौ साल का अनुभव? आप कल से जॉइन करो। अगले दिन बॉस ने पाँच सौ फाइलें दे दीं। भूत चिल्लाया, इससे अच्छा तो मैं लोगों को डराता था। नौकरी से तो भूत भी डरता है।'
espeak-ng -v hi -s 148 -p 48 -a 175 -w public/voice.wav "$TEXT"
ffmpeg -y -f lavfi -i "sine=frequency=110:duration=50" -f lavfi -i "sine=frequency=164.81:duration=50" -f lavfi -i "sine=frequency=220:duration=50" -filter_complex "[0:a]volume=0.12[a0];[1:a]volume=0.07[a1];[2:a]volume=0.04[a2];[a0][a1][a2]amix=inputs=3:duration=longest,lowpass=f=900,afade=t=in:st=0:d=2,afade=t=out:st=46:d=4" -t 50 -ac 2 public/music.wav
