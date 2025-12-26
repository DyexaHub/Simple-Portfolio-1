import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS from <style> tags
css_pattern = r'<style>(.*?)</style>'
css_matches = re.findall(css_pattern, content, re.DOTALL)

# Combine all CSS
all_css = '\n'.join(css_matches)

# Write CSS to file
with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(all_css)

# Extract JavaScript from <script> tag (not src)
js_pattern = r'<script>(.*?)</script>'
js_matches = re.findall(js_pattern, content, re.DOTALL)

# Filter out scripts with src attribute
js_content = ''
for match in js_matches:
    if 'src=' not in match and 'type="text/javascript"' not in match:
        js_content += match + '\n'

# Write JavaScript to file
with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

# Create clean HTML by removing <style> and <script> tags
clean_html = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
clean_html = re.sub(r'<script>.*?</script>', '', clean_html, flags=re.DOTALL)

# Add links to external files
head_end_pattern = r'</head>'
css_link = '<link rel="stylesheet" href="styles.css">'
js_link = '<script src="script.js"></script>'

clean_html = re.sub(head_end_pattern, f'{css_link}\n{js_link}\n</head>', clean_html)

# Write clean HTML
with open('index_clean.html', 'w', encoding='utf-8') as f:
    f.write(clean_html)

print("Extraction complete!")
