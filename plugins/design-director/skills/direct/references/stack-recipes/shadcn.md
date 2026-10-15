# 레시피: shadcn/ui

shadcn 은 라이브러리가 아니라 **프로젝트에 복사된 코드**다. `components/ui/*` 는 이 프로젝트의 소스이고, 브리프에
맞게 고치는 게 정상적인 사용법이다. 테마는 전역 CSS 의 변수 묶음이 정한다. Tailwind v4 레시피(`tailwind-v4.md`)
또는 v3 레시피와 함께 읽는다.

## 1. 핵심: `--primary` 만 바꾸면 여전히 "기본 shadcn" 이다

shadcn 기본 화면의 인상은 강조색이 아니라 **중립색 hue(무채 neutral/zinc), radius 0.625rem 하나, Geist·Inter 류 폰트,
36px 버튼, 테두리+옅은 그림자 카드**에서 온다. 그래서 강조색만 바꾸면 "색만 다른 shadcn" 이 된다(LA-1·SH-5).
브리프 방향이 보이려면 최소 다섯 가지를 같이 바꾼다.

| 바꿀 것 | 기본값(인상) | 바꾸는 법 |
|---|---|---|
| 중립 hue | 채도 0 회색 | `--background`·`--foreground`·`--muted`·`--border` 에 브랜드 hue 를 chroma 0.005–0.015 로 섞는다 |
| radius | `--radius: 0.625rem` 하나에서 sm/md/lg/xl 파생 | 브리프 radius 로. 카드와 컨트롤을 다르게 하려면 `rounded-card` 토큰을 따로 둔다 |
| 폰트 | Geist / 시스템 | 브리프 폰트(한국어면 Pretendard 등)를 `--font-sans` 에 |
| Button | `h-9 px-4`, `rounded-md`, 그림자 `shadow-xs` | 브리프의 높이(랜딩 44–48, 앱 32–40)·패딩·굵기를 `buttonVariants` 의 size·variant 에 |
| Card | `rounded-xl border shadow-sm` (경계+그림자+채움) | 경계·면 색·그림자 중 하나만(SH-5). 패딩·간격도 브리프로 |

## 2. 변수 목록 (Tailwind v4 판, OKLCH)

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);            --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);                  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);               --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);           --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);          --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);              --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);             --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);            --input: oklch(0.922 0 0);            --ring: oklch(0.708 0 0);
  /* --chart-1…5, --sidebar-* 도 있다 */
}
.dark { /* 같은 이름, 어두운 값 */ }
@theme inline {
  --color-background: var(--background);  --color-foreground: var(--foreground);
  --color-primary: var(--primary);        --color-primary-foreground: var(--primary-foreground);
  /* … 나머지도 같은 방식 */
  --radius-sm: calc(var(--radius) - 4px); --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);             --radius-xl: calc(var(--radius) + 4px);
}
```

- 위 값은 기본 테마(`baseColor: neutral`)의 대표값이다. 실제 값은 프로젝트의 전역 CSS 에서 읽는다.
- 예전(v3) 설치본은 `--background: 0 0% 100%;` 처럼 HSL 채널이고 `tailwind.config` 가 `hsl(var(--background))` 로 쓴다.
  형식을 섞지 말고 프로젝트가 쓰는 형식대로 값을 넣는다.
- `components.json` 의 `tailwind.css` 가 이 변수가 있는 파일이다.

## 3. 브리프 → shadcn 대응

| 브리프 토큰 | shadcn 변수 | 메모 |
|---|---|---|
| surface / bg | `--background`, `--card`, `--popover` | 카드와 배경을 같은 값으로 두면 카드는 경계로만 구분된다 |
| ink / text | `--foreground`, `--card-foreground` | 본문 대비 7:1 이상 권장 |
| muted text | `--muted-foreground` | 기본 0.556 은 흰 배경 4.5:1 근처다. 확인한다 |
| surface-2 | `--muted`, `--secondary` | 섹션 교대 배경 |
| accent (행동) | `--primary` (+ `-foreground`) | shadcn 의 `--accent` 는 hover 배경이다. 브랜드 강조는 `--primary` |
| hover 면 | `--accent` | 중립에 가깝게 |
| line | `--border`, `--input` | 배경 대비 1.2–1.5:1 |
| focus | `--ring` | 강조색, 배경 대비 3:1 이상 |
| radius | `--radius` (+ 별도 `--radius-card`) | |
| 오류 | `--destructive` | |

## 4. 컴포넌트 고치기

- `components/ui/button.tsx` 의 `buttonVariants` 에서 size(`default`·`sm`·`lg`)의 높이·패딩, variant 의 굵기·그림자를
  브리프 §6 대로 바꾼다. 새 variant 가 필요하면 추가한다(예: `variant: "quiet"`).
- `card.tsx` 는 `border`·`shadow-sm`·`bg-card` 중 브리프가 고른 하나만 남긴다. 여러 화면이 쓰는 컴포넌트라 바꾸기 전에
  사용처를 Grep 하고, 범위 밖 화면에 영향이 크면 페이지 전용 클래스(`className`)로 덮는 쪽을 택한다.
- 다른 화면에서도 쓰는 `components/ui/*` 를 고치면 브리프 §9 "바뀌는 파일"에 적고 승인 범위에 넣는다.
- 상태: `focus-visible:ring-[3px] ring-ring/50` 같은 기본 포커스가 이미 있다. 지우지 말고 색·두께만 브리프에 맞추되 알파는
  뺀다(`ring-ring`). `/50` 이면 흰 배경 대비가 1.5:1 안팎이라 포커스 링 3:1(WCAG 1.4.11)에 못 미친다. `--ring` 도 배경 대비 3:1 이상으로.

## 5. 함정

- `--accent` 를 브랜드 색으로 바꾸면 메뉴·드롭다운의 hover 배경이 전부 브랜드 색이 된다.
- `.dark` 블록을 잊으면 다크 모드에서 라이트 값과 섞인다. 브리프가 다크를 다루지 않으면 다크 값은 건드리지 않는다.
- `tells` 를 `components/ui/*` 원본에 돌리면 오버레이 그림자가 SH-2 로 잡힌다. 페이지 파일만 넘긴다.
