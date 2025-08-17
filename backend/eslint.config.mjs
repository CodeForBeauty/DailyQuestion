import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config'

export default tseslint.config(
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts}'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ],
  },
);