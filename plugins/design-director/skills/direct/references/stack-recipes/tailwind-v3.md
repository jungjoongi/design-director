# 레시피: Tailwind CSS v3

v3 는 `tailwind.config.*` 의 `theme.extend` 가 유틸리티를 만든다. 값을 설정 파일에 직접 쓰지 말고 **CSS 변수를
가리키게** 한다. 그래야 다크 모드·브랜드 조정 때 CSS 만 바꾸면 되고, v4 로 옮길 때도 변수가 그대로 남는다.

## 1. 구조 — 변수는 CSS, 이름은 설정

```css
/* app/globals.css (또는 src/index.css) */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-surface: 252 252 253;     /* 채널만 (rgb 의 r g b) — 알파 수식어(bg-surface/80)를 쓰기 위해 */
    --color-ink: 25 31 40;
    --color-muted: 95 104 117;
    --color-accent: 0.56 0.19 260;    /* oklch 성분만 — 아래 config 에서 oklch() 로 감싼다 */
    --color-line: 231 233 237;
    --radius-card: 20px;
    --radius-control: 12px;
  }
  .dark {
    --color-surface: 22 24 29;
    --color-ink: 241 243 245;
  }
  html:lang(ko) { word-break: keep-all; overflow-wrap: break-word; }
  body { @apply bg-surface text-ink; line-height: 1.65; letter-spacing: -0.01em; }
}
```

```js
// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx,vue,svelte,astro}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "oklch(var(--color-accent) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard", "-apple-system", "Apple SD Gothic Neo", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: ["clamp(2.5rem, 4vw + 1rem, 4.5rem)", { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "700" }],
        body: ["1rem", { lineHeight: "1.65", letterSpacing: "-0.01em" }],
      },
      borderRadius: { card: "var(--radius-card)", control: "var(--radius-control)" },
    },
  },
  plugins: [],
};
```

- `extend` 안에만 쓴다. `theme.colors` 를 통째로 바꾸면 기존 `text-gray-*` 가 사라져 범위 밖 화면이 깨진다.
- 색 변수는 **채널 형식**(`25 31 40`)으로 둔다. `#191F28` 로 두면 `bg-ink/10` 같은 알파 수식어가 동작하지 않는다.
  oklch 는 위 accent 처럼 성분만(`0.56 0.19 260`) 두고 `oklch(var(--color-accent) / <alpha-value>)` 로 부른다.
- `fontSize` 의 두 번째 값으로 행간·자간·굵기를 묶으면 `text-display` 하나로 브리프의 묶음이 들어간다.

## 2. 한국어

- `break-keep` 유틸리티는 v3.3 이상에 있다. 그 아래 버전이면 base 레이어의 `word-break: keep-all` 로 충분하다.
- `next/font/local` 의 `variable: "--font-pretendard"` 를 `<html className>` 에 붙이고, `fontFamily.sans` 첫 자리에
  `var(--font-pretendard)` 를 둔다(위 예시).

## 3. 적용 순서에 맞춘 체크

1. 토큰 — `:root` 변수 + `theme.extend` 이름. 역할 이름(`surface`·`ink`·`muted`·`accent`·`line`).
2. 타이포 — 폰트 로딩, `fontSize.display/body`, base 레이어 한국어 규칙.
3. 간격·레이아웃 — 섹션 간격에 강약을 준다: 히어로·핵심 기능 `py-20 md:py-28`, 일반 섹션 `py-16 md:py-24`,
   logo-cloud·cta-band 같은 띠 `py-12 md:py-16`. 모든 섹션이 같은 `py-24` 면 리듬이 사라진다(LA-3). 컨테이너 `max-w-6xl px-6`.
   임의 값 `[37px]` 정리(범위 안만).
4. 색 — 페이지의 `text-gray-*`·hex 를 역할 색으로.
5. 컴포넌트 — `rounded-control`·`rounded-card`, `focus-visible:ring-2 ring-accent ring-offset-2`, `disabled:opacity-50`.
6. 모션 — `motion-safe:` 접두, `transition-colors duration-150`.

## 4. 함정

- `content` 경로에 새로 만든 폴더가 빠지면 그 안의 클래스가 생성되지 않는다. 적용 후 스타일이 안 먹으면 여기부터 본다.
- 클래스 이름을 문자열 조합(`` `text-${color}-600` ``)으로 만들면 JIT 가 찾지 못한다. 완성된 클래스 문자열을 쓴다.
- 플러그인(`@tailwindcss/typography` 등)을 이 작업을 위해 새로 추가하지 않는다. 새 의존성은 브리프에 적고 승인받는다.
- `@apply` 를 컴포넌트마다 늘리지 않는다. 반복되는 묶음은 컴포넌트로 뽑는다.
