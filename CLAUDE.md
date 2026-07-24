# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this app is

A Shopify embedded admin app ("reviewapp") for product/store reviews, built on the **React Router v7** template (converted from the Shopify Remix template), plus a **theme app extension** (`extensions/review-extension`) that renders review widgets on the storefront. Plain JavaScript (no TypeScript source, despite tsconfig).

## Commands

- `npm run dev` — `shopify app dev`: starts Vite + Cloudflare tunnel, auto-updates app URLs on Shopify (`automatically_update_urls_on_dev = true`), runs `npx prisma generate` as pre-dev. Requires local MongoDB running (or Atlas `DB_URL` in `.env`).
- `npm run build` / `npm run start` — production build / serve.
- `npm run lint` — ESLint. `npm run typecheck` — react-router typegen + tsc.
- `npm run deploy` — deploy app + extension versions to Shopify.
- `npm run config:use` — switch between the multiple `shopify.app.*.toml` app configs (each toml = a different app on the Partner dashboard; `shopify.app.toml` is the primary one, dev store `manish-kumaritg.myshopify.com`).
- There are no tests.

## Environment

`.env` (gitignored) needs `DB_URL` (MongoDB connection string). `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SCOPES`, `SHOPIFY_APP_URL` are injected by the Shopify CLI during dev; they only need to be in `.env` for production/standalone runs (fetch values with `npx shopify app env show`).

**Prisma is vestigial**: `prisma/schema.prisma` (SQLite Session model) remains from the template and `prisma generate` still runs pre-dev, but real session storage is MongoDB. Prisma is pinned to v6 — do NOT upgrade to Prisma 7 (it rejects `url` inside `schema.prisma`, error P1012, which breaks `npm run dev`).

## Architecture

### Two data planes

1. **Sessions**: `app/shopify.server.js` uses `MongoDBSessionStorage(DB_URL)`.
2. **Reviews**: stored as app-owned Shopify metaobjects (`$app:review`, defined in `shopify.app.toml`, installed on `shopify app deploy`). `review.service.js` talks Admin GraphQL via `unauthenticated.admin(shop)`; sorting/filtering/pagination/search happen in memory after fetching all entries. Product aggregates are mirrored to `$app:rating` / `$app:rating_count` product metafields. One-time Mongo→metaobject migration: POST `/api/routes/app/reviewproduct/migrateToShopify`.
3. **Settings and users**: mongoose models in `app/api/models/`. `app/db.server.js` exports `mongoConnect()`, called in `entry.server.jsx` on every request. (`review.model.js` remains only as the migration source.)

### Backend: layered API inside React Router

`app/routes.js` manually registers catch-all API routes on top of `flatRoutes()`. Each `app/api/routes/**/<resource>.$.js` file exports loader/action that:

1. authenticates via `app/api/middlewares/auth.js` → `authenticateUser(request)`,
2. parses query params via `middlewares/handleUrl.js`,
3. dispatches on the **last URL path segment** (`switch (path)`) to `app/api/controller/*.controller.js` → `app/api/services/*.service.js` → mongoose model,
4. returns JSON via `app/api/utils/responseHandler.js` (status codes/messages in `app/api/contents/`).

Two parallel route trees with the same resources but different auth:

- `/api/routes/app/*` — called by the embedded admin UI (fetch wrappers in `app/routes/services/api.js`). Auth: `authenticate.admin(request)` (session token).
- `/api/routes/extensions/*` — called by the storefront theme extension **through the App Proxy** `/apps/review/api/routes/extensions/...`. Auth: `?shop=` query param → `unauthenticated.admin(shop)`.

New endpoint = add a `case` in the route file (or a new `<resource>.$.js` + entry in `app/routes.js`) + controller + service function.

### Frontend (embedded admin)

- `app/root.jsx` — must keep `<Meta />` and `<Links />` in `<head>`; without `<Links />` no route CSS (including Polaris) reaches the page.
- `app/entry.client.jsx` — strips browser-extension-injected DOM (Grammarly etc.) before `hydrateRoot`. React 18 fails hydration on those mutations and re-renders the document, dropping styles. Don't remove this, and don't upgrade to React 19 (Polaris 13 and `@shopify/react-i18n` peer-require React 18).
- `app/routes/app.jsx` — layout route: `authenticate.admin` in loader, App Bridge `AppProvider` (embedded) + `s-app-nav` web-component nav, imports Polaris CSS.
- `app/routes/ColorContext.jsx` — global provider (mounted in root.jsx) holding all widget-customization state (colors as HSBA/hex, texts, checkboxes), save/discard wired to App Bridge `shopify.saveBar`. Settings persist via `/api/routes/app/setting/*` under the single title `"Review Widget Setting"` (one Setting document per shop).
- Pages are `app/routes/app.*.jsx`; shared UI lives in `app/routes/components/`; i18n via react-i18next (`app/i18n.js`, `app/locales/en.json`, `hi.json`).

### Theme app extension (storefront)

`extensions/review-extension/` — Liquid blocks (`review-widget`, `product_rating`, `Product_review`, `ReviewsText`) + vanilla JS assets (`review.js`, `reviewFilter.js`, `starratting.js`). All assets call the backend with **hardcoded App Proxy base `/apps/review/...`**. Beware: the app proxy subpath in `shopify.app.toml` (`review-3`) and the hardcoded `/apps/review` must actually match the subpath registered on the installed store — proxy subpath changes only apply to new installs. Storefront proxy calls return 500/503 whenever the dev server/tunnel is not running.

## Conventions and gotchas

- Existing names contain intentional-looking misspellings that are referenced across files: routes `app.reveiwpage`, components `Ratting.jsx`, `Loding.jsx`, `DeshboardGuidense.jsx`, model field `froud`, API responses use `messeage` in places. Match existing spellings when wiring into current code; renaming requires updating every reference (liquid assets included).
- One review per customer per target is enforced by the deterministic metaobject handle `review-<idType>-<targetId>-<customerId>` (upsert semantics — a second submit overwrites). `idType` is `"store" | "product"`. Review objects returned by the API keep the Mongo-era shape; `_id` is the metaobject GID.
- Backend responses are always `{ status, message, data }` with the HTTP status duplicated in the body.
- Other dev apps are installed on the shared dev store (e.g. an "ae-builder" app with its own `/apps/ae-builder/*` proxy). Their 500s on the storefront are not caused by this codebase.
