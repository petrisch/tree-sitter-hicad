; highlights.scm

(expression) @namespace

(function) @function
(function_c) @function.call
(menu) @function.macro

"START" @module
"END" @module

; "STRING" @keyword.type
; "REAL" @keyword.type
; "INTEGER" @keyword.type

; "ANTWORT" @keyword.type
; "POINT" @keyword.type
; "DISTANZ" @keyword.type
; "WINKEL" @keyword.type
(scalar_in) @keyword.type

; "APEIN" @keyword
; "APAUS" @keyword
; "HFEIN" @keyword
; "HFAUS" @keyword
; "MEIN" @keyword
; "MAUS" @keyword
; "SEIN" @keyword
; "SAUS" @keyword
; "SZEIN" @keyword
; "SZAUS" @keyword
; "UDA" @keyword
; "UDE" @keyword
; "WAUS" @keyword
; "WEIN" @keyword
; "ZAE" @keyword
; "ZAA" @keyword
(guidance_noarg) @keyword

(":=") @punctuation

("=") @constructor
(">") @constructor
("<") @constructor
("<>") @constructor
("<=") @constructor
(">=") @constructor
(logical_op) @constructor

(arithmetic_func) @operator

(negation) @operator

; (condition) @keyword.conditional
(if_kw) @keyword.conditional
(then_kw) @keyword.conditional
(else_kw) @keyword.conditional
(ifend_kw) @keyword.conditional

(for_kw) @keyword.repeat
(to_kw) @keyword.repeat
(next_kw) @keyword.repeat

(while_kw) @keyword.repeat
(repeat_kw) @keyword.repeat
(until_kw) @keyword.repeat

;(num_value) @number
(real) @number.float
(int) @number
(num_variable) @variable.parameter

(char_value) @text.literal
(char_literal) @text.literal
(char_variable) @variable.member

(logical_var) @boolean


(wait) @string.documentation
(warte) @string.documentation

(file_operation) @text.title
; "OPEN" @text.title
; "CLOSE" @text.title
; "OUTPUT" @keyword
; "INPUT" @keyword
; "COPY" @keyword
; "MKDIR" @keyword

(input) @string.escape

(path_indicator) @string.special.url
(filename) @text.underline

(jump_invocation) @text.strong
(label) @text.strong
(jump_to) @text.strong

(comment) @comment
