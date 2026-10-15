// URL 검사: http(s) 만, user:pass@ 는 떼고 경고. 신뢰 호스트 = localhost·127.0.0.1·::1·*.localhost.
import { usage } from './errors.mjs';

export function isTrustedHost(hostname) {
  const h = String(hostname || '').toLowerCase().replace(/^\[|\]$/g, '');
  return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h.endsWith('.localhost');
}

export function validateUrl(raw) {
  const input = String(raw || '').trim();
  if (!input) throw usage('URL 이 없다');
  let candidate = input;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(input)) {
    // 스킴이 없으면 로컬은 http, 나머지는 https 로 본다.
    candidate = (/^(localhost|127\.0\.0\.1|\[::1\]|[^/]*\.localhost)(:\d+)?(\/|$)/i.test(input) ? 'http://' : 'https://') + input;
  } else if (/^localhost:\d+/i.test(input)) {
    candidate = 'http://' + input;
  }
  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw usage(`URL 을 해석하지 못했다: ${input.slice(0, 120)}`);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw usage(`http(s) URL 만 받는다: ${url.protocol}`);
  }
  const warnings = [];
  if (url.username || url.password) {
    url.username = '';
    url.password = '';
    warnings.push({ code: 'CREDENTIALS_STRIPPED', message: 'URL 의 user:pass@ 를 떼고 열었다' });
  }
  return { url: url.toString(), host: url.hostname, trusted: isTrustedHost(url.hostname), warnings };
}
