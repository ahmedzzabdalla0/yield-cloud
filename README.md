<div align="center">

<img src="public/assets/svgs/logo.svg" alt="Yield Cloud Logo" width="72" height="72" />

# غيمة العائد — Yield Cloud

**Egyptian financial calculators for smarter investment decisions.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌐 Live Demo](https://yieldcloud.ahmedabdelsalam.dev) · [👤 Portfolio](https://ahmedabdelsalam.dev)

</div>

---

## Overview

Yield Cloud is an independent Egyptian financial platform that helps users make smarter investment decisions through transparent, accessible calculators. It provides instant results for yield and capital planning — with full Arabic/English support, shareable links, and a clean mobile-first UI.

---

## Calculators

### Yield Calculator — حاسبة العائد

> _What return will you earn?_

Input your principal, annual yield rate (APY), and investment period. Receive a full breakdown of net return after tax, daily/monthly/yearly equivalents, and gain percentage relative to principal.

### Capital Calculator — حاسبة رأس المال

> _How much do you need to invest?_

The reverse of the yield calculator. Enter your target return, APY, and period — the calculator derives the exact required capital using an inverse daily-rate model.

---

## Features

- **Bilingual** — Full Arabic (RTL) and English (LTR) support via `next-intl`
- **Shareable links** — Form state is base64-encoded into the URL on every calculation, enabling one-click sharing with pre-filled results
- **Input limits** — Hard caps on all numeric fields prevent nonsensical inputs at the hook level
- **Smart number formatting** — Currency auto-compacts to `1.5M` / `2.3B` for large values; standard thousands separator below 1M
- **Form validation** — Field-level error messages appear on submit and clear on edit, with a fully generic validation hook
- **Responsive** — Mobile-first grid layout; calculator tabs adapt between mobile (compact) and desktop (full labels with icons)

---

## Tech Stack

| Layer         | Technology                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Framework     | [Next.js 16](https://nextjs.org) (App Router)                                                                                  |
| Language      | [TypeScript 5](https://typescriptlang.org)                                                                                     |
| UI Library    | [React 19](https://react.dev)                                                                                                  |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com)                                                                                     |
| Components    | [shadcn/ui](https://ui.shadcn.com) · [Radix UI](https://radix-ui.com) · [Base UI](https://base-ui.com)                         |
| Icons         | [Lucide React](https://lucide.dev)                                                                                             |
| i18n          | [next-intl 4](https://next-intl-docs.vercel.app)                                                                               |
| Notifications | [Sonner](https://sonner.emilkowal.ski)                                                                                         |
| Linting       | [ESLint 9](https://eslint.org) · [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint)                 |
| Formatting    | [Prettier 3](https://prettier.io) · [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) |
| Git Hooks     | [Husky](https://typicode.github.io/husky)                                                                                      |

---

## Project Structure

```
yield-cloud/
├── app/
│   └── [locale]/
│       ├── layout.tsx                    # Root layout with ISR revalidation
│       └── (calculators)/
│           ├── yield-calculator/
│           └── capital-calculator/
├── features/
│   └── calculators/
│       ├── shared/                       # Reusable shells
│       │   ├── calculator-client-shell.tsx
│       │   ├── calculator-form-card.tsx
│       │   └── calculator-result-card.tsx
│       ├── yield-calculator/             # Yield feature
│       └── capital-calculator/           # Capital feature
├── hooks/
│   ├── use-numeric-input.ts              # Controlled financial input
│   ├── use-form-validation.ts            # Generic field validation
│   └── use-calculator-url-state.ts       # URL state encode/decode
├── lib/
│   ├── formatters.ts                     # Currency, percent, period formatting
│   └── calculator-types.ts               # Shared domain types
├── components/
│   ├── common/                           # Header, Footer, Calculator tabs
│   └── ui/                               # Design system components
├── config/
│   └── metadata/                         # Per-page SEO metadata
├── messages/
│   ├── ar.json                           # Arabic translations
│   └── en.json                           # English translations
└── i18n/                                 # next-intl routing config
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/ahmedabdelsalam/yield-cloud.git
cd yield-cloud
npm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

| Variable               | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL` | Production base URL (used for canonical and OG URLs) |

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run start
```

### Lint & Format

```bash
npm run lint
npm run format
```

---

## i18n

The app supports two locales:

| Locale                     | URL                    | Direction |
| -------------------------- | ---------------------- | --------- |
| Arabic (default for Egypt) | `/ar/yield-calculator` | RTL       |
| English                    | `/yield-calculator`    | LTR       |

Locale prefix uses `as-needed` — English routes have no prefix, Arabic routes are prefixed with `/ar`.

---

## Architecture Decisions

**Shareable URL state** — On every calculation submit, `YieldFormValues` is `JSON.stringify`d, `encodeURIComponent`d, and `btoa`d into a single `?s=` query param. The client reads and validates this param on mount, pre-filling the form and computing the result immediately — no server round-trip needed.

**Generic calculator shells** — The `shared/` folder contains three reusable shells (`CalculatorClientShell`, `CalculatorFormCard`, `CalculatorResultCard`) that handle layout, gradient styling, stats grid, share/reset footer, and clipboard copy. Each calculator only defines its domain logic (types, formula, fields) and composes these shells.

**Input-level max enforcement** — The `useNumericInput` hook accepts a `max` option that silently rejects keystrokes exceeding the limit, preventing astronomical inputs before they reach validation.

---

## License

[MIT](LICENSE) © 2025 [Ahmed Abdelsalam](https://ahmedabdelsalam.dev)

---

<div align="center">

Developed by [Ahmed Abdelsalam](https://ahmedabdelsalam.dev)

</div>
