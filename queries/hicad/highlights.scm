; highlights.scm

(expression) @namespace

(function) @function
"OPTION" @function.macro
"ESC" @function.macro

"START" @module
"END" @module

"STRING" @keyword.type
"REAL" @keyword.type
"INTEGER" @keyword.type
"ANTWORT" @keyword.type
"POINT" @keyword.type
"DISTANZ" @keyword.type
"WINKEL" @keyword.type

"APEIN" @keyword
"APAUS" @keyword
"HFEIN" @keyword
"HFAUS" @keyword
"MEIN" @keyword
"MAUS" @keyword
"SEIN" @keyword
"SAUS" @keyword
"SZEIN" @keyword
"SZAUS" @keyword
"UDA" @keyword
"UDE" @keyword
"WAUS" @keyword
"WEIN" @keyword
"ZAE" @keyword
"ZAA" @keyword

(":=") @punctuation

("=") @operator
(">") @operator
("<") @operator
("<>") @operator
("<=") @operator
(">=") @operator

("NOT") @keyword.conditional

; TODO definitaly wrong, but there are not much more things in dracula theme
(condition) @constant
("IF") @keyword.conditional
("THEN") @keyword.conditional
("ELSE") @keyword.conditional
("IFEND") @keyword.conditional

(for_loop) @keyword.repeat
(while_loop) @keyword.repeat
(repeat_loop) @keyword.repeat

;(num_value) @number
(real) @number.float
(int) @number
(num_variable) @variable.parameter

(char_value) @string
(char_variable) @variable.member

"3D" @tag.attribute
"BEMA" @tag.attribute
"DVORHD" @tag.attribute
"FEATURE" @tag.attribute
"FEHL" @tag.attribute
"INT" @tag.attribute
"ISOP" @tag.attribute
"PBEZ" @tag.attribute
"PESC" @tag.attribute
"PINT" @tag.attribute
"SCHR" @tag.attribute
"SYMB" @tag.attribute
"TEXT" @tag.attribute
"VALID" @tag.attribute
"VORHD" @string.special
"WAHR" @string.special.symbol
"JA" @boolean
"NEIN" @boolean

(wait) @string.documentation
(warte) @string.documentation

"OPEN" @text.title
"CLOSE" @text.title
"OUTPUT" @keyword
"INPUT" @keyword
"COPY" @keyword
"MKDIR" @keyword

(path_indicator) @string.special.url
(filename) @text.underline

(jump_invocation) @text.strong
(label) @text.strong
(jump_to) @text.strong

(comment) @comment
