# Chat with Zel — implementation and launch

## Experience

- A persistent bottom-right launcher opens an accessible native dialog, with Escape/backdrop dismissal, focus return, and responsive light/dark styling.
- The greeting uses the owner's wording in first person. The header identifies automated portfolio chat; there is no fake human “Online” status.
- Scrollbars are visually hidden in both views and text boxes while wheel, touch, and keyboard scrolling remain available. Suggested questions use compact labels without horizontal scrolling. The question composer grows with its content up to a bounded height.
- Sending a question animates its bubble, shows a short “Zel is typing…” indicator, and reveals the reply by words over a bounded duration. Sending is locked until delivery completes. Reduced-motion preferences skip the staged animation. Resetting/unmounting cancels timers, requests, and animation frames so old replies cannot reappear.
- Suggested questions, greetings, contact requests, and simple personal FAQs use prepared answers without consuming AI quota. Personal FAQs read approved facts from private server configuration. Open-ended questions can use Gemini, then Groq, then prepared answers, including natural synthesis from a small selection of approved profile answers.
- Replies recognize English, Cebuano/Bisaya, Tagalog/Filipino, and common mixed phrasing. Explicit language switches override automatic detection; short follow-ups use recent conversation context. Prepared portfolio descriptions retain verified English source descriptions rather than pretending they were translated by a model. AI-enabled replies can translate and synthesize naturally, with best-effort language quality rather than a guarantee for every dialect or spelling.
- Casual name aliases such as “who are u”, “who r u”, and “kinsa ka” use prepared identity replies. Strengths/weaknesses questions combine only the existing approved working-style and growth facts; no diagnosis, invented weakness, or unconfirmed improvement plan is added. These common questions remain available without AI.
- Up to three prior exchanges are sent with a new question. Conversation and contact drafts stay in memory across site navigation, not localStorage. Resetting chat never clears the contact draft.
- Send a message has optional name, required email/message, validation, a honeypot, and a repeat-submit cooldown. Drafts persist when switching views or closing the widget. Visitors deliberately clear their own draft.
- The form submits to Formspree in the background, using an embedded Cloudflare Turnstile widget. No new tab or success-page redirect is used. A confirmed acceptance shows a dismissible toast and clears only the message. Name/email stay in memory until cleared or the page reloads. Errors retain the entire draft; duplicate submissions are blocked while sending.

## Data and provider flow

`scripts/buildChatKnowledge.mjs` projects existing typed CV/project/community/certificate data into `src/data/chatKnowledge.json`. It excludes all images, email fields, private certificates, credential values, and contact drafts. Refreshing the snapshot is part of development/build startup.

The AI receives the selected facts, first-person writing instructions, and bounded conversation text. Emails and phone patterns in history are redacted. Instruction-following is best-effort, so the UI labels AI replies and encourages checking important details personally. Model text never becomes raw HTML or arbitrary clickable URLs.

Server-selected models: Gemini `gemini-3.5-flash-lite` and Groq `qwen/qwen3.8-27b`. Free eligibility must be rechecked if models/plans change. There is no automatic paid model, web-search tool, file upload, training job, or subscription upgrade. Each request makes at most one attempt per provider. Timeout/error/quota failures fall back safely; per-instance cooldowns reduce retries but do not replace upstream quotas.

## Protection

