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

import {
   completeTitle,
   titleHighValue,
   titleLowValue,
} from 'features/utils/complete-titles-customize'

describe('test at complete titles functions', () => {
   test('completeTitle function should return (Value vs. growth)', () => {
      const title = completeTitle('style')

      expect(title).toBe('(Value vs. growth)')
   })
   test('completeTitle function should return (Market Cap)', () => {
      const title = completeTitle('size')

      expect(title).toBe('(Market Cap)')
   })
   test('completeTitle function should return (Dividiend Yield)', () => {
      const title = completeTitle('yield')

      expect(title).toBe('(Dividiend Yield)')
   })

   test('titleLowValue function should return Value', () => {
      const title = titleLowValue('style')

      expect(title).toBe('Value')
   })
   test('titleLowValue function should return Small', () => {
      const title = titleLowValue('size')

      expect(title).toBe('Small')
   })

   test('titleHighValue function should return Growth', () => {
      const title = titleHighValue('style')

      expect(title).toBe('Growth')
   })
   test('titleHighValue function should return Large', () => {
      const title = titleHighValue('size')

      expect(title).toBe('Large')
   })
})
