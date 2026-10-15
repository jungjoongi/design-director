# 레시피: CSS 변수 (일반 CSS·SCSS·CSS Modules·CSS-in-JS)

Tailwind 가 없으면 `:root` 의 CSS 변수가 토큰이다. 색·폰트·글자 크기·radius·그림자·easing 은 Tailwind v4 네임스페이스
(`--color-*`, `--font-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--ease-*`)와 같은 이름을 쓴다. 나중에 v4 로 옮기거나 다른
도구(v0·Lovable)에 이식용 프롬프트를 넘길 때 이름이 그대로 통한다. 간격·컨테이너만 브리프와 같은 짧은 이름(`--space-*`,
`--container`)을 쓰고, v4 로 옮길 때 `--spacing-*`·`--container-*` 로 바꾼다(tailwind-v4 레시피 §1).

## 1. 토큰 파일 위치

- 새 파일을 만들지 않고 프로젝트의 전역 CSS(`globals.css`·`index.css`·`app.css`·`styles/main.scss`) 맨 위에 둔다.
  전역 CSS 가 없으면 진입점에서 import 하는 파일 하나를 만든다(브리프 §9 에 적는다).
- SCSS 변수(`$color-ink`)가 이미 있으면 SCSS 변수가 CSS 변수를 가리키게 한다: `$color-ink: var(--color-ink);`.
  런타임 테마 전환이 되고, 기존 `$` 참조를 고치지 않아도 된다.

## 2. 예시

```css
:root {
  /* 색 — 역할 이름 */
  --color-bg: oklch(0.99 0.002 260);
  --color-surface: oklch(0.97 0.004 260);
  --color-ink: oklch(0.22 0.01 260);
  --color-muted: oklch(0.48 0.01 260);
  --color-line: oklch(0.92 0.005 260);
  --color-accent: oklch(0.56 0.19 260);
  --color-accent-ink: oklch(0.99 0 0);

  /* 타이포 */
  --font-sans: "Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  --text-display: clamp(2.5rem, 4vw + 1rem, 4.5rem);
  --text-h2: clamp(1.75rem, 2vw + 1rem, 2.5rem);
  --text-body: 1rem;
  --leading-body: 1.65;  --leading-heading: 1.25;
  --tracking-body: -0.01em;  --tracking-display: -0.03em;

  /* 간격 — 4·8 스케일 */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-6: 24px;
  --space-8: 32px; --space-12: 48px; --space-16: 64px; --space-24: 96px; --space-32: 128px;
  --space-section: clamp(72px, 8vw, 112px);
  --container: 1200px;

  /* 형태·모션 */
  --radius-control: 12px;  --radius-card: 20px;
  --shadow-overlay: 0 1px 2px oklch(0.2 0.01 260 / 0.06), 0 8px 24px oklch(0.2 0.01 260 / 0.1);
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 150ms;  --duration-base: 240ms;
}

[data-theme="dark"] {
  --color-bg: oklch(0.18 0.01 260);  --color-surface: oklch(0.22 0.01 260);
  --color-ink: oklch(0.95 0.003 260);  --color-muted: oklch(0.72 0.01 260);  --color-line: oklch(0.32 0.01 260);
}

html:lang(ko) { word-break: keep-all; overflow-wrap: break-word; }
body {
  font-family: var(--font-sans); font-size: var(--text-body);
  line-height: var(--leading-body); letter-spacing: var(--tracking-body);
  color: var(--color-ink); background: var(--color-bg);
}
h1, h2, h3 { line-height: var(--leading-heading); text-wrap: balance; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

- 테마 전환은 `[data-theme]` 속성으로(클래스보다 의도가 분명하다). 시스템 설정만 따르면 `@media (prefers-color-scheme: dark)`.
- 반응형 크기는 미디어 쿼리 여러 개보다 `clamp(최소, 선호, 최대)` 하나가 낫다. 선호값은 `vw + rem` 으로 두어
  확대(줌)에도 커지게 한다. 최소·최대는 브리프의 mobile·desktop 값이다.

## 3. CSS-in-JS 연결 (v0.1 대체 경로)

전용 레시피가 생기기 전까지는 토큰을 위처럼 `:root` 에 두고 테마 객체가 변수를 가리키게 한다.

```ts
// styled-components / emotion
export const theme = {
  color: { ink: "var(--color-ink)", muted: "var(--color-muted)", accent: "var(--color-accent)" },
  radius: { card: "var(--radius-card)" },
};
```

MUI 는 `createTheme({ cssVariables: true, … })` 로 MUI 쪽 변수를 켜고 palette 값을 브리프 값으로 바꾼다. 어느 쪽이든
테마 파일이 토큰 위치이니 브리프 §9 에 적는다.

## 4. 하드코딩 옮기기 — 페이지 범위 안에서만

1. 대상 페이지와 그 섹션 컴포넌트에서만 Grep 한다: `#[0-9a-fA-F]{3,8}\b`, `\b\d+px\b`, `font-size:`, `border-radius:`.
2. 같은 역할의 값을 토큰 하나로 묶는다(본문 회색 #666·#6b6b6b·#707070 → `--color-muted`).
3. 페이지 밖에서도 쓰는 공용 컴포넌트는 브리프 §9 에 적고 승인받은 범위에서만 바꾼다. 전역 리팩터는 하지 않는다.
4. 4 의 배수가 아닌 간격(13px, 18px)은 가까운 스케일 값으로. 1·2px 경계선은 그대로 둔다.

## 5. 함정

- CSS Modules 에서 `:root` 를 쓰면 모듈 범위가 아니라 전역에 들어간다. 의도한 것이면 괜찮지만 토큰은 전역 CSS 한 곳에 둔다.
- 변수 이름을 `--blue-500` 처럼 값으로 지으면 브랜드가 바뀔 때 이름이 거짓말이 된다. 역할로 짓는다.
- `!important` 로 기존 스타일을 덮지 않는다. 덮이는 이유(선택자 우선순위)를 찾아 고친다. 위의 reduced-motion
  리셋만 예외다 — 사용자 설정이 모든 컴포넌트 스타일보다 앞서야 해서 일부러 쓴다.
