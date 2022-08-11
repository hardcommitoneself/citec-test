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
   check100Percentage,
   check25or50Percentage,
   checkNegativePositions,
} from 'features/utils/percentage-rebalance'

describe('test at percentage form helpers', () => {
   test('checkNegativePositions() should return valid values  ', () => {
      const { isSomeNegativePosition, negativeUnrealized } = checkNegativePositions({
         outstanding_balance: [100, 200],
         ticker: ['AAPL', 'TSLA'],
         unrealized_capital_gains: [-200, 300],
      })

      expect(isSomeNegativePosition).toBeTruthy()
      expect(negativeUnrealized).toBeDefined()
   })

   test('check100Percentage() should return valid values', () => {
      const updatedHolds = check100Percentage({
         holds: [1, 1, 0],
         negativeUnrealized: [
            {
               ticker: 'AMM',
               outstanding_balance: 2000,
               unrealized_capital_gains: -2000,
            },
         ],
         ticker: ['AMM', 'AAPL', 'TSLA'],
      })

      expect(updatedHolds).toBeDefined()
   })

   test('check100Percentage()', () => {
      const negativeUnrealizedPercentage = check25or50Percentage({
         holds: [0, 1],
         outstanding_balance: [200, 500],
         ticker: ['AAPL', 'TSLA'],
         unrealized_capital_gains: [-200, 500],
      })

      expect(negativeUnrealizedPercentage).toBeDefined()
      expect(negativeUnrealizedPercentage).toEqual([
         {
            ticker: 'AAPL',
            outstanding_balance: 200,
            unrealized_capital_gains: -200,
         },
      ])
   })
})
