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
import reducer, {
   setPortfolioOptimized,
   resetPortfolioOptimized,
} from 'store/slices/portfolio-optimized'

const emptyState = [] as any

const initialState = {
   portfolio_id: null,
   portfolio: 'optimized_portfolio',
   benchmark: 'SPY',
   creation_date: null,
   ticker: [],
   outstanding_balance: [],
   unrealized_capital_gains: [],
   optimization_status: '',
}

describe('Tests in portfolio optimized redux', () => {
   test('should return the initial state', () => {
      expect(reducer(initialState as never, {} as never)).toEqual(initialState)
   })
   test('should return the portfolio optimized loaded', () => {
      expect(
         reducer(
            initialState as never,
            setPortfolioOptimized({
               portfolio_id: 'ID',
               portfolio: 'optimized_portfolio',
               benchmark: 'SPY',
               ticker: ['AAPL'],
               outstanding_balance: [63428.01],
               creation_date: null,
               unrealized_capital_gains: [],
               optimization_status: '',
            })
         )
      ).toEqual({
         ...initialState,
         portfolio_id: 'ID',
         unrealized_capital_gains: [],
         portfolio: 'optimized_portfolio',
         benchmark: 'SPY',
         ticker: ['AAPL'],
         outstanding_balance: [63428.01],
      })
   })
   test('should reset the portfolio optimized state', () => {
      expect(reducer(emptyState, resetPortfolioOptimized())).toEqual(initialState)
   })
})
