// 마켓플레이스·플러그인 매니페스트가 서로 맞는지 검사한다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

const market = read('.claude-plugin/marketplace.json');
const plugin = read('plugins/design-director/.claude-plugin/plugin.json');
const entry = market.plugins.find((p) => p.name === plugin.name);

test('마켓플레이스에 플러그인 항목이 있다', () => {
  assert.ok(entry, `marketplace.json 에 ${plugin.name} 항목이 없다`);
  assert.ok(existsSync(join(ROOT, entry.source, '.claude-plugin', 'plugin.json')), `source 경로에 plugin.json 이 없다: ${entry.source}`);
});

test('plugin.json 과 marketplace 항목의 버전이 같다', () => {
  assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
  assert.equal(entry.version, plugin.version);
});

test('plugin.json 필수·관례 필드', () => {
  for (const k of ['name', 'version', 'description', 'author', 'license', 'repository']) {
    assert.ok(plugin[k], `${k} 가 없다`);
  }
  assert.equal(plugin.license, 'MIT');
});
