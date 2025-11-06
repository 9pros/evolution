# Cloudflare Setup Guide for Evolution AI

## Current Status ✅
- ✅ Cloudflare Account ID: `43720324fd07a05c6f3791b262cc7310`
- ✅ D1 Database: `evolution` (ID: `d2fe5a9e-ded4-4597-8738-d4452d1cc845`)
- ❌ Zone ID: Not yet configured (no domain added to Cloudflare)

## Next Steps

### 1. For Development (Current)
Your app will work locally without a zone ID. The current configuration is sufficient for development.

### 2. For Production Deployment

#### Option A: Use a Domain You Own
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Add site"
3. Enter your domain (e.g., `yourdomain.com`)
4. Choose the Free plan
5. Follow the nameserver setup instructions
6. Once active, find the Zone ID in the right sidebar
7. Update your `.env` file with the Zone ID

#### Option B: Use Cloudflare Pages Custom Domain
1. Deploy to Cloudflare Pages first (gets you a `*.pages.dev` domain)
2. Optionally add a custom domain later

#### Option C: Get a New Domain
1. Register a domain through Cloudflare or any registrar
2. Add it to Cloudflare following Option A steps

## Database Configuration ✅

Your D1 database is already configured:

```toml
[[d1_databases]]
binding = "DB"
database_name = "evolution"
database_id = "d2fe5a9e-ded4-4597-8738-d4452d1cc845"
```

## Environment Variables ✅

Your `.env` file is properly configured for development:

```bash
# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID="43720324fd07a05c6f3791b262cc7310"
CLOUDFLARE_API_TOKEN="2uA6PLJ6SWRjEeGkSaMl6MkqyDKq0SOKrLDf8LpX"
CLOUDFLARE_ZONE_ID="your-zone-id"  # Add this when you have a domain

# Database Configuration (Cloudflare D1)
DATABASE_ID="d2fe5a9e-ded4-4597-8738-d4452d1cc845"
DATABASE_NAME="evolution"
```

## Quick Commands

### Find Zone ID (when you have a domain):
```bash
node scripts/find-zone-id.js
```

### Test API Connection:
```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Deploy to Cloudflare Pages:
```bash
npm run build
npx wrangler pages deploy dist
```

## Recommended Next Steps

1. **For now**: Continue development locally - everything is set up
2. **When ready to deploy**: 
   - Get a domain (or use pages.dev subdomain)
   - Update `CLOUDFLARE_ZONE_ID` in `.env`
   - Deploy to Cloudflare Pages

## Domain Suggestions

If you need a domain for your Evolution AI app:
- `evolution-ai.com` (if available)
- `your-name-evolution.com`
- `build-with-ai.com`
- Or use the free `*.pages.dev` subdomain initially