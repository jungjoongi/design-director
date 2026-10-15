# 스택 감지

`direct` 1단계에서 프로젝트가 스타일을 어디서 어떻게 정의하는지 판정한다. 결과는 브리프 frontmatter `stack` 에
적고(`tailwind-v4+shadcn` 처럼 `+` 로 겹침), 6단계에서 해당 레시피 하나(겹치면 둘)만 읽는다.

## 1. 신호 → 스택

위에서부터 확인하고, 해당하는 것을 모두 적는다. shadcn 은 Tailwind 위에 겹친다.

| 신호 (Glob·Grep) | 스택 | 레시피 |
|---|---|---|
| CSS 에 `@import "tailwindcss"`, 또는 의존성 `@tailwindcss/postcss`·`@tailwindcss/vite` | tailwind-v4 | `tailwind-v4.md` |
| `tailwind.config.{js,cjs,mjs,ts}` + CSS 에 `@tailwind base` | tailwind-v3 | `tailwind-v3.md` |
| v4 신호 + `tailwind.config.*` + CSS 의 `@config` | tailwind-v4 (v3 설정을 불러 쓰는 중) | `tailwind-v4.md` §함정 |
| 루트의 `components.json` (`"style"`, `"tailwind"` 키) | shadcn | `shadcn.md` + 위 둘 중 하나 |
| 의존성 `styled-components`·`@emotion/*`·`@vanilla-extract/*` | CSS-in-JS | `css-variables.md` 를 쓰고 테마 객체에 연결 (v0.1 대체 경로) |
| 그 밖의 `.css`·`.scss`·CSS Modules | css-variables | `css-variables.md` |

- 의존성은 `package.json` 의 `dependencies`·`devDependencies` 에서 본다. 모노레포면 대상 앱의 `package.json`.
- CSS-in-JS 는 v0.1 에서 전용 레시피가 없다. 토큰을 `:root` CSS 변수로 두고 테마 객체가 `var(--…)` 를 참조하게
  한다(MUI 는 `cssVariables`, styled-components 는 ThemeProvider 값에 `var()` 문자열).
- MUI·Chakra·Mantine 처럼 컴포넌트 라이브러리가 테마를 쥐고 있으면 그 테마 파일이 토큰 위치다. 브리프 §9 에 적는다.

## 2. 프레임워크별 위치

| 프레임워크 (신호) | 전역 CSS | 폰트 로딩 | `lang="ko"` | dev 포트 |
|---|---|---|---|---|
| Next.js App Router (`app/layout.tsx`) | `app/globals.css` | `next/font/local`·`next/font/google` 을 `layout.tsx` 에서 | `layout.tsx` 의 `<html>` | 3000 |
| Next.js Pages (`pages/_app.tsx`) | `styles/globals.css` | `_app.tsx` 에서 next/font, 또는 `_document.tsx` 의 `<link>` | `_document.tsx` 의 `<Html lang>` | 3000 |
| Vite + React (`vite.config.*`, `index.html`) | `src/index.css` | `index.html` 의 `<link>` 또는 CSS `@font-face`·`@import` | `index.html` | 5173 |
| Astro (`astro.config.*`) | 레이아웃이 import 하는 CSS | 레이아웃 `<head>` 의 `<link>`, Astro Fonts API | `src/layouts/*.astro` 의 `<html>` | 4321 |
| Nuxt (`nuxt.config.*`) | `assets/css/*` (`css:` 옵션) | `app.head.link` 또는 CSS | `app.head.htmlAttrs.lang` | 3000 |
| SvelteKit (`svelte.config.*`) | `src/app.css` (+layout 에서 import) | `src/app.html` 의 `<link>` 또는 CSS | `src/app.html` | 5173 |
| Remix / React Router (`app/root.tsx`) | `app/*.css` (`links`) | `root.tsx` 의 `links` | `root.tsx` 의 `<html>` | 3000 또는 5173 |

- 실제 포트는 `package.json` 의 dev 스크립트(`--port`, `-p`)와 설정 파일이 우선이다.
- 폰트가 선언만 되고 로드되지 않는 경우가 흔하다. capture `summary.md` 패밀리 표의 `source` 가 `fallback-likely` 면
  로딩 위치부터 확인한다.

## 3. 현재 토큰 찾기

- Tailwind v4: `@theme` 블록(`--color-*`, `--font-*`, `--text-*` …). shadcn 이면 `:root`·`.dark` 변수 + `@theme inline`.
- Tailwind v3: `tailwind.config.*` 의 `theme.extend` + 전역 CSS 의 `:root` 변수.
- 그 밖: `:root` 변수, `$변수`(SCSS), 테마 객체. 없으면 하드코딩 값이 토큰이다 — 브리프 §5 "현재" 열에 실측값을 적는다.
- 하드코딩이 섞여 있으면 Grep `\[\d+(\.\d+)?px\]`·`#[0-9a-fA-F]{3,8}\b` 으로 페이지 범위의 값만 센다. 전역 리팩터는
  범위 밖이다(SKILL.md "하지 않는 것").
