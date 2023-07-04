# Tree-sitter HiCAD

A [tree-sitter](https://tree-sitter.github.io/tree-sitter) grammar for the HCGS language from [ISD](https://www.isdgroup.com/), for its wonderful HiCAD program.

## Disclaimer

- This repository is independent of ISD, so not officially supported
- By choosing the MIT License, commercial or any usage is possible, however
- ISD owns its rights on HiCAD, and the language itself is not open source, further more,
- if you don't have a HiCAD license, or are not using the macro functionality, this is most likely useless

## What is it?

Tree-sitter is a technology used in various text editors like [neovim](https://neovim.io/) or [helix](https://helix-editor.com/) but also on websites like github for syntax highlighting and more.

Tree-sitter can parse the source code to an abstract syntax tree AST.
The content in this repository is only the language grammar for hicad, and its highlighting definition.

## Usage

For using it, it has to be built into the editor or website.
This example shows some highlighted hicad source on the right,
and the AST on the left within neovim.

![Highlight](/img/neovim_TS-hicad.png)

The highlight has been optimised for the [dracula](https://github.com/Mofiqul/dracula.nvim) theme,
but should at least work for any other theme that supports tree-sitter.

## Contributing

Tree-sitter itself doesn't need to be installed unless you want to contribute to the grammar,
or you want to use it for detecting syntactical errors in a pipline for example.

## Stage

This is a very early version of the grammar.
The specification of the language is written in the HiCAD documentation,
but there is room for speculation on how it is actually implemented.
Also right now the grammar is somehow opiniated, since there are no other programming tools like formaters available to handle that part.

## Roadmap

- [ ] Stabilize the grammar, there are still lots of errors
- [ ] Adding more features to the grammar
- [ ] Create queries for tagging, code navigation etc.
- [ ] I am fairly new to tree-sitter, so probably at some point refactor it completly
