# 스타일 카탈로그 인덱스

스타일 이름, 브랜드 이름, 느낌어, 측정한 토큰을 카탈로그의 스타일 id 로 바꿀 때 읽는다. `ref` 의 분류(2단계)와
`direct` 의 방향 제안이 같은 id 를 쓴다. 스타일 파일 값은 모두 **범위**다. 사이트에서 잰 값이 아니므로 근거는 `카탈로그`로 단다.

## 목차
1. 매칭 순서
2. 여섯 축
3. 기본 스타일 18종
4. 트리트먼트 5종
5. 별칭과 스타일이 아닌 말
6. 토큰 → 스타일 판별 힌트
7. 카탈로그 밖 스타일

## 1. 매칭 순서

1. **스타일 이름·별칭**을 말했다 → 5장 별칭 표 → 스타일 파일.
2. **브랜드 이름**("토스 느낌") → `${CLAUDE_PLUGIN_ROOT}/references/brands/_index.md` 의 스타일 매핑. 수치는 카드에서만 온다.
3. **느낌어**("고급스럽게", "덜 딱딱하게") → direct 의 `${CLAUDE_PLUGIN_ROOT}/skills/direct/references/feeling-words.md` 가
   축 변화로 바꾼다 → 2장 축으로 가까운 스타일을 찾는다.
4. **페이지 유형 + 제품 성격**만 있다 → 3장 "잘 맞는 페이지" 열.

- 하나가 분명하면 그걸 쓴다. 2–3개가 그럴듯하면 축이 2개 이상 다른 안끼리 보여주고 고르게 한다.
- ref 가 측정값으로 분류할 때는 6장 힌트 → 3장 축 → 후보 스타일 파일 1–2개 순서로 확인한다.
- 표기: `primary × secondary + treatment` (예: `minimal × swiss`, `corporate-clean + aurora-gradient`). 다른 문서도 이 표기를 쓴다.

## 2. 여섯 축

축은 1–5 서열값이다. 측정값이 아니라 분류용 좌표다. 프로필 2장에 `밀도 2 · 온도 2 · 채도 1 · 대비 4 · 둥긂 3 · 장식 1`
형식으로 적고, 표에서는 `밀2 온2 채1 대4 둥3 장1` 로 줄인다.

| 축 | 재는 것 | 1 | 5 | 주로 움직이는 레버 |
|---|---|---|---|---|
| 밀도 density | 화면당 정보량 | 첫 화면에 메시지 하나, 빈 칸 70% 이상 | 표·숫자로 꽉 참, 빈 칸 30% 미만 | 섹션 여백, 행 높이, 본문 크기 |
| 온도 temperature | 중립색·형태·사진이 주는 온기 | 차가운 회청색 중립, 직선, 기계적 | 크림·샌드 중립, 손맛, 자연광 사진 | 중립색 hue, 사진 톤, 서체 성격 |
| 채도 saturation | 색의 양과 세기 | 무채색만 | 고채도 색 여러 개가 넓은 면적 | 강조색 수, 색 면적, chroma |
| 대비 contrast | 명도·크기 차의 폭 | 회색 위 회색, 크기 차 작음 | 흑백, display:본문 5배 이상 | 텍스트·배경 명도 차, 크기 비 |
| 둥긂 roundness | 모서리와 형태 | radius 0, 직선 | radius 24px 이상·pill·blob | radius, 아이콘 끝 처리, 서체 형태 |
| 장식 ornament | 기능 없는 시각 요소의 양 | 타이포와 여백뿐 | 일러스트·패턴·3D·그라데이션 다수 | 일러스트, 배경 효과, 아이콘 처리 |

## 3. 기본 스타일 18종

대표 레퍼런스는 널리 알려진 정성 연상이고 실측하지 않았다. 수치가 필요하면 ref 로 캡처한다.

스타일 파일의 레버 값은 범위만 준다. 모두가 같은 값을 베끼면 그 값이 새 기본값이 되기 때문이다. 범위 안에서 프로젝트에
맞게 고른다. 한글 타이포 수치는 `${CLAUDE_PLUGIN_ROOT}/references/korean-typography.md` 가 스타일 파일보다 우선한다.

