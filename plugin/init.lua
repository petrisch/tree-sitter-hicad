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

vim.api.nvim_create_autocmd("User", {
	pattern = "TSUpdate",
	callback = function()
		require("nvim-treesitter.parsers").hicad = {
			install_info = {
				url = "https://github.com/petrisch/tree-sitter-hicad",
				files = { "src/parser.c" },
				branch = "main",
				generate = false,
				queries = "queries/hicad",
			},
		}
	end,
})
