# 한국어 타이포그래피

한국어 화면을 만들거나 고칠 때 쓰는 규칙·폰트·로딩 방법. `direct` 의 브리프 §7, 적용 ② 타이포, 검증의 한국어 점검,
`ref` 의 폰트 대체가 이 문서를 쓴다. 범위값은 실무 기준이다. **레퍼런스에서 실측한 값이 있으면 그 값이 이긴다.**

## 목차
1. 기본 CSS — keep-all, lang, balance
2. 규칙 표 — 행간·자간·크기·굵기·폭·숫자
3. 폰트 표 — 라이선스·공식 URL·확인일
4. 스타일별 페어링
5. 유료·독점 폰트 대체
6. 로딩 — 다이내믹 서브셋, next/font, font-display
7. 점검 목록 (verify 용)

## 1. 기본 CSS

한국어는 기본값(`word-break: normal`)에서 음절 단위로 줄이 바뀐다. '회의록을 자동으 / 로' 같은 줄바꿈은
한 번만 보여도 완성도가 무너진다(KR-1). 어절 단위로 끊고, 어절 하나가 칸보다 길 때만 그 안에서 끊는다.

```css
html:lang(ko) { word-break: keep-all; overflow-wrap: break-word; }
:where(h1, h2, h3) { text-wrap: balance; }      /* 제목 줄 길이를 고르게 */
:where(p, li) { text-wrap: pretty; }             /* 마지막 줄에 한 어절만 남는 것 줄이기(지원 브라우저만) */
```

- `<html lang="ko">` 를 꼭 둔다. 브라우저가 한글 폰트 폴백과 `:lang(ko)` 규칙을 고르는 기준이다. Next.js 는
  `app/layout.tsx` 의 `<html lang="ko">`, Vite 는 `index.html`, Astro 는 레이아웃의 `<html lang="ko">`.
- Tailwind 는 `break-keep`(= `word-break: keep-all`). 전역 base 레이어에 한 번 넣는 게 요소마다 붙이는 것보다 낫다.
- `overflow-wrap: break-word` 가 긴 URL·영문 토큰의 넘침을 받는다. 표 셀처럼 좁은 칸은 `overflow-wrap: anywhere`.
- `text-wrap: balance` 는 제목(6줄 이하)에만. 본문에 걸면 계산 비용이 크고 효과가 없다.

## 2. 규칙 표

| 항목 | 범위 | 이유·메모 |
|---|---|---|
| 본문 line-height | 1.5–1.8 (기본 1.6–1.7) | 한글은 글자 면이 꽉 차서 라틴(1.4–1.5)보다 더 필요하다. 1.5 미만은 KR-5. 1.4 는 data-dense 표 셀만 |
| 제목 line-height | 1.2–1.35, 1.15 미만 금지 | 두 줄 제목에서 받침과 다음 줄 초성이 부딪힌다 |
| 본문 자간 | -0.01~-0.02em | 한글 웹폰트 기본 자간은 넓은 편이다. 양수 자간은 어절을 흩뜨린다 |
| display 자간 | -0.02~-0.03em | 크기가 클수록 더 조인다. 40px 이상에서 -0.03em. -0.04em 은 라틴 display 에만 쓴다(한글은 받침이 붙는다) |
| 12–13px 자간 | 0 | 작은 글자를 조이면 획이 붙는다 |
| 본문 크기 | 16px (모바일 15–16) | 한글 획 밀도 때문에 14px 본문은 라틴 13px 처럼 읽힌다 |
| 작은 글자 | 13px 이상, 캡션 12px 이상 | 11px 이하 한글은 Windows 에서 뭉갠다 |
| 입력 필드 | 16px 이상 | iOS Safari 는 16px 미만 입력에 포커스하면 화면을 확대한다 |
| 굵기 | 본문 400, 강조 600–700, 300 이하는 피함 | 가는 한글은 Windows 렌더링에서 흐리게 끊긴다 |
| 이탤릭 | 쓰지 않는다 | 한글 폰트엔 이탤릭이 없어 브라우저가 기울인 가짜를 만든다(KR-3). 강조는 굵기·색으로 |
| 한 줄 길이 | 34–40em (한글 약 35–40자) | `ch` 는 숫자 '0' 폭 기준이라 한글에 맞지 않는다. `max-width: 38em` 처럼 em 으로 |
| 숫자 | `font-variant-numeric: tabular-nums` | 표·가격·통계는 숫자 폭을 맞춘다 |
| 표기 | '12,000원', '3~5일', '2026.10.15' | 통화는 숫자 뒤 '원', 범위는 '~', 날짜는 YYYY.MM.DD(또는 YYYY년 M월 D일) |
| 강조 | 굵기 400→600·700, 색 | 밑줄은 링크 전용으로 남긴다 |

