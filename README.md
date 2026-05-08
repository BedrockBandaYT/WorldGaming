# WorldGaming (Phase 1 bootstrap)

Backend API is now wired for external frontend integration:
- CORS with credentials enabled
- Cookie session auth
- Bootstrap payload endpoint for app initialization

## Frontend wiring contract
Use these endpoints from your frontend:
- `POST /v1/auth/login` `{ username, password }`
- `POST /v1/auth/logout`
- `GET /v1/me`
- `GET /v1/bootstrap`
- `GET /v1/markets`
- `POST /v1/bets/place` `{ userId, marketId, stake }`

Cookie name: `wg_session` (HttpOnly, secure, sameSite=Lax).
