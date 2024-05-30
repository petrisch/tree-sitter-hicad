// Version HiCAD 2020
// - Neuer Befehl ab 2022 "ASK"

const PREC = {
  parenthesized: 1,
  quoted: 2,
  plus: 3,
  times: 4,
  power: 5,
  arithmetic: 6,
  char: 7,
};
const comparative_operators = ["=", ">", "<", "<>", "<=", ">="];
const logical_operators = ["AND", "OR"];

// The VORH is not mentioned in the documentation.
// According to some power users it is valid code, so its in here.
// could be deleted if we want to be strict, because we should use VORHD instead
const logical_variable = [
  "3D",
  "BEMA",
  "DVORHD",
  "ESC",
  "FEATURE",
  "FEHL",
  "INT",
  "ISOP",
  "JA",
  "NEIN",
  "PBEZ",
  "PESC",
  "PINT",
  "SCHR",
  "SYMB",
  "TEXT",
  "VALID",
  "VORHD",
  "VORH",
  "WAHR",
];

const assignment_operator = [":="];

const scalar_input = ["STRING", "REAL", "INTEGER", "ANTWORT"];

const geometric_input = ["POINT", "DISTANZ", "WINKEL"];

// The `free` Argument #
const arguments = ["#", "RET", "ESC"];

// User guidance keywords with no arguments
const guidance_noargs = [
  "APEIN",
  "APAUS",
  "HFEIN",
  "HFAUS",
  "MEIN",
  "MAUS",
  "SEIN",
  "SAUS",
  "SZEIN",
  "SZAUS",
  "UDA",
  "UDE",
  "WAUS",
  "WEIN",
  "ZAE",
  "ZAA",
];

const function_definition = ["CALL", "MAKRO", "POPUP"];

const arithmetic_functions = [
  "ABS",
  "ACOS",
  "AINT",
  "ARC",
  "ASC",
  "ASIN",
  "ATAN",
  "COS",
  "COSH",
  "EXP",
  "GRD",
  "LEN",
  "LOG",
  "LOG10",
  "NINT",
  "SIG",
  "SIN",
  "SINH",
  "SQR",
  "SQRT",
  "TAN",
  "TANH",
  "VAL",
];

