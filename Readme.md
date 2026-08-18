# Tree-sitter HiCAD

A [tree-sitter](https://tree-sitter.github.io/tree-sitter) grammar for the HCGS language from [ISD](https://www.isdgroup.com/), for its wonderful HiCAD program.

> [!CAUTION]
> This version works only for the main branch from nvim-treesitter.

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
or you want to use it for detecting syntactical errors in a pipeline for example.

## Stage

This is a very early version of the grammar.
The specification of the language is written in the HiCAD documentation,
but there is room for speculation on how it is actually implemented.
Also right now the grammar is somehow opiniated, since there are no other programming tools like formaters available to handle that part.

## Roadmap

- [x] Stabilize the grammar, there are still lots of errors
- [x] Adding more features to the grammar
- [x] I am fairly new to tree-sitter, so probably at some point refactor it completly
- [x] Check what `POINT J Z8 Z9` is.
- [x] Support the `IGNORE` keyword
- [x] Check for `REAL    RET`.
- [x] Check for the `LISTE` keyword
- [x] Check for `MAA` and `MAE` keyword. => Dont support, could be old
- [x] Check for `WIED` and `LINE`
- [x] Check if this is valid `POINT R -D(DN*MZ4)` => no not really. Should be `POINT R -D (DN*MZ4)`
- [x] Check this `$T2:=CHR$(NP)`
- [x] Check for relative paths like: `RMT ..\pmu\2dtext_neu.pmu`
- [x] Check `STRING "FOO"+bar`
- [x] Solve the occurence of bare `POINT R` on a line
- [ ] Check for `POINT I`
- [ ] Create queries for tagging, code navigation etc.

This is valid code but parses bad

```hicad
    IF BEMUEBSTL<>"0" THEN
      DISTANZ BFPY+FOAPY+(BY16+20)*@2
    ELSE
      DISTANZ BFPY+FOAPY+(BY16+30)*@2
    IFEND
```
