# 브랜드 인덱스

"토스 느낌", "Linear 처럼"처럼 브랜드 이름을 받았을 때 여기서 찾는다(ref 사다리 3칸). 이 표에는 **수치가 없다.**
브랜드 수치는 실제 캡처로 만든 카드에서만 가져온다.

## 1. 쓰는 법

1. 표에서 브랜드를 찾는다. 한글·영문 이름과 흔한 별칭을 같이 본다.
2. **카드가 있다**(카드 열에 `<slug>.md`) → 카드를 `.design/references/<slug>/profile.md` 로 복사하고 frontmatter 만 고친다:
   `input_type: brand`, `method: card`, `source: brands/<slug>.md`. `captured_at` 은 카드 날짜를 그대로 둔다.
   그다음 ref 7단계의 채팅 보고로 바로 간다. 보고 끝에 실제 사이트 재캡처를 한 줄 제안한다.
3. **카드가 6개월 넘었다** → 2번처럼 쓴다. 6개월이 넘은 카드는 보고 첫 줄에 카드 날짜를 밝히고 재캡처를 권한다.
   사이트는 자주 바뀐다. 오래된 카드 처리는 이 줄이 기준이고, ref·direct 는 여기를 가리킨다.
4. **카드가 없다**(`-`) → "캡처 대상 URL" 로 실측(사다리 1칸)을 제안한다. 사용자가 원치 않으면 "스타일 매핑"의
   카탈로그 범위로 진행하고, 브랜드 실측값이 아니라고 밝힌다.
5. **표에 없다** → 공식 사이트 URL 을 물어 캡처한다. 기억으로 수치를 만들지 않는다.

## 2. 카드 형식

- 위치: `${CLAUDE_PLUGIN_ROOT}/references/brands/<slug>.md` (slug 는 아래 표의 첫 열).
- 카드는 `${CLAUDE_PLUGIN_ROOT}/references/profile-schema.md` 를 그대로 따르는 profile.md 다. 같은 frontmatter 키,
  같은 고정 헤딩을 쓰고, 80–120줄로 줄인 텍스트만 담는다(스크린샷 없음). 그래서 direct 는 카드를 다른 프로필과 똑같이 읽는다.
- frontmatter 에 두 키가 더 있다: `bundled: true`, `verified: <YYYY-MM-DD> maintainer spot-check`.
- "흔한 오해"(예: "토스 = 파랑 + 둥근 카드")는 8장 Do / Don't 안에 쓴다.
- 만드는 법은 메인테이너 절차를 따른다: ref 로 실측 → 메인테이너가 DevTools 로 값 5개를 스팟 체크 → 카드로 정리.

## 3. 왜 여기엔 수치가 없나

기억 속 브랜드 수치는 오래됐거나 틀렸을 가능성이 높다. 틀린 값이 한 번 프롬프트에 들어가면 사용자가 그걸 브랜드의 진짜 값으로
믿고 퍼뜨린다. 그래서 이 표의 "한 줄"은 널리 알려진 **정성 묘사**만 담고, 모두 미검증이다. 수치가 필요하면 캡처한다.

## 4. v0.1 카드 대상

| slug | 브랜드 | 캡처 대상 URL | 스타일 매핑 | 한 줄(정성) | 상태 | 카드 |
|---|---|---|---|---|---|---|
| toss | 토스 (Toss, 비바리퍼블리카) | https://toss.im | minimal × kr-fintech-simple + glassmorphism + aurora-gradient | 무채색 마케팅 화면에 실사 영상·스크롤 장면, 파랑은 제품 화면 안에만 | 캡처 2026-10 | toss.md |
| daangn | 당근 (Daangn, 당근마켓, Karrot) | https://www.daangn.com | kr-fintech-simple | 주황 브랜드색, 친근한 해요체, 단순한 목록 화면 | 캡처 2026-10 | daangn.md |
| 29cm | 29CM | https://www.29cm.co.kr | kr-editorial-commerce × editorial | 큰 사진과 작은 글자, 잡지처럼 상품을 이야기한다 | 캡처 2026-10 | 29cm.md |
| ohou | 오늘의집 (Ohouse) | https://ohou.se | kr-editorial-commerce × organic-soft (미검증) | 집 사진 콘텐츠와 쇼핑이 섞인 피드 | 캡처 불가(봇 차단 403, 2026-10) | - |
| linear | Linear | https://linear.app | dark-tech × minimal | 어두운 면, 가는 경계선, 정밀한 도구 느낌 | 캡처 2026-10 | linear.md |
| stripe | Stripe | https://stripe.com | corporate-clean + aurora-gradient | 정돈된 엔터프라이즈 레이아웃에 그라데이션 히어로 | 캡처 2026-10 | stripe.md |
| vercel | Vercel | https://vercel.com | minimal × swiss | 밝은 회색 바탕, -0.06em 으로 조인 헤드라인, 테두리 대신 1px 알파 링 | 캡처 2026-10 | vercel.md |
| notion | Notion | https://www.notion.com | corporate-clean × playful-illustrative | 큰 헤드라인과 실제 워크스페이스 화면, 그 가장자리에 걸친 흑백 펜 드로잉 | 캡처 2026-10 | notion.md |
| apple | Apple (애플) | https://www.apple.com/kr/ | minimal × luxury + glassmorphism | 검정·연회색 제품 타일 벽, 색은 제품 사진이 맡고 파랑은 버튼에만 | 캡처 2026-10 | apple.md |
| musinsa | 무신사 (Musinsa) | https://www.musinsa.com | kr-editorial-commerce × data-dense | 어두운 헤더 아래 간격 없이 붙인 상품 사진 레일, 빨강은 할인율에만 | 캡처 2026-10 | musinsa.md |

