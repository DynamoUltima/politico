# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (configured with `host: true`, so it binds to the LAN).
- `npm run build` — production build via Vite.
- `npm run preview` — serve the production build locally.

There is no test runner, linter, or type-checker configured. This is a plain JavaScript (JSX) project — there is no TypeScript compilation step despite the `@types/*` devDependencies.

## Environment

Firebase config is read from `VITE_FIREBASE_*` variables in `.env.local` (gitignored). `src/firebase.js` initializes the app and exports `db` (Firestore), `auth`, and `analytics`. Without these env vars the app cannot connect to Firebase.

## Architecture

A Vite + React 18 SPA — a constituent portal for a Member of Parliament. **Not Next.js**: `src/pages/` is a plain folder convention for routes, not a file-system router. Routing is client-side via `react-router-dom` v6.

### Routing & layouts (`src/App.jsx`)

Two route trees nested under shared layouts (`<Outlet/>`-based):
- **Public** (`/`, `/projects`, `/projects/:id`, `/feedback`, `/news`, `/news/:id`, `/about`) under `PublicLayout`.
- **Admin** (`/admin/dashboard`, `/admin/projects`, `/admin/news`, `/admin/feedback`) under `AdminLayout`, wrapped in `<RequireAuth>`. `/admin/login` sits outside the guard.

`RequireAuth` (`src/components/RequireAuth.jsx`) gates the admin tree on the Firebase auth state from context.

### Global state (`src/context/AppContext.jsx`)

`AppProvider` wraps the whole app (above the router) and is the single source of truth. Consume it everywhere via the `useAppContext()` hook — there is no other data layer.

- Holds `projects`, `feedbacks`, `news`, plus `loading`, `user`, `authLoading`.
- Subscribes to three Firestore collections (`projects`, `feedbacks`, `news`) with live `onSnapshot` listeners. Mutations (`addProject`, `updateProject`, `deleteProject`, `addFeedback`, `upvoteFeedback`, `addNewsItem`, etc.) write to Firestore directly and rely on the listeners to push updates back into state — **do not call `setState` manually after a write.**
- **Self-seeding:** if a collection comes back empty, the listener seeds it from the hardcoded `initialProjects` / `initialFeedback` / `initialNews` arrays via a batch write, then re-fires. The `loading` flag clears once all three collections have reported (`loadedCount` ref reaching 3).
- Auth actions `login`/`logout` wrap Firebase `signInWithEmailAndPassword` / `signOut`; auth state is tracked through `onAuthStateChanged`.

Per-project comments live in a Firestore subcollection (`projects/{id}/comments`) and are subscribed to locally inside `ProjectDetail.jsx`, not in the global context.

## Conventions

- **Styling:** Tailwind CSS v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — utility classes only). Use `clsx` for conditional classes (the established pattern for status/category color variants).
- **Icons:** Iconify web components (`<iconify-icon icon="solar:...">`). The package is registered once in `src/main.jsx`; use the element directly in JSX, no per-component import.
- **Status/category vocabularies** are string literals checked throughout the UI: project `status` is `'Completed' | 'Ongoing' | 'Upcoming'`; feedback `category` is `'Complaint' | 'Suggestion' | 'Question'`. Keep these consistent when adding forms or color logic.