| id | 이름 KR / EN | 한 줄 | 축 | 잘 맞는 페이지 | 대표 레퍼런스 (정성) | 파일 |
|---|---|---|---|---|---|---|
| `minimal` | 미니멀 / Minimal | 요소를 줄이고 여백·크기·굵기로만 위계를 만든다 | 밀1 온3 채1 대3 둥2 장1 | 단일 제품 랜딩, 포트폴리오, 개인 사이트 | Apple 제품 페이지 (apple.com) | `minimal.md` |
| `swiss` | 스위스 / Swiss (International Typographic Style) | 보이는 격자, 왼쪽 정렬, 거대한 산세리프, 원색 하나 | 밀3 온2 채2 대5 둥1 장1 | 개발자 도구, 스튜디오, 전시·컨퍼런스 | Müller-Brockmann 포스터 계보 | `swiss.md` |
| `editorial` | 에디토리얼 / Editorial | 잡지 편집 문법: 세리프 제목, 다단, 큰 이미지와 캡션 | 밀3 온3 채2 대4 둥1 장2 | 블로그, 매거진, 브랜드 스토리, 리포트 | The New Yorker, Stripe Press | `editorial.md` |
| `corporate-clean` | 코퍼릿 클린 / Corporate Clean | 정돈된 정보 구조, 브랜드 1색, 실제 제품 화면으로 신뢰 | 밀3 온2 채3 대3 둥3 장2 | B2B SaaS, 기업·채용, 공공 | Stripe, IBM Carbon | `corporate-clean.md` |
| `data-dense` | 데이터 밀집 / Data-dense | 작은 글자, 촘촘한 행, 정렬된 숫자, 색은 의미에만 | 밀5 온2 채2 대3 둥2 장1 | 대시보드, 어드민, 게시판 목록 | Hacker News, 금융 터미널 | `data-dense.md` |
| `neo-brutalism` | 네오 브루탈리즘 / Neo-brutalism | 두꺼운 검정 테두리, 하드 오프셋 그림자, 원색 면 | 밀3 온4 채5 대5 둥2 장3 | 크리에이터 도구, 인디 SaaS, 이벤트 | Gumroad | `neo-brutalism.md` |
| `playful-illustrative` | 플레이풀 일러스트 / Playful Illustrative | 고유 일러스트·캐릭터, 밝은 색, 큰 radius, 탄성 모션 | 밀2 온4 채4 대3 둥5 장5 | 교육, 소비자 앱, 커뮤니티 | Duolingo, Mailchimp | `playful-illustrative.md` |
| `organic-soft` | 오가닉 소프트 / Organic Soft | 따뜻한 중립, 낮은 채도 자연색, 부드러운 곡선과 질감 | 밀2 온5 채2 대2 둥4 장3 | 웰니스, 뷰티, 식음료, 리빙 | 웰니스·스킨케어 브랜드 계열 | `organic-soft.md` |
| `luxury` | 럭셔리 / Luxury | 큰 이미지와 작은 글자, 고대비 세리프, 느린 움직임 | 밀1 온3 채1 대4 둥1 장2 | 패션·주얼리, 호텔, 갤러리 | Chanel, Hermès | `luxury.md` |
| `dark-tech` | 다크 테크 / Dark Tech | 거의 검정 면, 1px 반투명 경계, 조인 헤드라인, 제품 UI | 밀3 온1 채2 대4 둥2 장2 | 개발자 도구, AI 제품, 생산성 앱 | Linear, Raycast, Supabase | `dark-tech.md` |
| `kr-fintech-simple` | 토스형 핀테크 심플 / KR Fintech Simple | 한 화면 한 메시지, 큰 숫자, 파랑 하나, 그림자 대신 배경 단계 | 밀2 온3 채2 대4 둥4 장1 | 금융·결제, 신청 흐름, 모바일 웹앱 | 토스, 뱅크샐러드 | `kr-fintech-simple.md` |
| `kr-editorial-commerce` | 29CM형 에디토리얼 커머스 / KR Editorial Commerce | 사진이 색을 독점, 작은 글자, 흑백 UI, 잡지형 기획전 | 밀2 온3 채1 대4 둥1 장2 | 패션·라이프스타일 커머스, 편집숍 | 29CM, 무신사 매거진 영역 | `kr-editorial-commerce.md` |
| `admin-calm` | 차분한 어드민 / Calm Admin | 넉넉한 행과 1px 테두리 섹션 카드, 차분한 강조 1색의 백오피스·설정 화면 | 밀3 온3 채2 대3 둥3 장1 | 운영자 콘솔, 설정·결제 관리, 소상공인 관리자, CRM | 예약·쇼핑 SaaS 운영자 화면 계열 | `admin-calm.md` |
| `admin-console` | 다크 콘솔 / Ops Console | 어두운 회청 바탕, hairline 패널 격자, 큰 tabular 숫자, 상태 3색 | 밀4 온1 채2 대4 둥2 장1 | 실시간 모니터링, 인프라·API 관측, 관제 | 관측·모니터링 도구 계열 | `admin-console.md` |
| `kr-admin-classic` | 한국형 관리자 / KR Classic Admin | 검색 조건 박스, 엑셀 다운로드·일괄 처리, 전부 그은 그리드 | 밀5 온2 채3 대3 둥1 장1 | 쇼핑몰 회원·주문 관리, 사내 업무, 정산·CS | 국내 쇼핑몰 솔루션 관리자 계열 | `kr-admin-classic.md` |
| `kr-board-classic` | 한국형 게시판 / KR Classic Board | 번호·말머리·제목[댓글수]·글쓴이·날짜·조회·추천 7열 목록, 장식 없음 | 밀5 온2 채2 대3 둥1 장1 | 텍스트 중심 커뮤니티, 동호회, 사내 게시판 | 국내 대형 커뮤니티 게시판 계열 | `kr-board-classic.md` |
| `kr-local-feed` | 동네 피드형 / KR Local Feed | 사진 카드에 동네·주제 칩·상대 시간·공감 수, 따뜻한 강조 1색 | 밀3 온4 채3 대3 둥4 장2 | 지역 생활·관심사 커뮤니티, 근황·후기 피드 | 지역 생활 커뮤니티 앱 계열 | `kr-local-feed.md` |
| `forum-thread` | 스레드형 포럼 / Threaded Forum | 투표 열·태그·채택 답변·들여쓰기 답글 트리 | 밀4 온1 채2 대3 둥2 장1 | 기술 Q&A, 제품 사용자 포럼, 지식 공유 | 개발자 Q&A·오픈소스 포럼 계열 | `forum-thread.md` |