- 영문이 섞인 제목: 한글 폰트의 라틴이 어색하면 font-family 앞에 라틴 폰트를 두고 한글 폰트를 둘째에 둔다.
  이때 두 폰트의 x-height·굵기가 맞는지 스크린샷으로 확인한다(Pretendard 의 라틴은 Inter 계열이라 Inter 와 잘 맞는다).
- 대문자 영문 라벨(eyebrow)을 한국어 제목 위에 얹지 않는다(KR-4). 필요하면 짧은 한국어 라벨을 대문자 변환·자간 없이.
- 한국어 UI 문구는 해요체 짧은 동사형. 번역투(KR-7)는 디자인이 좋아도 화면을 싸 보이게 한다.

## 3. 폰트 표

라이선스는 공식 저장소·배포처에서 확인한 것만 적는다. 확인하지 못한 칸은 "확인 필요"로 두고 쓰기 전에 원문을 본다.
OFL(SIL Open Font License 1.1)은 웹·앱·인쇄·상업 사용과 수정·재배포가 되고, 폰트 파일 자체의 단독 판매만 금지한다.
수정본은 OFL 로만 배포하고, 예약 글꼴 이름(Reserved Font Name)이 있으면 수정본에 그 이름을 쓰지 못한다.

| 폰트 | 분류 | 라이선스 | 공식 URL | 확인일 | 메모 |
|---|---|---|---|---|---|
| Pretendard | 고딕 | OFL 1.1 | https://github.com/orioncactus/pretendard | 2026-10 | 가변(45–920)·다이내믹 서브셋. 라틴은 Inter 계열. 한국어 웹의 기본 선택 |
| SUIT | 고딕 | OFL 1.1 | https://github.com/sun-typeface/SUIT | 2026-10 | 가변. 숫자·라틴이 단정해 앱 UI·대시보드에 맞다 |
| Wanted Sans | 고딕 | OFL 1.1 | https://github.com/wanteddev/wanted-sans | 2026-10 | 가변, 7 굵기. 토스형 화면의 대체 후보 |
| Spoqa Han Sans Neo | 고딕 | OFL 1.1 | https://github.com/spoqa/spoqa-han-sans | 2026-10 | 좁고 단정한 숫자·영문. 서비스 UI |
| Noto Sans KR | 고딕 | OFL 1.1 | https://fonts.google.com/noto/specimen/Noto+Sans+KR | 2026-10 | Google Fonts 가 unicode-range 로 쪼개 준다. `next/font/google` 지원 |
| Noto Serif KR | 명조 | OFL 1.1 | https://fonts.google.com/noto/specimen/Noto+Serif+KR | 2026-10 | 본문 명조·에디토리얼 |
| IBM Plex Sans KR | 고딕(테크) | OFL 1.1 | https://github.com/IBM/plex | 2026-10 | IBM Plex Mono·Sans 와 한 가족 |
| MaruBuri (마루 부리) | 명조(현대) | OFL 1.1 (2차 출처) | https://hangeul.naver.com/font | 확인 필요 | 산돌구름 안내 기준 OFL. 네이버 공식 페이지는 직접 확인하지 못했다 |
| Gmarket Sans | 디스플레이 고딕 | OFL (배포처 안내) | https://corp.gmarket.com/fonts/ | 2026-10 | 굵고 둥근 제목용. 본문에는 쓰지 않는다 |
| LINE Seed Sans KR | 고딕 | OFL 1.1 | https://seed.line.me/index_kr.html | 2026-10 | 둥글고 친근한 고딕 |
| Nanum Square Neo (나눔스퀘어 네오) | 고딕 | OFL (2차 출처) | https://hangeul.naver.com/font | 확인 필요 | 가변. 산돌구름 안내 기준 OFL |
| Nanum Gothic / Nanum Myeongjo | 고딕 / 명조 | OFL | https://fonts.google.com/specimen/Nanum+Gothic | 2026-10 | 익숙하고 오래된 인상. 새 브랜드의 첫 선택으로는 약하다 |

- **Pretendard 단독 + 스케일 없음 = 한국판 Inter-only(TY-4).** 폰트를 바꾸는 것보다 스케일(비율 하나, 6단계 이내)과
  굵기 대비(400 / 700)를 먼저 세우는 게 체감이 크다.
