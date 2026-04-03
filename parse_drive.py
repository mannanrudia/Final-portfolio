import re
import urllib.request
url = "https://drive.google.com/drive/folders/1O45Z0bs1E5UkDk8l_Ih4y_JL_uFLN8UH"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Google drive injects file names in script tags, finding things like ["<filename>",...]
    names = re.findall(r'\["([^"]+\.(?:mp4|jpg|png|pdf|docx?|txt))",', html, re.IGNORECASE)
    names = list(set(names))
    if not names:
        names = re.findall(r'\["(.*?)"', html)
    print("Found names:", names[:20])
except Exception as e:
    print("Error:", e)
