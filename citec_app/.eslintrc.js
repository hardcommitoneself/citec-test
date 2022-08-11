// Copyright (C) 2021-Present CITEC Inc. <https://citecsolutions.com/>
// All rights reserved
// This file is part of CITEC Inc. source code.
// This software framework contains the confidential and proprietary information
// of CITEC Inc., its affiliates, and its licensors. Your use of these
// materials is governed by the terms of the Agreement between your organisation
// and CITEC Inc., and any unauthorised use is forbidden. Except as otherwise
// stated in the Agreement, this software framework is for your internal use
// only and may only be shared outside your organisation with the prior written
// permission of CITEC Inc.
// CITEC Inc. source code can not be copied and/or distributed without the express
// permission of CITEC Inc.
module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
   ],
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
         modules: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   parser: '@typescript-eslint/parser',
   plugins: ['react', '@typescript-eslint'],
   rules: {
      'react/prop-types': 'off',
      'react/jsx-key': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
   },
   settings: {
      react: {
         version: 'detect',
      },
   },
}
