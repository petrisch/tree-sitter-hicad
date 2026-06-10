// Version HiCAD 2020
// - Neuer Befehl ab 2022 "ASK"

const ci = (word) =>
  new RegExp(
    word
      .split("")
      .map((/** @type {string} */ c) =>
        /[a-zA-Z]/.test(c) ? `[${c.toLowerCase()}${c.toUpperCase()}]` : c,
      )
      .join(""),
  );

const PREC = {
  parenthesized: 1,
  quoted: 2,
  plus: 3,
  times: 4,
  power: 5,
  arithmetic: 6,
  file: 7,
  char: 8,
  keyword: 10,
};

/** @param {string} word */
const kw = (word) => token(prec(PREC.keyword, ci(word)));

const comparative_operators = ["=", ">", "<", "<>", "<=", ">="];

const and = kw("AND");
const or = kw("OR");

const logical_operators = [and, or];

// The VORH is not mentioned in the documentation.
// According to some power users it is valid code, so its in here.
// could be deleted if we want to be strict, because we should use VORHD instead

const three_d = kw("3D");
const bema = kw("BEMA");
const dvorhd = kw("DVORHD");
const feature = kw("FEATURE");
const fehl = kw("FEHL");
const int = kw("INT");
const isop = kw("ISOP");
const ja = kw("JA");
const nein = kw("NEIN");
const pbez = kw("PBEZ");
const pesc = kw("PESC");
const pint = kw("PINT");
const schr = kw("SCHR");
const symb = kw("SYMB");
const text = kw("TEXT");
const valid = kw("VALID");
const vorhd = kw("VORHD");
const vorh = kw("VORH");
const wahr = kw("WAHR");

const logical_variable = [
  three_d,
  bema,
  dvorhd,
  feature,
  fehl,
  int,
  isop,
  ja,
  nein,
  pbez,
  pesc,
  pint,
  schr,
  symb,
  text,
  valid,
  vorhd,
  vorh,
  wahr,
];

const assignment_operator = [":="];

const string = kw("STRING");
const real = kw("REAL");
const integer = kw("INTEGER");
const antwort = kw("ANTWORT");

const scalar_input = [string, real, integer, antwort];

const point = kw("POINT");
const distanz = kw("DISTANZ");
const winkel = kw("WINKEL");

const geometric_input = [point, distanz, winkel];

const free_kw = kw("#");
const ret_kw = kw("RET");
const esc_kw = kw("ESC");

// User guidance keywords with no arguments
const apein = kw("APEIN");
const apaus = kw("APAUS");
const hfein = kw("HFEIN");
const hfaus = kw("HFAUS");
const mein = kw("MEIN");
const maus = kw("MAUS");
const sein = kw("SEIN");
const saus = kw("SAUS");
const szein = kw("SZEIN");
const szaus = kw("SZAUS");
const uda = kw("UDA");
const ude = kw("UDE");
const waus = kw("WAUS");
const wein = kw("WEIN");
const zae = kw("ZAE");
const zaa = kw("ZAA");

const guidance_noargs = [
  apein,
  apaus,
  hfein,
  hfaus,
  mein,
  maus,
  sein,
  saus,
  szein,
  szaus,
  uda,
  ude,
  waus,
  wein,
  zae,
  zaa,
];

const call = kw("CALL");
const makro = kw("MAKRO");
const popup = kw("POPUP");

const function_call = [call, makro, popup];

const abs = kw("ABS");
const acos = kw("ACOS");
const aint = kw("AINT");
const arc = kw("ARC");
const asc = kw("ASC");
const asin = kw("ASIN");
const atan = kw("ATAN");
const cos = kw("COS");
const cosh = kw("COSH");
const exp = kw("EXP");
const grd = kw("GRD");
const len = kw("LEN");
const log = kw("LOG");
const log10 = kw("LOG10");
const nint = kw("NINT");
const sig = kw("SIG");
const sin = kw("SIN");
const sinh = kw("SINH");
const sqr = kw("SQR");
const sqrt = kw("SQRT");
const tan = kw("TAN");
const tanh = kw("TANH");
const val = kw("VAL");

const arithmetic_functions = [
  abs,
  acos,
  aint,
  arc,
  asc,
  asin,
  atan,
  cos,
  cosh,
  exp,
  grd,
  len,
  log,
  log10,
  nint,
  sig,
  sin,
  sinh,
  sqr,
  sqrt,
  tan,
  tanh,
  val,
];

const wait_kw = kw("WAIT");
const warte_kw = kw("WARTE");
const echo_kw = kw("ECHO");

