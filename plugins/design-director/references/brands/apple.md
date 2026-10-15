---
schema: dd.profile/1
slug: apple
name: Apple 대한민국
input_type: url
source: https://www.apple.com/kr/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: mixed
shots: none
recapture: null
styles: {primary: minimal, secondary: luxury, treatments: [glassmorphism]}
structure: "nav → hero-product(3) → bento-grid(6) → carousel → footer"
evidence: {measured: 73, declared: 7, derived: 13, estimated: 7, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# Apple 대한민국 — Reference Profile

## 1. 본질 (Essence)
제품을 고르러 온 사람을 위해 12px 흰 틈으로만 나뉜 검정·연회색 타일 벽에 타일마다 제품 렌더 하나를 올리고 파랑은 버튼에만 남겨 진열장 앞에 선 느낌을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `minimal` — UI 는 무채색 램프 10단계 + 강조 파랑 1색(버튼·링크에만), 그림자 0개, 장식 요소 없음, 첫 화면 빈 칸 93%(파생), 첫 화면 메시지 1개 + CTA 2개. 단 카탈로그의 섹션 여백 120–200px 대신 여백 0 + 타일 틈 12px 로 구획한다(여백은 타일 안에 있다)
- secondary: `luxury` — 레버 일부만: 순검정 위 스튜디오 조명 제품 렌더, 이미지 면적 177%, 타일 radius 0, 작고 조용한 버튼(44px, 굵기 400). 세리프·넓은 자간 대문자·느린 모션은 없다
- treatments: `glassmorphism` — 내비 한 곳에만 `#1D1D1FCC` 반투명 + backdrop blur(blur 요소 1개). 카드·타일에는 쓰지 않는다
- 축: 밀도 1 · 온도 2 · 채도 2 · 대비 5 · 둥긂 3 · 장식 1 (채도는 UI 1 에 제품 사진이 더해 2, 둥긂은 타일 0 + 버튼 pill 의 중간값)

## 3. 무드 키워드 (Mood)
진열장 같은 (showroom-like) · 명도로 리듬을 타는 (light–dark tile rhythm) · 제품이 말하는 (product-forward) · 버튼이 조용한 (understated CTAs) · 스튜디오 조명의 (studio-lit) · 타일 안 여백으로 숨 쉬는 (airy within the tile)

## 4. 시그니처 무브 (Signature Moves)
### 1. 페이지를 제품 타일로 쌓고 12px 흰 틈으로만 나눈다
- 수치: 섹션 여백 0px(측정), 타일 틈 12px(파생: 반폭 702px × 2 + 12 × 3 = 1440), 풀폭 타일 높이 692px(선언 `--hero-content-height`), 반폭 높이 580px(파생), 타일 radius 0 · 그림자 0(측정)
- 따라 하는 법: `.tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:0 12px 12px}` `.tile--full{grid-column:1/-1;margin-inline:-12px;min-height:692px}` `.tile{border-radius:0;box-shadow:none}` 734px 아래는 1열. 보여 줄 대상이 3개 이하면 타일 벽보다 섹션 여백 쪽이 낫다
### 2. 타일 배경을 순검정과 #F5F5F7 로 번갈아 명도로 리듬을 만든다
- 수치: 배경 면적 흰 47% · #F5F5F7 27% · #000000 26%(측정), 다크는 #111 이 아니라 순검정. 풀폭 3장은 검정 → 회색 → 검정, 반폭 행은 좌우가 엇갈린다
- 따라 하는 법: `--tile-dark:#000;--tile-light:#F5F5F7` 2열 행은 체커보드로 엇갈리고, 다크 타일 테두리 버튼은 #2997FF. 제품 이미지는 타일과 같은 배경에서 찍은(또는 투명) 렌더여야 한다
### 3. 모든 타일을 같은 가운데 스택으로 연다
- 수치: 제품명 56px/600/1.18(풀폭) · 40px/600/1.1(반폭), 태그라인 28px/400/1.25, 타일 상단 안쪽 53px(측정). 제품명:태그라인 = 크기 2:1 + 굵기 600:400
- 따라 하는 법: `.tile{display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:53px}` 제품명 `font:600 clamp(2rem,1.443rem + 2.286vw,3.5rem)/1.18` → 한 줄 태그라인 → pill 2개. 설명 문단은 넣지 않는다(TY-6), 태그라인은 20자 안팎
### 4. 파랑은 누를 것에만, 작은 pill 로 쓴다
- 수치: 채운 버튼 #0071E3, 라이트 위 테두리·링크 #0066CC, 다크 위 테두리 #2997FF(측정). 높이 44 · 패딩 21 · pill · 17px/400, 반폭 타일은 36 · 패딩 15(측정). 흰 글자/파랑 4.7:1(파생)
- 따라 하는 법: `.btn{height:44px;padding:0 21px;border-radius:980px;font:400 17px/1 var(--font-sans)}` 채움은 #0071E3, 보조는 `border:1px solid currentColor;color:#0066CC`. 버튼 2개는 정보 보기와 구매처럼 실제로 두 행동이 있을 때만(CP-6)
### 5. 제품 렌더가 색을 독점하게 하고 타일 아래쪽을 채운다
- 수치: 이미지 면적 177%(측정, 겹침 포함), UI 는 무채색 10단계 + 강조 1색, 글자 그라데이션 0(측정), 렌더가 타일 높이의 약 50–60%(추정)
- 따라 하는 법: `.tile img{margin-top:auto;width:min(100%,980px);object-fit:contain}` 실물 품질의 제품 이미지가 없으면 이 무브를 버리고 minimal 의 여백 무브로 간다. AI 생성 렌더면 IC-5

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | SF Pro KR (스택 SF Pro KR, SF Pro Text, Yoon Gothic …, 웹폰트) | 측정 | 한 패밀리로 전부. Apple 독점 서체 → 9장 |
| 제품명 · 태그라인 | 풀폭 56/32px · 600 · 1.18 · 0em / 반폭 40px · 600 · 1.1 / 태그라인 28px · 400 · 1.25 | 측정 | 엔진 h1 역할(28/400)은 화면상 태그라인 |
| 버튼 · 내비 · small | 17px · 400 / 12px · 600 · 1.33 / 12px · 400 · 1.33 | 측정 | 버튼 굵기 400 이 핵심. keep-all 100%, 스케일 1.5 (fit 0.66) |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface · bg-inverse | #FFFFFF 47% · #F5F5F7 27% · #000000 26% | 측정 | 흰색은 타일 틈 색. IMAGE_HEAVY 라 비중은 참고값 |
| headline text | #1D1D1F | 선언 | `--sk-headline-text-color`. 라이트 타일 제목 |
| text · text-muted | #0000008F (합성 #707070) · #999999 | 측정 | text 는 푸터·각주 글자 수 기준. muted 는 날짜 줄 |
| accent | 채움 #0071E3 / fg #FFFFFF · 링크·테두리 #0066CC (라이트) · #2997FF (다크) | 측정 | 버튼·링크에만 (무브 4) |
| 대비 | accent-fg/accent 4.7:1 · text/bg 4.95:1 · muted/bg 2.85:1 | 파생 | 날짜 줄은 미달 — 따라 할 땐 #6E6E73 이상 (CO-7) |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 타일 틈 · 섹션 여백 | 12px · 0px | 파생 | 702 × 2 + 12 × 3 = 1440. 여백 0 은 측정, 모바일은 좌우 0 · 세로 12(추정) |
| 타일 치수 | 풀폭 높이 692px · 반폭 702 × 580 · 상단 안쪽 53px | 측정 | 692 는 선언, 580 은 파생. 캐러셀 타일 930 × 523 · 틈 13(선언) |
| 컨테이너 · 거터 | max-width 980px · 22 / 16px | 측정 | 내비·푸터·텍스트만, 타일은 풀블리드. 기준 단위 없음 |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 타일·카드 0 · 버튼 pill (100%) | 측정 | 모서리는 0 과 pill 두 값뿐 |
| 그림자 · 테두리 · 글래스 | 그림자 0개 (flat) · 테두리 1px low · 내비만 #1D1D1FCC + backdrop blur | 측정 | 깊이는 배경 명도 3단계(#000 / #F5F5F7 / #FFF)가 맡는다 |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 250 / 320 / 400ms · `cubic-bezier(0.4, 0, 0.6, 1)` · keyframe 0 · reduced-motion 대응함 | 측정 | 전환 29개. 캐러셀은 자동 넘김 + 일시정지(추정) |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | 스튜디오 조명 제품 렌더(검정·연회색 배경), 엔터테인먼트 영역만 포스터. 이미지 177% · 아이콘 14개 · 영상 0 | 추정 | 비중·개수는 측정. 사람 사진 거의 없음, 아이콘은 얇은 선 약 18px |

## 6. 컴포넌트 (Components)
- 버튼: primary 높이 44 · 패딩X 21 · pill · #0071E3 · 흰 글자 17px/400(×18), secondary 다크 위 1px #2997FF(높이 44) / 반폭 라이트 위 높이 36 · 패딩X 15 · 1px #0066CC(측정)
- 내비: 높이 D 44 / M 48 · fixed · blur · #1D1D1FCC · 테두리 없음 · CTA 없음, 12px 링크 11개(ghost, #FFFFFFCC)가 980px 안에 균등 배치, 모바일 햄버거(측정)
- 타일: 라이트 폭 702 · padding-top 53 · radius 0 · #F5F5F7 / 다크 #000, 테두리·그림자 없음 / 캐러셀 타일 930 × 523 · radius 0(측정·선언)
- 캐러셀 컨트롤: 높이 24 · pill · #D2D2D7A3 · 글자 #0000007A(측정), 점 6개(활성은 가로 pill, 추정). 입력·배지 없음, hover·focus 는 측정 실패: 정적 캡처(선언 focus #0071E3)

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 44px fixed 반투명 바, 로고 + 12px 링크 11개 + 검색·가방 아이콘, 980px 안 균등 배치, CTA 없음 | #1D1D1FCC | 글래스 |
| 2 | hero-product (3) | 풀블리드 타일 3장(각 692px), 가운데 스택(제품명 56 + 태그라인 28 + pill 2) + 아래 제품 렌더 | inverse → surface → inverse | 첫 장만 히어로, 나머지 둘도 같은 문법 |
| 3 | bento-grid (6) | 2열 반폭 타일 3행(702 × 580), 틈·가장자리 12px, 같은 가운데 스택(제품명 40) | 행마다 엇갈림 | 엔진 content-list(0.7)를 정정 |
| 4 | carousel | 930 × 523 포스터 타일이 13px 틈으로 이어지고 양옆이 화면 밖으로 잘림, 아래 점 6개 | 사진 | 엔진 tabs-showcase(0.85)를 정정 |
| 5 | footer | 각주 → 5열 링크 → 법적 정보, 전부 12px | surface | 페이지에서 유일하게 촘촘한 곳 |

리듬: 섹션 여백 0, 타일 틈 12px 고정, 배경이 타일마다 바뀌어(명도 변화 9회 이상) 구획을 배경이 맡는다. 모바일: 내비는 로고 + 검색·가방·햄버거(48px), 타일 2열 → 1열 풀블리드(세로 틈 12px 유지, 추정), 제품명 56 → 32px 인데 버튼 크기는 그대로, 히어로 렌더는 세로 구도의 별도 자산, 푸터 5열 → 1열.

## 8. 따라 할 때 Do / Don't
- Do: 섹션 여백 대신 타일 틈 12px 로 페이지를 나누고, 타일은 radius 0 · 그림자 0 으로 둔다 — 무브 1
- Do: 타일 배경을 #000 과 #F5F5F7 로 번갈아(2열 행은 엇갈림) 두고, 타일마다 제품명 → 한 줄 태그라인 → pill 2개 순서를 지킨다 — 무브 2·3
- Do: 파랑은 버튼·링크에만, 다크 타일에선 #2997FF 로 한 단계 밝게 바꾼다. 한글 제목은 keep-all + 2줄 이내 — 무브 4
- Don't: 타일에 radius 16·그림자·1px 테두리를 얹거나 타일 사이를 64–96px 여백으로 벌리지 않는다 — 무브 1, LA-1, SH-5
- Don't: 다크 타일을 #111·#0B0B0B 로 바꾸거나 파랑을 그라데이션·제목·아이콘 배경으로 쓰지 않는다. 버튼을 600 · radius 8 로 바꾸지 않는다 — 무브 2·4, CO-6, CO-1
- Don't: 제품 이미지 대신 아이콘 3열 카드나 3D 블롭으로 타일을 채우지 않는다 — 무브 5, LA-2, IC-3
- **흔한 오해**: Apple ≠ 넓은 여백의 흰 미니멀. 홈의 섹션 여백은 0 이고, 12px 흰 틈으로 나뉜 검정·#F5F5F7 타일 벽이다(다크 면적 26%). 여백은 타일 안에 있다
- **흔한 오해**: Apple ≠ 거대한 굵은 헤드라인. 제품명은 56px/600 이고 버튼은 17px/400 으로 작고 조용하다. 위계는 크기보다 명도 교차와 제품 렌더가 만든다

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| SF Pro KR / SF Pro Text (Yoon Gothic 폴백) | Apple 독점, 웹 임베드 불가 | `-apple-system, BlinkMacSystemFont, system-ui`, 고정 폰트가 필요하면 Inter | Pretendard (대안 SUIT) | SF Pro 는 크기별 광학 자간이 들어 있어 측정 자간이 0em 이다. Pretendard 56px 제목은 -0.01 ~ -0.02em 로 조여야 비슷하다(추정) |

## 10. 베끼지 말 것 (Don't Copy)
Apple 로고·글리프와 제품 워드마크 이미지, 제품 렌더·사진 전부와 히어로의 크롬 질감 3D 레터링(캠페인 자산), 엔터테인먼트 캐러셀의 포스터 아트, 제품명·태그라인·버튼 문구 같은 모든 카피(구조만 옮긴다), SF Pro 폰트 파일, 내비 글리프 아이콘 세트(Lucide 같은 공개 세트의 1.5px 선 아이콘으로). 무브 5개에 #0071E3 까지 함께 가져오면 Apple 로 오인되니 무브 2–3개만 고르고 색·이미지는 자기 제품에서 정한다. 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
minimal × luxury, 제품 타일 벽. 섹션 여백 0, 타일 사이 12px 흰 틈만, 타일 radius 0 · 그림자 0. 타일 배경을 #000 과 #F5F5F7 로 번갈아(2열 행은 엇갈림), 풀폭 타일 692px · 반폭 702×580.
타일마다 가운데 정렬: 제품명 56px/600(반폭 40px) → 태그라인 28px/400 한 줄 → pill 버튼 2개(44px, 17px/400).
파랑은 버튼에만: 채움 #0071E3, 테두리 #0066CC(다크 위 #2997FF). 제품 이미지는 타일 하단에 크게. 글래스는 44px sticky 내비에만.
금지: 그라데이션, 카드 그림자, 아이콘 3열 카드, #111 다크. 한글 keep-all.
```
```text
Minimal × luxury product-tile wall. Zero section padding; tiles separated only by 12px white gaps, radius 0, no shadows. Alternate tile backgrounds #000 / #F5F5F7 (checkerboard in 2-col rows); full-width tiles 692px tall, half tiles 702×580.
Centered stack per tile: 56px/600 product name (40px on half tiles) → one 28px/400 tagline → two 44px pill buttons at 17px/400.
Blue only on actions: fill #0071E3, outline #0066CC (#2997FF on dark). Large product image anchored to the tile bottom. Glass only on the 44px sticky nav.
No gradients, card shadows, icon-card grids or #111 dark.
```

## 부록: 화면 관찰 (Visual Read)
- 홈 전체가 제품 1개 = 타일 1장으로 쌓인 타일 벽이다. 위 3장은 풀폭(692px), 아래 6장은 2열 반폭(702px)이고, 모두 같은 12px 흰 틈으로만 갈린다.
- 실눈으로 보면 검정·밝은 회색 직사각형 체커보드가 남고, 색은 타일 안 제품 렌더가 전부 가져간다. 검정 타일의 렌더는 배경과 경계 없이 녹는다.
- 일부 반폭 타일은 텍스트 대신 제품 워드마크 이미지가 제목 자리에 앉는다. 색이 시끄러운 곳은 엔터테인먼트 캐러셀뿐이다.
- 모바일은 타일이 1열 풀블리드로 쌓이고, 히어로 렌더는 세로 구도로 다시 그린 별도 자산이 들어간다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2, 슬라이스 6장(페이지 5305px 전부), 숨긴 오버레이 없음, 신뢰도 high(타이포 0.95 · 색 0.9 · 간격 0.73 · 구조 0.86). 경고: IMAGE_HEAVY(색 비중은 참고값).
- 눈으로 고친 것: theme 은 엔진 light 대신 mixed(다크 타일 26%). 엔진은 surface #F5F5F7 을 다른 변수에 붙였고(실제는 `--sk-fill-tertiary`), text 역할 #0000008F 는 푸터·각주 기준이라 제목 색은 선언 #1D1D1F 로 따로 적었다. 엔진 h1(28/400)은 태그라인이고, grid gap 14px 은 타일 틈이 아니다(12px 는 702 에서 파생해 픽셀로 확인). content-list → bento-grid, tabs-showcase → carousel, 모바일 logo-cloud(6) → carousel. 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 15개 = 측정 11 · 선언 1 · 파생 2 · 추정 1 → 73 / 7 / 13 / 7%.
