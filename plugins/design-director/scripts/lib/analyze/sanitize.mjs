// 페이지에서 온 글자 정화: NFC, 제어문자·zero-width·bidi·태그 문자 제거, 공백 정리, 길이 제한.
// 소스에 \u 이스케이프를 직접 쓰지 않고 코드 포인트 표로 만든다(편집 도구가 이스케이프를 글자로 바꾸는 사고 방지).

export const CONTROL_RANGES = [[0x00, 0x1f], [0x7f, 0x9f]];
export const INVISIBLE_RANGES = [
  [0xad, 0xad], [0x180e, 0x180e], [0x200b, 0x200f], [0x2028, 0x202e], [0x2060, 0x206f],
  [0xfe00, 0xfe0f], [0xfeff, 0xfeff], [0xfff9, 0xfffb], [0xe0000, 0xe007f], [0xe0100, 0xe01ef],
];

const hex = (cp) => `\\u{${cp.toString(16)}}`;
const cls = (ranges) => ranges.map(([a, b]) => (a === b ? hex(a) : `${hex(a)}-${hex(b)}`)).join('');
const CONTROL = new RegExp(`[${cls(CONTROL_RANGES)}]`, 'gu');
const INVISIBLE = new RegExp(`[${cls(INVISIBLE_RANGES)}]`, 'gu');

// 제어문자는 공백으로, zero-width·bidi·태그 문자는 지운다.
export function stripInvisible(s) {
  return String(s ?? '').replace(INVISIBLE, '').replace(CONTROL, ' ');
}

// 길이는 코드 포인트 기준. 잘리면 끝에 …
export function sanitizeText(s, max = 60) {
  if (s === null || s === undefined) return '';
  let t = String(s);
  try {
    t = t.normalize('NFC');
  } catch {
    // 잘못된 서로게이트는 그대로 둔다
  }
  t = stripInvisible(t).replace(/\s+/g, ' ').trim();
  const cps = Array.from(t);
  if (cps.length > max) t = cps.slice(0, Math.max(0, max - 1)).join('').trimEnd() + '…';
  return t;
}
