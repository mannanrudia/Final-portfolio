#!/bin/bash
echo "Starting image extraction..."

# Create the folder if it doesn't already exist
mkdir -p /Users/mannanrudia/portfolio/assets

# List of target images we need to find and copy
images=(
    "sportsyard_hero_zine_1775005476995.png"
    "sportsyard_canva_1_1775002371431.png"
    "media__1774904321514.png"
    "media__1774904321470.png"
    "media__1774904321583.png"
    "media__1774904321641.jpg"
    "namma_carnival_scrape_1774906872990.webp"
    "ngl_hydration_hero_zine_1775005503823.png"
    "short_film_hero_1775057856674.png"
    "content_producer_final_shortfilm_style_1775058724595.png"
    "creative_strategy_final_shortfilm_style_1775059599589.png"
    "hobby_psychology_1775222244187.png"
    "hobby_snapchat_filters_1775222262005.png"
    "media__1775162827124.jpg"
    "ngl-hydration.png"
)

# Search recursively through the hidden AI storage directories (no sandbox limits for you)
echo "Searching /Users/mannanrudia/.gemini/antigravity/brain/ ..."
for img in "${images[@]}"; do
    # Find the image file (-name matches exact name) and copy it
    find /Users/mannanrudia/.gemini/antigravity/brain -type f -name "$img" -exec cp -v {} /Users/mannanrudia/portfolio/assets/ \;
done

# We also know one image came from your Downloads folder
if [ -f "/Users/mannanrudia/Downloads/IMG_5230.jpg" ]; then
    cp -v "/Users/mannanrudia/Downloads/IMG_5230.jpg" /Users/mannanrudia/portfolio/assets/
    echo "Copied IMG_5230.jpg from Downloads."
fi

# We also know one image might have been moved
if [ -f "/Users/mannanrudia/portfolio/IMG_5230.jpg" ]; then
    cp -v "/Users/mannanrudia/portfolio/IMG_5230.jpg" /Users/mannanrudia/portfolio/assets/
    echo "Copied IMG_5230.jpg from local folder."
fi

echo "Extraction complete! Please check your /Users/mannanrudia/portfolio/assets/ folder."
