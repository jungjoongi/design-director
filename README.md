# design-director

**디자이너·기획자 없이 만드는 사람을 위한 디자인 디렉터.** Claude Code 플러그인이다. · [English](README.en.md)

"좀 더 이쁘게 해줘"라고 하면 AI 는 가장 흔한 답으로 간다. 보라색 그라데이션, 똑같은 둥근 카드, 이모지 아이콘이다.
design-director 는 마음에 드는 레퍼런스를 수치로 된 디자인 언어로 뜯어보고, 그걸로 화면을 기획하고 지시하고,
승인받은 뒤에만 코드에 적용하고 스크린샷으로 확인한다.

[![before / after](docs/images/before-after-hero.jpg)](docs/images/before-after-desktop.jpg)

<sub>일부러 AI 티를 낸 가상 서비스 랜딩에 세 마디를 보냈다: "좀 이쁘게 해줘. AI 티 나" → "B로 할게" → "적용해줘".
진단 점수 57 → 91점, AI 기본값 패턴(S1) 11 → 0. 지어낸 통계·로고·후기는 빠지고, 코드는 승인 뒤에만 바뀌었다.</sub>

## 설치

```
/plugin marketplace add jungjoongi/design-director
/plugin install design-director@design-director
```

Node.js 20 이상이 필요하고, 사이트를 캡처하려면 Chrome·Edge 같은 Chromium 계열 브라우저가 있어야 한다.

## 이렇게 쓴다

| 이렇게 말하면 | 이렇게 한다 |
|---|---|
| "https://example.com 왜 이렇게 고급져 보여? 수치로 뜯어봐줘" | **`ref`** 가 사이트를 캡처해 폰트·색·간격을 실측하고, 그 느낌을 만드는 핵심 요소 3–5개와 토큰 표를 프로필로 남긴다 (5–7분) |
| "랜딩 좀 이쁘게 해줘. AI 티 나" | **`direct`** 가 지금 화면을 진단하고 이름 붙은 방향 2–3개를 제안한다. 고르면 브리프를 쓰고, "적용해줘" 할 때만 코드를 고친 뒤 before/after 를 찍는다 |
| "관리자 화면을 한국형 관리자 스타일로" · "게시판 구조부터 잡아줘" | 화면 유형별 구조 패턴과 스타일 카탈로그로 와이어프레임부터 잡는다 |
| "버튼 색 #2563EB 로" | 값이 정해진 수정은 끼어들지 않고 바로 고친다 |

## 스타일 갤러리

카탈로그의 스타일마다 가장 잘 맞는 화면에 적용한 견본이다. 브랜드와 내용은 지어낸 것이고, 사진·로고 없이 만들어 플러그인
엔진으로 찍었다. 이미지를 누르면 한 줄 정의, 시그니처 무브, 다른 AI 도구에도 쓸 수 있는 "프롬프트에 쓸 말"이 나온다.
스타일 이름을 그대로 요청에 쓰면 된다("kr-board-classic 스타일로 게시판 만들어줘").

### 랜딩·브랜드

