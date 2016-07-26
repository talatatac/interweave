'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-useless-escape */

var ALNUM_PATTERN = exports.ALNUM_PATTERN = '[a-z0-9]+';

// https://blog.codinghorror.com/the-problem-with-urls/
var URL_SCHEME_PATTERN = exports.URL_SCHEME_PATTERN = '(?:https?://)?';
var URL_DOMAIN_PATTERN = exports.URL_DOMAIN_PATTERN = '(?:www\.)?[-a-z0-9\.]*[-a-z0-9]+';
var URL_TLD_PATTERN = exports.URL_TLD_PATTERN = '\.[a-z]{2,63}';
var URL_PATTERN = exports.URL_PATTERN = '' + URL_SCHEME_PATTERN + URL_DOMAIN_PATTERN + URL_TLD_PATTERN;

// http://www.regular-expressions.info/email.html
var EMAIL_CLASS_PART = exports.EMAIL_CLASS_PART = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]';
var EMAIL_USERNAME_PATTERN = exports.EMAIL_USERNAME_PATTERN = EMAIL_CLASS_PART + '+(?:.' + EMAIL_CLASS_PART + '+)*';
var EMAIL_PATTERN = exports.EMAIL_PATTERN = EMAIL_USERNAME_PATTERN + '@' + URL_DOMAIN_PATTERN;

// Filters to apply to tags and attributes
var FILTER_ALLOW = exports.FILTER_ALLOW = 0;
var FILTER_DENY = exports.FILTER_DENY = 1;
var FILTER_PASS_THROUGH = exports.FILTER_PASS_THROUGH = 2;
var FILTER_CLEAN = exports.FILTER_CLEAN = 3;
var FILTER_CAST_NUMBER = exports.FILTER_CAST_NUMBER = 4;
var FILTER_CAST_BOOL = exports.FILTER_CAST_BOOL = 5;

