# Neurovice Client

Web client for the Neurovice VR adult entertainment platform.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19.2
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query + Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   └── [locale]/           # Internationalized routes (en, es)
├── components/             # React components
│   ├── auth/               # Authentication forms
│   ├── cart/               # Shopping cart components
│   ├── layout/             # Header, Footer, Navigation
│   ├── scenes/             # Scene detail components
│   ├── seasons/            # Season components
│   ├── stars/              # Star profile components
│   └── ui/                 # Reusable UI components
├── i18n/                   # Internationalization (en.json, es.json)
├── lib/                    # Utilities and services
│   ├── api/                # API client and services
│   ├── hooks/              # Custom React hooks
│   └── stores/             # Zustand stores
└── providers/              # React context providers
```

## Internationalization

The app supports English (en) and Spanish (es). Translations are stored in:
- `i18n/en.json`
- `i18n/es.json`

All routes are prefixed with locale: `/en/...` or `/es/...`

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Code Quality

- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run all checks before committing:

```bash
npm run type-check && npm run lint && npm run format:check
```
