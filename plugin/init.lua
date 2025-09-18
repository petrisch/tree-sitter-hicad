-- Adding a new filetype to neovim
vim.filetype.add({
	extension = {
		mac = "hicad",
		MAC = "hicad",
	},
})

vim.api.nvim_create_autocmd("FileType", {
	pattern = { "hicad" },
	callback = function(event)
		vim.bo[event.buf].commentstring = "REM %s"
	end,
})

local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.hicad = {
	install_info = {
		url = "https://github.com/petrisch/tree-sitter-hicad",
		files = { "src/parser.c" },
		branch = "main",
		generate_requires_npm = false, -- if stand-alone parser without npm dependencies
		requires_generate_from_grammar = false, -- if folder contains pre-generated src/parser.c
	},
	filetype = "hicad", -- if filetype does not match the parser name
}
