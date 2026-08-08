# Gutenberg Lab

A beginner-friendly learning plugin for the **WordPress block editor (Gutenberg)**.

You do not need to be a WordPress expert. The docs start from the basics (admin vs frontend, what a plugin is) and then walk through architecture, flow, and each file with tests and debugging.

## Start here

Open **[docs/README.md](./docs/README.md)** and read the steps in order:

0. WordPress basics  
1. Architecture and flow (big picture)  
2. Plugin registration  
3. `block.json`  
4. `edit.js`  
5. `save.js`  
6. `render.php`  
7. Build (`src/` → `build/`)  
8. Debug cheatsheet  

## Official resources

| Resource | Use it for |
|----------|------------|
| [Block Editor Reference Guides](https://developer.wordpress.org/block-editor/reference-guides/) | How blocks work (API, attributes, edit/save, hooks, data) |
| [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/introduction--page) | Live UI components for the editor (`Button`, `Panel`, controls) |

**Rule of thumb:** Reference Guides = architecture & API. Storybook = editor UI building blocks.
