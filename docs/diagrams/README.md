# Diagrams

This folder stores generated diagram assets for Markdown docs.

## Generated Mermaid Diagrams

The `generated/` folder contains:

- `.mmd` files: extracted Mermaid source used by the renderer.
- `.svg` files: rendered images linked from the Markdown docs.

To regenerate the SVGs, install Mermaid CLI and run it against each `.mmd` file:

```powershell
npx --yes @mermaid-js/mermaid-cli -i docs/diagrams/generated/system-context.mmd -o docs/diagrams/generated/system-context.svg
```

Repeat for the remaining `.mmd` files, or script the loop locally.
