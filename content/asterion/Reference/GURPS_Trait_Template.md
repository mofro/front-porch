# GURPS Trait Formatting Guide

## Standard Template

```markdown
> [!trait]+ #### Trait Name [Cost]
> **Reference:** [[Reference/Path/To/Reference.pdf#page=X|BXX]]
> 
> [Optional description text if present]
> [Can be multiple lines]
>
> [**Modifiers:** (if present)]
> [- Modifier 1 (X points)]
> [- Modifier 2 (Y points)]
> 
> **Tags:** `Category1`, `Category2`
```

## Example 1: Basic Trait

```markdown
> [!trait]+ #### Breath-Holding [-0]
> **Reference:** [[Reference/GCS/GURPS 4th/GURPS 4th - Basic Set - Characters.pdf#page=43|B41]]
> 
> **Tags:** `Exotic`, `Physical`
```

## Example 2: Trait with Modifiers

```markdown
> [!trait]+ #### Catfall [-10]
> **Reference:** [[Reference/GCS/GURPS 4th/GURPS 4th - Basic Set - Characters.pdf#page=43|B41]]
> **Modifiers:**
> - Feather Fall (20 points)
> - Parachute (-30 points)
> 
> **Tags:** `Exotic`, `Physical`
```

## Example 3: Trait with Description

```markdown
> [!trait]+ #### Arm ST [-0]
> **Reference:** [[Reference/GCS/GURPS 4th/GURPS 4th - Basic Set - Characters.pdf#page=42|B40]]
>
> Only applies to efforts to lift, throw, or attack with those arms or hands. If a task requires multiple hands and they don't have the same ST, use the average ST.
>
> **Tags:** `Physical`
```

## Formatting Rules

1. **Blockquotes**: Every line starts with `>`
2. **Headers**: Use `####` for trait names

3. **Sections Order**:
   - Reference (required)
   - Description (optional)
   - Modifiers (optional)
   - Tags (required)

4. **Spacing**:
   - Blank line between sections
   - Blank line between traits (required)
   - No blank lines within a trait block

5. **Tags**:
   - Must be in backticks
   - Comma-separated
   - Preceded by `**Tags:**`
   - Must be the last item in the blockquote

## Obsidian Template

Save this as `.obsidian/templates/GURPS Trait.md` in your vault:

```markdown
> [!trait]+ #### {{Trait Name}} [{{Cost}}]
> **Reference:** [[Reference/GCS/GURPS 4th/GURPS 4th - Basic Set - Characters.pdf#page=|B]]
>
> {{Description}}
>
> **Modifiers:**
> -
>
> **Tags:** `{{Tag1}}`, `{{Tag2}}`
```

To use in Obsidian:

1. Open command palette (Cmd/Ctrl+P)
2. Type "Templates: Insert template"
3. Select "GURPS Trait"
4. Fill in the placeholders
