# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Project configuration files

- `eslint.config.js`: this is the ESLint configuration file
- `tsconfig.app.json`: this is the TypeScript configuration file for the application
- `tsconfig.node.json`: this is the TypeScript configuration file for the Node.js environment
- `tsconfig.json`: this is the TypeScript configuration file for the project
- `vite.config.ts`: this is the Vite configuration file

## tsconfig.json vs tsconfig.app.json vs tsconfig.node.json

tsconfig.json is a project configuration file that references tsconfig.app.json and tsconfig.node.json. It is used by Vite to determine which TypeScript configuration file to use for each file in the project.

tsconfig.app.json is a TypeScript configuration file that is used by Vite to compile the application. It is for your React frontend code.

tsconfig.node.json is a TypeScript configuration file that is used by Vite to compile the Node.js environment. It is for tooling (like Vite config).

## Step 1 — Vite React + TypeScript Setup

```bash
npm create vite@latest a-typed-application-baseline -- --template react-ts 
cd a-typed-application-baseline
npm install
npm run dev
```

- Counter.tsx:        Already converted (demo)
- Todo.jsx:           Students convert this
- Todo.ts:            Shared type example

If converting existing JS project:

```bash
npm install -D typescript @types/react @types/react-dom
```
