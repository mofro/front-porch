import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import globby from 'globby';

function detectLeadingH1(content) {
  // Trim leading whitespace and see if it starts with '# '
  const trimmed = content.replace(/^\s+/, '');
  return /^#\s+/m.test(trimmed.split('\n')[0]);
}

async function main() {
  const pattern = 'content/asterion/Logs/**/*.md';
  const files = await globby(pattern);
  if (files.length === 0) {
    console.log('No log files found');
    return;
  }

  const report = [];

  for (const file of files) {
    const src = await fs.readFile(file, 'utf8');
    const parsed = matter(src, { excerpt: false });
    const data = parsed.data || {};
    const content = parsed.content || '';

    const hasTitle = !!data.title;
    let inferredTitle = null;
    if (!hasTitle) {
      if (data.original_date) inferredTitle = `${data.original_date} Asterion Log`;
      else if (data.date) inferredTitle = `${data.date} Asterion Log`;
      else inferredTitle = path.basename(file, '.md');
    }

    const leadingH1 = detectLeadingH1(content);

    report.push({ file, hasTitle, inferredTitle, leadingH1 });
  }

  // Print report
  console.log('Dry-run report: planned changes for log files');
  console.log('------------------------------------------------');
  for (const r of report) {
    console.log(`File: ${r.file}`);
    if (r.hasTitle) {
      console.log('  - title: already present (no change)');
    } else {
      console.log(`  - title: WILL be added as: "${r.inferredTitle}"`);
    }
    if (r.leadingH1) {
      console.log('  - leading H1: WILL be removed from body');
    } else {
      console.log('  - leading H1: none found (no change)');
    }
    console.log('');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
