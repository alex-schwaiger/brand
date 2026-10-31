# syntax=docker/dockerfile:1
# Multi-Stage-Build der Brand-Seite (linux/arm64, siehe docs/adr/0004)

ARG NODE_VERSION=24

# --- Schriften: offizielles Fontshare-Zip, Prüfsumme im Skript (ADR 0003) ---
FROM node:${NODE_VERSION}-alpine AS fonts
RUN apk add --no-cache unzip
WORKDIR /app
COPY scripts/fetch-switzer.mjs scripts/fetch-switzer.mjs
RUN node scripts/fetch-switzer.mjs

# --- Abhängigkeiten ---
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
# pnpm-Version exakt wie packageManager in package.json
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate
# .npmrc muss hier mit, sonst ignoriert pnpm lokale Einstellungen (z. B. node-linker).
# Das Muster .npmrc* bricht nicht ab, solange es keine Datei gibt.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/site/package.json apps/site/package.json
COPY packages/brand/package.json packages/brand/package.json
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# --- Build ---
FROM deps AS build
COPY . .
COPY --from=fonts /app/apps/site/public/fonts/switzer apps/site/public/fonts/switzer
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter site build

# --- Laufzeit ---
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/apps/site/.next/standalone ./
COPY --from=build --chown=app:app /app/apps/site/.next/static apps/site/.next/static
COPY --from=build --chown=app:app /app/apps/site/public apps/site/public
USER app
EXPOSE 3000
CMD ["node", "apps/site/server.js"]
