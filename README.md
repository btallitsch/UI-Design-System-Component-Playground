# UI Design System Playground

A production-grade component library with a live interactive playground — built to demonstrate frontend engineering discipline.

See it in action here -> https://ui-design-system-component-playgrou.vercel.app/

## ✨ Features

| Feature | Details |
|---|---|
| **7 Components** | Button, Input, Select, Checkbox, Badge, Modal, Table |
| **Live Props Editor** | Right-hand panel edits any prop in real time |
| **Code Generation** | JSX snippet auto-updates as you change props |
| **Dark / Light Mode** | Full theme support via CSS custom properties |
| **Accessibility** | WCAG 2.1 AA — every component ships with A11y notes |
| **Design Tokens** | 40+ tokens: color, spacing, radius, motion, type |
| **Zero dependencies** | React + Vite only — no UI library |

## 🗂 Project Structure

```
src/
├── components/
│   ├── ui/                    ← Design system components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Checkbox/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   ├── Table/
│   │   └── index.js           ← Barrel export
│   └── playground/            ← Playground shell UI
│       ├── Header/
│       ├── Sidebar/
│       ├── PropsEditor/
│       ├── ComponentCanvas/
│       ├── CodeSnippet/
│       └── AccessibilityPanel/
├── pages/                     ← One page per component
├── context/                   ← ThemeContext
├── hooks/                     ← usePropsEditor, useLocalStorage
├── config/                    ← Component prop configs (drives editor)
├── utils/                     ← generateCode utility
└── styles/                    ← tokens.css, reset.css, globals.css
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗 Architecture Decisions

### Separation of Concerns
- **`/ui`** components are pure, dependency-free, and can be imported into any React project
- **`/playground`** components are the documentation shell — they never bleed into the design system itself
- **`/config`** drives the PropsEditor entirely through data — adding a new prop requires one config entry, no UI code changes

### Design Tokens
All visual decisions live in `src/styles/tokens.css` as CSS custom properties. Light/dark theme is a single attribute swap on `<html>` — no JavaScript theme logic in components.

### Accessibility
Each component uses:
- Correct semantic HTML elements
- ARIA attributes only where native semantics are insufficient
- Visible focus indicators (`:focus-visible`)
- Color is never the sole differentiator

## 📦 Building for Production

```bash
npm run build
npm run preview
```

## 🎨 Adding a Component

1. Create `src/components/ui/MyComponent/MyComponent.jsx` + `MyComponent.module.css`
2. Export from `src/components/ui/index.js`
3. Add config to `src/config/componentConfigs.js`
4. Create `src/pages/MyComponentPage.jsx`
5. Register in `src/App.jsx`
