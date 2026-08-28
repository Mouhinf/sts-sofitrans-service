# End-to-end tests

This directory hosts the Playwright tests covering the public flows of the
STS SOFITRANS frontend.

## Running locally

```bash
# Install Playwright browsers (one-off)
pnpm exec playwright install chromium

# Run the dev server in the background then start tests
pnpm dev &           # serves on http://localhost:5173
pnpm e2e
```

`pnpm e2e` will automatically start the dev server if it isn't already running.

## Running against a deployed instance

```bash
E2E_BASE_URL=https://staging.example.com pnpm e2e
```

## Conventions

- One file per surface (e.g. `home.spec.ts`, `contact.spec.ts`).
- Tests should be deterministic — no random data, no `sleep`.
- Public pages only — admin flows are not covered here (they require an
  Internet Identity login which the e2e harness doesn't have).
