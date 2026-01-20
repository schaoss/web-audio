import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

// Web Audio API types that are valid in browser environments
const webAudioGlobals: Record<string, boolean> = {
  OscillatorType: false,
  BiquadFilterType: false,
  OscillatorNode: false,
  MediaElementAudioSourceNode: false,
  MediaStreamAudioSourceNode: false,
  MediaStream: false,
  HTMLAudioElement: false,
  HTMLElement: false,
  TouchEvent: false,
  MouseEvent: false,
  AudioContext: false,
}

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['dist/**', 'node_modules/**', 'iron-man-30-days/**', 'note/**'],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...webAudioGlobals,
      },
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...webAudioGlobals,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
)
