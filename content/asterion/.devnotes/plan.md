# GCS to Obsidian Transpiler - Implementation Plan

## Project Overview

This document outlines the complete plan for implementing a GCS (GURPS Character Sheet) to Obsidian markdown transpiler. The goal is to convert GCS data files into a format suitable for use in Obsidian, with support for traits, equipment, and modifiers.

## Architecture

### Core Components

#### 1. Parsers

- `GCSBaseParser`: Abstract base class for all parsers
- `TraitParser`: Handles `.adq` files (traits)
- `EquipmentParser`: Handles `.eqp` files (equipment)
- `ModifierParser`: Handles `.adm` and `.eqm` files (modifiers)

#### 2. Formatters

- `ObsidianFormatter`: Base formatter class
- `TraitFormatter`: Specialized for trait formatting
- `EquipmentFormatter`: Specialized for equipment formatting
- `ModifierFormatter`: Specialized for modifier formatting

#### 3. Utilities

- `ReferenceManager`: Handles PDF references and page numbers
- `TemplateManager`: Manages Obsidian templates
- `FileHandler`: Handles file I/O operations

### Directory Structure

```text
/scripts/
  ├── gcs_parser/         # Core parsing logic
  │   ├── __init__.py
  │   ├── base_parser.py
  │   ├── trait_parser.py
  │   ├── equipment_parser.py
  │   └── modifier_parser.py
  │
  ├── obsidian_formatter/  # Formatting logic
  │   ├── __init__.py
  │   ├── base_formatter.py
  │   ├── trait_formatter.py
  │   ├── equipment_formatter.py
  │   └── modifier_formatter.py
  │
  ├── utils/              # Utility functions
  │   ├── __init__.py
  │   ├── reference_manager.py
  │   ├── template_manager.py
  │   └── file_handler.py
  │
  └── cli.py              # Command-line interface

/Reference/
  ├── GCS/
  │   ├── Output/         # Generated content
  │   │   ├── Traits/
  │   │   ├── Equipment/
  │   │   └── Modifiers/
  │   └── Templates/      # Obsidian templates
  │
  └── GURPS books/        # Existing output

/.devnotes/               # Documentation
  └── ADRs/               # Architecture Decision Records
```


## Implementation Phases

### Phase 1: Foundation (Week 1)

- [ ] Set up project structure
- [ ] Implement base parser and formatter classes
- [ ] Create basic CLI interface
- [ ] Set up testing framework

### Phase 2: Core Functionality (Week 2-3)

- [ ] Implement trait parsing and formatting
- [ ] Add equipment support
- [ ] Implement modifier handling
- [ ] Set up reference management

### Phase 3: Enhanced Features (Week 4)

- [ ] Add template support
- [ ] Implement batch processing
- [ ] Add validation and error handling
- [ ] Create documentation

## Technical Decisions

### Language Choice: Python

- **Why Python?**
  - Strong string manipulation capabilities
  - Excellent JSON support
  - Easy to write and maintain
  - Good library ecosystem
  - Cross-platform compatibility

### File Structure

- Modular design for easy maintenance
- Clear separation of concerns
- Follows Python packaging best practices

### Output Format

- Markdown with YAML frontmatter
- Obsidian-compatible callouts and formatting
- Support for transclusion and linking

## Future Considerations

- Web interface for drag-and-drop conversion
- Obsidian plugin integration
- Support for additional GCS file types
- Interactive character sheet integration
