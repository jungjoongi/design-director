// URL → slug. 호스트에서 www. 를 떼고 경로 앞 2 세그먼트까지, [a-z0-9-] 만, 48자.
import { usage } from './errors.mjs';

export function slugify(input) {
  const raw = String(input || '').trim();
  if (!raw) throw usage('slug 를 만들 URL 이 없다');
  let url;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `http://${raw}`);
  } catch {
    throw usage(`URL 을 해석하지 못했다: ${raw.slice(0, 80)}`);
  }
  const host = url.hostname.replace(/^www\./i, '').replace(/^\[|\]$/g, '');
  const hostPart = url.port ? `${host}-${url.port}` : host;
  const segs = url.pathname.split('/').filter(Boolean).slice(0, 2).map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  });
  const joined = [hostPart, ...segs].join('-').toLowerCase();
  let slug = joined.replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  slug = slug.slice(0, 48).replace(/-$/, '');
  return slug || 'page';
}

// verify 결과 폴더 이름: 로컬 URL 의 경로로 만든다. 경로가 없으면 'page'.
export function pageSlug(input) {
  let url;
  try {
    url = new URL(input);
  } catch {
    return 'page';
  }
  const segs = url.pathname.split('/').filter(Boolean).slice(0, 2).join('-').toLowerCase();
  const s = segs.replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 48).replace(/-$/, '');
  return s || 'page';
}
