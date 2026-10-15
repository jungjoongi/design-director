# 레시피: Tailwind CSS v4

v4 는 설정 파일 대신 CSS 의 `@theme` 블록이 토큰이다. `@theme` 에 넣은 변수는 (1) 유틸리티 클래스를 만들고
(2) `:root` CSS 변수로도 나온다. 브리프 §5 토큰을 여기에 옮기면 클래스와 변수가 한 번에 바뀐다.

## 1. 네임스페이스

| 브리프 범주 | `@theme` 변수 | 만들어지는 유틸리티 |
|---|---|---|
| 색 | `--color-surface`, `--color-ink`, `--color-accent` | `bg-surface`, `text-ink`, `border-accent`, `ring-accent` … |
| 폰트 | `--font-sans`, `--font-display` | `font-sans`, `font-display` |
| 글자 크기 | `--text-display` + `--text-display--line-height` · `--text-display--letter-spacing` · `--text-display--font-weight` | `text-display` 하나로 크기·행간·자간·굵기 |
| 자간·행간 | `--tracking-tight`, `--leading-relaxed` | `tracking-tight`, `leading-relaxed` |
| radius | `--radius-card`, `--radius-control` | `rounded-card`, `rounded-control` |
| 그림자 | `--shadow-overlay` | `shadow-overlay` |
| easing | `--ease-out-soft` | `ease-out-soft` |
| 간격 | `--spacing` (기본 0.25rem), 이름 붙인 간격 `--spacing-section` | `p-4` = `calc(var(--spacing) * 4)`, `py-section`·`gap-section` |
| 컨테이너·브레이크포인트 | `--container-content`, `--breakpoint-*` | `max-w-content`, `md:` … |

- 이름은 유틸리티로 읽혔을 때 뜻이 보이게 짓는다: `bg-surface`·`text-ink`·`text-muted` 가 `bg-gray-50` 보다 낫다.
  역할 이름이면 나중에 값만 바꿔도 페이지 전체가 따라온다.
- 브리프의 `--space-section` 은 v4 에서 `--spacing-section` 으로 옮긴다(값은 그대로). 그러면 `py-section` 처럼 이름으로 쓴다.
  css-variables 레시피의 `--space-*`·`--container` 도 v4 에서는 `--spacing-*`·`--container-*` 가 된다.
- 기본 팔레트를 지우고 역할 색만 쓰려면 `--color-*: initial;` 을 먼저 둔다(기존 코드가 `text-gray-600` 등을
  쓰고 있으면 지우지 않는다 — 범위 밖 수정이 된다).

## 2. 예시 (모아노트 「친근한 명료함」)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  --color-surface: oklch(0.99 0 0);  --color-ink: oklch(0.22 0.01 260);  --color-accent: oklch(0.56 0.19 260);
  --color-muted: oklch(0.48 0.01 260);  --color-line: oklch(0.92 0.005 260);
  --text-display: clamp(2.5rem, 4vw + 1rem, 4.5rem);  --text-display--line-height: 1.2;  --text-display--letter-spacing: -0.03em;
  --text-body: 1rem;  --text-body--line-height: 1.65;  --text-body--letter-spacing: -0.01em;
  --spacing-section: clamp(72px, 8vw, 112px);   /* 브리프 §5 섹션 상하 112px (모바일 72px) → py-section */
  --radius-card: 20px;  --radius-control: 12px;
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}

@layer base {
  html:lang(ko) { word-break: keep-all; overflow-wrap: break-word; }
  body { line-height: 1.65; letter-spacing: -0.01em; }
  :where(h1, h2, h3) { text-wrap: balance; }
}
```

## 3. 변수를 참조할 때는 `@theme inline`

`next/font` 가 만든 `--font-pretendard` 처럼 **다른 변수를 가리키는** 토큰은 `@theme inline` 에 둔다. 그냥 `@theme`
에 두면 유틸리티가 `var(--font-sans)` 를 거쳐 다시 `var(--font-pretendard)` 를 찾는데, 변수가 정의된 요소
(`<html>` 의 className)와 쓰는 위치가 어긋나면 폴백 폰트로 떨어진다. `inline` 은 값을 유틸리티에 바로 넣는다.

```css
@theme inline {
  --font-sans: var(--font-pretendard), -apple-system, "Apple SD Gothic Neo", sans-serif;
  --color-background: var(--background);   /* shadcn 변수 연결도 같은 방식 (shadcn.md) */
}
```

## 4. 다크 모드

```css
@custom-variant dark (&:where(.dark, .dark *));   /* 클래스 토글. 시스템 설정만 따를 거면 생략(기본 media) */

:root { --surface: oklch(0.99 0 0); --ink: oklch(0.22 0.01 260); }
.dark { --surface: oklch(0.18 0.01 260); --ink: oklch(0.96 0 0); }
@theme inline { --color-surface: var(--surface); --color-ink: var(--ink); }
```

- 다크 값은 라이트 값을 뒤집는 게 아니라 다시 고른다: 배경 L 0.16–0.2(순검정 대신, CO-6 참고), 텍스트 L 0.92–0.96,
  강조 chroma 를 0.02–0.04 낮춘다.

## 5. 적용 순서에 맞춘 체크

1. 토큰 — `@theme` 에 브리프 §5 를 옮긴다. 이름은 역할로.
2. 타이포 — 폰트 로딩(`${CLAUDE_PLUGIN_ROOT}/references/korean-typography.md` §6), `--text-*` 묶음, base 레이어의 한국어 규칙.
3. 간격·레이아웃 — 섹션 간격에 강약을 준다: 히어로·핵심 기능은 `py-section`, 일반 섹션은 한 단계 작게(`py-20 md:py-24`),
   logo-cloud·cta-band 같은 띠는 `py-12 md:py-16`. 모든 섹션에 같은 `py-24` 를 쓰면 스크롤해도 같은 화면이 반복된다(LA-3).
   임의 값 `py-[37px]` 은 지운다.
4. 색 — `bg-surface`·`text-ink`·`text-muted` 로 바꾼다. 페이지 안의 `text-gray-*`·hex 하드코딩을 역할 색으로.
5. 컴포넌트 — `rounded-card`·`rounded-control`, 상태 클래스(`hover:`·`focus-visible:`·`disabled:`·`aria-busy:`).
6. 모션 — `motion-safe:` 접두로만 이동 애니메이션을 건다. `transition-colors duration-150` 이 기본.

## 6. 함정

- **v3 설정 파일은 무시된다.** `tailwind.config.js` 가 남아 있어도 CSS 에 `@config "../tailwind.config.js";` 가 없으면
  읽히지 않는다. 토큰을 거기에 써 봐야 반영되지 않는다. 새 토큰은 `@theme` 에 쓴다.
- **임의 값 정리.** `text-[15px]`·`mt-[13px]` 같은 값이 페이지에 흩어져 있으면 토큰을 바꿔도 따라오지 않는다.
  범위 안 파일에서만 스케일 값으로 바꾼다.
- `@theme` 안에서는 `@media` 나 선택자를 쓸 수 없다. 반응형 크기는 `clamp()` 로, 테마 전환은 `:root`/`.dark` 변수로.
- `--text-display` 처럼 새 이름을 만들면 기존 `text-5xl` 은 그대로 남는다. 페이지 안의 헤드라인 클래스를 직접 바꾼다.
- 가로로 늘어놓는 묶음은 `space-x-*` 대신 flex/grid `gap-*` 을 쓴다. 모바일에서 줄이 넘어가면(`flex-wrap`)
  `space-x` 는 다음 줄 첫 요소에 여백을 남겨 정렬이 어긋난다.
