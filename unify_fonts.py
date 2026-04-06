import os
import glob
import re

html_files = glob.glob('/Users/mannanrudia/portfolio/*.html')
css_files = glob.glob('/Users/mannanrudia/portfolio/*.css')
all_files = html_files + css_files

def unify_fonts_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements in style tags or inline styles
    
    # 1. Headings -> Outfit
    content = re.sub(r'font-family:\s*\'?Times New Roman\'?[^;]*;', 'font-family: var(--font-heading);', content)
    
    # 2. Quotes/Italics -> Shadows Into Light
    content = re.sub(r'font-family:\s*\'?Playfair Display\'?[^;]*;', 'font-family: var(--font-quote);', content)
    content = re.sub(r'font-family:\s*\'?Caveat\'?[^;]*;', 'font-family: var(--font-quote);', content)
    
    # 3. Accents/Tags -> Rubik Mono One
    content = re.sub(r'font-family:\s*\'?DotGothic16\'?[^;]*;', 'font-family: var(--font-accent);', content)
    
    # 4. Standardize the Google Fonts links in HTML files
    if filepath.endswith('.html'):
        # Just ensure the three fonts are loaded, removing others.
        # Required fonts: Outfit, Rubik Mono One, Shadows Into Light.
        link_regex = r'<link href="https://fonts\.googleapis\.com/css2\?family=.*?" rel="stylesheet">'
        new_link = '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;800;900&family=Rubik+Mono+One&family=Shadows+Into+Light&display=swap" rel="stylesheet">'
        content = re.sub(link_regex, new_link, content, flags=re.IGNORECASE)

    # In style.css specifically, we also update the :root
    if filepath.endswith('style.css'):
        # Fix the root variables
        root_match = re.search(r':root\s*\{([^}]*)\}', content)
        if root_match:
            root_content = root_match.group(1)
            # Make sure we have the variables defined
            new_root = """
    --text-light: #ffffff;
    --accent: #fc8019;
    --accent-dark: #cc5a00;
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Outfit', sans-serif;
    --font-quote: 'Shadows Into Light', cursive;
    --font-accent: 'Rubik Mono One', sans-serif;
"""
            content = content.replace(root_content, new_root)
        
        # Replace the hardcoded Rubik Mono One with var where appropriate
        # Actually it's fine if Rubik is left as 'Rubik Mono One' inline or substituted
        content = re.sub(r'font-family:\s*\'?Rubik Mono One\'?[^;]*;', 'font-family: var(--font-accent);', content)
        content = re.sub(r'font-family:\s*\'?Outfit\'?[^;]*;', 'font-family: var(--font-body);', content)
        content = re.sub(r'font-family:\s*\'?Shadows Into Light\'?[^;]*;', 'font-family: var(--font-quote);', content)
        
        # Re-correct heading font assignments where necessary. It's safe to just let Outfit be the body and heading.
        
        # Fix the blue color in work experience
        content = content.replace('color: #007bb5;', 'color: var(--accent);')

    # Also fix it in HTML inline styles
    content = re.sub(r'font-family:\s*\'?Rubik Mono One\'?[^;]*;', 'font-family: var(--font-accent);', content)
    content = re.sub(r'font-family:\s*\'?Outfit\'?[^;]*;', 'font-family: var(--font-body);', content)
    content = re.sub(r'font-family:\s*\'?Shadows Into Light\'?[^;]*;', 'font-family: var(--font-quote);', content)
    
    # Specific HTML files might have things like var(--font-serif), map it to var(--font-quote)
    content = content.replace('var(--font-serif)', 'var(--font-quote)')

    with open(filepath, 'w') as f:
        f.write(content)

for file in all_files:
    unify_fonts_in_file(file)

print("Unified fonts across all files.")
