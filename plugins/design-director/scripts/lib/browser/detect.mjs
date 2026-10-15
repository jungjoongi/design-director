// find.mjs 에 실제 fs·env 를 꽂는다.
import { readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { delimiter } from 'node:path';
import { findBrowser } from './find.mjs';

export function detectBrowser({ flag, notes = [] } = {}) {
  return findBrowser({
    platform: process.platform,
    env: process.env,
    homedir: homedir(),
    pathDirs: String(process.env.PATH || '').split(delimiter).filter(Boolean),
    flag,
    notes,
    exists: (p) => {
      try {
        return statSync(p).isFile();
      } catch {
        return false;
      }
    },
    readdir: (p) => readdirSync(p),
  });
}
