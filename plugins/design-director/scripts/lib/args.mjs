// 명령별 스펙으로 argv 를 해석한다. 모르는 플래그는 USAGE 에러.
import { usage } from './errors.mjs';

const GLOBAL = {
  quiet: { type: 'boolean' },
  help: { type: 'boolean' },
};

const CAPTURE_FLAGS = {
  out: { type: 'string' },
  viewports: { type: 'string' },
  'max-slices': { type: 'number', min: 0, max: 30 },
  'no-full-page': { type: 'boolean' },
  'keep-overlays': { type: 'boolean' },
  hide: { type: 'string', repeat: true },
  timeout: { type: 'number', min: 1000, max: 600000 },
  deadline: { type: 'number', min: 5000, max: 1800000 },
  lang: { type: 'string' },
  browser: { type: 'string' },
  force: { type: 'boolean' },
  'no-analyze': { type: 'boolean' },
};

export const SPECS = {
  doctor: { flags: { browser: { type: 'string' } }, positionals: [0, 0] },
  slug: { flags: {}, positionals: [1, 1] },
  capture: { flags: CAPTURE_FLAGS, positionals: [1, 1] },
  analyze: { flags: {}, positionals: [1, 1] },
  verify: {
    flags: {
      ...CAPTURE_FLAGS,
      ref: { type: 'string' },
      'ref-label': { type: 'string' },
      page: { type: 'string' },
    },
    positionals: [1, 1],
  },
  tells: { flags: { root: { type: 'string' } }, positionals: [1, Infinity] },
};

function camel(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// argv(명령 이름 뒤) → {positionals, flags}. flags 키는 camelCase.
export function parseArgs(command, argv) {
  const spec = SPECS[command];
  if (!spec) throw usage(`알 수 없는 명령: ${command}`);
  const defs = { ...GLOBAL, ...spec.flags };
  const flags = {};
  const positionals = [];
  for (let i = 0; i < argv.length; i++) {
    const tok = argv[i];
    if (tok === '--') {
      positionals.push(...argv.slice(i + 1));
      break;
    }
    if (!tok.startsWith('--') || tok === '-') {
      if (tok.startsWith('-') && tok.length > 1 && !/^-\d/.test(tok)) throw usage(`짧은 옵션은 지원하지 않는다: ${tok}`);
      positionals.push(tok);
      continue;
    }
    let name = tok.slice(2);
    let value;
    const eq = name.indexOf('=');
    if (eq >= 0) {
      value = name.slice(eq + 1);
      name = name.slice(0, eq);
    }
    const def = defs[name];
    if (!def) throw usage(`알 수 없는 옵션: --${name}`);
    const key = camel(name);
    if (def.type === 'boolean') {
      if (value !== undefined && !/^(true|false|1|0)$/.test(value)) throw usage(`--${name} 은 값을 받지 않는다`);
      flags[key] = value === undefined ? true : /^(true|1)$/.test(value);
      continue;
    }
    if (value === undefined) {
      if (i + 1 >= argv.length) throw usage(`--${name} 에 값이 없다`);
      value = argv[++i];
    }
    let parsed = value;
    if (def.type === 'number') {
      if (!/^\d+$/.test(String(value))) throw usage(`--${name} 은 0 이상의 정수여야 한다: ${value}`);
      parsed = Number(value);
      if (def.min !== undefined && parsed < def.min) throw usage(`--${name} 은 ${def.min} 이상`);
      if (def.max !== undefined && parsed > def.max) throw usage(`--${name} 은 ${def.max} 이하`);
    } else if (typeof parsed === 'string' && parsed.length === 0) {
      throw usage(`--${name} 값이 비었다`);
    }
    if (def.repeat) (flags[key] ||= []).push(parsed);
    else flags[key] = parsed;
  }
  if (flags.help) return { positionals, flags };
  const [min, max] = spec.positionals;
  if (positionals.length < min) throw usage(`인자가 부족하다 (${command})`);
  if (positionals.length > max) throw usage(`인자가 너무 많다 (${command}): ${positionals.slice(max).join(' ')}`);
  return { positionals, flags };
}

// --viewports 값 해석.
export function parseViewports(value) {
  if (!value) return ['desktop', 'mobile'];
  const names = [...new Set(String(value).split(',').map((s) => s.trim()).filter(Boolean))];
  for (const n of names) if (n !== 'desktop' && n !== 'mobile') throw usage(`알 수 없는 뷰포트: ${n} (desktop, mobile)`);
  if (!names.includes('desktop')) throw usage('desktop 뷰포트는 빼지 않는다');
  return names.sort((a, b) => (a === 'desktop' ? -1 : b === 'desktop' ? 1 : 0));
}