module.exports = grammar({
  name: "hicad",

  extras: ($) => [/[\s,\n, \r]/, $.comment],

  rules: {
    source_file: ($) => $._macro_definition,

    // THE "HNEXT" is questionable if we shouldn't remove those.
    // Probably its due to a version detection thing in HiCAD
    _macro_definition: ($) =>
      seq(
        "START",
        "59",
        optional("HNEXT"),
        repeat($._macro_body),
        optional($.jump_to),
        "END"
      ),

    _macro_body: ($) =>
      // Any line can start with the jump_to label for the GOTO statement
      seq(
        optional($.jump_to),
        choice(
          prec(PREC.parenthesized, $.parenthesis),
          $.expression,
          $.condition,
          $.loop,
          $.input,
          $.file_open
          // $.jump, There is no jump without a condition because that will always generate dead code
          // There is one exception if after a single line of GOTO 99 there follows immediatly another 91: jump_to
          // honestly don't do that!
        )
      ),

    expression: ($) =>
      choice(
        $.definition,
        $.echo,
        $.wait,
        $.warte,
        $.guidance_noargs,
        $.menu,
        $.logic_operation,
        $.function
      ),

    guidance_noargs: ($) => choice(...guidance_noargs),

    parenthesis: ($) => seq(/\(/, $.echo, /\)/),
    // TODO: There is much more possible in ECHO because it specifies what is in a popup window.
    echo: ($) => seq("ECHO", $.char_literal),

    // Somehow WAIT $Foo gives an error because TS is taking the space as char_literal
    wait: ($) => seq("WAIT", choice(seq(" ", $.num_variable),
                                    seq(" ", $.char_variable),
                                    seq(" ", $.char_literal))),
    warte: ($) => seq("WARTE", $.int),

    // "INT", currently no idea what its doing TODO

    definition: ($) =>
      choice($.num_definition, $.char_definition, $.assignment),

    num_definition: ($) =>
      seq($.num_variable, choice(...assignment_operator), $.arithmetic),

    char_definition: ($) =>
      seq($.char_variable, choice(...assignment_operator), $.char_value),

    // TODO VAI, VAR, PFD and DEL take a optional Benutzerführungstext, but actually not all of them
    assignment: ($) =>
      choice(
        seq("VAI", $.num_variable, optional(/.*/)),
        seq(
          "VAR",
          choice(
            $.num_variable,
            $.char_variable,
            $.point_literal,
            $.line_literal
          ),
          optional(/.*/)
        ),
        seq("PFD", choice($.char_variable, $.path_indicator, $.file_extension)),
        seq("DEL", choice($.char_variable, $.num_variable))
      ),

    arithmetic: ($) =>
      choice(
        $.binary_operator,
        $.parenthesized_expression,
        $.num_value,
        $.num_variable,
        $.general_variable,
        $._sys_variable,
        $.arithmetic_function
      ),

    arithmetic_function: ($) =>
      seq(choice(...arithmetic_functions), "(", $.arithmetic, ")"),

    // First letter a %, followed by a letter, followed by either a letter or digit
    // The whole thing limited to 31 characters. Allowing underscores.
    num_variable: ($) =>
      seq( $.num_var_sign,  $.num_var_name),
    num_var_sign: ($) => /%/,
    num_var_name: ($) => /([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/,

    // For supporting VAR=VAR comparisons a silly exception in the language
    general_variable: ($) => /([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/,

    num_value: ($) => choice($.real, $.int),

    real: ($) => /[+-]?([0-9]*[.])?[0-9]+/,

    // From 0-99 mainly for the WAIT keyword
    int: ($) => /([0-9]|[1-9][0-9])/,

    char_variable: ($) =>
      seq( $.char_var_sign, $.char_var_name,
      optional(
        seq(
          "(",
          choice($.num_value, $.num_variable, $.num_sys_var),
          ":",
          choice($.num_value, $.num_variable, $.num_sys_var),
          ")"
        )
      )
    ),
    char_var_sign:($) => /\$/,
    char_var_name: ($) => /([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/,

    char_value: ($) =>
      choice(
        $.char_literal,
        $.quoted_char,
        $.arithmetic,
        $.concat_arithmetic,
        $.char_variable,
        $.windows_path
      ),

    quoted_char: ($) => seq('"', $.char_literal, '"'),

    // Accepting german Umlaut here, but not too many ascii characters
    char_literal: ($) => /([ -!#&-?A-~äöü°]){1,60}/,
    windows_path: ($) => 
          choice(
            // Either a "C:\FOO" or a \\GDCHSXX\FOO\BLA.txt
            seq((/[A-Z]:\\/), (/[A-Za-z0-9_\.\\]{1,256}/), 
                (/\\{2}/), (/[A-Za-z0-9_\.\\]{1,256}/))
          ),

    // For concatenating variables.
    concat_arithmetic: ($) =>
      seq(
        choice($.quoted_char, $.char_variable),
        repeat1(seq("+", $.char_variable))
      ),

    // TODO: Supporting parenthesis

    binary_operator: ($) => {
      const arithmetic_operators = [
        [prec.left, "+", PREC.plus],
        [prec.left, "-", PREC.plus],
        [prec.left, "/", PREC.times],
        [prec.left, "*", PREC.times],
        [prec.left, "^", PREC.power],
      ];
      return choice(
        ...arithmetic_operators.map(([fn, operator, precedence]) =>
          fn(
            precedence,
            seq(
              field("left", $.arithmetic),
              field("operator", operator),
              field("right", $.arithmetic)
            )
          )
        )
      );
    },

    parenthesized_expression: ($) =>
      prec(PREC.parenthesized, seq("(", $.arithmetic, ")")),

    // TODO Support 2d/Freiform Variablen
    _sys_variable: ($) => choice($.num_sys_var, $.char_sys_var),
    num_sys_var: ($) => /@([A-Z]|[a-z]|[0-9]){1,3}/,
    char_sys_var: ($) => /\$@([A-Z]|[a-z]|[0-9]){1,3}/,

    // TODO Limit the number of IF statement nesting to some number, maybe 6
    condition: ($) =>
      seq(
        "IF",
        $.logical_expression,
        choice($.jump, seq("THEN", $.condition_alt))
      ),

    loop: ($) => choice($.for_loop, $.while_loop, $.repeat_loop),

    for_loop: ($) =>
      seq(
        "FOR",
        $.definition,
        "TO",
        choice($.num_value, $.general_variable),
        $._macro_body,
        "NEXT",
        $.general_variable
      ),

    while_loop: ($) =>
      seq("WHILE", $.logical_expression, $._macro_body, "WHEND"),

    repeat_loop: ($) =>
      seq("REPEAT", $.logical_expression, $._macro_body, "UNTIL"),

    logical_expression: ($) =>
      seq(optional("NOT"), choice($.comparison, $._concat_comparison)),

    // These have to match, so either char or num variable and value
    comparison: ($) =>
      choice($.num_comparison, $.char_comparison, choice(...logical_variable)),

    _concat_comparison: ($) =>
      seq($.comparison, choice(...logical_operators), $.comparison),

    num_comparison: ($) =>
      prec(
        PREC.arithmetic,
        seq($.arithmetic, $.comparative_operator, $.arithmetic)
      ),

    char_comparison: ($) =>
      prec(
        PREC.char,
        seq(
          choice($.char_variable, $.char_sys_var),
          $.comparative_operator,
          choice($.quoted_char, $.char_variable, $.char_sys_var)
        )
      ),

    comparative_operator: ($) => choice(...comparative_operators),

    // This supports either a IF..THEN, a IF..THEN..ELSE, or a IF..THEN..GOTO..IFEND
    // (Where between GOTO and IFEND would be dead code)
    condition_alt: ($) =>
      choice(
        seq($.condition_block, "IFEND"),
        $.condition_alt_case,
        $.condition_jump
      ),

    // A nested IF block with only one ELSE is ambiguous, we assume that the ELSE belongs to the
    // last called IF.
    condition_alt_case: ($) =>
      seq(
        $.condition_block,
        "ELSE",
        choice(seq($.condition_block, "IFEND"), $.condition_jump)
      ),

    condition_jump: ($) =>
      seq(optional($.condition_block), $.jump_invocation, "IFEND", $.jump_body),

    // TODO this is different than a macro_body because we assume,
    // that not "everything" can be done in a condition

    condition_block: ($) =>
      repeat1(choice($.expression, $.condition, $.input, $.jump_to, $.file_open)),

    // TODO, there is more than just numbers here, they are limited, and what follows as well.
    //Also we want the whole OPTION Menu hunk as one entity between.
    menu: ($) =>
      seq(
        "OPTION",
        choice(
          seq(
            /([1-9]|[12][0-9]|3[0])/,
            /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-1][0-9]|22[0-5])/
          ),
          "ESC"
        )
      ),

    input: ($) => choice($.scal_input, $.geo_input),
    scal_input: ($) => seq(choice(...scalar_input), $.general_value),
    geo_input: ($) => seq(choice(...geometric_input), $.general_value),
    // TODO there is not everything possible here, but we leave it for now
    general_value: ($) => /.*/,

    // File Procedure stuff
    file_open: ($) => seq("OPEN", $.hc_path, $.file_operation,
                          optional(choice(
                                   $.expression,
                                   $.condition,
                                   $.loop,
                                   $.input)),
                          "CLOSE"),
    file_operation: ($) => repeat1(choice($.file_write, $.file_read)),
     
    file_write: ($) => seq("OUTPUT", choice($.char_variable, $.num_variable)),
    file_read: ($) => seq("INPUT", choice($.char_variable, $.num_variable)),

    file_copy: ($) => seq("COPY", choice($.char_value, $.char_variable), choice($.char_value, $.char_variable)),
    mkdir: ($) => seq("MKDIR", choice($.char_value, $.char_variable)),

    // From Filegrup.dat all path descriptors
    hc_path: ($) => seq(optional($.path_indicator), $.filename),
    path_indicator: ($) => /([A-Z]|[0-9]|#):/,

    // The documentation says the whole path can't be longer than 60, so we limit this here to 40 for now
    filename: ($) => /([A-Z]|[0-9]|_){1,40}/,
    file_extension: ($) => /&:\.SZA/,

    // CALL submacro Stuff
    function: ($) =>
      seq(choice(...function_definition), choice($.char_variable, $.hc_path)),

    // The GOTO is obviously highly opiniated.
    // We only want to support GOTO statements, that are linear, so no "up" jumps to make a loop.
    // Nor should there be multiple jumps to the same place.
    // With treesitter we can not test how the jump is nested, so we have to assume that it is nested
    // in a natural form. No inbetween jumps should be used.
    // Like this we can safely use the GOTO as an escape from a condition. Which always should be fine.
    // Supporting the GOTO jump. After the jump_to must be something, can't be empty
    jump: ($) => seq($.jump_invocation, $.jump_body),

    jump_invocation: ($) => seq("GOTO", $.label),

    // The final IFEND is probably only one of many possible endings that are missing.
    // The only thing we know is, it can't be empty
    jump_body: ($) =>
      seq(optional($.goto_block), $.jump_to, choice($._macro_body, "IFEND")),

    label: ($) => /([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])/,

    goto_block: ($) =>
      repeat1(choice($.expression, $.condition, $.loop, $.input)),

    jump_to: ($) => seq($.label, ":"),

    // SUPPORTING WERT, which tests a variable and sets the VORHD global variable
    logic_operation: ($) =>
      seq("WERT", choice($.num_variable, $.char_variable)),

    // The decimal
    point: ($) =>
      seq(
        "POINT",
        choice(
          "#",
          "ESC",
          seq(
            choice("A", "K", "R", "N", $.point_literal, $.line_literal),
            optional($.arithmetic),
            optional($.arithmetic)
          )
        )
      ),
    point_literal: ($) => /P[0-9]/,
    line_literal: ($) => /L[0-9]/,

    // basically it wouldn't be  case sensitive, but this is a opiniated grammar to find such things.
    // TODO This would belong to a linter or formatter.
    comment: ($) => token(seq(choice("REM", "rem"), /.*/)),

    // Not more than 8 digits before and after the "."
    // decimal: $ => /0*(?:[1-9][0-9]{0,8}|(?![0-9.]{8})(?:0\.[0-9]*[1-9][0-9]*|[1-9][0-9]*\.[0-9]+))/,
    decimal: ($) => /\d+\.?\d*/,
  },
});
