# Diagramming Examples
---
A simple repo for trying out different context menu schemes

[Manual Install Intructions at nextjs.org](https://nextjs.org/docs/getting-started/installation#manual-installation)

Branches
- Main: A clean repo.
- broughton:
  - [Jacob Broughton's Approach](https://www.youtube.com/watch?v=moj-hTXBgz4)

```bash
mkdir <projectName>
cd <projectName>
npm install next@latest
npm install react@latest
npm install react-dom@latest
```
Add the following to:

`package.json`

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

```bash
mkdir <projectName>/app
cd /app
touch layout.tsx
touch page.tsx
```
Edit the files

`layout.tsx`
```typescript
export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

`page.tsx`
```typescript
import App from "./App";
export default function Page() {
    return <App></App>
}
```

`App.tsx`
```typescript
export default function App() {
    return <p>Hello</p>
}
```

Test it out on the terminal:
```bash
npm run dev
```
# Specific Install
---

```bash
npm install reactFlow
```