## 4. 트리트먼트 5종

트리트먼트는 스타일이 아니라 기본 스타일 위에 얹는 **표면 처리**다. 프로필·브리프에 0–2개만 붙인다. 정의·수치 범위·조건은
`${CLAUDE_PLUGIN_ROOT}/references/styles/treatments.md`.

| id | 한 줄 | 필요한 조건 | 무너지면 |
|---|---|---|---|
| `glassmorphism` | 뒤를 흐리는 반투명 면 | 뒤에 다색·사진 배경이 있어야 보인다 | SH-3 |
| `neumorphism` | 배경과 같은 색 면을 양방향 그림자로 돌출 | 장식 요소에만. 컨트롤은 대비 보강 필수 | SH-4 |
| `aurora-gradient` | 흐린 다색 그라데이션 면 | 브랜드 hue 에서 뽑은 2–4색, 한 곳에만 | CO-4, CO-1 |
| `grain-noise` | 미세 입자 질감 한 겹 | 평평한 색 면이 너무 디지털해 보일 때 | 대응 ID 없음. 블롭을 가리는 용도면 CO-4 |
| `clay-3d` | 무광 파스텔 3D 렌더 | 같은 조명·각도로 만든 고유 렌더 세트 | IC-3 |

## 5. 별칭과 스타일이 아닌 말

