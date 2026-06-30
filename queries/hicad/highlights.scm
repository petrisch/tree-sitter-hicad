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

(wert_kw) @keyword
(logic_operation) @keyword

(esc_statement) @keyword

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

(flow_args) @constant.builtin

; ----------------------------
; POINT
; ----------------------------

(point) @function.macro

(point_opt_option) @function.macro
(point_1_option) @function.macro
(point_2p_option) @function.macro
(point_reference) @constant

(point_opt_argument_indicator) @keyword
(point_opt_argument_indicator) @keyword
(point_1_argument_indicator) @keyword
(point_2_argument_indicator) @keyword

(point_lit_ind) @constant.builtin
(point_ar_reference) @constant.builtin

(point_argument) @variable.parameter

(point_literal) @constant
(line_literal) @constant

(point_number) @number
(point_num_value) @number
(point_real) @number.float
(point_int) @number

(point_identifier) @variable

(point_arithmetic) @none

(point_binary_operator
  operator: _ @operator)

(point_unary_operator
  operator: _ @operator)

(point_parenthesized_expression) @none
(point_a_option) @function.macro
(point_a_indicator) @keyword
(point_immediate_argument) @number
(point_immediate_real) @number.float
(point_immediate_int) @number
(point_2p_option) @function.macro

; ----------------------------
; FUNCTIONS
; ----------------------------

(function_c) @function
(function) @function.call

(arithmetic_func) @function.builtin
(arithmetic_function) @function.call

(val_function) @function.builtin
(len_function) @function.builtin
(idx_function) @function.builtin
(asc_function) @function.builtin

(string_function) @function.builtin
(string_alt_function) @function.builtin
(time_function) @function.builtin
(chr_function) @function.builtin

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
(special2Dvariable) @variable.builtin

; ----------------------------
; NUMBERS
; ----------------------------

(real) @number.float
(int) @number
(num_value) @number

(menu_index) @number
(menu_code) @number

(chr_num_literal) @number

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
