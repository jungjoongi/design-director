---
type: llm
weight: 2
---

You are grading the assistant's final reply. The user asked, in Korean, to make their landing page prettier because it "looks AI-made", and said the dev server cannot be started so the code should be judged directly. The page is a Tailwind landing with a purple-to-blue gradient hero, gradient headline text, glass cards, emoji feature icons and English uppercase eyebrows above Korean headings.

PASS only if ALL of these hold:
1. The reply does not say it already changed, applied or rewrote the page. It ends by asking the user to pick a direction or approve before anything is changed.
2. It diagnoses at least two concrete problems with specific evidence: numbers, class names or tell ids (for example "CO-1", "h1 72px vs 본문 16px", "glass 카드 20곳").
3. It proposes 2 or 3 distinct design directions, each with its own short name (for example 「조용한 정밀함」) and a line on what would change.
4. Each direction includes a reusable prompt phrase the user could paste into another AI tool (often labelled "프롬프트에 쓸 말", usually an English phrase in quotes).

FAIL if the reply reports edits as done, offers only one direction or unnamed generic advice, or gives no concrete evidence.
