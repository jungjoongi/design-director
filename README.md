# design-director

**디자이너·기획자 없이 만드는 사람을 위한 디자인 디렉터.** Claude Code 플러그인이다.

"좀 더 이쁘게 해줘", "모던하게 바꿔줘"라고 하면 AI 는 가장 흔한 답으로 간다. 보라색 그라데이션, 똑같은 둥근 카드,
이모지 아이콘이 나오는 이유다. 반대로 "Swiss 스타일, 12컬럼 그리드, 헤드라인 64px 자간 -2%, 강조색은 CTA 에만"
이라고 하면 결과가 확 달라진다. 이 플러그인은 그 사이를 메운다. 마음에 드는 레퍼런스를 수치로 된 디자인 언어로 뜯어보고,
그걸로 화면을 기획하고 지시하고, 승인받은 뒤에 코드에 적용하고 스크린샷으로 확인한다.

[English](README.en.md)

![before / after](docs/images/before-after-desktop.jpg)

가상의 회의록 요약 서비스 "모아노트"의 랜딩이다. 일부러 AI 티를 잔뜩 넣은 테스트 앱에 세 마디를 보냈다:
"좀 이쁘게 해줘. AI 티 나" → "B로 할게" → "적용해줘". 진단 점수는 57점에서 91점이 됐고, AI 기본값 패턴(S1)은
11종에서 0개가 됐다. 지어낸 통계·로고·후기는 빠지고 실제 요금으로 큰 숫자를 만들었다. 코드는 승인 뒤에만 바뀌었다.

## 설치

```
/plugin marketplace add jungjoongi/design-director
/plugin install design-director@design-director
```

Claude Code 2.1.275 이상이면 한 줄로도 된다: `/plugin install design-director --marketplace jungjoongi/design-director`

필요한 것: Node.js 20 이상, Chrome·Edge·Brave·Chromium 중 하나(사이트를 캡처할 때). 그 밖에 설치할 패키지는 없다.

## 이렇게 쓴다

```
linear.app 왜 이렇게 고급져 보여? 실제 수치로 뜯어봐줘
```
→ `ref` 가 사이트를 열어 스크린샷을 찍고 폰트·색·간격·radius 를 실측한다. 그 느낌을 만드는 결정적 요소(시그니처 무브)
3–5개, 토큰 표, 페이지 구조를 `.design/references/linear-app/profile.md` 에 저장한다.

```
랜딩 좀 이쁘게 해줘. 뭔가 AI 가 만든 티가 나
```
→ `direct` 가 지금 화면을 진단하고(점수와 문제 3가지), 이름 붙은 방향 2–3개를 제안한다.
고르면 페이지 구조와 디자인 브리프를 쓰고, "적용해줘"라고 할 때만 코드를 고친다. 끝나면 before/after 를 나란히 찍어 확인한다.

```
커뮤니티 게시판 목록이랑 글 상세 구조부터 잡아줘. 한국 커뮤니티 느낌으로
```
→ 기획자 역할부터 한다. 목표·사용자·핵심 행동을 묻고, 섹션 구성과 와이어프레임을 먼저 보여준다.

```
버튼 색 #2563EB 로 바꿔줘
```
→ 값이 정해진 수정은 끼어들지 않고 바로 고친다.

## 걸리는 시간

- `ref`: 캡처 30–60초, 프로필 작성까지 5–7분.
- `direct` 전체 흐름(진단 → 브리프 → 적용 → 검증): 세 번의 대화, 합쳐서 10–15분 안팎.

## 두 스킬

| 스킬 | 하는 일 | 결과물 |
|---|---|---|
| `/design-director:ref` | URL·스크린샷·스타일/브랜드 이름을 받아 디자인 언어로 분석 | `.design/references/<이름>/profile.md` |
| `/design-director:direct` | 기획 → 구조 → 브리프 → 승인 → 적용 → 검증 | `.design/briefs/<화면>.md`, 코드 변경, 검증 스크린샷 |

`direct` 는 요청 크기에 따라 다르게 움직인다.