| 들은 말 | 해석 | 처리 |
|---|---|---|
| "벤토", "벤토 스타일" | 레이아웃 패턴 `bento-grid` (sections.md) | 섹션 + 기본 스타일 하나를 함께 고른다. dark-tech·minimal 과 자주 짝 |
| "모던하게", "세련되게", "깔끔하게", "이쁘게" | 스타일이 아니라 느낌어 | direct 의 feeling-words 로 축 변화를 확인한다 |
| "고급스럽게" | 느낌어. luxury 와 같지 않다 | 후보 luxury · minimal · editorial 을 축(밀도↓ 채도↓ 대비↑)으로 고른다 |
| "미니멀하게" | `minimal` 이거나 "요소 줄이기" | 확인 질문 1개 |
| "애플 느낌" | 브랜드 apple (미캡처) | `minimal × luxury`, URL 캡처 제안 |
| "토스 느낌", "토스처럼" | 브랜드 toss | `kr-fintech-simple` + 카드 또는 캡처 |
| "29CM 느낌", "편집숍 같은", "감성 쇼핑몰" | 브랜드 29cm / 스타일 | `kr-editorial-commerce` |
| "Linear 스타일", "다크 SaaS", "개발자 도구 느낌" | 브랜드 linear / 스타일 | `dark-tech` |
| "스위스", "국제주의", "헬베티카 느낌", "그리드 강한" | 스타일 | `swiss` |
| "매거진", "잡지 같은", "뉴스레터 느낌" | 스타일 | `editorial` |
| "브루탈", "뉴브루탈", "Gumroad 같은" | 스타일 | `neo-brutalism`. raw brutalism 은 7장 |
| "귀여운", "아기자기", "캐릭터 있는" | 스타일 | `playful-illustrative` |
| "내추럴", "따뜻한", "감성적인", "웰니스" | 스타일 또는 느낌어 | `organic-soft` 후보 + 축 확인 |
| "기업 사이트처럼", "신뢰감 있게", "B2B" | 스타일 또는 느낌어 | `corporate-clean` 후보 |
| "대시보드", "엑셀 같은", "데이터 많은" | 스타일 + 화면 유형 | `data-dense` |
| "어드민", "관리자 페이지", "백오피스" | 스타일 + 화면 유형 | 비전문 운영자용·설정이면 `admin-calm`, 국내 관례(검색 조건·엑셀)면 `kr-admin-classic`, 숫자 위주면 `data-dense` |
| "관제", "모니터링", "상황판" | 스타일 + 화면 유형 | `admin-console` |
| "게시판", "커뮤니티 목록" | 스타일 + 화면 유형 | 목록형이면 `kr-board-classic`, 사진 피드면 `kr-local-feed`, Q&A·토론이면 `forum-thread`, 학습·친근함이면 `playful-illustrative` |
| "글래스", "유리 느낌", "블러" | 트리트먼트 | `glassmorphism` + 기본 스타일 |
| "뉴모피즘", "소프트 UI" | 트리트먼트 | `neumorphism` |
| "오로라", "메시 그라데이션", "그라데이션 배경" | 트리트먼트 | `aurora-gradient` |
| "노이즈", "필름 질감", "그레인" | 트리트먼트 | `grain-noise` |
| "클레이", "3D 아이콘", "말랑한 3D" | 트리트먼트 | `clay-3d` |
| "다크 모드로" | 스타일이 아니라 테마 | 지금 스타일을 유지하고 다크 토큰만 만든다 |
| "플랫", "머티리얼", "Y2K", "멤피스", "바우하우스" | 카탈로그 미수록 | 7장 |

## 6. 토큰 → 스타일 판별 힌트

summary.md 값으로 후보를 좁힌다. 두 줄 이상 맞으면 유력하고, 오른쪽 열로 이웃 스타일과 가른다.

