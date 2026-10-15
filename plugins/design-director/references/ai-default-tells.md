# AI 기본값 패턴 (AI-default tells)

방향 없이 만든 UI 에서 반복해서 나오는 시각 패턴 48개. `direct` 의 진단(1단계)·검증(7단계), 브리프의 Don't,
`evals` 가 모두 이 파일 하나를 쓴다. 끝의 JSON 블록은 `dd.mjs tells` 가 코드를 스캔할 때 읽는 단일 원천이다.

## 목차
0. 읽는 법 — 심각도, 브리프 우선, 코드 검사와 시각 확인
1. 타이포 (TY-1~7)
2. 색 (CO-1~7)
3. 레이아웃 (LA-1~7)
4. 형태·깊이 (SH-1~5)
5. 아이콘·이미지 (IC-1~5)
6. 모션 (MO-1~4)
7. 카피·장식 (CP-1~6)
8. 한국어 (KR-1~7)
9. 기계 판독 블록 (dd:tells)

## 0. 읽는 법

각 패턴은 그 자체로 나쁜 디자인이 아니다. 주제와 상관없이 **기본으로** 나온다는 게 문제다. 사용자는 이유를 말로
못 해도 "AI 가 만든 티"를 알아본다. 그래서 패턴마다 ID 를 붙여 진단에서 가리키고, 브리프 Don't 에서 인용하고,
검증에서 다시 센다. 출발점은 frontend-design 스킬이 꼽은 다섯 묶음(크림+세리프+테라코타, 거의 검정+형광,
신문형 hairline, SaaS 카드 키트, 템플릿 장식)이고, 여기에 한국어 화면에서 자주 보는 패턴을 더했다.

| 등급 | 뜻 | 처리 |
|---|---|---|
| S1 | 한 번만 나와도 AI·템플릿으로 읽히거나, 접근성·정직성 실패 | 브리프가 이름으로 고르지 않았으면 지운다 |
| S2 | 한두 번은 괜찮고, 한 페이지에 3번 이상이면 tell | 반복을 줄이고 위계를 다르게 준다 |
| S3 | 혼자는 무해하다. S1·S2 와 겹치면 인상을 굳힌다 | 다른 걸 고칠 때 같이 정리한다 |

**브리프가 이긴다.** 승인된 브리프가 이 중 하나를 이름으로 고르면(예: 「손으로 쓴 문서」 방향의 크림 배경) 그건
tell 이 아니라 선택이다. 진단·검증은 브리프 §8 Do/Don't 의 예외를 먼저 본다. frontend-design 도 같은 원칙
("브리프의 말이 항상 이긴다")을 쓴다.

**코드 검사와 시각 확인.** JSON 블록에는 코드로 잡아도 오탐이 적은 25개만 넣었다. 나머지는 스크린샷으로
판단한다. JSON 의 `threshold` 는 스캔 범위에서 센 횟수다. S1 이라도 정상 용례가 흔한 패턴(표 머리글 대문자,
sticky 내비 blur, 카피 속 이모지)은 3 으로 둔다. `.map()` 으로 렌더하는 카드는 소스에 한 번만 나오므로, 코드
수치는 하한이다.

**스캔 범위.** 대상 페이지 파일과 그 섹션 컴포넌트에 전역 CSS·레이아웃·tailwind 설정을 더해서 넘긴다.
KR-1·KR-2·MO-4 는 프로젝트 단위 검사라 전역 파일이 빠지면 오탐이 난다. `components/ui/*`(shadcn 원본)처럼
페이지와 상관없는 공용 파일은 빼야 한다 — 드롭다운·모달의 정당한 그림자가 SH-2 로 잡힌다.

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" tells app/page.tsx components/landing app/globals.css app/layout.tsx
```

이 문서의 `${CLAUDE_PLUGIN_ROOT}` 는 치환되지 않은 표기다. 명령은 SKILL.md 에 적힌 실제 경로를 따옴표째 쓴다.

| 범주 | S1 | S2 | S3 |
|---|---|---|---|
| TY 타이포 | TY-1, TY-2, TY-3 | TY-4, TY-6, TY-7 | TY-5 |
| CO 색 | CO-1, CO-2, CO-3, CO-4, CO-7 | CO-5 | CO-6 |
| LA 레이아웃 | LA-1, LA-4 | LA-2, LA-3, LA-5, LA-6, LA-7 | |
| SH 형태·깊이 | SH-3, SH-4 | SH-1, SH-2 | SH-5 |
| IC 아이콘·이미지 | IC-1, IC-5 | IC-2, IC-3, IC-4 | |
| MO 모션 | MO-4 | MO-1, MO-2 | MO-3 |
| CP 카피·장식 | CP-5 | CP-1, CP-3, CP-4 | CP-2, CP-6 |
| KR 한국어 | KR-1, KR-2, KR-4 | KR-3, KR-5, KR-6, KR-7 | |

## 1. 타이포 (TY)

### TY-1 헤드라인 한 단어 강조 [S1]
- 시그니처: 헤드라인에서 한 단어·구만 색·이탤릭·그라데이션으로 바꾼다. `<h1>…<span class="text-indigo-600">AI</span>…</h1>`
- 왜: 강조할 이유 없이 "포인트"를 넣는 습관이다. 생성 랜딩 대부분이 같은 자리(마지막 명사)에 같은 처리를 한다
- 처방: 헤드라인 전체를 한 색·한 굵기로 두고 위계는 크기로 만든다(display ÷ body ≥ 3). 강조가 필요하면 문장을 짧게 고친다
- 예외: 워드마크 색을 가진 제품명. 두 번째 절을 muted 색으로 낮추는 2톤 헤드라인은 강조가 아니라 감쇠라 별개 기법이다
- 코드 검사: 예 — h1·h2 안의 `<em>`·`<mark>`, 강조색·이탤릭·그라데이션 span

### TY-2 모든 헤딩 위 대문자 eyebrow [S1]
- 시그니처: 섹션 제목마다 위에 12–14px·대문자·자간 0.1em 이상·강조색 라벨('FEATURES', 'PRICING')
- 왜: 섹션 구분을 라벨에 떠넘긴 템플릿 장식이다. 라벨의 정보가 바로 아래 제목과 겹친다
- 처방: 지운다. 섹션 구분은 h2 크기(32–48px), 섹션 간격(96–128px), 배경 전환으로 한다. 라벨이 정보(카테고리·단계)를 가질 때만 1–2곳 남긴다
- 예외: 데이터 표 머리글, 내비 그룹 라벨처럼 원래 대문자를 쓰는 UI 관례. 영문 워드마크 브랜드
- 코드 검사: 예 — 한 클래스 문자열의 `uppercase`+`tracking-wide*`, CSS 의 uppercase+양수 letter-spacing. 표 머리글 1–2개는 정상이라 3회부터

### TY-3 그라데이션 텍스트 [S1]
- 시그니처: 헤드라인·숫자에 `bg-clip-text text-transparent` + 보라·분홍 그라데이션
- 왜: 생성 랜딩의 대표 장식이다. 글자색이 위치마다 달라 대비를 계산할 수 없다
- 처방: 단색 텍스트. 강조는 크기·굵기로 하고, 브랜드 색은 글자가 아니라 면(버튼, CTA 띠)에 쓴다
- 예외: 브리프가 aurora-gradient 트리트먼트를 고르고 그라데이션 텍스트를 시그니처 무브로 적은 경우
- 코드 검사: 예 — `bg-clip-text`, `background-clip: text`

### TY-4 Inter/시스템 폰트 하나·스케일 없음 [S2]
- 시그니처: Inter(또는 system-ui) 하나로 모든 텍스트. 크기는 Tailwind 기본 단계(14·16·18·20·24·30·36)를 차례로 쓰고 비율이 없다
- 왜: 폰트를 고르지 않은 상태다. 페이지의 성격은 타이포가 나르는데 그 자리를 비워 둔다
- 처방: 스타일에 맞는 패밀리 1–2개(`korean-typography.md` §4 페어링), 비율 하나(1.2–1.333)로 6단계 이내, display 자간 -0.02~-0.04em(한글은 -0.03em 까지)
- 예외: data-dense·corporate-clean 에서 의도해서 고른 중립 산세리프. Pretendard 하나에 스케일까지 없는 한국어 페이지는 같은 tell 의 한국판이다
- 코드 검사: 아니오 — capture `summary.md` 의 패밀리 표와 스케일 fit(0.6 미만이면 스케일 없음)으로 본다

### TY-5 데이터 라벨 모노스페이스 [S3]
- 시그니처: 날짜·ID·태그 같은 작은 라벨에 `font-mono text-xs`, 흔히 대문자까지
- 왜: "개발 도구 느낌"을 내는 기본값이다. 주제와 상관없이 붙는다
- 처방: 본문 패밀리 + `font-variant-numeric: tabular-nums`. 모노는 코드·터미널 출력에만 쓴다
- 예외: 개발 도구·dark-tech 브리프에서 코드와 같은 맥락의 값
- 코드 검사: 예 — 한 클래스 문자열의 `font-mono`+`text-xs`(또는 9–12px), 3회부터

### TY-6 긴 본문 가운데 정렬 [S2]
- 시그니처: 3줄 넘는 문단, 리스트, 카드 설명까지 모두 `text-center`
- 왜: 히어로의 중앙 정렬을 모든 섹션에 복사한 결과다. 줄 시작점이 매번 달라 읽는 속도가 떨어진다
- 처방: 히어로·CTA 띠의 2줄 이하 문장만 가운데. 본문은 왼쪽 정렬, 한 줄 34–40em(한글 35–40자)
- 예외: 시·인용구처럼 짧은 행이 형식인 콘텐츠
- 코드 검사: 아니오 — 문단 길이는 스크린샷으로 본다

### TY-7 불필요한 라벨 [S2]
- 시그니처: 내용이 이미 말하는 걸 라벨로 한 번 더 — '설명:', 카드 위 'Feature', 라벨 'Email' + placeholder 'Email'
- 왜: 구조를 장식으로 채운다. 글자 수가 늘고 위계가 흐려진다
- 처방: 라벨마다 "정보를 더하나?"를 묻고 아니면 지운다. 폼 라벨은 남기고(접근성) 중복 placeholder 를 지운다
- 예외: 폼 필드 라벨, 표 머리글, 단위
- 코드 검사: 아니오

## 2. 색 (CO)

### CO-1 보라→파랑 그라데이션 [S1]
- 시그니처: 버튼·히어로 배경·텍스트에 purple/violet/indigo → blue/pink. `#667eea → #764ba2`, `from-purple-600 to-blue-500`
- 왜: 생성 UI 의 상징이다. 브랜드와 무관하게 "테크 느낌"을 위해 붙는다
- 처방: 단색 강조 1개(채도는 스타일 범위 안). 면 분리는 중립 2–3단계(bg / surface / surface-2). 그라데이션이 꼭 필요하면 같은 hue 안에서 명도만 4–8% 바꾼다
- 예외: 브랜드 색이 실제로 보라인 경우(그래도 그라데이션은 별개 결정). 브리프가 aurora-gradient 를 고른 경우
- 코드 검사: 예 — 보라 계열 Tailwind 그라데이션 스톱, 대표 보라 hex 가 든 linear/radial/conic-gradient