<table>
<tr><td width="33%" valign="top"><a href="docs/style-gallery.md#minimal--미니멀"><img src="docs/images/styles/minimal.jpg" alt="minimal"></a><br><b>minimal</b><br><sub>미니멀 · 단일 제품 랜딩</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#swiss--스위스"><img src="docs/images/styles/swiss.jpg" alt="swiss"></a><br><b>swiss</b><br><sub>스위스 · 컨퍼런스</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#editorial--에디토리얼"><img src="docs/images/styles/editorial.jpg" alt="editorial"></a><br><b>editorial</b><br><sub>에디토리얼 · 매거진 기사</sub></td></tr>
<tr><td width="33%" valign="top"><a href="docs/style-gallery.md#corporate-clean--코퍼릿-클린"><img src="docs/images/styles/corporate-clean.jpg" alt="corporate-clean"></a><br><b>corporate-clean</b><br><sub>코퍼릿 클린 · B2B SaaS</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#neo-brutalism--네오-브루탈리즘"><img src="docs/images/styles/neo-brutalism.jpg" alt="neo-brutalism"></a><br><b>neo-brutalism</b><br><sub>네오 브루탈리즘 · 크리에이터 상점</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#organic-soft--오가닉-소프트"><img src="docs/images/styles/organic-soft.jpg" alt="organic-soft"></a><br><b>organic-soft</b><br><sub>오가닉 소프트 · 스킨케어 브랜드</sub></td></tr>
<tr><td width="33%" valign="top"><a href="docs/style-gallery.md#luxury--럭셔리"><img src="docs/images/styles/luxury.jpg" alt="luxury"></a><br><b>luxury</b><br><sub>럭셔리 · 주얼리 브랜드</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#dark-tech--다크-테크"><img src="docs/images/styles/dark-tech.jpg" alt="dark-tech"></a><br><b>dark-tech</b><br><sub>다크 테크 · 개발자 도구</sub></td></tr>
</table>

### 어드민

<table>
<tr><td width="50%" valign="top"><a href="docs/style-gallery.md#data-dense--데이터-밀집"><img src="docs/images/styles/data-dense.jpg" alt="data-dense"></a><br><b>data-dense</b><br><sub>데이터 밀집 · 숫자 중심 대시보드</sub></td><td width="50%" valign="top"><a href="docs/style-gallery.md#admin-calm--차분한-어드민"><img src="docs/images/styles/admin-calm.jpg" alt="admin-calm"></a><br><b>admin-calm</b><br><sub>차분한 어드민 · 운영자 콘솔·설정</sub></td></tr>
<tr><td width="50%" valign="top"><a href="docs/style-gallery.md#admin-console--다크-콘솔"><img src="docs/images/styles/admin-console.jpg" alt="admin-console"></a><br><b>admin-console</b><br><sub>다크 콘솔 · 실시간 관제</sub></td><td width="50%" valign="top"><a href="docs/style-gallery.md#kr-admin-classic--한국형-관리자"><img src="docs/images/styles/kr-admin-classic.jpg" alt="kr-admin-classic"></a><br><b>kr-admin-classic</b><br><sub>한국형 관리자 · 국내 관례 관리자</sub></td></tr>
</table>

### 커뮤니티

<table>
<tr><td width="50%" valign="top"><a href="docs/style-gallery.md#playful-illustrative--플레이풀-일러스트"><img src="docs/images/styles/playful-illustrative.jpg" alt="playful-illustrative"></a><br><b>playful-illustrative</b><br><sub>플레이풀 일러스트 · 스터디 커뮤니티</sub></td><td width="50%" valign="top"><a href="docs/style-gallery.md#kr-board-classic--한국형-게시판"><img src="docs/images/styles/kr-board-classic.jpg" alt="kr-board-classic"></a><br><b>kr-board-classic</b><br><sub>한국형 게시판 · 목록형 게시판</sub></td></tr>
<tr><td width="50%" valign="top"><a href="docs/style-gallery.md#kr-local-feed--동네-피드형"><img src="docs/images/styles/kr-local-feed.jpg" alt="kr-local-feed"></a><br><b>kr-local-feed</b><br><sub>동네 피드형 · 동네 피드</sub></td><td width="50%" valign="top"><a href="docs/style-gallery.md#forum-thread--스레드형-포럼"><img src="docs/images/styles/forum-thread.jpg" alt="forum-thread"></a><br><b>forum-thread</b><br><sub>스레드형 포럼 · Q&A 포럼</sub></td></tr>
</table>

### 앱·커머스

