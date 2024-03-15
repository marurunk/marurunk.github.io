# SCRIPT FOR THUNAR File Manager CUSTOM ACTION
#mkdir -p small; for file in %F; do convert $file -thumbnail x400 "small/$(basename $file .png).jpg"; done
convert $1 -resize x400 -quality 90 "small/$(basename $1 .png).jpg"

