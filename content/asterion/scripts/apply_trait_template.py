#!/usr/bin/env python3
"""
GURPS Trait Template Formatter

Formats GURPS trait data into consistent markdown templates.
"""

import json
import re
from pathlib import Path
from typing import Dict, List

def load_template(template_path: str) -> str:
    """Load the template file."""
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

def format_trait(trait: Dict, template: str) -> str:
    """Format a single trait using the template."""
    # Extract trait details
    name = trait.get('name', '').replace('@', '')
    reference = trait.get('reference', '')
    points = trait.get('base_points', 0)
    
    # Format modifiers if they exist
    modifiers = []
    for mod in trait.get('modifiers', []):
        mod_name = mod.get('name', '').strip()
        mod_cost = mod.get('cost', 0)
        if mod_name and mod_cost != 0:
            cost_str = f"{mod_cost} points"
            modifiers.append(f"- {mod_name} ({cost_str})")
    
    # Create the formatted trait
    formatted = f"> [!trait]+ #### {name} [{points}]\n"
    formatted += f"> **Reference:** [[{reference}]]\n\n"
    
    if modifiers:
        formatted += "> **Modifiers:**\n"
        for mod in modifiers:
            formatted += f"> {mod}\n"
        formatted += "\n"
    
    # Add tags
    tags = [t for t in trait.get('tags', []) if t in ['Mental', 'Physical', 'Social', 'Exotic']]
    if tags:
        formatted += "> **Tags:** `" + "`, `".join(tags) + "`\n"
    
    return formatted

def main():
    # Example usage
    input_file = "../Reference/GCS/Master Library/Basic Set/Basic Set Traits.adq"
    output_file = "../Reference/GURPS_books_formatted.md"
    template_file = "../Reference/GURPS_Trait_Template.md"
    
    # Load the template
    try:
        template = load_template(template_file)
    except FileNotFoundError:
        print(f"Error: Template file not found at {template_file}")
        return
    
    # Process traits
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            for trait in data.get('rows', []):
                formatted = format_trait(trait, template)
                f.write(formatted + "\n")
                
        print(f"Successfully wrote formatted traits to {output_file}")
        
    except Exception as e:
        print(f"Error processing files: {e}")

if __name__ == "__main__":
    main()
