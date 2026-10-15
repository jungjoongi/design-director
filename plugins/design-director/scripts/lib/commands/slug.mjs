// slug: URL → 폴더 이름.
import { slugify } from '../slug.mjs';

export const help = `dd.mjs slug <url>

URL 로 레퍼런스 폴더 이름을 만든다. 호스트에서 www. 를 떼고 경로 앞 2 세그먼트까지, 소문자 [a-z0-9-], 48자.
예: https://linear.app/ → linear-app, http://localhost:3000/pricing → localhost-3000-pricing`;

export async function run({ positionals }) {
  return { ok: true, command: 'slug', slug: slugify(positionals[0]), warnings: [], next: [] };
}