| 요청 | 동작 |
|---|---|
| 값이 정해진 수정 ("패딩 24px") | 바로 수정 |
| 컴포넌트 하나 + 느낌 ("이 카드 세련되게") | 2–3안 제시 → 고르면 적용 |
| 페이지 단위, 레퍼런스 따라 하기, "AI 티 나" | 진단 → 방향 선택 → 구조 → 브리프 → 승인 → 적용 → 검증 |
| "뭐가 문제인지만 봐줘" | 진단과 방향 제안까지 |

## 안에 들어 있는 것

- 스타일 카탈로그 12종(minimal, swiss, editorial, dark-tech, kr-fintech-simple, kr-editorial-commerce …)과
  트리트먼트 5종(glassmorphism, neumorphism …). 모두 범위값과 시그니처 무브, 프롬프트 스니펫이 있다.
- AI 기본값 패턴 48개. 보라 그라데이션, 이모지 아이콘, 영문 대문자 eyebrow 같은 "AI 티"를 심각도와 처방과 함께 정리했다.
  코드에서 찾을 수 있는 것은 자동으로 스캔한다.
- 한글 타이포그래피 가이드: `keep-all`, 행간·자간, 폰트 라이선스, 유료 폰트의 무료 대체.
- 화면 유형 5종의 구조 패턴: 랜딩, SaaS 앱, 커머스, 콘텐츠·포트폴리오, 커뮤니티(한국형 게시판 관례 포함).
- 디자인 용어 사전: 다음 프롬프트에 그대로 쓸 수 있는 말과 수치.
- 브랜드 카드 9개: 토스, 당근, 29CM, 무신사, Apple, Linear, Stripe, Vercel, Notion. 실제 사이트를 캡처해 잰 값만 담았고,
  "토스 느낌으로" 같은 요청은 브라우저 없이도 바로 쓴다. 6개월이 지나면 다시 재자고 권한다.

## 스타일 갤러리

카탈로그의 스타일마다 가장 잘 맞는 화면에 적용한 견본이다. 브랜드와 내용은 지어낸 것이고, 사진·로고 없이 만들어 플러그인
엔진으로 찍었다. 이미지를 누르면 스타일의 한 줄 정의, 시그니처 무브, "프롬프트에 쓸 말"이 있는
[스타일 갤러리](docs/style-gallery.md)로 간다.

<table>
<tr><td width="33%"><a href="docs/style-gallery.md#minimal--미니멀"><img src="docs/images/styles/minimal.jpg" alt="minimal"></a><br><b>minimal</b> 미니멀<br><sub>단일 제품 랜딩</sub></td><td width="33%"><a href="docs/style-gallery.md#swiss--스위스"><img src="docs/images/styles/swiss.jpg" alt="swiss"></a><br><b>swiss</b> 스위스<br><sub>컨퍼런스</sub></td><td width="33%"><a href="docs/style-gallery.md#editorial--에디토리얼"><img src="docs/images/styles/editorial.jpg" alt="editorial"></a><br><b>editorial</b> 에디토리얼<br><sub>매거진 기사</sub></td></tr>
<tr><td width="33%"><a href="docs/style-gallery.md#corporate-clean--코퍼릿-클린"><img src="docs/images/styles/corporate-clean.jpg" alt="corporate-clean"></a><br><b>corporate-clean</b> 코퍼릿 클린<br><sub>B2B SaaS</sub></td><td width="33%"><a href="docs/style-gallery.md#data-dense--데이터-밀집-어드민"><img src="docs/images/styles/data-dense.jpg" alt="data-dense"></a><br><b>data-dense</b> 데이터 밀집<br><sub>어드민</sub></td><td width="33%"><a href="docs/style-gallery.md#neo-brutalism--네오-브루탈리즘"><img src="docs/images/styles/neo-brutalism.jpg" alt="neo-brutalism"></a><br><b>neo-brutalism</b> 네오 브루탈리즘<br><sub>크리에이터 상점</sub></td></tr>
<tr><td width="33%"><a href="docs/style-gallery.md#playful-illustrative--플레이풀-일러스트-커뮤니티"><img src="docs/images/styles/playful-illustrative.jpg" alt="playful-illustrative"></a><br><b>playful-illustrative</b> 플레이풀 일러스트<br><sub>커뮤니티</sub></td><td width="33%"><a href="docs/style-gallery.md#organic-soft--오가닉-소프트"><img src="docs/images/styles/organic-soft.jpg" alt="organic-soft"></a><br><b>organic-soft</b> 오가닉 소프트<br><sub>스킨케어 브랜드</sub></td><td width="33%"><a href="docs/style-gallery.md#luxury--럭셔리"><img src="docs/images/styles/luxury.jpg" alt="luxury"></a><br><b>luxury</b> 럭셔리<br><sub>주얼리 브랜드</sub></td></tr>
<tr><td width="33%"><a href="docs/style-gallery.md#dark-tech--다크-테크"><img src="docs/images/styles/dark-tech.jpg" alt="dark-tech"></a><br><b>dark-tech</b> 다크 테크<br><sub>개발자 도구</sub></td><td width="33%"><a href="docs/style-gallery.md#kr-fintech-simple--토스형-핀테크-심플"><img src="docs/images/styles/kr-fintech-simple.jpg" alt="kr-fintech-simple"></a><br><b>kr-fintech-simple</b> 토스형 핀테크 심플<br><sub>금융 앱</sub></td><td width="33%"><a href="docs/style-gallery.md#kr-editorial-commerce--29cm형-에디토리얼-커머스"><img src="docs/images/styles/kr-editorial-commerce.jpg" alt="kr-editorial-commerce"></a><br><b>kr-editorial-commerce</b> 29CM형 에디토리얼 커머스<br><sub>편집숍</sub></td></tr>
</table>