// Tags not listed here will be denied
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
var TAGS = exports.TAGS = {
  a: FILTER_CLEAN,
  abbr: FILTER_ALLOW,
  acronym: FILTER_PASS_THROUGH,
  address: FILTER_ALLOW,
  applet: FILTER_DENY,
  area: FILTER_DENY,
  article: FILTER_ALLOW,
  aside: FILTER_ALLOW,
  audio: FILTER_CLEAN,
  b: FILTER_ALLOW,
  base: FILTER_DENY,
  basefont: FILTER_DENY,
  bdi: FILTER_ALLOW,
  bdo: FILTER_ALLOW,
  bgsound: FILTER_DENY,
  big: FILTER_PASS_THROUGH,
  blink: FILTER_DENY,
  blockquote: FILTER_ALLOW,
  body: FILTER_PASS_THROUGH,
  br: FILTER_ALLOW,
  button: FILTER_ALLOW,
  canvas: FILTER_DENY,
  caption: FILTER_ALLOW,
  center: FILTER_PASS_THROUGH,
  cite: FILTER_ALLOW,
  code: FILTER_ALLOW,
  col: FILTER_ALLOW,
  colgroup: FILTER_ALLOW,
  command: FILTER_DENY,
  content: FILTER_DENY,
  data: FILTER_DENY,
  datalist: FILTER_DENY,
  dd: FILTER_ALLOW,
  del: FILTER_ALLOW,
  details: FILTER_ALLOW,
  dfn: FILTER_ALLOW,
  dialog: FILTER_DENY,
  dir: FILTER_DENY,
  div: FILTER_ALLOW,
  dl: FILTER_ALLOW,
  dt: FILTER_ALLOW,
  element: FILTER_DENY,
  em: FILTER_ALLOW,
  embed: FILTER_DENY,
  fieldset: FILTER_ALLOW,
  figcaption: FILTER_ALLOW,
  figure: FILTER_ALLOW,
  font: FILTER_PASS_THROUGH,
  footer: FILTER_ALLOW,
  form: FILTER_PASS_THROUGH,
  frame: FILTER_DENY,
  frameset: FILTER_DENY,
  head: FILTER_DENY,
  header: FILTER_ALLOW,
  hgroup: FILTER_DENY,
  hr: FILTER_ALLOW,
  html: FILTER_DENY,
  i: FILTER_ALLOW,
  iframe: FILTER_DENY,
  image: FILTER_DENY,
  img: FILTER_CLEAN,
  input: FILTER_DENY,
  ins: FILTER_ALLOW,
  isindex: FILTER_DENY,
  kbd: FILTER_ALLOW,
  keygen: FILTER_DENY,
  label: FILTER_ALLOW,
  legend: FILTER_ALLOW,
  li: FILTER_ALLOW,
  link: FILTER_DENY,
  listing: FILTER_DENY,
  main: FILTER_ALLOW,
  map: FILTER_DENY,
  mark: FILTER_ALLOW,
  marquee: FILTER_DENY,
  menu: FILTER_DENY,
  menuitem: FILTER_DENY,
  meta: FILTER_DENY,
  meter: FILTER_DENY,
  multicol: FILTER_DENY,
  nav: FILTER_ALLOW,
  nobr: FILTER_DENY,
  noembed: FILTER_DENY,
  noframes: FILTER_DENY,
  noscript: FILTER_DENY,
  object: FILTER_DENY,
  ol: FILTER_ALLOW,
  optgroup: FILTER_DENY,
  option: FILTER_DENY,
  output: FILTER_ALLOW,
  p: FILTER_ALLOW,
  param: FILTER_DENY,
  picture: FILTER_CLEAN,
  plaintext: FILTER_DENY,
  pre: FILTER_ALLOW,
  progress: FILTER_DENY,
  q: FILTER_ALLOW,
  rp: FILTER_ALLOW,
  rt: FILTER_ALLOW,
  rtc: FILTER_ALLOW,
  ruby: FILTER_ALLOW,
  s: FILTER_ALLOW,
  samp: FILTER_ALLOW,
  script: FILTER_DENY,
  section: FILTER_ALLOW,
  select: FILTER_DENY,
  shadow: FILTER_DENY,
  small: FILTER_PASS_THROUGH,
  source: FILTER_CLEAN,
  spacer: FILTER_DENY,
  span: FILTER_ALLOW,
  strike: FILTER_DENY,
  strong: FILTER_ALLOW,
  style: FILTER_DENY,
  sub: FILTER_ALLOW,
  summary: FILTER_ALLOW,
  sup: FILTER_ALLOW,
  table: FILTER_ALLOW,
  tbody: FILTER_ALLOW,
  td: FILTER_ALLOW,
  template: FILTER_DENY,
  textarea: FILTER_DENY,
  tfoot: FILTER_ALLOW,
  th: FILTER_ALLOW,
  thead: FILTER_ALLOW,
  time: FILTER_ALLOW,
  tr: FILTER_ALLOW,
  track: FILTER_CLEAN,
  tt: FILTER_DENY,
  u: FILTER_ALLOW,
  ul: FILTER_ALLOW,
  var: FILTER_ALLOW,
  video: FILTER_CLEAN,
  wbr: FILTER_DENY,
  xmp: FILTER_DENY
};

// Attributes not listed here will be denied
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
var ATTRIBUTES = exports.ATTRIBUTES = {
  alt: FILTER_ALLOW,
  cite: FILTER_CLEAN,
  class: FILTER_ALLOW,
  colspan: FILTER_CAST_NUMBER,
  controls: FILTER_CAST_BOOL,
  datetime: FILTER_ALLOW,
  default: FILTER_CAST_BOOL,
  disabled: FILTER_CAST_BOOL,
  dir: FILTER_ALLOW,
  height: FILTER_ALLOW,
  href: FILTER_CLEAN,
  id: FILTER_ALLOW,
  kind: FILTER_ALLOW,
  label: FILTER_ALLOW,
  lang: FILTER_ALLOW,
  loop: FILTER_CAST_BOOL,
  muted: FILTER_CAST_BOOL,
  rowspan: FILTER_CAST_NUMBER,
  span: FILTER_CAST_NUMBER,
  src: FILTER_CLEAN,
  target: FILTER_ALLOW,
  width: FILTER_ALLOW
};