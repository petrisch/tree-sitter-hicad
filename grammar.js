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
  flow: 9,
  arithmetic: 10,
  file: 11,
  sys: 12,
  jump: 13,
  keyword: 14,
  echo: 15,
  menu: 16,
  comment: 30,
  echo_text: 31,
};

/** @param {string} word */
const kw = (word) => token(prec(PREC.keyword, ci(word)));

const comparative_operators = ["=", ">", "<", "<>", "<=", ">="];

const and = kw("AND");
const or = kw("OR");

const logical_operators = [and, or];

// Logical variables / flags
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

const lastlinedelete = kw("LLL");
const lastlinediscard = kw("LLA");

const point_args = [lastlinedelete, lastlinediscard];

const free_kw = kw("#");
const ret_kw = kw("RET");
const esc_kw = kw("ESC");

const flow_arguments = [free_kw, ret_kw, esc_kw];

const zei_kw = kw("ZEI");

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

const vai_kw = kw("VAI");
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
const distance_kw = kw("DISTANZ");
const angle_kw = kw("WINKEL");

const start_kw = kw("START");
const end_kw = kw("END");
const hnext_kw = kw("HNEXT");

module.exports = grammar({
  name: "hicad",

  extras: ($) => [/\s+/, $.comment],

  rules: {
    source_file: ($) => repeat($._top_item),

    _top_item: ($) => choice($.start_marker, $.end_marker, $._macro_body),

    start_marker: ($) => seq(start_kw, /59/, optional(hnext_kw)),

    end_marker: ($) => seq(optional($.jump_to), end_kw),

    _macro_body: ($) =>
      choice(
        // Label-only line
        seq($.jump_to, $._eol),

        // Normal statement line
        seq(
          optional($.jump_to),
          choice(
            prec(PREC.parenthesized, $.parenthesis),
            $.expression,
            $.loop,
            $.input,
            $.file_operation,
            $.jump,
            $.esc_statement,
          ),
          optional($._eol),
        ),

        // IF handles its own structure.
        $.condition,
      ),

    _eol: ($) => /\r?\n/,
    esc_statement: ($) => esc_kw,

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

    echo: ($) => seq($.echo_kw, token(prec(PREC.echo_text, /[^\n\r]+/))),
    echo_kw: ($) => echo_kw,

    wait: ($) =>
      seq(
        $.wait_kw,
        choice(
          $.num_variable,
          $.char_variable,
          token(prec(PREC.echo, /[^\n\r]+/)),
        ),
      ),

    wait_kw: ($) => wait_kw,

    warte: ($) => seq($.warte_kw, $.int),

    warte_kw: ($) => warte_kw,

    definition: ($) =>
      choice($.num_definition, $.char_definition, $.assignment),

    num_definition: ($) =>
      seq($.num_variable, choice(...assignment_operator), $.arithmetic),

    char_definition: ($) =>
      seq(
        $.char_variable,
        choice(...assignment_operator),
        choice($.free_text, $.char_literal, $.char_value),
      ),

    free_text: ($) => token(prec(PREC.general, /[^\n\r]+/)),

    assignment: ($) =>
      choice(
        seq($.vai_kw, $.num_variable, optional(/.*/)),
        seq(
          $.var_kw,
          choice(
            $.num_variable,
            $.char_variable,
            $.point_literal,
            $.line_literal,
          ),
          optional(/.*/),
        ),
        seq(
          $.pfd_kw,
          choice($.char_variable, $.path_indicator, $.file_extension),
        ),
        seq($.del_kw, choice($.char_variable, $.num_variable)),
      ),

    vai_kw: ($) => vai_kw,
    var_kw: ($) => var_kw,
    pfd_kw: ($) => pfd,
    del_kw: ($) => del,

    wert_kw: ($) => wert_kw,

    arithmetic: ($) =>
      choice(
        $.binary_operator,
        $.unary_operator,
        $.parenthesized_expression,
        $.arithmetic_function,
        $.num_value,
        $.num_variable,
        $.num_sys_var,
        $.val_function,
        $.len_function,
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

    arithmetic_func: ($) =>
      token(prec(PREC.keyword, choice(...arithmetic_functions))),

    arithmetic_function: ($) =>
      prec(PREC.arithmetic, seq($.arithmetic_func, "(", $.arithmetic, ")")),

    // VAL is intentionally special: char -> numeric conversion.
    val_function: ($) =>
      seq(
        val,
        "(",
        choice($.char_variable, $.char_sys_var, $.quoted_char),
        ")",
      ),

    // LEN takes a string and returns a int, special case
    len_function: ($) =>
      seq(
        len,
        "(",
        choice($.char_variable, $.char_sys_var, $.quoted_char, $.concat_char),
        ")",
      ),

    num_variable: ($) => seq($.num_var_sign, $.num_var_name),

    num_var_sign: ($) => /%/,

    num_var_name: ($) => token(/([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/),

    general_variable: ($) =>
      token(prec(PREC.general, /([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|_){0,29}/)),

    num_value: ($) => choice($.real, $.int),

    real: ($) => /[+-]?([0-9]*[.])?[0-9]+/,

    int: ($) => token(/([0-9]|[1-9][0-9])/),

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

    char_value: ($) =>
      choice(
        $.windows_path,
        $.quoted_char,
        $.concat_char,
        $.char_variable,
        $.char_sys_var,
      ),

    quoted_char: ($) =>
      seq('"', optional($._quoted_char_content), token.immediate('"')),

    _quoted_char_content: ($) => token.immediate(/[^"\n\r]+/),

    char_literal: ($) => token(/[^$%\s"()]+/),

    windows_path: ($) => choice($.unc_path, $.local_path),

    // Allows hyphens in host/path parts.
    unc_path: ($) => seq(/\\\\[A-Za-z0-9_.-]+\\/, /[A-Za-z0-9_.\\-]{1,256}/),

    local_path: ($) => seq(/[A-Z]:\\/, /[A-Za-z0-9_.\\-]{1,256}/),

    concat_char: ($) =>
      seq(
        choice($.quoted_char, $.char_variable, $.char_sys_var),
        repeat1(
          seq("+", choice($.char_variable, $.char_sys_var, $.quoted_char)),
        ),
      ),

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

    _sys_variable: ($) => prec(PREC.sys, choice($.num_sys_var, $.char_sys_var)),

    num_sys_var: ($) => /@([A-Z]|[a-z]|[0-9]){1,3}/,

    char_sys_var: ($) => /\$@([A-Z]|[a-z]|[0-9]){1,3}/,

    if_kw: ($) => if_kw,
    then_kw: ($) => then_kw,
    else_kw: ($) => else_kw,
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
          // Inline IF: IF <cond> GOTO <label>
          seq(
            $.if_kw,
            $.logical_expression,
            prec(PREC.jump, $.jump),
            optional($._eol),
          ),

          // Block IF: IF <cond> THEN ... IFEND
          seq($.if_kw, $.logical_expression, $.then_kw, $.condition_alt),
        ),
      ),

    condition_alt: ($) =>
      choice(
        seq(optional($.condition_block), $.ifend_kw),
        $.condition_alt_case,
      ),

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

    loop: ($) =>
      prec(PREC.flow, choice($.for_loop, $.while_loop, $.repeat_loop)),

    for_header: ($) =>
      seq(
        $.for_kw,
        field("variable", $.num_variable),
        choice(...assignment_operator),
        field("from", $.arithmetic),
        $.to_kw,
        field("to", $.arithmetic),
      ),

    for_end: ($) =>
      seq(
        $.next_kw,
        field("next_variable", choice($.general_variable, $.num_variable)),
      ),

    for_loop: ($) =>
      prec(PREC.flow, seq($.for_header, repeat($._macro_body), $.for_end)),

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

    comparison: ($) =>
      prec(
        PREC.flow,
        choice($.num_comparison, $.char_comparison, $.logical_var, $.flow_args),
      ),

    logical_op: ($) => choice(...logical_operators),

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

    // Conservative OPTION handling:
    // OPTION is treated as a simple command, not an implicit block.
    menu: ($) =>
      prec(
        PREC.menu,
        seq($.option_kw, choice(seq($.menu_index, $.menu_code), esc_kw)),
      ),

    option_kw: ($) => option_kw,

    menu_index: ($) => /([1-9]|[12][0-9]|3[0])/,

    menu_code: ($) => /[0-9]{1,3}/,

    input: ($) => choice($.scal_input, $.point, $.distance, $.angle),

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

    text_value: ($) => token(prec(PREC.char, /[^\s"$%#][^\n\r]*/)),

    file_operation: ($) => choice($.file_open, $.file_copy, $.mkdir),

    file_open: ($) =>
      seq(
        $.open_kw,
        $.hc_path,
        $.file_read_write,
        optional(choice($.expression, $.condition, $.loop, $.input)),
        $.close_kw,
      ),

    open_kw: ($) => open_kw,
    close_kw: ($) => close_kw,

    file_read_write: ($) => repeat1(choice($.file_write, $.file_read)),

    file_write: ($) =>
      seq($.output_kw, choice($.char_variable, $.num_variable)),
    output_kw: ($) => output_kw,

    file_read: ($) => seq($.input_kw, choice($.char_variable, $.num_variable)),
    input_kw: ($) => input_kw,

    file_copy: ($) =>
      prec(
        PREC.file,
        seq(
          $.copy_kw,
          choice($.char_variable, $.windows_path),
          choice($.char_variable, $.windows_path),
        ),
      ),
    copy_kw: ($) => copy_kw,

    mkdir: ($) =>
      prec(PREC.file, seq($.mkdir_kw, choice($.char_variable, $.windows_path))),
    mkdir_kw: ($) => mkdir_kw,

    hc_path: ($) => seq(optional($.path_indicator), $.filename),

    path_indicator: ($) => /([A-Z]|[0-9]|#):/,

    filename: ($) => /([A-Za-z]|[0-9]|_|-){1,40}/,

    file_extension: ($) => /&:\.SZA/,

    function_c: ($) => choice(...function_call),

    function: ($) => seq($.function_c, choice($.char_variable, $.hc_path)),

    jump: ($) => seq($.goto_kw, $.label),
    goto_kw: ($) => goto_kw,

    label: ($) => /[0-9]{1,6}/,

    jump_to: ($) => seq($.label, ":"),

    logic_operation: ($) =>
      seq($.wert_kw, choice($.num_variable, $.char_variable)),

    point: ($) =>
      prec.right(
        seq(
          $.point_kw,
          choice(
            free_kw,
            esc_kw,
            ...point_args,

            seq($.point_option, optional($.arithmetic), optional($.arithmetic)),

            seq(
              choice(
                $.point_literal,
                $.line_literal,
                $.logical_var,
                $.arithmetic,
              ),
              optional($.arithmetic),
              optional($.arithmetic),
            ),
          ),
        ),
      ),

    point_kw: ($) => point_kw,

    point_option: ($) => choice("A", "K", "R", "N"),

    point_literal: ($) => /P[0-9]/,

    line_literal: ($) => /L[0-9]/,

    distance: ($) =>
      prec.right(seq($.distance_kw, choice($.flow_args, zei_kw, $.arithmetic))),

    distance_kw: ($) => distance_kw,

    angle: ($) =>
      prec.right(seq($.angle_kw, choice($.flow_args, zei_kw, $.arithmetic))),

    angle_kw: ($) => angle_kw,

    comment: ($) => token(prec(PREC.comment, /REM.*/i)),

    decimal: ($) => /\d+\.?\d*/,
  },
});
