import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import globby from 'globby';

async function fixLogs() {
  const pattern = 'content/asterion/Logs/**/*.md';
  const files = await globby(pattern);
  if (files.length === 0) {
    console.log('No log files found for pattern', pattern);
    return;
  }

  for (const file of files) {
    try {
      const src = await fs.readFile(file, 'utf8');
      const parsed = matter(src, { excerpt: false });
      const data = parsed.data || {};
      let content = parsed.content || '';

      // Determine title
      if (!data.title) {
        if (data.original_date) {
          data.title = `${data.original_date} Asterion Log`;
        } else if (data.date) {
          data.title = `${data.date} Asterion Log`;
        } else {
          // fallback to filename
          const base = path.basename(file, '.md');
          data.title = base;
        }
      }

      // Remove leading H1 if present in the body
      // Match: optional whitespace/newlines, then a line starting with '# ' up to newline, then optional one blank line
      const h1Regex = /^\s*# .*?(?:\r?\n)(?:\r?\n)?/s;
      if (h1Regex.test(content)) {
        content = content.replace(h1Regex, '');
      }

      // Ensure there's a single leading newline before content for readability
      content = content.replace(/^\s+/, '');

      const out = matter.stringify(content, data);

      if (out !== src) {
        await fs.writeFile(file, out, 'utf8');
        console.log('Updated', file);
      } else {
        console.log('No change', file);
      }
    } catch (err) {
      console.error('Error processing', file, err);
    }
  }
}

fixLogs().catch(err => { console.error(err); process.exit(1); });
