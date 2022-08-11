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

import '@testing-library/jest-dom'
import { numberToFixed } from 'features/utils/to-fixed-number'

describe('Test at toFixedNumber function', () => {
   test('should return number with only two decimals', () => {
      const value = 150.3568

      expect(numberToFixed(value)).toBe(150.36)
   })
   test('should return 0', () => {
      expect(numberToFixed(null as never)).toBe(0)
   })
   test('should return a number', () => {
      const value = 1.255656

      expect(numberToFixed(value, 3)).toEqual(expect.any(Number))
   })
})
