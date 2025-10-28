import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import globby from 'globby';

async function applyFixes() {
  const pattern = 'content/asterion/Logs/**/*.md';
  const files = await globby(pattern, { gitignore: true });
  if (!files.length) {
    console.log('No log files found for pattern', pattern);
    return;
  }

  for (const file of files) {
    if (path.basename(file) === 'Timeline.md') {
      console.log('Skipping Timeline:', file);
      continue;
    }

    try {
      const src = await fs.readFile(file, 'utf8');
      const parsed = matter(src, { excerpt: false });
      const data = parsed.data || {};
      let content = parsed.content || '';

      // infer title if missing
      let inferredTitle = null;
      if (!data.title) {
        if (data.original_date) inferredTitle = `${data.original_date} Asterion Log`;
        else if (data.date) inferredTitle = `${data.date} Asterion Log`;
        else inferredTitle = path.basename(file, '.md');
      }

      // prepare new frontmatter object with title first (if present)
      const newData = inferredTitle ? { title: inferredTitle, ...data } : { ...data };

      // remove leading H1 in body only if it is present as the first non-empty line
      // we consider body trimmed of leading whitespace
      const bodyTrimStart = content.replace(/^[\s\n]+/, '');
      if (/^#\s+/m.test(bodyTrimStart.split('\n')[0])) {
        // remove the first heading line and any following single blank line
        content = bodyTrimStart.replace(/^#.*(?:\r?\n)(?:\r?\n)?/, '');
        // ensure leading newline for readability
        content = content.replace(/^\s+/, '');
        console.log('Updated body (removed leading H1) in:', file);
      } else {
        content = parsed.content; // leave as-is
        console.log('No leading H1 to remove in:', file);
      }

      // stringify YAML + content
      const out = matter.stringify(content, newData);

      if (out !== src) {
        await fs.writeFile(file, out, 'utf8');
        console.log('Wrote changes to:', file);
      } else {
        console.log('No changes required for:', file);
      }
    } catch (err) {
      console.error('Error processing', file, err);
    }
  }
}

applyFixes().catch(err => { console.error(err); process.exit(1); });
