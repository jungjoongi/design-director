# Reference Profile 스키마 (profile.md)

`ref` 가 쓰고 `direct` 가 읽는 파일이다. 사람이 읽는 문서이면서 기계가 파싱하는 계약이므로
**frontmatter 키와 헤딩 문구·순서를 바꾸지 않는다.** 본문 언어는 사용자 언어를 따르고, 디자인 용어는 영어 원어를 병기한다.

위치: `.design/references/<slug>/profile.md` (같은 폴더에 엔진이 만든 `tokens.json`·`summary.md`·`capture.json`)

## frontmatter

```yaml
---
schema: dd.profile/1
slug: moanote-example      # 가상의 예시 사이트 (skills/ref/references/profile-example.md)
name: 모아노트
input_type: url            # url | image | brand | style
source: https://moanote.example/   # URL, 이미지 경로, brands/<slug>.md, styles/<id>.md
captured_at: 2026-10-14     # 캡처·분석 날짜
method: cdp                 # cdp | mcp | static | vision | card | catalog
viewports: [desktop-1440x900, mobile-390x844]
confidence: high            # high | medium | low
theme: light                # light | dark | mixed
shots: files                # files | session-only | none
recapture: null             # shots: session-only 일 때 {url, viewports}
styles: {primary: minimal, secondary: swiss, treatments: []}
structure: "nav → hero-split → logo-cloud → feature-alternating(3) → how-it-works(3) → testimonials(2) → pricing(3) → faq → cta-band → footer"
evidence: {measured: 74, declared: 0, derived: 19, estimated: 7, catalog: 0}   # 토큰 행 근거 비율(%, 합 100)
status: complete            # partial | complete — partial 이면 아직 쓰는 중이다(direct 는 완성본으로 쓰지 않는다)
generated_by: design-director ref 0.1.0
# 번들 브랜드 카드(references/brands/<slug>.md)에만 붙는 키
bundled: true               # 플러그인에 들어 있는 카드
verified: 2026-10-14 maintainer spot-check   # 메인테이너가 DevTools 로 값 5개를 대조한 날
---
```

입력 종류별로 달라지는 키:

| input_type | method | source | viewports | shots | structure |
|---|---|---|---|---|---|
| url | `cdp` (캡처 실패로 내려가면 `mcp`·`static`) | URL | 캡처한 뷰포트 | `files` (mcp 면 `session-only` + `recapture`) | 측정 시퀀스 |
| image | `vision` | 이미지 경로(대화에 붙인 이미지면 `pasted`) | 이미지 크기로 추정한 뷰포트 | `none` | 보이는 범위의 시퀀스, 모르면 `""` |
| brand | `card` | `brands/<slug>.md` | 카드의 값 그대로 | `none` | 카드의 값 그대로 |
| style | `catalog` | `styles/<id>.md` | `[]` | `none` | `""` (7장에 대표 구조를 예시로만 적는다) |

**번들 브랜드 카드**도 이 스키마를 그대로 따른다. 분량을 150줄 안팎으로 줄이고(토큰 표는 핵심 15행 정도), 스크린샷 없이 텍스트만 두며, 수치는 실제
캡처에서만 가져온다. "흔한 오해"(예: "토스 ≠ 파랑 + 둥근 카드")는 8장 Do / Don't 안에 쓴다. 카드를 쓰는 절차(복사·키 변경·
오래된 카드 처리)는 `brands/_index.md` 에만 적는다. 카드를 복사한 프로필도 같은 스키마라서 `direct` 는 둘을 구분하지 않는다.

**작성 중 표시** — `ref` 는 수집 직후 frontmatter(`status: partial`)와 고정 헤딩 전부로 뼈대를 먼저 쓰고, 아직 안 쓴 장에
`<!-- todo -->` 를 남긴다. 첫 번째 todo 가 있는 장이 다음 단계다(컨텍스트가 줄어든 뒤 재개할 때 쓴다). 완성하면 todo 를
모두 지우고 `status: complete` 로 바꾼다. `direct` 는 `partial` 프로필을 완성본으로 쓰지 않는다.

## 헤딩 (고정 순서)

```markdown
# {이름} — Reference Profile

## 1. 본질 (Essence)
## 2. 스타일 분류 (Classification)
## 3. 무드 키워드 (Mood)
## 4. 시그니처 무브 (Signature Moves)
## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
### 5.2 색 (Color)
### 5.3 간격·레이아웃 (Space & Layout)
### 5.4 형태·깊이 (Shape & Depth)
### 5.5 모션 (Motion)
### 5.6 이미지·아이콘 (Imagery & Icons)
## 6. 컴포넌트 (Components)
## 7. 페이지 구조 (Page Anatomy)
## 8. 따라 할 때 Do / Don't
## 9. 폰트 대체 (Font Substitutes)
## 10. 베끼지 말 것 (Don't Copy)
## 11. 프롬프트 (Prompt Snippet)
## 부록: 화면 관찰 (Visual Read)
## 부록: 측정 메모 (Capture Notes)
```

