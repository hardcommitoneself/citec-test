// Copyright (C) 2021-Present CITEC Inc. <https://citecsolutions.com/>
// All rights reserved
//
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

import reducer, { resetError, setError } from 'store/slices/errors'

describe('test at errors slice', () => {
   test('should clean error state', () => {
      const initialState = 'Existing a error'

      expect(reducer(initialState, resetError())).toBe('')
   })
   test('should set error state', () => {
      const initialState = ''

      expect(reducer(initialState, setError('Set a new error'))).toBe(
         'Set a new error'
      )
   })
})
