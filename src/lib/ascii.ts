/**
 * Tiny 5-row block-letter font for rendering ASCII-art banners at runtime,
 * so banner text can keep coming from the remote site config.
 */
const GLYPHS: Record<string, string[]> = {
  A: [' ## ', '#  #', '####', '#  #', '#  #'],
  B: ['### ', '#  #', '### ', '#  #', '### '],
  C: [' ###', '#   ', '#   ', '#   ', ' ###'],
  D: ['### ', '#  #', '#  #', '#  #', '### '],
  E: ['####', '#   ', '### ', '#   ', '####'],
  F: ['####', '#   ', '### ', '#   ', '#   '],
  G: [' ###', '#   ', '# ##', '#  #', ' ###'],
  H: ['#  #', '#  #', '####', '#  #', '#  #'],
  I: ['###', ' # ', ' # ', ' # ', '###'],
  J: ['  ##', '   #', '   #', '#  #', ' ## '],
  K: ['#  #', '# # ', '##  ', '# # ', '#  #'],
  L: ['#   ', '#   ', '#   ', '#   ', '####'],
  M: ['#   #', '## ##', '# # #', '#   #', '#   #'],
  N: ['#  #', '## #', '# ##', '#  #', '#  #'],
  O: [' ## ', '#  #', '#  #', '#  #', ' ## '],
  P: ['### ', '#  #', '### ', '#   ', '#   '],
  Q: [' ## ', '#  #', '#  #', '# ##', ' ###'],
  R: ['### ', '#  #', '### ', '# # ', '#  #'],
  S: [' ###', '#   ', ' ## ', '   #', '### '],
  T: ['#####', '  #  ', '  #  ', '  #  ', '  #  '],
  U: ['#  #', '#  #', '#  #', '#  #', ' ## '],
  V: ['#   #', '#   #', '#   #', ' # # ', '  #  '],
  W: ['#   #', '#   #', '# # #', '## ##', '#   #'],
  X: ['#   #', ' # # ', '  #  ', ' # # ', '#   #'],
  Y: ['#   #', ' # # ', '  #  ', '  #  ', '  #  '],
  Z: ['####', '   #', ' ## ', '#   ', '####'],
  ' ': ['  ', '  ', '  ', '  ', '  '],
};

const ROWS = 5;
const LETTER_GAP = ' ';
const BLOCK = '█';

export function renderAsciiBanner(text: string): string {
  const rows: string[] = Array.from({ length: ROWS }, () => '');

  for (const char of text.toUpperCase()) {
    const glyph = GLYPHS[char];
    if (!glyph) {
      continue;
    }

    for (let row = 0; row < ROWS; row++) {
      rows[row] += (rows[row] ? LETTER_GAP : '') + glyph[row];
    }
  }

  return rows.map((row) => row.replace(/#/g, BLOCK)).join('\n');
}
