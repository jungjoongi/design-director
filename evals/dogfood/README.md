# dogfood 회귀 기준선

2026-10-15 에 `ref` 로 실측한 브랜드 9개(toss · daangn · 29cm · linear · stripe · vercel · notion · apple · musinsa)의
결과다. 번들 브랜드 카드(`plugins/design-director/references/brands/<slug>.md`)의 원본이고, 다음 캡처와 비교하는
회귀 기준선이다. 플러그인 폴더 밖이라 설치본에는 들어가지 않는다.

```
evals/dogfood/<slug>/<YYYY-MM-DD>/
├── profile.md    ref 가 쓴 프로필 원본. 사이트 카피만 "…" 로 지웠다
└── tokens.json   엔진 산출물. 사이트 텍스트 필드만 "…" 로 바꿨다
```

- 정화: tokens.json 의 `source.title`, `structure.sections[].heading.text`, `components.*[].label` 값을 "…" 로
  바꿨다(빈 값은 그대로). 수치와 구조는 엔진 출력 그대로다. profile.md 는 인용된 버튼 라벨·섹션 제목·배지 문구를
  "…" 로 바꿨다. frontmatter 의 `slug`·`shots` 도 캡처 당시 값 그대로다.
- 스크린샷(desktop.png · mobile.png · overview.jpg · slices/), summary.md, raw/, capture.json 은 넣지 않는다.
  summary.md 는 사이트 제목 원문을 담고 있어서 뺐다.
- toss: tokens.json 은 타이포 측정을 고친 엔진으로 같은 날 다시 잰 값이다(히어로 헤드라인 display 80px 측정).
  profile.md 는 첫 캡처 판이라 그 값을 72–80px 추정으로 적고 있다. 카드는 재측정 값을 따른다.
- ohou(https://ohou.se)는 봇 차단(HTTP 403)으로 캡처하지 못해 기준선이 없다.

## 새 캡처와 비교하기

`capture` 의 `--out` 은 현재 폴더 안이어야 해서 저장소 루트에서 `evals/.runs/`(커밋하지 않는 폴더) 아래로 찍는다.

```bash
node plugins/design-director/scripts/dd.mjs capture https://toss.im/ --out evals/.runs/dogfood/toss
node -e '
const [a, b] = process.argv.slice(1).map((p) => JSON.parse(require("fs").readFileSync(p, "utf8")));
const pick = (t) => ({
  type: t.typography.roles,
  color: Object.fromEntries(Object.entries(t.color.roles).map(([k, v]) => [k, v.hex])),
  section: t.space.section, container: t.space.container,
  radius: t.shape.radius.components, motion: t.motion.durations,
});
const A = pick(a), B = pick(b);
for (const k in A) if (JSON.stringify(A[k]) !== JSON.stringify(B[k])) console.log(k, "\n  기준", JSON.stringify(A[k]), "\n  새것", JSON.stringify(B[k]));
' evals/dogfood/toss/2026-10-15/tokens.json evals/.runs/dogfood/toss/tokens.json
```

타이포 역할 · 색 역할 · 섹션 여백 · 컨테이너 · radius · 모션 속도 가운데 달라진 것만 출력한다. 값이 바뀌었으면
스크린샷으로 사이트 개편인지 엔진 회귀인지 가린다. 개편이면 새 날짜 폴더에 기준선을 더하고 카드를 고친다
(`docs/contributing/dogfood-brands.md`). 엔진 회귀면 기준선은 그대로 두고 엔진을 고친다.

## 넣지 않는 것

타사 사이트의 스크린샷과 카피는 이 폴더에도 커밋하지 않는다. 새 기준선을 더할 때도 위와 같이 정화한다.
