# jupyter_ui_tweak

[![Github Actions Status](https://github.com/QuantStack/jupyter-ui-tweak/workflows/Build/badge.svg)](https://github.com/QuantStack/jupyter-ui-tweak/actions/workflows/build.yml)

A JupyterLab extension that tweaks the UI with the following features:

- **New dropdown menu** — Replaces the "New" dropdown button in the notebook tree view with one that lists available kernels sorted alphabetically by display name, instead of the default random order. Also includes shortcuts to create terminals, consoles, files, and directories.
- **Open in Voila** — Adds an "Open In Voila" command to the file browser context menu for `.ipynb` files, opening the selected notebook in [Voila](https://voila.readthedocs.io/).

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyter_ui_tweak
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyter_ui_tweak
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and contribution guidelines.

## AI Coding Assistant Support

This project includes an `AGENTS.md` file with coding standards and best practices for JupyterLab extension development. The file follows the [AGENTS.md standard](https://agents.md) for cross-tool compatibility.

### Compatible AI Tools

`AGENTS.md` works with AI coding assistants that support the standard, including Cursor, GitHub Copilot, Windsurf, Aider, and others. For a current list of compatible tools, see [the AGENTS.md standard](https://agents.md).

Other conventions you might encounter:

- `.cursorrules` - Cursor's YAML/JSON format (Cursor also supports AGENTS.md natively)
- `CONVENTIONS.md` / `CONTRIBUTING.md` - For CodeConventions.ai and GitHub bots
- Project-specific rules in JetBrains AI Assistant settings

All tool-specific files should be symlinks to `AGENTS.md` as the single source of truth.

### What's Included

The `AGENTS.md` file provides guidance on:

- Code quality rules and file-scoped validation commands
- Naming conventions for packages, plugins, and files
- Coding standards (TypeScript)
- Development workflow and debugging
- Common pitfalls and how to avoid them

### Customization

You can edit `AGENTS.md` to add project-specific conventions or adjust guidelines to match your team's practices. The file uses plain Markdown with Do/Don't patterns and references to actual project files.

**Note**: `AGENTS.md` is living documentation. Update it when you change conventions, add dependencies, or discover new patterns. Include `AGENTS.md` updates in commits that modify workflows or coding standards.

### Packaging the extension

See [RELEASE](RELEASE.md)
