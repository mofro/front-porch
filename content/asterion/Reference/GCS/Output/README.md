# GCS Transpiler Output

This directory contains the output of the GCS to Obsidian transpiler.

## Directory Structure

- `Traits/`: Converted trait files (from .adq)
- `Equipment/`: Converted equipment files (from .eqp)
- `Modifiers/`: Converted modifier files (from .adm, .eqm)

## Usage

These files are automatically generated. Do not edit them directly as your changes will be overwritten.

## Regenerating Content

To regenerate the content, run the transpiler script:

```bash
python scripts/cli.py --input /path/to/input/files --output Reference/GCS/Output
```
