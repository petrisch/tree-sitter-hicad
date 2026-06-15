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

// Higher value is higher priority
const PREC = {
  general: 1,
  char: 2,
  definition: 3,
  parenthesized: 4,
  quoted: 5,
  plus: 6,
  times: 7,
  power: 8,
  arithmetic: 9,
  file: 10,
  sys: 11,
  flow: 12,
  jump: 13,
  keyword: 14,
  echo: 15,
  comment: 30,
  echo_text: 31,
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

const geometric_input = [distanz, winkel];

const lastlinedelete = kw("LLL");
const lastlinediscard = kw("LLA");

const point_args = [lastlinedelete, lastlinediscard];

const free_kw = kw("#");
const ret_kw = kw("RET");
const esc_kw = kw("ESC");

const flow_arguments = [free_kw, ret_kw, esc_kw];

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

// Type conversion special case
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

const start_kw = kw("START");
const end_kw = kw("END");
const hnext_kw = kw("HNEXT");

module.exports = grammar({
  name: "hicad",

  extras: ($) => [/\s+/, $.comment],

  rules: {
    source_file: ($) => repeat($._top_item),

    // THE "HNEXT" is questionable if we shouldn't remove those.
    // Probably its due to a version detection thing in HiCAD
    _top_item: ($) => choice($.start_marker, $.end_marker, $._macro_body),

    start_marker: ($) => seq(start_kw, /59/, optional(hnext_kw)),

    end_marker: ($) => seq(optional($.jump_to), end_kw),

    _macro_body: ($) =>
      choice(
        // label-only line
        seq($.jump_to, $._eol),

        // normal statement line
        seq(
          optional($.jump_to),
          choice(
            prec(PREC.parenthesized, $.parenthesis),
            $.expression,
            $.loop,
            $.input,
            $.file_operation,
            // A jump without condition is only possible if the jump goes upwards. Hence creating a loop.
            // which should be avoided, but is valid. Also GOTO 99 with immediat 99: would be valid too.
            // otherwise its dead code
            $.jump,
          ),
        ),

        // inline IF already contains its own _eol
        $.condition,
      ),

    _eol: ($) => /\r?\n/,

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

    parenthesis: ($) => seq("(", repeat($._macro_body), ")"),

    // TODO: There is much more possible in ECHO because it specifies what is in a popup window.
    echo: ($) => seq(echo_kw, token(prec(PREC.echo_text, /[^\n\r]+/))),

    wait: ($) =>
      seq(
        wait_kw,
        choice(
          $.num_variable,
          $.char_variable,
          token(prec(PREC.echo, /[^\n\r]+/)),
        ),
      ),

    warte: ($) => seq(warte_kw, $.int),

    definition: ($) =>
      choice($.num_definition, $.char_definition, $.assignment),

    num_definition: ($) =>
      seq($.num_variable, choice(...assignment_operator), $.arithmetic),

    char_definition: ($) =>
      // prec(
      //   PREC.definition,
      seq(
        $.char_variable,
        choice(...assignment_operator),
        choice($.free_text, $.char_literal, $.char_value),
      ),

    free_text: ($) => token(prec(PREC.general, /[^\n\r]+/)),

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
        $.unary_operator,
        $.parenthesized_expression,
        $.num_value,
        $.num_variable,
        $.num_sys_var,
        $.arithmetic_function,
        $.val_function,
        $.general_variable,
      ),

    unary_operator: ($) =>
      prec.right(
        PREC.power,
        seq(
          field("operator", choice("-", "+")),
          field("operand", $.arithmetic),
        ),
      ),

    arithmetic_func: ($) => choice(...arithmetic_functions),
    arithmetic_function: ($) =>
      prec(PREC.arithmetic, seq($.arithmetic_func, "(", $.arithmetic, ")")),

    val_function: ($) =>
      seq(
        val,
        "(",
        choice($.char_variable, $.char_sys_var, $.quoted_char),
        ")",
      ),

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
      prec.right(
        PREC.char,
        seq($.char_var_sign, $.identifier, optional($.char_operand)),
      ),

    char_operand: ($) =>
      seq(
        "(",
        choice($.num_value, $.num_variable, $.num_sys_var),
        ":",
        choice($.num_value, $.num_variable, $.num_sys_var),
        ")",
      ),

    char_var_sign: ($) => "$",

    identifier: ($) => token(/[A-Za-z][A-Za-z0-9_-]*/),

    // char_arg: ($) => choice($.char_variable, $.char_value),

    char_value: ($) =>
      choice(
        $.windows_path,
        $.quoted_char,
        $.concat_char,
        $.char_variable,
        $.char_sys_var,
      ),

    quoted_char: ($) => seq('"', $.char_literal, '"'),

    // Accepting german Umlaut and french signs here,
    // Exept $ or % would indicate a variable
    char_literal: ($) => token(/[^$%\s"()]+/),

    windows_path: ($) => choice($.unc_path, $.local_path),

    // Either a "C:\FOO" or a \\GDCHSXX\FOO\BLA.txt
    unc_path: ($) => seq(/\\\\[A-Za-z0-9_.]+\\/, /[A-Za-z0-9_.\\]{1,256}/),

    local_path: ($) => seq(/[A-Z]:\\/, /[A-Za-z0-9_.\\]{1,256}/),

    // For concatenating variables.
    concat_char: ($) =>
      seq(
        choice($.quoted_char, $.char_variable, $.char_sys_var),
        repeat1(
          seq("+", choice($.char_variable, $.char_sys_var, $.quoted_char)),
        ),
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

    // TODO Support 2d/Freiform Variablen, otherwise unused now
    _sys_variable: ($) => prec(PREC.sys, choice($.num_sys_var, $.char_sys_var)),
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

    condition: ($) =>
      prec(
        PREC.flow,
        choice(
          // inline IF
          seq($.if_kw, $.logical_expression, prec(PREC.jump, $.jump), $._eol),

          // block IF
          seq($.if_kw, $.logical_expression, $.then_kw, $.condition_alt),
        ),
      ),

    loop: ($) =>
      prec(PREC.flow, choice($.for_loop, $.while_loop, $.repeat_loop)),

    for_loop: ($) =>
      seq(
        $.for_kw,
        $.definition,
        $.to_kw,
        choice($.num_value, $.general_variable),
        repeat($._macro_body),
        $.next_kw,
        $.general_variable,
      ),

    while_loop: ($) =>
      seq($.while_kw, $.logical_expression, repeat($._macro_body), $.whend_kw),

    repeat_loop: ($) =>
      seq($.repeat_kw, $.logical_expression, repeat($._macro_body), $.until_kw),

    negation: ($) => not_kw,

    logical_expression: ($) =>
      prec.left(
        seq(
          optional($.negation),
          $.comparison,
          repeat(seq($.logical_op, $.comparison)),
        ),
      ),

    logical_var: ($) => choice(...logical_variable),

    flow_args: ($) => choice(...flow_arguments),

    // These have to match, so either char or num variable and value
    comparison: ($) =>
      prec(
        PREC.flow,
        choice($.num_comparison, $.char_comparison, $.logical_var, $.flow_args),
      ),

    logical_op: ($) => choice(...logical_operators),

    // _concat_comparison: ($) => seq($.comparison, $.logical_op, $.comparison),

    num_comparison: ($) =>
      prec(
        PREC.arithmetic,
        seq($.arithmetic, $.comparative_operator, $.arithmetic),
      ),

    // IF $@A3="test" THEN
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

    // This supports a IF..THEN..IFEND, a IF..THEN..ELSE..IFEND or any of those
    // with an (optionally empty) body. The body may also contain GOTO jumps.
    condition_alt: ($) =>
      choice(
        seq(optional($.condition_block), $.ifend_kw),
        $.condition_alt_case,
      ),

    // A nested IF block with only one ELSE is ambiguous, we assume that the ELSE belongs to the
    // last called IF.
    condition_alt_case: ($) =>
      seq(
        optional($.condition_block),
        $.else_kw,
        optional($.condition_block),
        $.ifend_kw,
      ),

    condition_block: ($) =>
      repeat1(
        choice(
          prec(PREC.parenthesized, $.parenthesis),
          $.expression,
          $.condition,
          $.loop,
          $.input,
          $.jump,
          $.jump_to,
          $.file_operation,
        ),
      ),

    // TODO, there is more than just numbers here, they are limited, and what follows as well.
    //Also we want the whole OPTION Menu hunk as one entity between.
    menu: ($) => seq(option_kw, choice(seq($.menu_index, $.menu_code), esc_kw)),

    menu_index: ($) => /([1-9]|[12][0-9]|3[0])/,

    menu_code: ($) => /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-1][0-9]|22[0-5])/,

    input: ($) => choice($.scal_input, $.geo_input, $.point),

    scalar_in: ($) => choice(...scalar_input),
    scal_input: ($) => seq($.scalar_in, $.scal_value),
    scal_value: ($) =>
      choice(
        $.flow_args,
        $.char_value,
        $.char_literal,
        $.num_variable,
        $.text_value,
      ),

    // A forgiving fallback for unquoted free-text values (e.g. menu prompts
    // for STRING that contain spaces, "%", commas or accented characters).
    // It must not start with a sigil ("$"/"%"), a quote, "#" or whitespace so
    // that variables, quoted strings, the "#" marker and flow keywords keep
    // their dedicated interpretation; the higher token precedence lets it win
    // over `char_literal` when the value spans more than a single word.
    text_value: ($) => token(prec(PREC.char, /[^\s"$%#][^\n\r]*/)),

    geometric_in: ($) => choice(...geometric_input),

    // POINT punktoption / # / ESC / END/ LLL / LLA
    // point_args

    geo_input: ($) =>
      seq($.geometric_in, choice(...point_args, $.numeric_expression)),

    numeric_expression: ($) =>
      choice(
        $.num_value,
        $.num_variable,
        $.num_sys_var,
        $.general_variable,
        $.numeric_binary,
        $.numeric_unary,
        $.numeric_parenthesized,
      ),

    numeric_binary: ($) =>
      prec.left(
        PREC.plus,
        seq(
          $.numeric_expression,
          choice("+", "-", "*", "/", "^"),
          $.numeric_expression,
        ),
      ),

    numeric_unary: ($) =>
      prec.right(PREC.power, seq(choice("-", "+"), $.numeric_expression)),

    numeric_parenthesized: ($) =>
      prec(PREC.parenthesized, seq("(", $.numeric_expression, ")")),

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
    filename: ($) => /([A-Za-z]|[0-9]|_|-){1,40}/,
    file_extension: ($) => /&:\.SZA/,

    // CALL submacro Stuff
    function_c: ($) => choice(...function_call),
    function: ($) => seq($.function_c, choice($.char_variable, $.hc_path)),

    // A simple GOTO jump to a numeric label. The target label (`<num>:`) can
    // appear anywhere in the macro (it is matched as the optional `jump_to`
    // prefix of a macro body), so the jump itself is self contained.
    jump: ($) => seq(goto_kw, $.label),

    label: ($) => /[0-9]{1,6}/,

    jump_to: ($) => seq($.label, ":"),

    // SUPPORTING WERT, which tests a variable and sets the VORHD global variable
    logic_operation: ($) =>
      seq(wert_kw, choice($.num_variable, $.char_variable)),

    // The POINT command takes a point option (a single letter code such as
    // A/K/R/N, a logical keyword like INT, a point/line reference like P0/L0,
    // the free/escape markers) followed by an arbitrary number of numeric
    // arguments. Kept deliberately forgiving.
    point: ($) =>
      prec.right(
        seq(
          point_kw,
          choice(
            free_kw,
            esc_kw,
            seq(
              optional($.point_option),
              choice(
                $.point_literal,
                $.line_literal,
                $.logical_var,
                $.numeric_expression,
              ),
              repeat($.numeric_expression),
            ),
          ),
        ),
      ),
    point_option: ($) => choice("A", "K", "R", "N"),
    point_literal: ($) => /P[0-9]/,
    line_literal: ($) => /L[0-9]/,

    // basically it wouldn't be  case sensitive, but this is a opiniated grammar to find such things.
    // TODO This would belong to a linter or formatter.
    comment: ($) => token(prec(PREC.comment, /REM.*/i)),

    // Not more than 8 digits before and after the "."
    // decimal: $ => /0*(?:[1-9][0-9]{0,8}|(?![0-9.]{8})(?:0\.[0-9]*[1-9][0-9]*|[1-9][0-9]*\.[0-9]+))/,
    decimal: ($) => /\d+\.?\d*/,
  },
});