- 시스템 폰트(Apple SD Gothic Neo, 맑은 고딕)는 웹폰트가 아니다. 폴백으로만 두고, 이것만 믿으면 KR-2 다.

## 4. 스타일별 페어링

| 스타일 | 제목 | 본문 | 숫자·코드 | 메모 |
|---|---|---|---|---|
| editorial · kr-editorial-commerce | MaruBuri 또는 Noto Serif KR (500–700) | Pretendard 400 | Pretendard tabular | 명조는 제목 한 단계에만. 본문까지 명조면 화면이 무거워진다 |
| dark-tech · data-dense | IBM Plex Sans KR 600 | IBM Plex Sans KR 400 | IBM Plex Mono | 한 가족이라 x-height·굵기가 맞는다. 모노는 코드·수치 표에만(TY-5) |
| playful-illustrative | Gmarket Sans Bold | Pretendard 400 | Pretendard | 디스플레이 고딕은 32px 이상 제목에만. 버튼·본문은 Pretendard |
| kr-fintech-simple (토스형) | Pretendard 700 | Pretendard 400–500 | Pretendard tabular-nums | 폰트 하나로 가되 스케일을 실제로 세운다(display ÷ body ≥ 2.5) |
| minimal · swiss · corporate-clean | Pretendard 또는 SUIT 600–700 | 같은 패밀리 400 | tabular-nums | 굵기 2개(400/700)와 크기 대비로 위계 |
| organic-soft · 따뜻한 서비스 | LINE Seed Sans KR 400(organic-soft 는 제목도 굵게 하지 않는다) · 700(그 밖의 따뜻한 서비스) | LINE Seed Sans KR 400 또는 Pretendard | | 둥근 획이 온도를 올린다. 굵기 300 은 피한다 |
| luxury | MaruBuri 400–500 (큰 크기, 자간 -0.02em) | Pretendard 300–400 | | 굵기를 낮추는 대신 크기·여백으로 무게를 만든다. 300 은 16px 이상에서만 |

## 5. 유료·독점 폰트 대체

레퍼런스가 유료·독점 폰트를 쓰면 파일을 가져오지 않고 **같은 분류의 무료 폰트**로 바꾼다. 느낌은 폰트 파일이
아니라 크기·굵기·자간·행간에서 더 많이 온다. 엔진의 `scripts/data/font-alternatives.json` 이 같은 대응을 쓰고,
capture `summary.md` 의 대체 열이 거기서 나온다.

| 원래 폰트(분류) | 라틴 대체 | 한글 대체 | 메모 |
|---|---|---|---|
| Söhne, Neue Haas Grotesk·Unica, Helvetica Now (그로테스크) | Inter, Geist | Pretendard | display 자간 -0.02~-0.03em 으로 조여야 비슷해진다 |
| Graphik, GT America·Walsheim·Eesti, Aeonik (네오 그로테스크) | Inter, Manrope | Pretendard | Manrope 는 폭이 넓은 쪽(GT Walsheim·Aeonik)에 |
| Circular, Airbnb Cereal (기하 산세리프) | Plus Jakarta Sans, Figtree | SUIT | 둥근 a·g 가 핵심. 굵기 500–700 |
| Proxima Nova, Gotham, Avenir (기하·휴머니스트) | Figtree, Montserrat, Nunito Sans | Pretendard | Gotham 은 Montserrat, Avenir 는 Nunito Sans 가 가깝다 |
| GT Sectra, Tiempos, Canela (세리프 디스플레이) | Fraunces, Newsreader | MaruBuri | 제목에만. 본문 세리프는 Newsreader + Noto Serif KR |
| Toss Product Sans (토스 전용) | Inter | Pretendard, Wanted Sans | 토스 느낌은 폰트보다 굵기 대비·큰 숫자·여백에서 온다 |
| SF Pro, Segoe UI (OS 시스템) | system-ui 스택 | Pretendard | 웹에 임베드하지 않는다(라이선스). `-apple-system, BlinkMacSystemFont, system-ui` 로 부른다 |
| Apple SD Gothic Neo, 맑은 고딕 (OS 한글) | — | Pretendard, Noto Sans KR | 시스템 폰트라 OS 마다 다르게 보인다(KR-2). 웹폰트를 로드하고 폴백으로만 남긴다 |
| Toss Product Sans 처럼 외부에 배포하지 않는 한글 브랜드 서체 | — | Pretendard, SUIT, Gmarket Sans(제목) | 서체 파일은 가져오지 않는다(프로필 10장). 분류만 맞춘다. 배민 글꼴처럼 무료로 배포하는 브랜드 서체는 배포처 라이선스를 확인하고 그대로 써도 된다 |