### CO-2 크림+세리프+테라코타(#F4F1EA/#D97757) [S1]
- 시그니처: 따뜻한 크림 배경(#F4F1EA 근처) + 대비 높은 세리프 디스플레이 + 테라코타·점토색 강조(#D97757 근처)
- 왜: "따뜻하고 사려 깊은" 느낌의 기본값이다. #D97757 은 Anthropic 이 Claude 화면에 쓰는 강조색이라 사용자 브리프 위에서는 출처가 드러난다
- 처방: 따뜻한 쪽이 맞으면 온도는 두고 재료를 바꾼다 — 배경은 채도(OKLCH chroma) 0.005 이하 웜 그레이(크림 기본값에서 벗어나는 게 목적이라 가장 낮게 둔다. 티 나지 않는 온기는 direct 느낌어 '차가워' 처방의 0.005–0.01, 오가닉 톤을 일부러 고르면 organic-soft 의 0.01–0.03), 강조는 다른 hue(올리브·잉크 블루·버건디 중 브랜드에 맞는 것), 세리프는 디스플레이 한 단계에만
- 예외: 도자기·식음료처럼 재료가 실제로 점토색인 주제. 브리프가 editorial 방향에서 이 조합을 적은 경우
- 코드 검사: 부분 — 테라코타(#D97757, OKLab ΔE 0.03 이내)만 센다. 크림은 gray-100·stone-100 과 ΔE 0.015 안이라 코드로 가려낼 수 없다. 배경·세리프는 스크린샷으로

### CO-3 거의 검정+형광 강조 하나 [S1]
- 시그니처: #0A0A0A 류 배경 + 형광 라임(#CCFF00)·네온 그린·주홍 하나로 모든 강조
- 왜: "개발자·크립토·에이전시" 느낌의 기본값이다. 주제와 상관없이 나온다
- 처방: 다크가 맞으면 강조 채도를 낮추고(OKLCH chroma 0.12–0.18) 명도로 위계를 만든다. 강조는 CTA·상태 1–2곳에만. 다크가 꼭 필요하지 않으면 라이트로 간다
- 예외: 브랜드 색이 실제로 형광인 경우(스포츠·음악). dark-tech 브리프가 형광을 고른 경우
- 코드 검사: 부분 — 형광 라임·네온 그린 hex(ΔE 0.05 이내). 배경과의 조합, 주홍 강조는 스크린샷으로

### CO-4 히어로 뒤 그라데이션 블롭·오브 [S1]
- 시그니처: 히어로 뒤 흐릿한 보라·분홍 원이나 다각형(`rounded-full blur-3xl`, `filter: blur(80px)`), 마우스를 따라오는 빛
- 왜: 빈 배경을 채우는 장식이다. 정보가 없고 위에 놓인 글자의 대비를 떨어뜨린다
- 처방: 지운다. 히어로의 주인공을 제품 화면·큰 타이포·실제 사진 중 하나로 정한다. 깊이가 필요하면 surface 명도 2–4% 차이나 1px 경계로
- 예외: 브리프가 aurora-gradient 를 명시한 경우(그래도 텍스트 대비 4.5:1)
- 코드 검사: 예 — `blur-2xl`·`blur-3xl`, 40px 이상 `filter: blur()`

### CO-5 강조색 4개 이상 [S2]
- 시그니처: 기능 카드마다 다른 색 아이콘 배경(파랑·초록·주황·분홍), 의미 없이 색이 다른 배지
- 왜: 색으로 다양성을 연출하다가 강조의 의미(행동·상태)를 잃는다
- 처방: 강조 1개 + 의미색 4개(성공·경고·오류·정보)만. 카드 구분은 내용·크기로
- 예외: 실제로 색 코딩된 데이터(차트 시리즈, 캘린더 종류). 이때도 팔레트를 한 번 정하고 그것만 쓴다
- 코드 검사: 아니오 — capture 의 `accents[]` 개수로 본다

### CO-6 검정 대신 #0B0B0B/#111 [S3]
- 시그니처: 텍스트·다크 배경에 #0B0B0B, #111, #0A0A0A
- 왜: "순검정은 촌스럽다"는 통념이 그대로 기본값이 됐다. 혼자는 무해하지만 CO-3·TY-5 와 겹치면 템플릿 인상을 굳힌다
- 처방: 중립색 hue 를 브랜드와 맞춘다 — 차가운 쪽 oklch(0.2 0.01 260), 따뜻한 쪽 oklch(0.2 0.01 60). 의도가 없으면 그냥 둔다
- 예외: OLED 번짐을 피하려는 다크 배경. 그때도 hue 는 고른다
- 코드 검사: 예 — 해당 hex 3회부터

### CO-7 대비 낮은 회색 본문 [S1]
- 시그니처: 흰 배경에 gray-400(#9CA3AF, 2.54:1)·#999(2.85:1) 본문, 다크 배경에 gray-600 본문
- 왜: "부드럽게" 보이려고 대비를 깎는다. WCAG 1.4.3 실패라 읽지 못하는 사람이 생긴다
- 처방: 본문·muted 텍스트 모두 4.5:1 이상 — 흰 배경이면 gray-500 #6B7280(4.83:1)이 하한, 본문은 gray-600 #4B5563(7.56:1). 3:1 은 24px 이상이나 18.66px bold 이상만
- 예외: 비활성(disabled) 컨트롤 텍스트는 대비 요구에서 빠진다
- 코드 검사: 아니오 — 배경을 알아야 한다. capture `summary.md` 의 대비 결과로 본다

## 3. 레이아웃 (LA)

### LA-1 SaaS 카드 키트(같은 radius·같은 그림자 카드 반복) [S1]
- 시그니처: 모든 내용을 같은 radius(12–16px)·같은 회색 그림자·같은 패딩 카드로 자른다. 기능·후기·가격·FAQ 가 전부 카드
- 왜: 위계가 없다. 무엇이 중요한지 화면이 말하지 않는다(frontend-design 클러스터 4)
- 처방: 카드는 누를 수 있거나 독립된 객체에만 쓴다. 나머지는 여백(안쪽:바깥 ≥ 1:2)과 정렬로 묶는다. 카드를 쓰면 크기 위계를 2단계 이상(벤토 큰 타일 1 + 작은 타일)
- 예외: 대시보드 위젯, 상품 카드처럼 실제로 독립 객체인 목록
- 코드 검사: 부분 — SH-2·SH-5 가 재료를 센다. 판정은 스크린샷으로

### LA-2 아이콘+제목+설명 3열뿐 [S2]
- 시그니처: 기능 소개가 오직 "아이콘 + 굵은 제목 + 회색 두 줄" 3열 그리드
- 왜: 무게가 다른 기능을 같은 칸에 넣는다. 증거(화면·수치)가 없다
- 처방: 핵심 기능 1–2개는 실제 화면이 있는 `feature-alternating` 이나 `bento-grid` 큰 타일로, 나머지만 그리드로. 2열·4열도 검토한다
- 예외: 정말로 무게가 같은 3–6개 항목(요금제 포함 사항 등)
- 코드 검사: 아니오

### LA-3 모든 섹션 같은 골격 [S2]
- 시그니처: 섹션마다 eyebrow → 가운데 제목 → 회색 부제 → 3열 그리드, 같은 `py-24`
- 왜: 리듬이 없다. 스크롤해도 같은 화면이 반복된다
- 처방: 섹션마다 정렬(가운데/왼쪽)·폭(컨테이너/풀블리드)·밀도·배경(bg/surface/inverse) 중 2개 이상을 바꾼다. 섹션 간격도 64/96/128 로 강약을 준다
- 예외: 문서·설정처럼 반복 구조가 기능인 화면
- 코드 검사: 아니오

### LA-4 이유 없는 신문형 hairline·0 radius·빽빽한 단 [S1]
- 시그니처: 1px 검은 구분선, radius 0, 세리프, 3–4단 텍스트, 날짜·섹션 메타 줄. 주제가 신문이 아닌데 broadsheet 처럼
- 왜: "에디토리얼" 요청의 기본값이다(frontend-design 클러스터 3). 콘텐츠가 그만큼 없으면 빈 형식만 남는다
- 처방: editorial 이 맞으면 장치를 하나만 고른다(큰 세리프 제목 또는 hairline 그리드). 단은 콘텐츠 양에 맞춰 1–2단
- 예외: 실제 매거진·뉴스. 브리프가 editorial·swiss 를 고른 경우
- 코드 검사: 아니오

### LA-5 순서 아닌데 01/02/03 [S2]
- 시그니처: 순서가 없는 기능·가치 목록 앞에 큰 01 / 02 / 03
- 왜: 구조 장치는 정보를 담아야 한다. 번호는 "순서가 있다"는 주장이다
- 처방: 진짜 순서(가입 → 연결 → 요약)일 때만 번호를 단다. 아니면 지우고 제목 크기로 구분한다
- 예외: `how-it-works`, 온보딩 단계, 타임라인
- 코드 검사: 아니오 — 순서인지는 내용으로 판단한다

### LA-6 큰 숫자+통계+그라데이션 기본 히어로 [S2]
- 시그니처: 히어로에 "10x faster", "99.9%", "50K+ users" 큰 숫자 3개 + 작은 라벨 + 그라데이션
- 왜: 주제에서 가장 특징적인 것 대신 범용 증거 형식을 쓴다. 수치가 지어낸 것이면 CP-5 와 겹친다
- 처방: 히어로는 제품의 특징 하나(실제 화면, 결과물 예시, 한 문장 약속)로. 실측 수치가 있으면 히어로 아래 `proof-strip` 한 줄로
- 예외: 수치 자체가 제품인 경우(지표 서비스, 공개 통계)
- 코드 검사: 아니오

### LA-7 습관적 공지 pill [S2]
- 시그니처: 헤드라인 위 둥근 pill "✨ New: AI 요약 출시 →". 새 소식이 없거나 몇 달 지난 소식
- 왜: 템플릿 크롬이다. 히어로의 첫 시선을 정보 없는 장식이 가져간다
- 처방: 진짜 소식이 있을 때만 날짜를 붙인 `announcement-bar` 한 줄로. 없으면 지운다
- 예외: 출시 2–4주 안의 실제 소식
- 코드 검사: 아니오

## 4. 형태·깊이 (SH)

### SH-1 모든 곳 같은 radius [S2]
- 시그니처: 버튼·카드·입력·이미지·배지가 모두 12px(또는 모두 `rounded-xl`)
- 왜: radius 는 위계와 성격을 나르는 레버다. 값 하나로 통일하면 둘 다 잃는다
- 처방: 스타일 범위 안에서 2–3단계 — 예: 입력·버튼 8, 카드 16, 모달 24. 중첩하면 안쪽 radius = 바깥 radius - 패딩. pill 은 칩·토글에만
- 예외: neo-brutalism·swiss 처럼 radius 0 이 시스템인 경우(의도한 단일값)
- 코드 검사: 아니오 — capture 의 radius 단계로 본다

### SH-2 rgba(0,0,0,.1) 그림자 남발 [S2]
- 시그니처: 모든 카드·버튼에 같은 회색 소프트 그림자(`shadow-md`, `0 4px 6px rgba(0,0,0,.1)`)
- 왜: 깊이가 아니라 습관이다. 다 떠 있으면 아무것도 떠 있지 않다
- 처방: 그림자는 실제로 뜬 것(드롭다운·모달·토스트)에만. 카드는 1px 경계(배경 대비 1.2–1.5:1) 또는 면 색 차이로. 그림자를 쓰면 2레이어(가깝고 짙은 것 + 멀고 옅은 것)에 배경 hue 를 섞는다
- 예외: 오버레이·팝오버, 드래그 중인 요소
- 코드 검사: 예 — rgba(0,0,0,.1) 류와 `shadow-md/lg/xl/2xl`, 3회부터. 페이지 파일만 넘긴다

### SH-3 이유 없는 글래스 [S1]
- 시그니처: 반투명 흰 카드 + `backdrop-blur` + 흰 테두리, 그 뒤에 블롭(CO-4)까지
- 왜: 흐릴 배경이 없는데 글래스를 쓴다. 대비가 뒤 배경에 따라 바뀌어 검증할 수 없다
- 처방: 불투명 surface + 1px 경계. 글래스는 콘텐츠 위에 떠서 스크롤되는 것(sticky 내비, 이미지 위 컨트롤) 1–2곳에만
- 예외: sticky 내비·이미지 위 툴바. 브리프가 glassmorphism 을 고른 경우
- 코드 검사: 예 — backdrop-blur + 반투명 흰/검정 배경 한 묶음. sticky 내비 1곳은 정상이라 3회부터

### SH-4 뉴모피즘 컨트롤 [S1]
- 시그니처: 배경과 같은 색 버튼에 밝은 그림자(-x -y, 흰색) + 어두운 그림자(+x +y)
- 왜: 버튼과 배경 대비가 1.1:1 근처라 누를 수 있는지 보이지 않는다(WCAG 1.4.11 비텍스트 대비 3:1 실패)
- 처방: 컨트롤은 채움이나 경계로 3:1 이상. 질감이 필요하면 카드 한두 개에만 아주 얕게
- 예외: 브리프가 neumorphism 을 고르고 컨트롤 대비를 따로 보장한 경우
- 코드 검사: 예 — 음수 오프셋 + 흰색이 든 box-shadow

### SH-5 테두리+그림자+채움 동시 [S3]
- 시그니처: 한 표면에 1px 회색 테두리 + 소프트 그림자 + 흰 채움. 면이 3겹이다. shadcn Card 기본값이 이 모양이다
- 왜: 분리 장치를 고르지 않고 다 쓴다
- 처방: 하나만 고른다 — 경계(조용함), 면 색(부드러움), 그림자(떠 있음)
- 예외: 떠 있는 오버레이(경계+그림자는 다크 모드에서 가장자리를 살린다)
- 코드 검사: 예 — 한 클래스 문자열에 `border`·`shadow`·`bg-` 가 함께, 3회부터

## 5. 아이콘·이미지 (IC)

### IC-1 이모지 기능 아이콘(✨🚀⚡) [S1]
- 시그니처: 기능·장점 앞에 ✨🚀⚡🎯💡
- 왜: 아이콘을 디자인하지 않은 흔적이다. OS 마다 다르게 렌더되고 크기·굵기가 텍스트와 맞지 않는다
- 처방: 아이콘 세트 하나(Lucide·Phosphor 등, 선 1.5–2px, 20–24px)로 통일하거나 아이콘을 빼고 제목으로
- 예외: 커뮤니티 글·채팅처럼 사용자가 쓰는 이모지. 카피 속 축하 이모지 1–2개
- 코드 검사: 예 — 마크업·데이터의 이모지(국기 제외). 기능 아이콘은 보통 3개 이상 한 벌로 나오므로 3회부터 세고, 카피 속 1–2개는 넘긴다

### IC-2 모든 기능에 옅은 둥근 사각 아이콘 [S2]
- 시그니처: 40–48px 옅은 강조색 둥근 사각(`bg-indigo-50 rounded-lg`) 안에 선 아이콘, 모든 카드에 똑같이
- 왜: LA-2 의 부품이다. 아이콘이 내용과 상관없이 장식 자리를 채운다
- 처방: 아이콘은 정보(상태·카테고리)를 줄 때만. 기능 소개는 실제 화면 크롭이 더 강하다. 쓰더라도 컨테이너 없이 텍스트 색 아이콘으로
- 예외: 설정·메뉴 목록처럼 아이콘이 탐색을 돕는 곳
- 코드 검사: 아니오

### IC-3 의미 없는 3D 블롭 [S2]
- 시그니처: 반짝이는 3D 도형·클레이 캐릭터·추상 블롭 이미지. 제품과 관계없다
- 왜: 이미지 자리를 생성 이미지로 채운다
- 처방: 제품 화면, 실제 결과물, 사진, 혹은 이미지 없이 타이포로
- 예외: clay-3d·playful-illustrative 브리프에서 브랜드 캐릭터가 있는 경우
- 코드 검사: 아니오

### IC-4 스톡 '다양한 팀' 사진 [S2]
- 시그니처: 노트북 앞에서 웃는 다양한 사람들, 하이파이브, 포스트잇 벽
- 왜: 누구의 제품에도 붙는 사진은 아무것도 증명하지 않는다
- 처방: 실제 사용 장면·실제 팀 사진이 없으면 제품 화면이나 타이포로. 사진을 쓰면 색온도·대비를 한 번 맞춘다
- 예외: 실제 고객·팀 사진
- 코드 검사: 아니오

### IC-5 AI 이미지 결함 [S1]
- 시그니처: 손가락 6개, 녹아내린 글자, 의미 없는 UI 조각, 비대칭 얼굴, 지나치게 매끈한 피부
- 왜: 바로 들키고 신뢰를 직접 깎는다
- 처방: 지운다. 대신할 실제 이미지가 없으면 그 자리를 레이아웃에서 뺀다
- 예외: 없다. 생성 이미지를 쓰더라도 결함은 고친다
- 코드 검사: 아니오 — 스크린샷을 확대해서 본다

## 6. 모션 (MO)

### MO-1 모든 섹션 fade-up [S2]
- 시그니처: 스크롤할 때마다 섹션·카드가 아래에서 20–40px 떠오르며 나타난다(`whileInView`, AOS `fade-up`)
- 왜: 모션이 아무것도 가리키지 않는다. 빠르게 스크롤하면 빈 화면을 보게 된다
- 처방: 페이지 로드에 조율된 순간 하나(히어로 요소 2–3개를 60–80ms 간격, 400–600ms ease-out). 나머지 섹션은 정적. 사용자 행동에 대한 피드백(열기·확인)은 150–250ms
- 예외: 스크롤 자체가 서사인 스토리텔링 페이지(브리프에 적힌 경우)
- 코드 검사: 예 — `whileInView`, `data-aos`, ScrollTrigger, fade-up 류 클래스, 3회부터

### MO-2 모든 카드 hover-lift [S2]
- 시그니처: 모든 카드가 hover 에 2–4px 뜨고 그림자가 커진다
- 왜: 누를 수 없는 카드까지 누를 수 있어 보인다. 어포던스가 거짓말을 한다
- 처방: hover 반응은 클릭할 수 있는 것에만, 이동 대신 색·경계 변화(150ms)로
- 예외: 카드 전체가 링크인 목록(그래도 이동은 1–2px)
- 코드 검사: 예 — `hover:-translate-y-*`, `hover:scale-105`, whileHover y·scale, `:hover{transform:translateY(-…)}`, 3회부터

### MO-3 마퀴·펄스·커서 글로우 [S3]
- 시그니처: 끝없이 흐르는 로고 마퀴, 맥박 뛰는 CTA, 커서를 따라다니는 빛
- 왜: 주의를 계속 빼앗는다. CO-4·MO-1 과 겹치면 템플릿 인상을 굳힌다
- 처방: 로고는 정적 그리드(흑백 5–8개). 펄스는 실제 알림에만. 커서 효과는 지운다
- 예외: 로고가 많아 정적으로 담을 수 없을 때의 마퀴(일시정지 가능, reduced-motion 이면 정지)
- 코드 검사: 아니오

### MO-4 reduced-motion 무시 [S1]
- 시그니처: 등장 애니메이션·패럴랙스·자동 재생이 있는데 `prefers-reduced-motion` 대응이 없다
- 왜: 전정 장애가 있는 사용자에게 어지러움을 준다. 접근성 실패라 S1 이다
- 처방: 전역 `@media (prefers-reduced-motion: reduce)` 로 이동·확대 애니메이션을 끈다(opacity 전환은 남겨도 된다). Tailwind 는 `motion-safe:`, Framer Motion 은 `<MotionConfig reducedMotion="user">`
- 예외: 로딩 스피너처럼 기능에 필요한 모션(속도만 줄인다)
- 코드 검사: 예 — 프로젝트 단위. 이동 애니메이션 신호가 있는데 reduced-motion 처리 흔적이 없으면 1건. 전역 CSS·레이아웃을 같이 넘겨야 정확하다

## 7. 카피·장식 (CP)

### CP-1 버튼 끝 화살표 [S2]
- 시그니처: 'Get started →', '더 알아보기 →', 버튼 안 끝에 붙은 ArrowRight 아이콘
- 왜: 모든 버튼이 같은 장식을 달면 위계가 사라진다
- 처방: 화살표는 "다음 화면으로 간다"가 핵심인 1곳(주 CTA 또는 텍스트 링크)에만. 버튼은 라벨로 행동을 말한다
- 예외: 캐러셀 다음, 단계 진행 버튼
- 코드 검사: 예 — 텍스트 끝 `→`·`->`·`&rarr;`, 끝에 붙은 ArrowRight 아이콘, 3회부터. 외부 링크 ↗(ArrowUpRight)는 기능이라 세지 않는다

### CP-2 'A · B · C' 메타 문자열 [S3]
- 시그니처: 카드·헤더마다 '5 min read · Design · 2026' 처럼 가운뎃점으로 이은 메타
- 왜: 위계 없이 나열한다
- 처방: 가장 중요한 메타 1개를 남기고 나머지는 지우거나 작게·muted 로 낮춘다
- 예외: 한국 게시판의 '글쓴이 · 시간 · 조회 · 추천' 은 관례다(KR-6). 지우지 않는다
- 코드 검사: 아니오

### CP-3 'WORD — 조각' 라벨 [S2]
- 시그니처: 'FAST — ships in a day', 'Notes — but smarter' 처럼 단어 + 띄운 em dash + 조각
- 왜: 문장을 쓰지 않고 형식으로 멋을 낸다
- 처방: 완결된 짧은 문장 하나로 쓴다. "회의가 끝나면 요약이 도착한다."
- 예외: 사전식 정의 목록
- 코드 검사: 아니오 — `<title>` 의 '브랜드 — 설명' 형식과 코드로 구분하기 어렵다

### CP-4 과장 카피(혁신적인/차원이 다른, Revolutionize/Unlock) [S2]
- 시그니처: 혁신적인, 차원이 다른, 획기적인, 압도적인, Revolutionize, Unlock, Supercharge, Seamless, Effortless, Elevate
- 왜: 아무것도 말하지 않는 형용사다. 구체적인 제품일수록 형용사가 줄어든다
- 처방: 동사 + 대상 + 숫자. "회의 60분을 3분 요약으로" — 숫자는 실측일 때만 쓴다
- 예외: 고객이 실제로 한 말의 인용
- 코드 검사: 예 — 한/영 과장어, 3회부터

### CP-5 지어낸 로고·후기·수치 [S1]
- 시그니처: "Trusted by 10,000+ teams", 가짜 회사 로고 띠, 이름+직함+스톡 얼굴 후기, "4.9/5"
- 왜: 정직성 실패다. 들키면 제품 전체의 신뢰가 무너지고 광고 표시 규정(국내는 공정위 '추천·보증 심사지침') 문제가 될 수 있다
- 처방: 없는 건 쓰지 않는다. 섹션을 빼거나 `TODO(카피)` 로 남기고 사용자에게 실제 자료를 묻는다. 대안은 제품 화면, 사용 시나리오, 만든 사람의 한 문장
- 예외: 없다
- 코드 검사: 아니오 — 출처는 사용자에게 확인한다

### CP-6 Get Started+Learn More 쌍 [S3]
- 시그니처: 히어로 버튼 2개가 'Get Started'(채움) + 'Learn More'(외곽선). 한국어판은 '시작하기' + '더 알아보기'
- 왜: 행동을 정하지 않고 기본 쌍을 놓는다
- 처방: 주 행동 하나를 구체 라벨로("무료로 회의 요약 받기"). 보조 행동은 진짜 대안일 때만("2분 데모 보기")
- 예외: 라벨이 구체적이면 버튼 2개 구성 자체는 괜찮다
- 코드 검사: 예 — 400자 안에 두 라벨이 함께 있으면 1건

## 8. 한국어 (KR)

### KR-1 keep-all 없음 [S1]
- 시그니처: 한국어 제목이 '회의록을 자동으 / 로' 처럼 단어 중간에서 줄이 바뀐다
- 왜: 한국어는 기본값(`word-break: normal`)에서 음절 단위로 끊긴다. 한 번만 보여도 완성도가 무너진다
- 처방: `html:lang(ko){word-break:keep-all; overflow-wrap:break-word}` 또는 Tailwind `break-keep`. 제목엔 `text-wrap: balance`
- 예외: 좁은 표 셀·긴 URL 은 `overflow-wrap` 이 받는다
- 코드 검사: 예 — 프로젝트 단위. 한국어 UI 문자열(마크업 텍스트, 따옴표 문자열, `lang="ko"`)이 있는데 keep-all·break-keep 이 어디에도 없으면 1건. 한글 주석만으로는 걸리지 않는다

### KR-2 한글 웹폰트 없음·OS 폴백 섞임(맑은 고딕) [S1]
- 시그니처: 라틴 웹폰트(Inter 등)만 로드하고 한글은 OS 폴백 — Windows 는 맑은 고딕, macOS 는 Apple SD Gothic Neo. 한 문장 안에서 영문과 한글 글꼴이 다르다
- 왜: 같은 페이지가 OS 마다 다르게 보이고, Windows 에서는 "촌스럽다"는 인상을 준다
- 처방: 한글 웹폰트를 하나 로드한다(Pretendard 다이내믹 서브셋 등, `korean-typography.md` §3·§6). 라틴 폰트를 앞에 두고 한글 폰트를 둘째에 둘지, 한글 폰트 하나로 갈지 정한다
- 예외: 시스템 폰트 스택을 의도한 앱 UI(그래도 Windows 결과를 확인한다)
- 코드 검사: 예 — 프로젝트 단위. 한국어 UI 문자열이 있는데 알려진 한글 웹폰트 이름이 하나도 없으면 1건. 목록에 없는 폰트를 쓰면 오탐이니 capture 패밀리 표의 `source` 로 확인한다

### KR-3 한글 가짜 이탤릭 [S2]
- 시그니처: 한글에 italic → 브라우저가 기울여 만든 가짜 이탤릭(synthesized oblique)
- 왜: 한글 폰트에는 이탤릭이 없다. 기울어진 획이 깨져 보인다
- 처방: 강조는 굵기(400 → 600–700)나 색으로. 필요하면 `font-synthesis: none` 으로 합성을 막는다
- 예외: 라틴만 있는 문구(영문 인용, 학명)
- 코드 검사: 예 — italic 클래스 요소 안의 한글. 렌더링 결함이라 1회부터

### KR-4 한국어 제목 위 영문 대문자 eyebrow [S1]
- 시그니처: 'FEATURES', 'HOW IT WORKS' 같은 tracked 대문자 영문 라벨 + 바로 아래 한국어 제목
- 왜: 영어 템플릿을 번역한 흔적이다. 한국어 사용자에게 정보가 없는 장식이다
- 처방: 라벨을 지운다. 섹션 구분은 한국어 제목의 크기·굵기로. 꼭 필요하면 짧은 한국어 라벨, 대문자·자간 없이
- 예외: 영문 워드마크를 시스템으로 쓰는 브랜드
- 코드 검사: 예 — 대문자 영문(또는 `uppercase` 클래스) 요소 바로 다음의 한국어 헤딩

### KR-5 한글 본문 행간 1.5 미만·양수 자간 [S2]
- 시그니처: 한글 본문 line-height 1.3–1.45(영문 템플릿 값), 한글 라벨에 `tracking-wide`
- 왜: 한글은 글자 면이 꽉 차서 라틴보다 행간이 더 필요하다. 양수 자간은 어절 덩어리를 흩뜨린다
- 처방: 본문 1.6–1.7(허용 1.5–1.8), 제목 1.2–1.35(1.15 미만 금지), 자간 본문 -0.01~-0.02em·한글 display -0.02~-0.03em·12–13px 은 0. -0.04em 은 라틴 display 에만
- 예외: 한 줄짜리 버튼·칩 라벨의 line-height 1. data-dense 표 셀의 line-height 1.4
- 코드 검사: 예 — 한글이 든 `<p>` 의 `leading-none/tight/snug`, 한글 요소의 양수 tracking, 3회부터

### KR-6 한국 관례 누락(게시판을 카드 피드로, 전체 동의 없음, 사업자 정보 없음) [S2]
- 시그니처: 커뮤니티 게시판을 카드 피드로, 가입·결제에 '전체 동의' 없음, 유료 서비스 푸터에 사업자 정보 없음, 가격에 '원' 없음
- 왜: 한국 사용자는 이 관례로 화면을 훑고 신뢰를 판단한다. 영어 템플릿을 옮기면 빠진다
- 처방: 게시판은 `board-list`(번호·말머리·제목[댓글수]·글쓴이·시간·조회·추천), 약관은 `agree-all`(전체 동의 + 개별 펼침), 푸터에 상호·대표자·사업자등록번호·통신판매업 신고번호·주소·연락처, 가격은 '12,000원'
- 예외: 해외 사용자 대상 서비스
- 코드 검사: 아니오 — page-patterns 의 한국 관례 항목으로 확인한다

### KR-7 번역투 UI 카피 [S2]
- 시그니처: '~를 통해', '~에 있어서', '당신의', '제출하기', '성공적으로 저장되었습니다'
- 왜: 영어 UI 를 직역한 문장이다. 한국어 앱의 말투(해요체, 짧은 동사)와 다르다
- 처방: 해요체 짧은 동사형 — '저장했어요', '로그인하면 이어서 볼 수 있어요'. 주어 '당신'은 뺀다. 긴 문구는 humanize-korean 이나 design:ux-copy 로 넘긴다
- 예외: 법률 고지·약관 원문
- 코드 검사: 아니오

## 9. 기계 판독 블록 (dd:tells)

`dd.mjs tells` 가 아래 블록만 읽는다. 형식 계약은 플러그인 저장소의 `docs/architecture.md` §7 에 있다(설치본에는 없다). 고칠 때 지킬 것:

- 항목마다 정규식은 **하나**로 묶는다(대안은 `|`). 패턴을 여러 개로 나누면 같은 자리를 두 번 셀 수 있다.
- S1 은 오탐이 적어야 한다. 정상 용례가 흔하면 threshold 를 올리거나 코드 검사에서 빼고 시각 확인으로 돌린다.
- `absent`·`when` 은 flags 없이도 맞게 쓴다(대소문자는 `[Pp]retendard` 처럼 문자 클래스로).
- JSON 문자열 안의 역슬래시는 두 번(`\\d`) 쓴다. 바꾸면 엔진 단위 테스트(정규식 컴파일)와 `npm test` 를 돌린다.

<!-- dd:tells:begin -->
```json
{
  "schema": "dd.tells/1",
  "tells": [
    {"id": "TY-1", "severity": "S1", "title": "헤드라인 한 단어 강조", "threshold": 1,
     "files": ["html","tsx","jsx","vue","svelte","astro"],
     "patterns": ["<h[12]\\b[^>]*>(?:(?!<\\/h[12]>)[\\s\\S]){0,200}?(?:<(?:em|mark)\\b|<span\\b[^>]*(?<![\\w-])(?:bg-clip-text|italic|text-(?:primary|accent|brand|indigo|violet|purple|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|rose|pink|fuchsia)(?:-\\d{2,3})?)(?![\\w-]))"]},
    {"id": "TY-2", "severity": "S1", "title": "모든 헤딩 위 대문자 eyebrow", "threshold": 3,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])uppercase(?![\\w-])[^\"'`]{0,120}?(?<![\\w-])tracking-(?:wide|wider|widest|\\[(?:0?\\.\\d+r?em|\\d+(?:\\.\\d+)?px)\\])(?![\\w-])|(?<![\\w-])tracking-(?:wide|wider|widest|\\[(?:0?\\.\\d+r?em|\\d+(?:\\.\\d+)?px)\\])(?![\\w-])[^\"'`]{0,120}?(?<![\\w-])uppercase(?![\\w-])|text-transform:\\s*uppercase[^{}]{0,160}?letter-spacing:\\s*(?:0?\\.\\d+r?em|[1-9]\\d*(?:\\.\\d+)?px)|letter-spacing:\\s*(?:0?\\.\\d+r?em|[1-9]\\d*(?:\\.\\d+)?px)[^{}]{0,160}?text-transform:\\s*uppercase"]},
    {"id": "TY-3", "severity": "S1", "title": "그라데이션 텍스트", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])bg-clip-text(?![\\w-])|(?:-webkit-)?background-clip:\\s*text\\b|[Bb]ackgroundClip:\\s*[\"'`]text[\"'`]"]},
    {"id": "TY-5", "severity": "S3", "title": "데이터 라벨 모노스페이스", "threshold": 3,
     "files": ["html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])font-mono(?![\\w-])[^\"'`]{0,80}?(?<![\\w-])text-(?:xs|\\[(?:9|10|11|12)px\\])(?![\\w-])|(?<![\\w-])text-(?:xs|\\[(?:9|10|11|12)px\\])(?![\\w-])[^\"'`]{0,80}?(?<![\\w-])font-mono(?![\\w-])"]},
    {"id": "CO-1", "severity": "S1", "title": "보라→파랑 그라데이션", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])from-[a-z]+(?:-\\d{2,3})?(?![\\w-])[^\"'`]{0,80}?(?<![\\w-])(?:via|to)-(?:purple|violet|indigo|fuchsia)-[4-7]00(?![\\w-])|(?<![\\w-])from-(?:purple|violet|indigo|fuchsia)-[4-7]00(?![\\w-])|(?<![\\w-])(?:from|via|to)-\\[#(?:667eea|764ba2|7c3aed|8b5cf6|6366f1|4f46e5|a855f7|9333ea|6d28d9|7e22ce|4338ca|a78bfa|818cf8|c084fc|d946ef|c026d3|6a11cb|8e2de2|4a00e0|7f00ff|9d50bb|6e48aa)\\]|(?:linear|radial|conic)-gradient\\([^;{}\"'`]{0,240}?#(?:667eea|764ba2|7c3aed|8b5cf6|6366f1|4f46e5|a855f7|9333ea|6d28d9|7e22ce|4338ca|a78bfa|818cf8|c084fc|d946ef|c026d3|6a11cb|8e2de2|4a00e0|7f00ff|9d50bb|6e48aa)(?![0-9a-f])"],
     "flags": "i"},
    {"id": "CO-2", "severity": "S1", "title": "크림+세리프+테라코타(#F4F1EA/#D97757)", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "colors": ["#D97757"], "maxDeltaE": 0.03},
    {"id": "CO-3", "severity": "S1", "title": "거의 검정+형광 강조 하나", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "colors": ["#CCFF00", "#39FF14"], "maxDeltaE": 0.05},
    {"id": "CO-4", "severity": "S1", "title": "히어로 뒤 그라데이션 블롭·오브", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])blur-(?:2xl|3xl|\\[(?:[4-9]\\d|[1-9]\\d{2,})px\\])(?![\\w-])|(?<![\\w-])filter:\\s*[\"'`]?blur\\(\\s*(?:[4-9]\\d|[1-9]\\d{2,})px"]},
    {"id": "CO-6", "severity": "S3", "title": "검정 대신 #0B0B0B/#111", "threshold": 3,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["#(?:0b0b0b|111111|0a0a0a)(?![0-9a-f])|#111(?![0-9a-f])"],
     "flags": "i"},
    {"id": "SH-2", "severity": "S2", "title": "rgba(0,0,0,.1) 그림자 남발", "threshold": 3,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["rgba?\\(\\s*0\\s*,\\s*0\\s*,\\s*0\\s*,\\s*0?\\.10?\\s*\\)|rgba?\\(\\s*0\\s+0\\s+0\\s*\\/\\s*(?:0?\\.10?|10%)\\s*\\)|(?<![\\w-])shadow-(?:md|lg|xl|2xl)(?![\\w-])"]},
    {"id": "SH-3", "severity": "S1", "title": "이유 없는 글래스", "threshold": 3,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])backdrop-blur(?:-(?:xs|sm|md|lg|xl|2xl|3xl|\\[[^\\]]+\\]))?(?![\\w-])[^\"'`]{0,160}?(?<![\\w-])bg-(?:white|black|background|card)\\/(?:\\d{1,2}|\\[[^\\]]+\\])|(?<![\\w-])bg-(?:white|black|background|card)\\/(?:\\d{1,2}|\\[[^\\]]+\\])[^\"'`]{0,160}?(?<![\\w-])backdrop-blur(?:-(?:xs|sm|md|lg|xl|2xl|3xl|\\[[^\\]]+\\]))?(?![\\w-])|backdrop-filter:\\s*blur\\([^{}]{0,200}?rgba\\(\\s*255\\s*,\\s*255\\s*,\\s*255\\s*,\\s*0?\\.\\d+\\s*\\)|rgba\\(\\s*255\\s*,\\s*255\\s*,\\s*255\\s*,\\s*0?\\.\\d+\\s*\\)[^{}]{0,200}?backdrop-filter:\\s*blur\\("]},
    {"id": "SH-4", "severity": "S1", "title": "뉴모피즘 컨트롤", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?:box-shadow|boxShadow)\\s*:\\s*[\"'`]?[^;{}]*?-\\d+(?:\\.\\d+)?px\\s+-\\d+(?:\\.\\d+)?px\\s+\\d+(?:\\.\\d+)?px[^;{}]*?(?:#fff(?:fff)?(?![0-9a-fA-F])|rgba?\\(\\s*255\\s*,\\s*255\\s*,\\s*255)|shadow-\\[[^\\]]*?-\\d+px_-\\d+px_\\d+px[^\\]]*?(?:#fff(?:fff)?(?![0-9a-fA-F])|rgba?\\(255,255,255)"]},
    {"id": "SH-5", "severity": "S3", "title": "테두리+그림자+채움 동시", "threshold": 3,
     "files": ["html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["class(?:Name)?=\\{?\\s*(?:cn|clsx|cx|twMerge)?\\(?\\s*[\"'`](?=[^\"'`]*(?<![\\w-])border(?![\\w-]))(?=[^\"'`]*(?<![\\w-])shadow(?:-(?:sm|md|lg|xl|2xl))?(?![\\w/-]))(?=[^\"'`]*(?<![\\w-])bg-(?!transparent|clip-|gradient-|linear-|radial-|none|opacity-|fixed|cover|contain|center|no-repeat)[a-z])"]},
    {"id": "IC-1", "severity": "S1", "title": "이모지 기능 아이콘(✨🚀⚡)", "threshold": 3,
     "files": ["html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?![\\u{1F1E6}-\\u{1F1FF}])\\p{Emoji_Presentation}|\\p{Extended_Pictographic}\\uFE0F"],
     "flags": "u"},
    {"id": "MO-1", "severity": "S2", "title": "모든 섹션 fade-up", "threshold": 3,
     "files": ["html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])whileInView(?![\\w-])|data-aos=[\"'][\\w-]+|(?<![\\w-])scrollTrigger\\s*:|class(?:Name)?=[^>\\n]{0,200}?(?<![\\w-])(?:animate-fade-(?:in-)?up|fade-(?:in-)?up|slide-in-from-bottom(?:-\\d+)?|animate__fadeInUp)(?![\\w-])"]},
    {"id": "MO-2", "severity": "S2", "title": "모든 카드 hover-lift", "threshold": 3,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])(?:group-)?hover:(?:-translate-y-(?:px|0\\.5|1|1\\.5|2|3|\\[[^\\]]+\\])|scale-(?:102|105))(?![\\w-])|whileHover=\\{\\{\\s*(?:y:\\s*-\\d|scale:\\s*1\\.(?:0[2-9]|1)\\b)|:hover\\s*\\{[^}]*transform:\\s*translateY\\(\\s*-\\d"]},
    {"id": "MO-4", "severity": "S1", "title": "reduced-motion 무시", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","mjs","vue","svelte","astro"],
     "absent": ["prefers-reduced-motion", "[Rr]educed-?[Mm]otion", "motion-safe:", "motion-reduce:"],
     "when": "@keyframes\\s+(?!(?:spin|pulse|ping|blink|caret-blink|shimmer|skeleton|loader|loading|accordion-(?:up|down)|collapsible-(?:up|down)|enter|exit|fade-?in|fade-?out|fadeIn|fadeOut)(?![\\w-]))[\\w-]+|(?<![\\w-])animate-(?!(?:none|spin|pulse|ping|in|out|accordion-(?:up|down)|collapsible-(?:up|down)|caret-blink)(?![\\w-]))[a-z][\\w-]*|framer-motion|[\"']motion\\/react[\"']|(?<![\\w-])gsap(?![\\w-])|(?<![\\w-])whileInView(?![\\w-])|data-aos="},
    {"id": "CP-1", "severity": "S2", "title": "버튼 끝 화살표", "threshold": 3,
     "files": ["css","scss","html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["(?:→|&rarr;|-&gt;|->)\\s*(?:<\\/|[\"'`])|<(?:\\w*ArrowRight\\w*|MoveRight)\\b[^>]*\\/>\\s*<\\/"]},
    {"id": "CP-4", "severity": "S2", "title": "과장 카피(혁신적인/차원이 다른, Revolutionize/Unlock)", "threshold": 3,
     "files": ["html","tsx","jsx","ts","js","vue","svelte","astro","mdx"],
     "patterns": ["혁신적(?:인|으로)|차원이 다른|새로운 차원|획기적(?:인|으로)|압도적(?:인|으로)|게임 ?체인저|\\b(?:Revolutioniz(?:e|es|ing)|Unlock|Supercharge|Unleash|Elevate|Empower)\\b|\\b(?:[Ss]eamless(?:ly)?|[Ee]ffortless(?:ly)?|[Cc]utting-edge|[Nn]ext-gen(?:eration)?|[Gg]ame-?changer|[Bb]est-in-class|[Ww]orld-class)\\b"]},
    {"id": "CP-6", "severity": "S3", "title": "Get Started+Learn More 쌍", "threshold": 1,
     "files": ["html","tsx","jsx","ts","js","vue","svelte","astro"],
     "patterns": ["Get [Ss]tarted[\\s\\S]{0,400}?Learn [Mm]ore|Learn [Mm]ore[\\s\\S]{0,400}?Get [Ss]tarted|시작하기[\\s\\S]{0,300}?(?:더|자세히) 알아보기|(?:더|자세히) 알아보기[\\s\\S]{0,300}?시작하기"]},
    {"id": "KR-1", "severity": "S1", "title": "keep-all 없음", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","mjs","vue","svelte","astro","mdx"],
     "absent": ["keep-all", "break-keep"],
     "when": "lang=[\"']ko|>[^<>{}\\n]*[가-힣]|[\"'`][^\"'`\\n]{0,120}[가-힣]"},
    {"id": "KR-2", "severity": "S1", "title": "한글 웹폰트 없음·OS 폴백 섞임(맑은 고딕)", "threshold": 1,
     "files": ["css","scss","sass","less","html","tsx","jsx","ts","js","mjs","cjs","vue","svelte","astro","mdx"],
     "absent": ["[Pp]retendard|PRETENDARD", "(?<![\\w-])SUIT(?![\\w-])|sun-typeface|[Ss]uit-[Vv]ariable", "[Ww]anted[ _+-]?[Ss]ans", "[Ss]poqa", "(?:Sans|Serif|Gothic|Myeongjo)[ _+-]?KR(?![A-Za-z])", "Noto[ _+-]?Sans[ _+-]?CJK|Source[ _+-]?Han", "[Nn]anum", "[Gg]market", "LINE[ _+-]?Seed|[Ll]ine[ _-]?[Ss]eed", "[Mm]aru[ _+-]?[Bb]uri", "Gowun|Hahmlet|Gothic[ _+-]?A1|Black[ _+-]?Han[ _+-]?Sans|Do[ _+-]?Hyeon|Song[ _+-]?Myung|Sunflower|Dongle|Gaegu|Hi[ _+-]?Melody|IBM[ _+-]?Plex[ _+-]?Sans[ _+-]?KR", "S-?Core[ _-]?Dream|SCDream|KoPub|Cafe24|Paperlogy|Jalnan|Binggrae|Tmoney|Galmuri|Ownglyph|NEXON|Hakgyoansim|Isamanru|Escore"],
     "when": "lang=[\"']ko|>[^<>{}\\n]*[가-힣]|[\"'`][^\"'`\\n]{0,120}[가-힣]"},
    {"id": "KR-3", "severity": "S2", "title": "한글 가짜 이탤릭", "threshold": 1,
     "files": ["html","tsx","jsx","vue","svelte","astro"],
     "patterns": ["(?<![\\w-])italic(?![\\w-])[^\"'`<>]*[\"'`][^>]*>\\s*[^<]{0,40}?[가-힣]"]},
    {"id": "KR-4", "severity": "S1", "title": "한국어 제목 위 영문 대문자 eyebrow", "threshold": 1,
     "files": ["html","tsx","jsx","vue","svelte","astro"],
     "patterns": ["(?:>\\s*[A-Z][A-Z0-9&/ .-]{2,40}|(?<![\\w-])uppercase(?![\\w-])[^>]*>\\s*[A-Za-z][A-Za-z0-9&/ .-]{2,40})\\s*<\\/[A-Za-z][\\w.]*>\\s*<(?:h[1-6]|\\w*(?:Title|Heading|Headline)\\w*)\\b[^>]*>\\s*[^<]{0,40}?[가-힣]"]},
    {"id": "KR-5", "severity": "S2", "title": "한글 본문 행간 1.5 미만·양수 자간", "threshold": 3,
     "files": ["html","tsx","jsx","vue","svelte","astro"],
     "patterns": ["<p\\b[^>]*(?<![\\w-])leading-(?:none|tight|snug|\\[1(?:\\.[0-4]\\d*)?\\])(?![\\w-])[^>]*>\\s*[^<]{0,40}?[가-힣]|(?<![\\w-])tracking-(?:wide|wider|widest|\\[0?\\.\\d+em\\])(?![\\w-])[^\"'`<>]*[\"'`][^>]*>\\s*[^<]{0,40}?[가-힣]"]}
  ]
}
```
<!-- dd:tells:end -->
