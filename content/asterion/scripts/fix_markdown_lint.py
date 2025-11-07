import os
import re
from pathlib import Path

def fix_markdown_file(file_path):
    print(f"\nProcessing file: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    # Split content into lines for processing
    lines = content.split('\n')
    new_lines = []
    i = 0
    
    def debug_print(msg, line_num=None, line_content=None):
        if line_num is not None and line_content is not None:
            print(f"  [Line {line_num + 1}] {msg}: {line_content!r}")
        else:
            print(f"  {msg}")
    
    # First pass: handle emphasis in headings and clean up lines
    cleaned_lines = []
    in_frontmatter = False
    
    for line in lines:
        # Track frontmatter
        if line.strip() == '---':
            in_frontmatter = not in_frontmatter
        
        # Process headings
        heading_match = re.match(r'^(#+)\s*(.*?)[.,;:!?]?\s*$', line)
        if heading_match and not in_frontmatter:
            level = heading_match.group(1)
            text = heading_match.group(2).strip()
            # Just keep the text, even if it has emphasis
            line = f"{level} {text}"
        
        cleaned_lines.append(line)
    
    # Second pass: handle spacing and blank lines
    i = 0
    while i < len(cleaned_lines):
        line = cleaned_lines[i]
        
        # Skip empty lines in a row (handle redundant blank lines)
        if line.strip() == '' and new_lines and new_lines[-1].strip() == '':
            i += 1
            continue
            
        # Handle headings
        if re.match(r'^#+\s+', line):
            # Ensure blank line before heading (except for first line or after another heading)
            if i > 0 and not re.match(r'^#+\s+', cleaned_lines[i-1].strip()) and cleaned_lines[i-1].strip() != '':
                new_lines.append('')
            
            new_lines.append(line)
            
            # Ensure single blank line after heading if not at end of file
            if i + 1 < len(cleaned_lines) and cleaned_lines[i+1].strip() != '':
                new_lines.append('')
        
        # Handle lists
        elif line.strip().startswith(('* ', '- ', '+ ', '1. ', '2. ', '3. ', '4. ', '5. ', '6. ', '7. ', '8. ', '9. ')):
            # Add blank line before list if needed
            if new_lines and new_lines[-1].strip() != '' and not new_lines[-1].strip().startswith(('* ', '- ', '+ ', '1. ')):
                new_lines.append('')
            
            new_lines.append(line)
            
            # Add blank line after list if needed
            if (i + 1 < len(cleaned_lines) and 
                cleaned_lines[i+1].strip() != '' and 
                not cleaned_lines[i+1].startswith(('  ', '\t', '* ', '- ', '+ ', '1. '))):
                new_lines.append('')
        
        # Handle paragraphs and other content
        else:
            # Don't add multiple consecutive blank lines
            if line.strip() == '' and new_lines and new_lines[-1].strip() == '':
                pass  # Skip adding multiple blank lines
            else:
                new_lines.append(line)
        
        i += 1
    
    # Join lines and ensure exactly one newline at end of file
    new_content = '\n'.join(new_lines).strip() + '\n'
    # Check if content changed
    if new_content != original_content:
        debug_print(f"Changes detected in {file_path}")
        # Write changes back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        # Print a diff of changes
        import difflib
        diff = difflib.unified_diff(
            original_content.splitlines(keepends=True),
            new_content.splitlines(keepends=True),
            fromfile='original',
            tofile='modified',
            fromfiledate='',
            tofiledate='',
            n=3
        )
        print('\n'.join(diff))
        
        return True
    else:
        debug_print("No changes needed")
        return False

def process_directory(directory):
    total_fixed = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.md', '.markdown')):
                file_path = os.path.join(root, file)
                try:
                    if fix_markdown_file(file_path):
                        print(f"Fixed: {file_path}")
                        total_fixed += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {str(e)}")
    
    print(f"\nTotal files fixed: {total_fixed}")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Fix markdown formatting issues')
    parser.add_argument('files', nargs='*', help='Markdown files to process')
    parser.add_argument('--all', action='store_true', help='Process all markdown files in the characters directory')
    
    args = parser.parse_args()
    
    if args.all:
        # Process all markdown files in the characters directory
        characters_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'characters')
        process_directory(characters_dir)
    elif args.files:
        # Process only the specified files
        total_fixed = 0
        for file_path in args.files:
            if os.path.isfile(file_path) and file_path.lower().endswith(('.md', '.markdown')):
                try:
                    if fix_markdown_file(file_path):
                        print(f"Fixed: {file_path}")
                        total_fixed += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {str(e)}")
        print(f"\nTotal files fixed: {total_fixed}")
    else:
        print("No files specified. Use --help for usage information.")

if __name__ == "__main__":
    main()