- Credentials remain in ignored `.env.local` or Vercel's server environment. Only a valid public `https://formspree.io/f/...` endpoint can be returned to the browser.
- Same-origin JSON requests only; 12 KB maximum body, 600-character questions, at most seven alternating user/assistant turns, bounded aggregate history, and short completions. Visitors cannot choose the model, provider URL, or system role.
- A conservative server-side scope filter runs before any AI/protection-provider call. Unrecognized general questions, homework, code/essay generation, game guides, and obvious instruction overrides receive a localized prepared redirect without using AI tokens. Mentioning a portfolio project does not exempt a detected task. Only scoped user turns authorize short follow-ups/language switches; unrelated history is discarded before a new valid question reaches AI. The model also refuses off-topic tasks as a second layer. Keyword rules and model instructions cannot perfectly identify every disguised request; BotID, rate limits, bounded completions, and free-plan quotas still limit abuse. Some legitimate unusual phrasing may need to be reworded as a question about the owner or a named portfolio project.
- Deployed AI calls require successful Vercel BotID **Basic** validation and the `zel-chat` firewall SDK rule. Paid Deep Analysis is never selected. Errors, missing rules, bypassed checks, and rejected bots stop the AI request.
- The same firewall rule checks a client-IP bucket and a site-wide bucket. Start with **8 requests / 60 seconds**, fixed window, deny when exceeded. Both buckets use that limit. Vercel counters are regional rather than a universal daily quota; provider free-plan limits remain the final spending boundary.
- Loopback development has an eight-request/minute local limit. The `VERCEL=1` production flag prevents that bypass on deployed functions. No production security depends on client-side cooldowns or disposable memory counters.
- Formspree validates the embedded Turnstile token using the matching secret configured in its CAPTCHA settings. Keep its spam filter and domain restriction enabled. A public endpoint is not a secret; browser cooldowns/honeypots are only supplementary. No system promises zero spam.
- Setting `CHAT_AI_ENABLED=false` is the kill switch. Prepared answers continue. Hosting exhaustion may temporarily stop API requests; browser fallback still answers known portfolio questions.

## Existing Vercel project: zeelll

Use the existing project and domain **https://zeelll.vercel.app**. No new hosting account, paid plan, or custom domain is required. Do not create a replacement project or overwrite unrelated working changes.

1. In the existing project's Settings → Environment Variables, add `GEMINI_API_KEY`, `GROQ_API_KEY`, and `FORMSPREE_LINK` privately. `.env.local` is not uploaded by Git. Configure Production and any preview environment you intend to test.
2. Add `CHAT_ALLOWED_ORIGIN=https://zeelll.vercel.app`. Keep `CHAT_AI_ENABLED=false` while deploying/reviewing the UI.
3. Under Firewall → Configure → New Rule, use the manual form below **OR**. In the first If dropdown select **@vercel/firewall**, and enter rate-limit ID **zel-chat**. Set **Fixed Window**, **60 seconds**, **8 requests**, leave **API controlled** keys, and select **Too Many Requests (429)** as the action. Add Rule, Review Changes, then Publish. The SDK checks this named rule and rejects a missing rule.
4. Use BotID **Basic**. The code initializes matching client/server protection for POST `/api/zel`; do not enable paid Deep Analysis. Verify a real browser request in a Vercel preview/production deployment; curl is expected to fail bot validation.
5. Configure the embedded CAPTCHA using the steps below; leave Formspree spam verification enabled and restrict submissions to `zeelll.vercel.app`. A preview domain must also be allowed if testing submissions there. Set the receiving email in Formspree; the form's `email` field supplies Reply-To. No mail password belongs in this project.
6. Confirm Gemini's project says **Free tier / Set up billing**, Groq remains **Free**, Formspree remains **Free**, and Vercel remains **Hobby**. The owner's supplied screenshots show Gemini Free tier and Groq's upgrade option. Do not link paid billing or add paid extras.
7. Once the free plans and published firewall rule are confirmed, set `CHAT_FREE_TIER_CONFIRMED=true` and `CHAT_AI_ENABLED=true`, then redeploy for a controlled live browser test of an open-ended portfolio question. A prepared answer or disabled AI does not exercise the AI protection path. Confirm the protected request succeeds before declaring AI operational; if it fails, inspect the error and restore `CHAT_AI_ENABLED=false` while fixing the configuration. The widget still gives prepared answers.
8. Check greeting, a suggested question, an arbitrary portfolio question, project follow-up, keyboard/Escape behavior, both themes, and narrow screens. Send a single deliberate contact test and check both inbox and Reply-To. An opened Formspree tab alone does not prove email delivery.

