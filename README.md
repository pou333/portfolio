# Portfolio

Interactive one-page portfolio built with Next.js, React, Three.js, and GSAP.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run lint:fix
```

## Project Structure

```text
app/
  components/        Reusable UI and WebGL components
  i18n/              Language metadata and localized portfolio content
  lib/               Three.js geometry and morph helpers
  globals.css        Global theme, layout, and responsive styles
  layout.jsx         Root document shell and metadata
  page.jsx           App route entry
  portfolio.jsx      Main portfolio composition and state
```

## Notes

- The site uses the Next.js App Router.
- The portfolio is intentionally kept as a single-page experience.
- Language strings live in `app/i18n/translations.js`.
- WebGL shape variants and palette helpers live in `app/lib/morphTargets.js`.

## Contact Form Deployment

The contact form sends messages through Telegram from `app/api/contact/route.js`.
Set these environment variables in the hosting dashboard for the production
environment, without wrapping values in quotes:

```text
TELEGRAM_BOT_TOKEN=1234567890:botfather_token
TELEGRAM_CHAT_ID=123456789
```

After changing production environment variables, redeploy the site. If the form
returns `502`, check the hosting function logs for
`[contact] Telegram delivery failed`; the log includes the Telegram status and
response body without printing the bot token.
