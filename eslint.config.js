import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

/**
 * A deliberately permissive lint setup.
 *
 * The goal is to catch things that would actually break someone's page —
 * a typo in a variable name, a component that was never imported, a hook
 * called inside an `if`. Nothing about style: indentation, quotes, semicolons
 * and line length are nobody's business here.
 *
 * Rule of thumb when changing this file: an error must mean "your page is
 * broken". Anything else is a warning, and warnings never fail the CI.
 */
export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      // ── Real breakage: these fail the check ──────────────────────────────
      // Using a component that was never imported: the page goes blank.
      'react/jsx-no-undef': 'error',
      // Not a check in itself: it teaches `no-unused-vars` that a component
      // referenced in JSX is being used. Without it every import looks unused.
      'react/jsx-uses-vars': 'error',

      // ── Heads-up only: these never fail the check ────────────────────────
      // Calling a hook inside an if/loop does break React — but this rule also
      // fires on any component whose name starts lowercase, and a project
      // named `meuProjeto` works fine here (the registry renders the default
      // export as <Component />). Not worth blocking a PR over the naming.
      'react-hooks/rules-of-hooks': 'warn',
      // Leaving an unused import behind while trying things out is normal.
      'no-unused-vars': 'warn',
      // Useful, but noisy enough to send people down a rabbit hole.
      'react-hooks/exhaustive-deps': 'off',
      // `console.log` is how people debug. Let them.
      'no-console': 'off',
      // An empty block is usually a work in progress, not a bug.
      'no-empty': 'off',
    },
  },

  {
    // Config files run in Node, not in the browser.
    files: ['vite.config.js', 'eslint.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
]