Local development: fill `.env.local` and run `npm run dev`. To try actual AI locally after confirming free billing, set the same two AI flags true and restart. Local testing never proves Vercel's production bot/rate configuration; use a deployed browser to finish that verification.

## Private personal FAQ configuration

The owner keeps their personal answers off GitHub and out of downloaded source. Store `CHAT_PERSONAL_PROFILE` as JSON in ignored `.env.local`, and add the same JSON value privately under Vercel → zeelll → Settings → Environment Variables. Do not add `VITE_`. Supported fields are `birthDate`, `birthplace`, `hobbies` (array), `goals` (array), `workStyle`, and `facts` (array). Each fact has an `id`, `topic`, multilingual `keywords`, and `text` containing `en`, `ceb`, and `fil` answer strings. The local owner profile is expanded across 12 approved topics; do not copy its actual values into documentation, source, screenshots, or commits. Local `.env.local` does not upload automatically. Update the Vercel value after editing the profile and redeploy.

The server answers simple personal questions without contacting a provider. Age updates on the birthday in Asia/Manila; the full birth date stays private. The raw profile never enters the browser bundle, public configuration, Git, or an AI prompt. At the owner's request, open-ended AI-enabled questions can receive at most three relevant approved answer texts totaling 1,800 characters, after contact/credential redaction. Unknown configuration fields and unrelated facts are omitted. Normal BotID, firewall, free-tier flags, and provider/output limits still apply before any AI call. With AI disabled or unavailable, prepared answers remain available in the detected language. Empty or invalid configuration never invents facts. This is private storage, not confidential access to the answers: any visitor can ask and collect the public responses. The assistant's multilingual replies do not claim the owner is fluent in all of these languages.

## In-place contact verification setup

1. Create a free Cloudflare account and open **Turnstile → Add widget**. Keep Turnstile on Free; no DNS or hosting migration is needed.
2. Name it **Zel portfolio contact**, add hostname `zeelll.vercel.app` and `localhost` for local testing (plus the exact preview hostname if needed), choose **Invisible** (the owner's preference), and leave pre-clearance off. Widget mode is selected in Cloudflare; the existing token callbacks support Invisible too. The form's expandable Privacy notice references Cloudflare's Turnstile Privacy Addendum, as required for Invisible mode.
3. Copy the **site key** into `FORMSPREE_TURNSTILE_SITE_KEY` in ignored `.env.local` and in Vercel's project environment variables. This site key is public, not the secret key.
4. In Formspree → your form → Settings → CAPTCHA, leave protection enabled, select **Adjust settings → Cloudflare Turnstile**, and save its matching **secret key** there. Never paste that secret into chat, source, or Vercel's public site-key field. Formspree performs the server-side verification.
5. Restart local development or deploy the new Vercel build. Open Send a message, complete the embedded check, and submit one deliberate test. Confirm no new page opens, the toast appears only after acceptance, the message clears, name/email remain, and the email reaches the intended inbox with a working Reply-To.

Until the public site key and matching Formspree CAPTCHA settings are configured, the new form keeps sending disabled and offers direct email. Tests mock the widget and Formspree; they do not prove real CAPTCHA settings or inbox delivery.

## Verification commands

```sh
npm run security:check
npm run security:test
npm run chat:test
npm run format:check
npm run build
```

The automated tests mock external providers and never send emails. Account billing, production BotID/WAF configuration, and actual inbox delivery must be verified separately before claiming the public feature is fully operational. Stay on free plans so quota exhaustion stops service instead of billing; code alone cannot prevent charges if an account is later upgraded.

Official references: [Gemini free pricing](https://ai.google.dev/gemini-api/docs/pricing), [Groq limits](https://console.groq.com/docs/rate-limits), [BotID Basic pricing](https://vercel.com/docs/botid#pricing), [WAF SDK setup](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk), [WAF Hobby limits](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting#limits), [Formspree verification](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings).
