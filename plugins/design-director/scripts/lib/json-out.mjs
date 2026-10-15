// stdout 에는 JSON 객체 하나만. 진행 로그는 stderr (--quiet 면 끈다).

let quiet = false;
let written = false;

export function setQuiet(v) {
  quiet = !!v;
}

export function log(...parts) {
  if (quiet) return;
  process.stderr.write(`[dd] ${parts.join(' ')}\n`);
}

// 한 번만 쓴다. 두 번째 호출은 무시하고 stderr 에 남긴다.
export function emit(obj) {
  if (written) {
    if (!quiet) process.stderr.write('[dd] 내부 경고: 결과 JSON 을 두 번 쓰려 했다\n');
    return;
  }
  written = true;
  process.stdout.write(JSON.stringify(obj) + '\n');
}

export function wasEmitted() {
  return written;
}

// 경고 목록 도우미. 같은 code+message 는 한 번만.
export class Warnings {
  constructor() {
    this.items = [];
    this.seen = new Set();
  }
  add(code, message) {
    const key = `${code}:${message}`;
    if (this.seen.has(key)) return;
    this.seen.add(key);
    this.items.push({ code, message: String(message).slice(0, 300) });
    log(`warning ${code}: ${message}`);
  }
  addAll(list) {
    for (const w of list || []) if (w && w.code) this.add(w.code, w.message || '');
  }
  toJSON() {
    return this.items;
  }
}
