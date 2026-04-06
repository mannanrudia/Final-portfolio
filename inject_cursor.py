import os
import glob
import re

html_files = glob.glob('/Users/mannanrudia/portfolio/*.html')

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Check if script already exists
    if 'custom-cursor.js' not in content:
        # insert right before </body>
        new_content = content.replace("</body>", "    <script src=\"custom-cursor.js\"></script>\n</body>")
        
        with open(filepath, 'w') as f:
            f.write(new_content)

print("Injected custom-cursor.js script tags.")
