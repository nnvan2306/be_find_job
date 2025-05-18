/* eslint-disable prettier/prettier */
import pluginJs from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          "arrowParens": "always",
          "bracketSameLine": false,
          "bracketSpacing": true,
          "embeddedLanguageFormatting": "auto",
          "htmlWhitespaceSensitivity": "css",
          "insertPragma": false,
          "jsxSingleQuote": false,
          "printWidth": 120,
          "proseWrap": "preserve",
          "quoteProps": "as-needed",
          "requirePragma": false,
          "semi": true,
          "singleQuote": true,
          "tabWidth": 4,
          trailingComma: 'all',
          "useTabs": false,
          "vueIndentScriptAndStyle": false
        }

      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