## 섹션별 규칙

**1. 본질** — 한 문장. 템플릿: "[대상]을 위해 [핵심 수단]으로 [느낌]을 만든다."
- 좋은 예: "회의가 많은 팀을 위해 넓은 여백과 실제 요약 화면, 녹음 상태에만 쓰는 빨강 하나로 '조용히 정확한 비서' 느낌을 만든다."
- 나쁜 예: "깔끔하고 모던한 사이트." (수단이 없다)

**2. 스타일 분류** — `styles/_index.md` 의 id 로. primary 1, secondary 0–1, treatments 0–2. 각각 근거 한 줄(토큰 값 또는
화면 위치). 카탈로그에 맞는 게 없으면 "카탈로그 밖: 가장 가까운 X + 차이"로 쓴다. 마지막에 6개 축 위치를 한 줄로 적는다
(`축: 밀도 2 · 온도 2 · 채도 1 · 대비 4 · 둥긂 2 · 장식 1`). direct 가 느낌어를 축 변화로 옮길 때 이 줄을 쓴다.

**3. 무드 키워드** — 5–7개, `한국어 (English)` 쌍. '모던·깔끔·세련·예쁜' 은 단독으로 쓰지 않는다. 이 플러그인이
대체하려는 말이기 때문이다. 쓰려면 수식을 붙인다("여백으로 깔끔한 (whitespace-led clean)").

**4. 시그니처 무브** — 3–5개. `signature-moves.md` 형식을 따른다: 동사로 끝나는 지시문 제목(예: "섹션을 여백으로만 나눈다"), 관찰 위치, 수치, 기본값과의 차이,
따라 하는 법, 깨지는 경우. 수치(px·%·hex·ms·비율)가 없는 무브는 무브가 아니다.

**5. 토큰** — 6개 하위 섹션 모두 채운다. 표 열은 `토큰 | 값 | 근거 | 쓰임·메모`. 근거는 `측정 / 선언 / 파생 / 추정 / 카탈로그`.
값을 못 구하면 칸을 비우지 말고 "측정 실패: 이유"를 쓴다.

| 하위 섹션 | 최소 행 |
|---|---|
| 5.1 타이포 | 패밀리(본문·디스플레이), display/h1/h2/body/small 크기·굵기·행간·자간, 스케일 비율, clamp |
| 5.2 색 | bg, surface, text, text-muted, border, accent(+fg), 대비 결과 1–2개, 중립 온도 |
| 5.3 간격·레이아웃 | 기준 단위, 섹션 상하 여백(D/M), 컨테이너 폭, 거터, 그리드 열·간격, 밀도 |
| 5.4 형태·깊이 | radius(버튼·카드·입력), 테두리, 그림자 스타일·단계 |
| 5.5 모션 | 속도 단계, easing, 등장 연출 여부, reduced-motion 대응 |
| 5.6 이미지·아이콘 | 이미지 비중, 사진/일러스트/제품 화면 중 무엇, 아이콘 스타일(선 굵기·크기), 영상 |

**6. 컴포넌트** — 보이는 것만: 버튼(변형별 높이·패딩·radius·색), 내비, 카드, 입력, 배지, 리스트 행. v0.1 엔진은 hover·focus
같은 상태를 재지 않는다. 기본 상태만 적고, 상태 값은 "측정 실패: 정적 캡처"로 둔다.

**7. 페이지 구조** — `sections.md` id 로 된 표(순번·id·레이아웃 한 줄·배경·비고) + 축약 ASCII(박스 안은 영문 라벨) + 모바일 변화.

**8. Do / Don't** — Do 3–6개, Don't 3–6개. Don't 마다 깨지는 무브 번호나 `ai-default-tells.md` 의 ID 를 붙인다.

**9. 폰트 대체** — 표: `원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모`. `korean-typography.md` 대체 표를 따른다.

**10. 베끼지 말 것** — 항상 채운다. 로고·워드마크·일러스트·마스코트·사진·카피·유료 폰트 파일·아이콘 세트 중 해당하는 것.
"느낌은 레버에서 오고 자산에서 오지 않는다."

**11. 프롬프트** — 다른 AI 도구에 그대로 붙일 수 있는 3–6줄(KR, 필요하면 EN). 스타일 이름 + 무브 + 핵심 수치 + 금지.

**부록: 화면 관찰** — 스크린샷을 보면서 적은 정성 관찰(구도, 사진 톤, 리듬). 스크린샷이 세션에서만 보였던 경우
(`shots: session-only`) 나중에 비교할 기억이 되므로 더 자세히 쓴다.

**부록: 측정 메모** — 캡처 방법, 경고 코드, 숨긴 오버레이, 신뢰도가 낮은 영역, 근거 비율 계산.

## direct 가 이 파일에서 쓰는 것

frontmatter 의 `styles`·`structure`·`viewports`, 4장 무브, 5장 토큰 표, 7장 구조, 8장 Don't, 9장 대체 폰트, 11장 프롬프트.
그래서 이 부분은 형식을 특히 지킨다.
