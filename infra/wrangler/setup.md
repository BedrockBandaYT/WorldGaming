# Cloudflare Deployment Setup

## 1) Prerequisites
- Cloudflare account
- `wrangler` CLI (installed via `npm install` from this repo)
- A Workers-compatible domain or `workers.dev` usage

## 2) Create KV namespaces
```bash
npx wrangler kv namespace create SESSIONS
npx wrangler kv namespace create SUSPENDED_MARKETS
```

Copy returned IDs into `workers/api/wrangler.toml`.

## 3) Set required worker secret
```bash
npx wrangler secret put INTERNAL_SECRET --config workers/api/wrangler.toml
```

## 4) Deploy API worker
```bash
npm run deploy:api
```

## 5) Verify health endpoint
```bash
curl https://worldgaming-api.<your-subdomain>.workers.dev/health
```

Expected response:
```json
{"ok":true,"service":"api-worker"}
```

## Optional: CI deployment via GitHub Actions
Set repository secret `CLOUDFLARE_API_TOKEN` and update account ID in
`.github/workflows/deploy-api.yml`.
