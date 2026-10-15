// 브라우저 탐지 테스트용 가짜 파일시스템. 파일 경로 목록으로 exists·readdir 를 만든다.
import path from 'node:path';

export function fakeFs(platform, files) {
  const P = platform === 'win32' ? path.win32 : path.posix;
  const set = new Set(files.map((f) => P.normalize(f)));
  const dirs = new Map();
  for (const f of set) {
    let cur = f;
    for (;;) {
      const parent = P.dirname(cur);
      if (parent === cur) break;
      if (!dirs.has(parent)) dirs.set(parent, new Set());
      dirs.get(parent).add(P.basename(cur));
      cur = parent;
    }
  }
  return {
    exists: (p) => set.has(P.normalize(p)),
    readdir: (p) => {
      const d = dirs.get(P.normalize(p));
      if (!d) throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
      return [...d];
    },
  };
}
