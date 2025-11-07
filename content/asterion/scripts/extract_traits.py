import json
import re
from collections import defaultdict

def extract_traits(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    traits = {
        'Advantage': [],
        'Disadvantage': [],
        'Perk': [],
        'Quirk': []
    }
    
    for item in data.get('rows', []):
        name = item.get('name', '').strip()
        reference = item.get('reference', '')
        tags = item.get('tags', [])
        base_points = item.get('base_points', 0)
        notes = item.get('notes', '')
        
        # Skip entries without a name or reference
        if not name or not reference:
            continue
        
        # Clean up the name (remove @ symbols used for placeholders)
        clean_name = name.replace('@', '')
        
        # Get the book page number (first B-prefixed number in reference)
        page_match = re.search(r'B(\d+)', reference)
        page = int(page_match.group(1)) + 2 if page_match else 0
        
        # Get the base reference (B-prefixed page number)
        base_ref = f"B{page-2}" if page else ""
        
        # Get modifiers if they exist
        modifiers = []
        for mod in item.get('modifiers', []):
            mod_name = mod.get('name', '').strip()
            mod_cost = mod.get('cost', 0)
            if mod_name and mod_cost != 0:
                cost_str = f"{mod_cost} points" if abs(mod_cost) != 1 else f"{mod_cost} point"
                modifiers.append(f"{mod_name} ({cost_str})")
        
        # Determine the trait type and adjust point costs accordingly
        trait_type = None
        point_cost = 0
        
        if 'Advantage' in tags:
            trait_type = 'Advantage'
            point_cost = -abs(base_points)  # Advantages have negative costs
        elif 'Disadvantage' in tags:
            trait_type = 'Disadvantage'
            point_cost = abs(base_points)   # Disadvantages have positive costs
        elif 'Perk' in tags:
            trait_type = 'Perk'
            point_cost = -1  # Perks always cost 1 point
        elif 'Quirk' in tags:
            trait_type = 'Quirk'
            point_cost = 1   # Quirks always give back 1 point
        
        if trait_type:
            traits[trait_type].append({
                'name': clean_name,
                'original_name': name,
                'page': page,
                'points': point_cost,
                'reference': reference,
                'base_ref': base_ref,
                'notes': notes,
                'modifiers': modifiers,
                'tags': [t for t in tags if t not in ['Advantage', 'Disadvantage', 'Perk', 'Quirk']]
            })
    
    # Sort each category by name
    for trait_type in traits:
        traits[trait_type].sort(key=lambda x: x['name'].lower())
    
    return traits

def format_trait_card(trait, trait_type):
    """Format a trait as a card with all its details according to the template."""
    # Determine point cost string
    if trait_type in ['Advantage', 'Perk']:
        point_str = f"-{abs(trait['points'])}"
    else:
        point_str = f"+{trait['points']}"
    
    # Clean up and filter tags
    tags = [tag for tag in trait['tags'] if not tag.startswith('@') and tag not in ['Mental', 'Physical', 'Exotic', 'Social', 'Supernatural']]
    
    # Add default tags based on trait type if no specific tags
    if not tags and trait_type in ['Advantage', 'Disadvantage', 'Perk', 'Quirk']:
        if trait_type in ['Advantage', 'Perk']:
            tags = ['Mental']  # Default tag for advantages and perks
        else:
            tags = ['Social']  # Default tag for disadvantages and quirks
    
    # Format modifiers if they exist
    mods_section = []
    if trait['modifiers']:
        mods_section.append("> **Modifiers:")
        mods_section.extend([f"> - {mod}" for mod in trait['modifiers']])
    
    # Format notes/description if it exists
    notes = trait.get('notes', '').strip()
    notes_section = []
    if notes:
        # Clean up placeholders in notes
        clean_notes = notes.replace('@Subject@', '').replace('@Description@', '').strip()
        if clean_notes:
            # Split notes into lines and add '> ' prefix to each
            for line in clean_notes.split('\n'):
                if line.strip():
                    notes_section.append(f"> {line.strip()}")
    
    # Build the trait card with consistent formatting
    card = []
    
    # Trait header
    card.append(f"> [!trait]+ #### {trait['name']} [{point_str}]")
    
    # Reference
    card.append(f"> **Reference:** [[Reference/GCS/GURPS 4th/GURPS 4th - Basic Set - Characters.pdf#page={trait['page']}|{trait['base_ref']}]]")
    
    # Add notes if they exist
    if notes_section:
        card.append(">")  # Empty line before notes
        card.extend(notes_section)
    
    # Add modifiers if they exist
    if mods_section:
        if not notes_section and not trait.get('notes'):
            card.append(">")  # Empty line before modifiers if no notes
        card.extend(mods_section)
    
    # Add tags if they exist
    if tags:
        if not (mods_section or notes_section):
            card.append(">")  # Empty line before tags if no modifiers or notes
        card.append("> **Tags:** " + ", ".join(f"`{tag}`" for tag in sorted(tags)))
    
    # Ensure each line is properly prefixed with '> '
    formatted_lines = []
    for line in card:
        if line.startswith('> '):
            formatted_lines.append(line)
        elif line.startswith('>'):
            formatted_lines.append(line)  # Already has '>', no space needed
        else:
            formatted_lines.append(f"> {line}")
    
    # Join lines with newlines and add final newline
    return '\n'.join(formatted_lines) + '\n\n'

def generate_markdown(traits):
    output = ""
    
    # Add advantages
    if traits['Advantage']:
        output += "# Advantages\n\n"
        for trait in traits['Advantage']:
            output += format_trait_card(trait, 'Advantage')
    
    # Add disadvantages
    if traits['Disadvantage']:
        output += "\n# Disadvantages\n\n"
        for trait in traits['Disadvantage']:
            output += format_trait_card(trait, 'Disadvantage')
    
    # Add perks
    if traits['Perk']:
        output += "\n# Perks\n\n"
        for trait in traits['Perk']:
            output += format_trait_card(trait, 'Perk')
    
    # Add quirks
    if traits['Quirk']:
        output += "\n# Quirks\n\n"
        for trait in traits['Quirk']:
            output += format_trait_card(trait, 'Quirk')
    
    # Add notes section
    output += """
## Notes

- Advantages have negative point costs (e.g., -5, -10, etc.)
- Disadvantages have positive point costs (e.g., +5, +10, etc.)
- Perks are minor advantages that cost 1 point each
- Quirks are minor disadvantages that give back 1 point each
- Page numbers in links are 2 higher than the book page numbers (e.g., B34 = page 36 in PDF)
"""
    
    return output

if __name__ == "__main__":
    input_file = "/Users/mo/Code/front-porch/content/asterion/Reference/GCS/Master Library/Basic Set/Basic Set Traits.adq"
    output_file = "/Users/mo/Code/front-porch/content/asterion/Reference/GURPS books.md"
    
    try:
        print("Extracting traits...")
        traits = extract_traits(input_file)
        print(f"Found {len(traits['Advantage'])} advantages, {len(traits['Disadvantage'])} disadvantages, "
              f"{len(traits['Perk'])} perks, and {len(traits['Quirk'])} quirks.")
        
        print("Generating markdown...")
        markdown = generate_markdown(traits)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown)
            
        print(f"Successfully generated {output_file}")
    except Exception as e:
        print(f"Error: {str(e)}")
        raise e
