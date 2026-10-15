// 스킬·레퍼런스 문서가 CLAUDE.md 의 작성 규칙을 지키는지 검사한다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PLUGIN = join(ROOT, 'plugins', 'design-director');
const SKILLS = join(PLUGIN, 'skills');

function walk(dir, pred, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, pred, out);
    else if (pred(p)) out.push(p);
  }
  return out;
}

// 아주 작은 frontmatter 파서: 스칼라와 folded(>, >-)·literal(|) 블록만 다룬다.
export function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: null, body: src };
  const lines = m[1].split('\n');
  const data = {};
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z0-9_-]+):\s?(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    if (/^[>|]-?$/.test(raw.trim())) {
      const block = [];
      while (i + 1 < lines.length && (/^\s+\S/.test(lines[i + 1]) || lines[i + 1].trim() === '')) {
        block.push(lines[++i].trim());
      }
      data[key] = raw.trim().startsWith('>')
        ? block.join(' ').replace(/ {2,}/g, ' ').trim()
        : block.join('\n').trim();
    } else {
      data[key] = raw.trim().replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: src.slice(m[0].length) };
}

const skillFiles = walk(SKILLS, (p) => p.endsWith('SKILL.md'));

test('스킬 폴더마다 SKILL.md 가 하나씩 있다', () => {
  if (!existsSync(SKILLS)) return;
  for (const name of readdirSync(SKILLS)) {
    const dir = join(SKILLS, name);
    if (!statSync(dir).isDirectory()) continue;
    const nested = walk(dir, (p) => p.endsWith('SKILL.md'));
    assert.equal(nested.length, 1, `${name}: SKILL.md 가 ${nested.length}개`);
  }
});

for (const file of skillFiles) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, 'utf8');
  const { data, body } = parseFrontmatter(src);

  test(`${rel}: frontmatter 와 description 규칙`, () => {
    assert.ok(data, 'frontmatter 가 없다');
    assert.ok(data.description, 'description 이 없다');
    assert.ok(data.description.length <= 1024, `description ${data.description.length}자 (1024자 이하)`);
    assert.ok(!/[<>]/.test(data.description), 'description 에 < 또는 > 가 있다');
    if (data.name) assert.match(data.name, /^[a-z0-9-]{1,64}$/, 'name 은 kebab-case');
  });

  test(`${rel}: 본문 500줄 미만`, () => {
    const n = body.split('\n').length;
    assert.ok(n < 500, `본문 ${n}줄`);
  });

  test(`${rel}: 가리키는 reference 파일이 실제로 있다`, () => {
    const skillDir = dirname(file);
    const shared = [...body.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/([\w./-]+\.(?:md|json|mjs|js))/g)].map((m) => join(PLUGIN, m[1]));
    const local = [...body.matchAll(/(?<![\w/}.-])(references\/[\w./-]+\.md)/g)].map((m) => join(skillDir, m[1]));
    for (const p of [...shared, ...local]) {
      assert.ok(existsSync(p), `없는 파일을 가리킨다: ${relative(ROOT, p)}`);
    }
  });
}

const refFiles = walk(PLUGIN, (p) => p.endsWith('.md') && !p.endsWith('SKILL.md') && !p.endsWith('README.md'));

for (const file of refFiles) {
  const rel = relative(ROOT, file);
  test(`${rel}: 200줄 넘으면 목차가 있다`, () => {
    const lines = readFileSync(file, 'utf8').split('\n');
    if (lines.length <= 200) return;
    const head = lines.slice(0, 40).join('\n');
    assert.match(head, /^#{2,3} 목차/m, `${lines.length}줄인데 앞 40줄 안에 "## 목차" 가 없다`);
  });
}