<table>
<tr><td width="50%" valign="top"><a href="docs/style-gallery.md#kr-fintech-simple--한국형-핀테크-심플"><img src="docs/images/styles/kr-fintech-simple.jpg" alt="kr-fintech-simple"></a><br><b>kr-fintech-simple</b><br><sub>한국형 핀테크 심플 · 금융 앱</sub></td><td width="50%" valign="top"><a href="docs/style-gallery.md#kr-editorial-commerce--한국형-에디토리얼-커머스"><img src="docs/images/styles/kr-editorial-commerce.jpg" alt="kr-editorial-commerce"></a><br><b>kr-editorial-commerce</b><br><sub>한국형 에디토리얼 커머스 · 편집숍</sub></td></tr>
</table>

### 트리트먼트

기본 스타일 위에 얹는 표면 효과다. 잘못 쓰면 바로 AI 기본값 패턴이 되기 때문에, 견본은 허용되는 쓰임만 보여준다.

<table>
<tr><td width="33%" valign="top"><a href="docs/style-gallery.md#glassmorphism--글래스모피즘"><img src="docs/images/styles/glassmorphism.jpg" alt="glassmorphism"></a><br><b>glassmorphism</b><br><sub>글래스모피즘 · dark-tech 위</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#neumorphism--뉴모피즘"><img src="docs/images/styles/neumorphism.jpg" alt="neumorphism"></a><br><b>neumorphism</b><br><sub>뉴모피즘 · minimal 위</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#aurora-gradient--오로라-그라데이션"><img src="docs/images/styles/aurora-gradient.jpg" alt="aurora-gradient"></a><br><b>aurora-gradient</b><br><sub>오로라 그라데이션 · minimal 위</sub></td></tr>
<tr><td width="33%" valign="top"><a href="docs/style-gallery.md#grain-noise--그레인노이즈"><img src="docs/images/styles/grain-noise.jpg" alt="grain-noise"></a><br><b>grain-noise</b><br><sub>그레인·노이즈 · organic-soft 위</sub></td><td width="33%" valign="top"><a href="docs/style-gallery.md#clay-3d--클레이-3d"><img src="docs/images/styles/clay-3d.jpg" alt="clay-3d"></a><br><b>clay-3d</b><br><sub>클레이 3D · playful 위</sub></td></tr>
</table>

## 들어 있는 것

- 스타일 18종과 트리트먼트 5종 — 모두 범위값, 시그니처 무브, 흔한 실수, 프롬프트 스니펫이 있다
- AI 기본값 패턴 48개 — 심각도와 처방이 있고, 코드로 잡을 수 있는 것은 자동으로 스캔한다
- 화면 유형 5종의 구조 패턴 — 랜딩, SaaS 앱·어드민, 커머스, 콘텐츠, 커뮤니티(한국형 게시판 관례 포함)
- 한글 타이포그래피 가이드 — `keep-all`, 행간·자간, 폰트 라이선스, 유료 폰트의 무료 대체
- 실측 브랜드 카드 9개 — 국내외 서비스 9곳을 캡처해 잰 값. 브랜드 이름으로 요청하면 브라우저 없이도 바로 쓴다

## 원칙

- **브리프가 먼저다.** 승인 전에는 `.design/` 밖의 파일을 고치지 않는다.
- **베끼지 않는다.** 로고·사진·카피·유료 폰트는 가져오지 않고 비율·리듬·토큰만 옮긴다. 타사 스크린샷은 로컬에만 둔다.
- **우회하지 않는다.** 봇 차단·로그인 벽은 넘지 않고, 대신 스크린샷을 받아 추정한다.
- **추정을 측정이라고 하지 않는다.** 모든 값에 측정·추정·파생·카탈로그 근거가 붙는다.

## 개발

```bash
npm test                                         # 의존성 설치 없이 돈다
claude --plugin-dir plugins/design-director      # 이번 세션에만 로드해서 써 보기
```

구조와 계약은 [docs/architecture.md](docs/architecture.md), 기여 규칙은 [CLAUDE.md](CLAUDE.md). 라이선스는 MIT.
