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
import { createSlice } from '@reduxjs/toolkit'

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

export const portfolioOptimizedSlice = createSlice({
   name: 'portfolio_optimized',
   initialState,
   reducers: {
      setPortfolioOptimized: (state, action) => {
         state.portfolio_id = action.payload.portfolio_id
         state.portfolio = action.payload.portfolio
         state.benchmark = action.payload.benchmark
         state.creation_date = action.payload.creation_date
         state.ticker = action.payload.ticker
         state.outstanding_balance = action.payload.outstanding_balance
         state.unrealized_capital_gains =
            action.payload.unrealized_capital_gains
         state.optimization_status = action.payload.optimization_status
      },
      resetPortfolioOptimized: () => initialState,
   },
})

export const { setPortfolioOptimized, resetPortfolioOptimized } =
   portfolioOptimizedSlice.actions

export default portfolioOptimizedSlice.reducer
