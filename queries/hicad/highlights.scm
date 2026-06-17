; ----------------------------
; START / END
; ----------------------------

(start_marker) @module
(end_marker) @module

; ----------------------------
; CONDITIONALS
; ----------------------------

(if_kw) @keyword.conditional
(then_kw) @keyword.conditional
(else_kw) @keyword.conditional
(ifend_kw) @keyword.conditional

; elseif_kw exists in grammar source but is currently unused.
; Do not enable unless $.elseif_kw is referenced by a rule.
; (elseif_kw) @keyword.conditional

; ----------------------------
; LOOPS
; ----------------------------

(for_kw) @keyword.repeat
(to_kw) @keyword.repeat
(next_kw) @keyword.repeat

(while_kw) @keyword.repeat
(whend_kw) @keyword.repeat

(repeat_kw) @keyword.repeat
(until_kw) @keyword.repeat

(for_header) @keyword.repeat
(for_end) @keyword.repeat

; ----------------------------
; COMMAND KEYWORDS
; ----------------------------

(option_kw) @keyword

(wait_kw) @keyword
(warte_kw) @keyword
(echo_kw) @keyword

(vai_kw) @keyword
(var_kw) @keyword
(pfd_kw) @keyword
(del_kw) @keyword

(esc_statement) @keyword

; wert_kw is currently not used as $.wert_kw in logic_operation.
; Enable only after changing logic_operation to use $.wert_kw.
; (wert_kw) @keyword

(logic_operation) @keyword

; ----------------------------
; FILE KEYWORDS
; ----------------------------

(open_kw) @keyword
(close_kw) @keyword
(output_kw) @keyword
(input_kw) @keyword
(copy_kw) @keyword
(mkdir_kw) @keyword

; ----------------------------
; CONTROL FLOW / JUMPS
; ----------------------------

(goto_kw) @keyword.control
(jump) @keyword.control

; ----------------------------
; GEOMETRY / INPUT COMMANDS
; ----------------------------

(point_kw) @keyword
(distance_kw) @keyword
(angle_kw) @keyword

(scalar_in) @keyword.type

(point_option) @keyword
(point_literal) @constant
(line_literal) @constant

(flow_args) @constant.builtin

; ----------------------------
; FUNCTIONS
; ----------------------------

(function_c) @function
(function) @function.call

(arithmetic_func) @function.builtin
(arithmetic_function) @function.call

(val_function) @function.builtin
(len_function) @function.builtin

; ----------------------------
; VARIABLES
; ----------------------------

(num_variable) @variable
(char_variable) @variable

(num_var_sign) @punctuation.special
(char_var_sign) @punctuation.special

(num_var_name) @variable
(identifier) @variable
(general_variable) @variable

(num_sys_var) @variable.builtin
(char_sys_var) @variable.builtin

; ----------------------------
; NUMBERS
; ----------------------------

(real) @number.float
(int) @number
(num_value) @number

(menu_index) @number
(menu_code) @number

; ----------------------------
; STRINGS / TEXT
; ----------------------------

(char_literal) @string
(quoted_char) @string
(free_text) @string
(text_value) @string

(char_value) @string
(concat_char) @string.special

(windows_path) @string.special
(local_path) @string.special
(unc_path) @string.special

(path_indicator) @string.special
(filename) @string.special
(file_extension) @string.special
(hc_path) @string.special

; ----------------------------
; OPERATORS
; ----------------------------

(comparative_operator) @operator
(logical_op) @keyword.operator
(negation) @keyword.operator

(binary_operator
  operator: _ @operator)

(unary_operator
  operator: _ @operator)

":=" @operator

"+" @operator
"-" @operator
"*" @operator
"/" @operator
"^" @operator
"=" @operator
">" @operator
"<" @operator
"<>" @operator
"<=" @operator
">=" @operator

; ----------------------------
; LOGICAL / BOOLEAN-LIKE
; ----------------------------

(logical_var) @boolean

; ----------------------------
; LABELS
; ----------------------------

(label) @label
(jump_to) @label

; ----------------------------
; HIGHER-LEVEL STRUCTURE
; ----------------------------

(menu) @function.macro

(file_operation) @function.macro
(file_open) @function.macro
(file_copy) @function.macro
(mkdir) @function.macro
(file_write) @function.macro
(file_close) @function.macro

(input) @function.macro
(scal_input) @function.macro
(point) @function.macro
(distance) @function.macro
(angle) @function.macro

(guidance_noarg) @keyword

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