| 관찰되는 조합 | 유력 | 이웃과 가르는 법 |
|---|---|---|
| radius 0–2 + 원색 강조 1개 + 크고 왼쪽 정렬된 산세리프 헤드라인 + 보이는 격자선 | `swiss` | minimal 은 크기 대비가 극단적이지 않다. editorial 은 세리프·다단 |
| 거의 검정 bg(명도 5–12%) + 1px 밝은 경계(알파 6–12%) + display 굵기 500–600 | `dark-tech` | 경계 없이 형광 강조 하나만 있으면 AI 기본값 CO-3 을 의심 |
| radius 16–24 + 그림자 없음 + 회색 배경 단계 + 아주 큰 숫자 + 파랑 1색 | `kr-fintech-simple` | corporate-clean 은 그림자·카드 테두리를 쓴다 |
| 가장자리까지 찬 상품 사진 + 12–14px 글자 + 흑백 UI + 이미지 비중 40% 이상 | `kr-editorial-commerce` | luxury 는 상품 그리드·가격이 거의 없다 |
| 3–4px 검정 테두리 + 하드 오프셋 그림자 `4px 4px 0` + 고채도 면 | `neo-brutalism` | playful 은 테두리가 얇고 radius 가 크다 |
| 세리프 헤드라인 + 본문 18px 이상 + 다단·캡션 + 구분선 | `editorial` | 크림 바탕 + 테라코타 조합이면 CO-2 를 의심 |
| 본문 13–14px + 행 32–40px + tabular 숫자 + 그림자 없음 + 빈 칸 30% 미만 | `data-dense` | corporate-clean 은 행이 여유롭고 카드를 쓴다 |
| 본문 14–15px + 행 48–56px + 1px 테두리 섹션 카드 radius 8–12 + 그림자 없음 + 강조 1색 5% 미만 | `admin-calm` | data-dense 보다 행이 높고, corporate-clean 과 달리 사진·그림자가 없다 |
| 다크 bg 명도 8–14% + 경계 알파 6–12% + 숫자 24–36px tabular + 상태 3색 + 큰 헤드라인 없음 | `admin-console` | dark-tech 는 display 헤드라인과 여백이 있다 |
| 본문 13px + radius 0–3 + 가로·세로 모두 그은 셀 + 회색 라벨 셀·헤더 행 + 상단 짙은 바 | `kr-admin-classic` | data-dense 는 행 구분선 하나와 칩 필터를 쓴다 |
| 본문 13–14px + 행 36–44px + 1px 행 구분선 + 제목 옆 `[N]` 댓글 수 + 공지 tint 행, 제목 열이 50% 이상 | `kr-board-classic` | data-dense 는 숫자 열이 많다 |
| 따뜻한 중립 bg + 강조 1색 + radius 12–20 + pill 칩 + 사진 카드 + 그림자는 FAB 만 | `kr-local-feed` | playful 은 일러스트·탄성 모션이 있다 |
| 회청 중립 + 파랑 1·초록 1(채택) + 왼쪽 투표 열 + 1px 들여쓰기 선 + 모노는 코드에만 | `forum-thread` | kr-board-classic 은 7열 목록이고 트리가 없다 |
| 가는 세리프 display + 넓은 자간 라틴 대문자 + 섹션 120–240px + 풀블리드 사진 | `luxury` | minimal 은 사진·세리프 비중이 낮다 |
| 따뜻한 중립(hue 50–90) + 낮은 채도 + radius 16–32 + 넓고 옅은 그림자 + 자연 사진 | `organic-soft` | 크림 + 세리프 + 테라코타가 그대로면 CO-2 |
| radius 12–32 + 고유 일러스트·캐릭터 + 밝은 다색 + 탄성 easing | `playful-illustrative` | 3D 렌더가 주인공이면 clay-3d 트리트먼트 |
| 브랜드 1색(파랑·남색 계열) + 중립 6–9단계 + 1px 카드 + 그림자 1–2단계 + 제품 화면 | `corporate-clean` | 같은 카드가 끝없이 반복되면 LA-1 |
| 무채색 3–5단계 + 강조 0–1개 + 섹션 120px 이상 + 요소 적음 | `minimal` | swiss 는 격자·크기 극단, luxury 는 세리프·사진 |
| `backdrop-filter` + 반투명 면 + 뒤에 다색 배경 | + `glassmorphism` | 뒤가 단색이면 SH-3 |
| 배경과 같은 색 면 + 밝고 어두운 양방향 그림자 | + `neumorphism` | |
| 히어로에 크게 흐린 다색 그라데이션 면 | + `aurora-gradient` | 보라→파랑이면 CO-1 |
| 3–8% 노이즈 텍스처 레이어 | + `grain-noise` | |
| 무광 파스텔 3D 렌더가 섹션마다 | + `clay-3d` | 의미 없는 형태면 IC-3 |

## 7. 카탈로그 밖 스타일

- 일반 지식으로 설명해도 된다. 대신 프로필·브리프에 `카탈로그 미수록`이라고 밝히고, 값은 범위로만 쓴다
  (근거 열: `카탈로그 (미수록)`).
- 분류는 "카탈로그 밖: 가장 가까운 X + 차이"로 쓴다. 예: "카탈로그 밖(raw brutalism): 가장 가까운 neo-brutalism +
  차이: 색 없음, 기본 HTML 서식, 그림자 없음".
- 그 스타일의 실제 사이트 URL 을 받아 캡처하자고 한 줄 제안한다. 측정값이 생기면 범위보다 그 값을 쓴다.
- 같은 요청이 반복되면 카탈로그에 추가할 후보다(메인테이너 절차).
