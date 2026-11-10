# Feature status — honest release register

| Area | Current package status | Live acceptance still required |
|---|---|---|
| Responsive dashboard/navigation | IMPLEMENTED in frontend | Desktop + Android Chrome visual/manual QA |
| AUTO/HYBRID/MANUAL wizard | IMPLEMENTED (guided baseline) | Adaptive branching and full one-question flow regression |
| 12 engines / 100 modules / 25 locks | Architecture defined; automated count tests included | Verify every module's functional workflow incrementally |
| Visual Quality Master Engine | Prompt rules and routing helper included | Real image/video provider visual evaluation |
| Identity + temporal locks | Prompt requirements included | Multi-scene generation consistency test |
| Local project saving | IMPLEMENTED | Browser storage/backup behavior on target devices |
| Supabase Auth / cloud saving | Optional integration code | Configure URL/key, redirects, RLS and test real accounts |
| Password recovery | NOT COMPLETE / LIVE TEST REQUIRED | Email template, redirect and recovery flow |
| Trend/news search | Backend RSS endpoints | Deploy, source availability, freshness and region checks |
| Gemini text generation | Backend endpoint + in-app Auto-Pilot action IMPLEMENTED | Configure valid API key/model; quota and output QA |
| Image generation | NOT IMPLEMENTED as a live provider | Select provider, credentials, policy and end-to-end test |
| Video generation / lip-sync / TTS | NOT IMPLEMENTED as live provider | Select providers and test actual generated media |
| Timeline / MP4 rendering | Planning baseline only in this desktop scaffold | FFmpeg pipeline, uploaded media, render queue and output validation |
| Social publishing / analytics | NOT IMPLEMENTED | Platform app review, OAuth scopes, permissions and live test |
| Admin dashboard / package entitlements | REQUIREMENT SPECIFIED; not certified implemented | Admin authorization, payment verification, expiry and isolation tests |
| Daily / Single Study / Full Study | REQUIREMENT SPECIFIED; not certified implemented | Configure price/duration and enforce server-side entitlements |
| Android APK | NOT BUILT | Capacitor, Android Studio, app signing and device test |

Never mark an external service PASS solely because a UI button or configuration field exists.


## V11 legacy tool access
| V11 tool group | Current release status | Boundary |
|---|---|---|
| Visual & Reference Lab / compact prompts | AVAILABLE via Legacy Tools Lab | Prompt planning; no automatic URL download/transcription |
| Storyboard / keyframes / continuity / transitions | AVAILABLE via Legacy Tools Lab | Local planning previews, not AI media generation |
| Captions / SRT / browser speech | AVAILABLE via Legacy Tools Lab | Browser support and manual timing required |
| Multi-track editor planner | AVAILABLE via Legacy Tools Lab | FFmpeg backend is separate and requires deployment/media validation |
| GK question bank / profile utilities | Retained where present in V11 UI | Local browser storage; not cloud-synced by default |
