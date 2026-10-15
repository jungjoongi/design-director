# 플레이풀 일러스트 (Playful Illustrative) — id: playful-illustrative

별칭: 귀여운, 친근한, 아기자기한, 일러스트 많은, 캐릭터 있는, friendly, whimsical
축: 밀도 2 · 온도 4 · 채도 4 · 대비 3 · 둥긂 5 · 장식 5
대표 레퍼런스: Duolingo (duolingo.com), Mailchimp (mailchimp.com) 의 일러스트 중심 브랜드 (정성, 미검증)

## 정의

고유 일러스트·캐릭터, 밝은 색, 둥근 형태, 탄성 있는 움직임으로 친근함과 즐거움을 만든다. 핵심은 "일러스트가 있다"가
아니라 일러스트가 **브랜드 고유의 손맛**(선 굵기·팔레트·형태 규칙)을 일관되게 지킨다는 것이다. 여러 작가의 스톡
일러스트를 섞는 순간 이 스타일은 싸 보인다.

이웃과의 차이: neo-brutalism 은 각지고 시끄럽게 친근하고, playful 은 둥글고 부드럽게 친근하다.
3D 렌더가 주인공이면 clay-3d 트리트먼트를 함께 붙인다.

## 핵심 레버 (범위)

범위만 준다(이유는 `_index.md` §3).

| 레버 | 범위 | 메모 |
|---|---|---|
| 서체 | 둥근 산세리프 또는 geometric 산세리프 헤드라인(600–800) + 중립 본문, 손글씨는 포인트 1곳 | |
| display / h1 | 40–72px, 굵기 700–800, 행간 1.1–1.2 | 한글은 1.15 이상 |
| 본문 | 16–18px, 행간 1.6–1.7 | |
| 색 구조 | 밝은 주색 1 + 보조 2–4색(역할 지정) + 따뜻한 중립 | 일러스트와 UI 가 같은 팔레트를 쓴다 |
| radius | 12–32px, 버튼은 pill 도 가능 | |
| 테두리 | 없음, 또는 일러스트 선과 같은 2px 진한 선 | |
| 그림자 | 없음 / 입체 버튼용 하드 그림자 2–6px / 부드러운 1단계 중 하나 | 셋을 섞지 않는다 |
| 간격 | 8px 기준, 섹션 80–128px | |
| 레이아웃 | 일러스트가 레이아웃 요소(텍스트 옆·사이·섹션 경계)로 들어온다 | |
| 모션 | 200–400ms, spring 또는 overshoot easing, 캐릭터 애니메이션(Lottie·Rive) | reduced-motion 대응 필수(MO-4) |
| 이미지 | 고유 일러스트·캐릭터·스팟 일러스트 | 스톡 일러스트 혼용 금지 |
| 아이콘 | 채움 또는 2px 둥근 끝 선, 일러스트와 같은 언어 | |

## 시그니처 무브

1. **일러스트 규칙을 하나로 고정한다** — 선 굵기 2–3px, 팔레트 4–6색, 음영 방식 하나(평면 또는 단일 그림자).
2. **버튼을 눌리는 물체로 만든다** — 아래쪽 3–4px 진한 테두리나 하드 그림자, 누르면 `translateY(2px)`.
3. **반응하는 순간에 캐릭터를 쓴다** — 빈 상태·성공·오류에 캐릭터 표정이나 짧은 동작 하나.
4. **모서리를 크고 일관되게** — 카드 16–24px, 버튼 pill 또는 12–16px.
5. **움직임에 탄성을 준다** — `cubic-bezier(0.34, 1.56, 0.64, 1)` 같은 overshoot, 크기 변화 1.05–1.1배.

## 잘 맞는 곳 / 안 맞는 곳

- 잘 맞는 곳: 교육·학습, 소비자 앱 온보딩, 어린이·가족, 커뮤니티, 게임화된 서비스, 비영리.
- 안 맞는 곳: 금융 거래 화면, 엔터프라이즈 B2B, 럭셔리, 의료.

## 흔한 실수

- 의미 없는 3D 블롭으로 빈자리를 채운다 — IC-3
- 이모지를 기능 아이콘으로 — IC-1
- 모든 섹션 fade-up, 모든 카드 hover-lift — MO-1, MO-2
- 탄성 모션을 넣고 reduced-motion 을 무시한다 — MO-4
- AI 생성 일러스트의 손가락·글자 결함을 그대로 둔다 — IC-5
- 역할 없이 강조색 4개 이상 — CO-5

## 한국어 노트

- 둥근 한글 서체는 `korean-typography.md` 의 페어링 표에서 고른다. 본문까지 둥근 서체로 쓰면 긴 글이 피곤하다 — 제목만.
- 귀여움이 과하면 "유치하다"로 읽힌다. 성인 대상이면 일러스트를 섹션당 1개 이하로 줄인다.
- 캐릭터·이모티콘 문화가 강해서 빈 상태·알림에 캐릭터를 쓰면 반응이 좋다. 같은 캐릭터를 일관되게.
- 카피는 해요체, 짧게. 감탄사·물결표(~)는 화면당 한 번 이하.

## 프롬프트 스니펫

```text
플레이풀 일러스트 스타일. 고유 일러스트 규칙: 선 2px, 팔레트 5색(주색 초록 + 보조 4색), 평면 음영.
헤드라인은 둥근 산세리프 굵기 800, 카드 radius 20, 버튼은 아래 4px 진한 테두리로 눌리는 느낌.
빈 상태·성공 화면에 캐릭터 하나. 이모지 아이콘·3D 블롭·모든 섹션 fade-up 금지, reduced-motion 대응.
```

```text
Playful illustrative style. One illustration rule set: 2px strokes, 5-color palette (green primary + 4 supporting), flat shading.
Rounded sans headlines at weight 800, 20px card radius, buttons with a 4px darker bottom edge so they feel pressable.
One character on empty and success states. No emoji icons, 3D blobs or section-wide fade-ups; respect reduced motion.
```
