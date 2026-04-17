import fs from 'fs';
const rawHtml = fs.readFileSync('doc.html', 'utf8');

const underlineClasses = new Set();
const styleMatch = rawHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  const styles = styleMatch[1];
  const rules = styles.split('}');
  for (const rule of rules) {
    if (rule.includes('text-decoration:underline')) {
      const match = rule.match(/\.(c\d+)/);
      if (match) underlineClasses.add(match[1]);
    }
  }
}

const docRegex = /<span class="([^"]+)"[^>]*>(.*?)<\/span>/gi;
let match;
while ((match = docRegex.exec(rawHtml)) !== null) {
  const classes = match[1].split(' ');
  const text = match[2].replace(/<[^>]+>/g, '').trim();
  if (text.length > 0 && classes.some(c => underlineClasses.has(c))) {
    console.log(text.replace(/&nbsp;/g, ' '));
  }
}
