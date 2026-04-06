import os
import glob
import re

html_files = glob.glob('/Users/mannanrudia/portfolio/*.html')

new_font_link = '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Rubik+Mono+One&display=swap" rel="stylesheet">'

# 1. Update HTML files
for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace the Google fonts link
    link_regex = r'<link href="https://fonts\.googleapis\.com/css2\?family=Outfit.*?rel="stylesheet">'
    content = re.sub(link_regex, new_font_link, content, flags=re.IGNORECASE)

    # Some inline font-families if left might still be there, but they use var(--font-quote) mostly.
    with open(filepath, 'w') as f:
        f.write(content)

# 2. Update style.css
css_path = '/Users/mannanrudia/portfolio/style.css'
with open(css_path, 'r') as f:
    content = f.read()

content = content.replace("var(--font-quote): 'Shadows Into Light', cursive;", "var(--font-quote): 'Playfair Display', serif;")
content = content.replace("--font-quote: 'Shadows Into Light', cursive;", "--font-quote: 'Playfair Display', serif;")

with open(css_path, 'w') as f:
    f.write(content)

print("Updated font to Playfair Display across all files.")