## 5. 미캡처·미검증 (URL 과 스타일 매핑만)

| slug | 브랜드 | 캡처 대상 URL | 스타일 매핑 | 한 줄(정성) | 상태 | 카드 |
|---|---|---|---|---|---|---|
| kakao | 카카오 (Kakao) | https://www.kakaocorp.com | kr-fintech-simple × playful-illustrative | - | 미캡처·미검증 | - |
| naver | 네이버 (Naver) | https://www.naver.com | data-dense × corporate-clean | - | 미캡처·미검증 | - |
| baemin | 배달의민족 (Baemin) | https://www.baemin.com | playful-illustrative | - | 미캡처·미검증 | - |
| kurly | 컬리 (Kurly, 마켓컬리) | https://www.kurly.com | kr-editorial-commerce | - | 미캡처·미검증 | - |
| wanted | 원티드 (Wanted) | https://www.wanted.co.kr | corporate-clean | - | 미캡처·미검증 | - |
| banksalad | 뱅크샐러드 (Banksalad) | https://www.banksalad.com | kr-fintech-simple | - | 미캡처·미검증 | - |
| airbnb | Airbnb (에어비앤비) | https://www.airbnb.co.kr | corporate-clean × organic-soft | - | 미캡처·미검증 | - |
| figma | Figma (피그마) | https://www.figma.com | playful-illustrative | - | 미캡처·미검증 | - |
| framer | Framer | https://www.framer.com | dark-tech | - | 미캡처·미검증 | - |
| raycast | Raycast | https://www.raycast.com | dark-tech + glassmorphism | - | 미캡처·미검증 | - |
| arc | Arc (The Browser Company) | https://arc.net | playful-illustrative | - | 미캡처·미검증 | - |
| duolingo | Duolingo (듀오링고) | https://www.duolingo.com | playful-illustrative | - | 미캡처·미검증 | - |
| gumroad | Gumroad | https://gumroad.com | neo-brutalism | - | 미캡처·미검증 | - |
| mailchimp | Mailchimp | https://mailchimp.com | playful-illustrative × editorial | - | 미캡처·미검증 | - |
| supabase | Supabase | https://supabase.com | dark-tech | - | 미캡처·미검증 | - |
| resend | Resend | https://resend.com | dark-tech × minimal | - | 미캡처·미검증 | - |

## 6. 표기 규칙

- **스타일 매핑**: `primary × secondary + treatment`. id 는 `${CLAUDE_PLUGIN_ROOT}/references/styles/_index.md` 와 같다.
  매핑도 정성 판단이라 캡처 뒤 프로필의 분류가 우선한다.
- **상태**: `캡처 예정`(v0.1 대상, 카드 작성 전) · `캡처 YYYY-MM`(실측해 카드를 만든 달) · `캡처 불가(사유, YYYY-MM)`(차단 등으로 실측 못 함, 카드 없음) · `미캡처·미검증`.
- **카드**: 카드가 생기면 `<slug>.md`, 그 전에는 `-`.
- **신선도**: 6개월 기준과 처리는 1장 3번을 따른다. 캡처 날짜와 메인테이너 확인 날짜(`verified`)는 다를 수 있다.
- 브랜드 로고·카피·사진은 카드에도 넣지 않는다. 카드는 텍스트 근사치다.