const vai = kw("VAI");
const var_kw = kw("VAR");
const pfd = kw("PFD");
const del = kw("DEL");

const if_kw = kw("IF");
const then_kw = kw("THEN");
const else_kw = kw("ELSE");
const elseif_kw = kw("ELSEIF");
const ifend_kw = kw("IFEND");

const for_kw = kw("FOR");
const to_kw = kw("TO");
const next_kw = kw("NEXT");

const whend_kw = kw("WHEND");
const repeat_kw = kw("REPEAT");
const until_kw = kw("UNTIL");

const while_kw = kw("WHILE");

const not_kw = kw("NOT");

const option_kw = kw("OPTION");

const open_kw = kw("OPEN");
const close_kw = kw("CLOSE");
const output_kw = kw("OUTPUT");
const input_kw = kw("INPUT");
const copy_kw = kw("COPY");
const mkdir_kw = kw("MKDIR");

const goto_kw = kw("GOTO");
const wert_kw = kw("WERT");
const point_kw = kw("POINT");

const comment_kw = kw("REM");

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
        "END",
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
          $.file_operation,
          // $.jump, There is no jump without a condition because that will always generate dead code
          // There is one exception if after a single line of GOTO 99 there follows immediatly another 91: jump_to
          // honestly don't do that!
        ),
      ),

    expression: ($) =>
      choice(
        $.definition,
        $.echo,
        $.wait,
        $.warte,
        $.guidance_noarg,
        $.menu,
        $.logic_operation,
        $.function,
      ),

    guidance_noarg: ($) => choice(...guidance_noargs),

    parenthesis: ($) => seq(/\(/, $.echo, /\)/),
    // TODO: There is much more possible in ECHO because it specifies what is in a popup window.
    echo: ($) => seq(echo_kw, $.char_literal),

    // Somehow WAIT $Foo gives an error because TS is taking the space as char_literal
    wait: ($) =>
      seq(
        wait_kw,
        choice(
          seq(" ", $.num_variable),
          seq(" ", $.char_variable),
          seq(" ", $.char_literal),
        ),
      ),
    warte: ($) => seq(warte_kw, $.int),

    // "INT", currently no idea what its doing TODO

    definition: ($) =>
      choice($.num_definition, $.char_definition, $.assignment),

    num_definition: ($) =>
      seq($.num_variable, choice(...assignment_operator), $.arithmetic),

    char_definition: ($) =>
      seq($.char_variable, choice(...assignment_operator), $.char_arg),

    // TODO VAI, VAR, PFD and DEL take a optional Benutzerführungstext, but actually not all of them
    assignment: ($) =>
      choice(
        seq(vai, $.num_variable, optional(/.*/)),
        seq(
          var_kw,
          choice(
            $.num_variable,
            $.char_variable,
            $.point_literal,
            $.line_literal,
          ),
          optional(/.*/),
        ),
        seq(pfd, choice($.char_variable, $.path_indicator, $.file_extension)),
        seq(del, choice($.char_variable, $.num_variable)),
      ),

    arithmetic: ($) =>
      choice(
        $.binary_operator,
        $.parenthesized_expression,
        $.num_value,
        $.num_variable,
        $.general_variable,
        $._sys_variable,
        $.arithmetic_function,
      ),

    arithmetic_func: ($) => choice(...arithmetic_functions),
    arithmetic_function: ($) => seq($.arithmetic_func, "(", $.arithmetic, ")"),

    // First letter a %, followed by a letter, followed by either a letter or digit
    // The whole thing limited to 31 characters. Allowing underscores.
    num_variable: ($) => seq($.num_var_sign, $.num_var_name),
    num_var_sign: ($) => /%/,
    num_var_name: ($) => /([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/,

    // For supporting VAR=VAR comparisons a silly exception in the language
    general_variable: ($) => /([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/,

    num_value: ($) => choice($.real, $.int),

    real: ($) => /[+-]?([0-9]*[.])?[0-9]+/,

    // From 0-99 mainly for the WAIT keyword
    int: ($) => /([0-9]|[1-9][0-9])/,

    char_variable: ($) =>
      prec.left(
        PREC.char,
        seq(
          $.char_var_sign,
          $.char_var_name,
          optional(
            seq(
              "(",
              choice($.num_value, $.num_variable, $.num_sys_var),
              ":",
              choice($.num_value, $.num_variable, $.num_sys_var),
              ")",
            ),
          ),
        ),
      ),
    char_var_sign: ($) => /\$/,
    char_var_name: ($) => /([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/,

    char_arg: ($) => choice($.char_variable, $.char_value),

    char_value: ($) =>
      choice(
        $.char_literal,
        $.quoted_char,
        $.arithmetic,
        $.concat_arithmetic,
        $.windows_path,
      ),

    quoted_char: ($) => seq('"', $.char_literal, '"'),

    // Accepting german Umlaut and french signs here,
    // but not too many ascii and latin characters, since $ or % would indicate a variable
    char_literal: ($) => /([ -!#&-?A-~°à-ü]){1,60}/,

    windows_path: ($) => choice($.unc_path, $.local_path),

    // Either a "C:\FOO" or a \\GDCHSXX\FOO\BLA.txt
    unc_path: ($) => seq(/\\\\[A-Za-z0-9_.]+\\/, /[A-Za-z0-9_.\\]{1,256}/),

    local_path: ($) => seq(/[A-Z]:\\/, /[A-Za-z0-9_.\\]{1,256}/),

    // For concatenating variables.
    concat_arithmetic: ($) =>
      seq(
        choice($.quoted_char, $.char_variable),
        repeat1(seq("+", $.char_variable)),
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
              field("right", $.arithmetic),
            ),
          ),
        ),
      );
    },

    parenthesized_expression: ($) =>
      prec(PREC.parenthesized, seq("(", $.arithmetic, ")")),

    // TODO Support 2d/Freiform Variablen
    _sys_variable: ($) => choice($.num_sys_var, $.char_sys_var),
    num_sys_var: ($) => /@([A-Z]|[a-z]|[0-9]){1,3}/,
    char_sys_var: ($) => /\$@([A-Z]|[a-z]|[0-9]){1,3}/,

    if_kw: ($) => if_kw,
    then_kw: ($) => then_kw,
    else_kw: ($) => else_kw,
    elseif_kw: ($) => elseif_kw,
    ifend_kw: ($) => ifend_kw,

    for_kw: ($) => for_kw,
    to_kw: ($) => to_kw,
    next_kw: ($) => next_kw,

    whend_kw: ($) => whend_kw,
    repeat_kw: ($) => repeat_kw,
    until_kw: ($) => until_kw,

    while_kw: ($) => while_kw,

    // TODO Limit the number of IF statement nesting to some number, maybe 6
    condition: ($) =>
      seq(
        $.if_kw,
        $.logical_expression,
        choice($.jump, seq($.then_kw, $.condition_alt)),
      ),

    loop: ($) => choice($.for_loop, $.while_loop, $.repeat_loop),

    for_loop: ($) =>
      seq(
        $.for_kw,
        $.definition,
        $.to_kw,
        choice($.num_value, $.general_variable),
        $._macro_body,
        $.next_kw,
        $.general_variable,
      ),

    while_loop: ($) =>
      seq($.while_kw, $.logical_expression, $._macro_body, $.whend_kw),

    repeat_loop: ($) =>
      seq($.repeat_kw, $.logical_expression, $._macro_body, $.until_kw),

    negation: ($) => not_kw,

    logical_expression: ($) =>
      seq(optional($.negation), choice($.comparison, $._concat_comparison)),

    logical_var: ($) => choice(...logical_variable),

    // These have to match, so either char or num variable and value
    comparison: ($) =>
      choice($.num_comparison, $.char_comparison, $.logical_var),

    logical_op: ($) => choice(...logical_operators),

    _concat_comparison: ($) => seq($.comparison, $.logical_op, $.comparison),

    num_comparison: ($) =>
      prec(
        PREC.arithmetic,
        seq($.arithmetic, $.comparative_operator, $.arithmetic),
      ),

    char_comparison: ($) =>
      prec(
        PREC.char,
        seq(
          choice($.char_variable, $.char_sys_var),
          $.comparative_operator,
          choice($.quoted_char, $.char_variable, $.char_sys_var),
        ),
      ),

    comparative_operator: ($) => choice(...comparative_operators),

    // This supports either a IF..THEN, a IF..THEN..ELSE, or a IF..THEN..GOTO..IFEND
    // (Where between GOTO and IFEND would be dead code)
    condition_alt: ($) =>
      choice(
        seq($.condition_block, $.ifend_kw),
        $.condition_alt_case,
        $.condition_jump,
      ),

    // A nested IF block with only one ELSE is ambiguous, we assume that the ELSE belongs to the
    // last called IF.
    condition_alt_case: ($) =>
      seq(
        $.condition_block,
        $.else_kw,
        choice(seq($.condition_block, $.ifend_kw), $.condition_jump),
      ),

    condition_jump: ($) =>
      seq(
        optional($.condition_block),
        $.jump_invocation,
        $.ifend_kw,
        $.jump_body,
      ),

    // TODO this is different than a macro_body because we assume,
    // that not "everything" can be done in a condition

    condition_block: ($) =>
      repeat1(
        choice($.expression, $.condition, $.input, $.jump_to, $.file_operation),
      ),

    // TODO, there is more than just numbers here, they are limited, and what follows as well.
    //Also we want the whole OPTION Menu hunk as one entity between.
    menu: ($) =>
      seq(
        option_kw,
        choice(
          seq(
            /([1-9]|[12][0-9]|3[0])/,
            /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-1][0-9]|22[0-5])/,
          ),
          esc_kw,
        ),
      ),

    input: ($) => choice($.scal_input, $.geo_input),

    scalar_in: ($) => choice(...scalar_input),
    scal_input: ($) => seq($.scalar_in, $.general_value),

    geometric_in: ($) => choice(...geometric_input),
    geo_input: ($) => seq(choice($.geometric_in), $.general_value),

    // TODO there is not everything possible here, but we leave it for now
    general_value: ($) => /.*/,

    // File Procedure stuff
    file_operation: ($) => choice($.file_open, $.file_copy, $.mkdir),
    file_open: ($) =>
      seq(
        open_kw,
        $.hc_path,
        $.file_read_write,
        optional(choice($.expression, $.condition, $.loop, $.input)),
        close_kw,
      ),
    file_read_write: ($) => repeat1(choice($.file_write, $.file_read)),

    file_write: ($) => seq(output_kw, choice($.char_variable, $.num_variable)),
    file_read: ($) => seq(input_kw, choice($.char_variable, $.num_variable)),

    file_copy: ($) =>
      prec(
        PREC.file,
        seq(
          copy_kw,
          choice($.char_variable, $.windows_path),
          choice($.char_variable, $.windows_path),
        ),
      ),

    mkdir: ($) =>
      prec(PREC.file, seq(mkdir_kw, choice($.char_variable, $.windows_path))),

    // From Filegrup.dat all path descriptors
    hc_path: ($) => seq(optional($.path_indicator), $.filename),
    path_indicator: ($) => /([A-Z]|[0-9]|#):/,

    // The documentation says the whole path can't be longer than 60, so we limit this here to 40 for now
    filename: ($) => /([A-Z]|[0-9]|_){1,40}/,
    file_extension: ($) => /&:\.SZA/,

    // CALL submacro Stuff
    function_c: ($) => choice(...function_call),
    function: ($) => seq($.function_c, choice($.char_variable, $.hc_path)),

    // The GOTO is obviously highly opiniated.
    // We only want to support GOTO statements, that are linear, so no "up" jumps to make a loop.
    // Nor should there be multiple jumps to the same place.
    // With treesitter we can not test how the jump is nested, so we have to assume that it is nested
    // in a natural form. No inbetween jumps should be used.
    // Like this we can safely use the GOTO as an escape from a condition. Which always should be fine.
    // Supporting the GOTO jump. After the jump_to must be something, can't be empty
    jump: ($) => seq($.jump_invocation, $.jump_body),

    jump_invocation: ($) => seq(goto_kw, $.label),

    // The final IFEND is probably only one of many possible endings that are missing.
    // The only thing we know is, it can't be empty
    jump_body: ($) =>
      seq(optional($.goto_block), $.jump_to, choice($._macro_body, $.ifend_kw)),

    label: ($) => /([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])/,

    goto_block: ($) =>
      repeat1(choice($.expression, $.condition, $.loop, $.input)),

    jump_to: ($) => seq($.label, ":"),

    // SUPPORTING WERT, which tests a variable and sets the VORHD global variable
    logic_operation: ($) =>
      seq(wert_kw, choice($.num_variable, $.char_variable)),

    // The decimal
    point: ($) =>
      seq(
        point_kw,
        choice(
          free_kw,
          esc_kw,
          seq(
            choice("A", "K", "R", "N", $.point_literal, $.line_literal),
            optional($.arithmetic),
            optional($.arithmetic),
          ),
        ),
      ),
    point_literal: ($) => /P[0-9]/,
    line_literal: ($) => /L[0-9]/,

    // basically it wouldn't be  case sensitive, but this is a opiniated grammar to find such things.
    // TODO This would belong to a linter or formatter.
    comment: ($) => token(seq(comment_kw, /.*/)),

    // Not more than 8 digits before and after the "."
    // decimal: $ => /0*(?:[1-9][0-9]{0,8}|(?![0-9.]{8})(?:0\.[0-9]*[1-9][0-9]*|[1-9][0-9]*\.[0-9]+))/,
    decimal: ($) => /\d+\.?\d*/,
  },
});
