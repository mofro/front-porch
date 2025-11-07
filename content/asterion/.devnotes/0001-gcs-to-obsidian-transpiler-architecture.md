# ADR 0001: GCS to Obsidian Transpiler Architecture

## Status

Proposed

## Context

We need to convert GCS (GURPS Character Sheet) data files into Obsidian-compatible markdown format. The system should be:

1. **Extensible** - Support different GCS file types (traits, equipment, modifiers)
2. **Maintainable** - Clear structure and documentation
3. **User-friendly** - Simple to use and integrate into existing workflows
4. **Future-proof** - Allow for potential expansion into a full GCS alternative

## Decision

We will implement a modular Python-based transpiler with the following architecture:

### Core Components

1. **Parsers**

   - `GCSBaseParser`: Abstract base class
   - `TraitParser`: Handles `.adq` files
   - `EquipmentParser`: Handles `.eqp` files
   - `ModifierParser`: Handles `.adm` and `.eqm` files

2. **Formatters**

   - `ObsidianFormatter`: Base formatter
   - `TraitFormatter`: Specialized for traits
   - `EquipmentFormatter`: Specialized for equipment
   - `ModifierFormatter`: Specialized for modifiers

3. **Utilities**

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

## Consequences

### Benefits

- **Modularity**: Each component has a single responsibility
- **Testability**: Easy to write unit tests for each module
- **Extensibility**: New parsers/formatters can be added without modifying existing code
- **Maintainability**: Clear separation of concerns

### Trade-offs

- **Initial Complexity**: More files and abstractions than a simple script
- **Learning Curve**: New contributors need to understand the architecture

## Related Decisions

- Using Python for its strong string manipulation and JSON handling
- Following the Single Responsibility Principle for class design
- Using YAML frontmatter for Obsidian metadata

## Next Steps

1. Implement the core parser and formatter interfaces
2. Create basic templates for each content type
3. Develop the reference manager for PDF links
4. Build the CLI interface

## Notes

- This architecture allows for future expansion into a web interface or Obsidian plugin
- The system is designed to be data-driven, making it easy to add new templates or output formats