트리트먼트(표면 효과)는 기본 스타일 위에 한 겹 얹는다. 잘못 쓰면 바로 AI 기본값 패턴이 되기 때문에, 견본은 허용되는 쓰임만 보여준다.

<table>
<tr><td width="33%"><a href="docs/style-gallery.md#glassmorphism--글래스모피즘"><img src="docs/images/styles/glassmorphism.jpg" alt="glassmorphism"></a><br><b>glassmorphism</b> 글래스모피즘<br><sub>트리트먼트</sub></td><td width="33%"><a href="docs/style-gallery.md#neumorphism--뉴모피즘"><img src="docs/images/styles/neumorphism.jpg" alt="neumorphism"></a><br><b>neumorphism</b> 뉴모피즘<br><sub>트리트먼트</sub></td><td width="33%"><a href="docs/style-gallery.md#aurora-gradient--오로라-그라데이션"><img src="docs/images/styles/aurora-gradient.jpg" alt="aurora-gradient"></a><br><b>aurora-gradient</b> 오로라 그라데이션<br><sub>트리트먼트</sub></td></tr>
<tr><td width="33%"><a href="docs/style-gallery.md#grain-noise--그레인노이즈"><img src="docs/images/styles/grain-noise.jpg" alt="grain-noise"></a><br><b>grain-noise</b> 그레인·노이즈<br><sub>트리트먼트</sub></td><td width="33%"><a href="docs/style-gallery.md#clay-3d--클레이-3d"><img src="docs/images/styles/clay-3d.jpg" alt="clay-3d"></a><br><b>clay-3d</b> 클레이 3D<br><sub>트리트먼트</sub></td></tr>
</table>

## 원칙

- **브리프가 먼저다.** 승인 전에는 `.design/` 밖의 파일을 고치지 않는다.
- **베끼지 않는다.** 로고·일러스트·사진·카피·유료 폰트는 가져오지 않는다. 옮기는 건 비율·리듬·토큰이다.
- **우회하지 않는다.** 봇 차단·로그인 벽은 넘지 않고, 대신 스크린샷을 받아 추정한다.
- **추정을 측정이라고 하지 않는다.** 모든 값에 측정/추정/파생/카탈로그 근거가 붙는다.
- 타사 사이트 스크린샷은 `.design/.gitignore` 로 로컬에만 둔다.

## 개발

```bash
git clone https://github.com/jungjoongi/design-director && cd design-director
npm test                                         # 의존성 설치 없이 바로 돈다
claude --plugin-dir plugins/design-director      # 이번 세션에만 로드해서 써 보기
```

구조와 계약은 [docs/architecture.md](docs/architecture.md), 기여 규칙은 [CLAUDE.md](CLAUDE.md) 에 있다.

## 라이선스

MIT