## 6. 로딩

한글 폰트 파일은 굵기 하나에 1–3MB 다. 전체 파일을 그대로 쓰면 첫 화면이 늦고 폴백 폰트가 길게 보인다.
쓰는 글자만 받는 **다이내믹 서브셋**(unicode-range 로 수십 조각)이 기본이다.

**CDN (가장 간단)** — 버전을 고정한다.

```html
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
```

```css
:root { --font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  "Noto Sans KR", system-ui, sans-serif; }
```

**Next.js (App Router)** — 가변 woff2 를 프로젝트에 두고 `next/font/local`. 자동으로 preload·`size-adjust` 폴백을 만든다.

```ts
// app/layout.tsx
import localFont from "next/font/local";
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2", display: "swap", weight: "45 920", variable: "--font-pretendard",
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko" className={pretendard.variable}><body>{children}</body></html>;
}
```

`variable` 옵션은 `<html>` 에 CSS 변수 `--font-pretendard` 를 달기만 한다. 폰트 스택 맨 앞에 연결해야 실제로 쓰인다.

```css
/* app/globals.css */
:root { --font-sans: var(--font-pretendard), -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR",
  system-ui, sans-serif; }
body { font-family: var(--font-sans); }
```

Tailwind v4 는 같은 연결을 `@theme inline` 에 둔다(`${CLAUDE_PLUGIN_ROOT}/skills/direct/references/stack-recipes/tailwind-v4.md` §3).

- 전체 가변 파일(약 2MB)이 부담이면 CDN 다이내믹 서브셋을 `layout.tsx` 의 `<head>` 에 링크하는 쪽이 첫 화면에 유리하다.
- Noto Sans KR 은 `next/font/google` 의 `Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] })` 로 충분하다.
  한글 조각은 Google 이 unicode-range 로 나눠 준다.

**Vite·Astro·정적 사이트** — npm 패키지(`pretendard`)의 다이내믹 서브셋 CSS 를 전역 CSS 에서 import 하거나,
직접 호스팅할 때는 `@font-face` 에 `font-display: swap` 과 `unicode-range` 를 둔다.

```css
@import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
```

- `font-display: swap` — 폰트가 오기 전에도 글자를 보여준다. `block` 은 한글 폰트처럼 큰 파일에서 빈 화면을 만든다.
- preload 는 첫 화면에 쓰는 파일 1–2개만. 다이내믹 서브셋 조각 전체를 preload 하지 않는다.
- 굵기는 2–3개(400·600·700)만 쓴다. 가변 폰트면 파일 하나로 끝난다.
- 로딩 실패 확인: capture `summary.md` 패밀리 표의 `source` 가 `fallback-likely` 면 선언만 하고 로드되지 않은 것이다.

## 7. 점검 목록 (verify 용)

검증 단계에서 한국어 페이지마다 아래를 본다. 앞의 6개는 코드·summary 로, 뒤의 4개는 스크린샷으로 확인한다.

1. `<html lang="ko">` 가 있다.
2. keep-all(`word-break: keep-all` 또는 `break-keep`)이 전역에 있다 — `dd.mjs tells` 의 KR-1 이 0.
3. 한글 웹폰트가 로드됐다 — summary 패밀리 `source: webfont`, tells 의 KR-2 가 0.
4. 본문 line-height 1.5–1.8(data-dense 표 셀만 1.4), 제목 1.15 이상(기본 1.2–1.35) — summary 타이포 표.
5. 본문 16px 이상(모바일 15px 이상), 입력 16px 이상, 가장 작은 글자 12px 이상.
6. 자간: 본문 -0.01~-0.02em(12–13px 글자는 0), 한글 display -0.02~-0.03em, 양수 자간 없음 — KR-5 가 0.
7. 단어 중간 줄바꿈이 없다(데스크톱·모바일 스크린샷의 모든 제목·버튼).
8. 가짜 이탤릭이 없다(KR-3), 대문자 영문 eyebrow 가 없다(KR-4).
9. 한 줄 길이가 40em(한글 약 40자)을 넘지 않는다.
10. 숫자 표기: 가격 '12,000원', 범위 '~', 날짜 형식이 한 가지로 통일돼 있다.
