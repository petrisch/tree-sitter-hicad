; ----------------------------
; START END
; ----------------------------

(start_marker) @module
(end_marker) @module

; ----------------------------
; CONDITION KEYWORDS
; ----------------------------

(condition) @keyword.conditional

; ----------------------------
; LOOPS
; ----------------------------

(loop) @keyword.repeat

; ----------------------------
; COMMANDS
; ----------------------------

(wait) @keyword
(warte) @keyword
(echo) @keyword

(assignment) @keyword

(menu) @function.macro

(file_operation) @function.macro

(function) @function.call
(function_c) @function

(arithmetic_func) @function.builtin

; ----------------------------
; VARIABLES
; ----------------------------

(num_variable) @variable
(char_variable) @variable

(char_sys_var) @variable.builtin
(num_sys_var) @variable.builtin

(identifier) @variable
(general_variable) @variable

; ----------------------------
; NUMBERS
; ----------------------------

(real) @number.float
(int) @number
(num_value) @number

; ----------------------------
; STRINGS / TEXT
; ----------------------------

(char_literal) @string
(quoted_char) @string
(free_text) @string
(text_value) @string

(windows_path) @string.special
(local_path) @string.special
(unc_path) @string.special

(path_indicator) @string.special
(filename) @string

; ----------------------------
; OPERATORS
; ----------------------------

(comparative_operator) @operator

(binary_operator operator: _ @operator)
(unary_operator operator: _ @operator)

; ----------------------------
; LOGICAL
; ----------------------------

(logical_var) @boolean
(logical_op) @keyword.operator
(negation) @keyword.operator

; ----------------------------
; LABELS
; ----------------------------

(label) @label
(jump_to) @label
(jump) @keyword.control

; ----------------------------
; INPUT / IO
; ----------------------------

(input) @string.special

; ----------------------------
; COMMENTS
; ----------------------------

(comment) @comment

; ----------------------------
; PUNCTUATION
; ----------------------------

"(" @punctuation.bracket
")" @punctuation.bracket
":" @punctuation.delimiter
