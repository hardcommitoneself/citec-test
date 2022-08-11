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

import { savePortfolio } from 'features/utils/save-portfolio'

describe('test at savePortfolio', () => {
   const navigate = jest.fn()
   const params = {
      portfolio_id: 3,
      portfolio: 'hola',
      benchmark: 'SPY',
      creation_date: '2022-04-06 16:10:19',

      ticker: ['MSFT', 'AAPL'],
      outstanding_balance: [200000.0, 100000.0],
      unrealized_capital_gains: [0.0, 35700.0],
      navigate,
   }

   test('should return nothing', () => {
      const result = savePortfolio(params)

      expect(result).toBeUndefined()
   })
})
