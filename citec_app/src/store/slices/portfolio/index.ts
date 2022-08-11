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
import { PortfolioState } from 'features/utils/interfaces/redux/portfolio-state'

const initialState: PortfolioState = {
   ticker: [],
   outstanding_balance: [],
   unrealized_capital_gains: [],
   analysis: null,
   positions: [],
}

export const portfolioSlice = createSlice({
   name: 'portfolio',

   initialState,
   reducers: {
      setPortfolioAnalysis: (state, action) => {
         state.analysis = action.payload
      },
      setPortfolioPositions: (state, action) => {
         state.positions = action.payload
      },
      setPortfolio: (state, action) => {
         state.ticker = action.payload.ticker
         state.outstanding_balance = action.payload.outstanding_balance
         state.unrealized_capital_gains = action.payload.unrealized_capital_gains
      },
      setCash: (state, action) => {
         state.ticker.push('$CASH')
         state.outstanding_balance.push(action.payload.outstanding_balance)
         state.unrealized_capital_gains.push(action.payload.unrealized_capital_gains)
      },
      setUpdatedCash: (state, action) => {
         const indexCash = state.ticker.indexOf('$CASH')
         state.outstanding_balance[indexCash] = action.payload.outstanding_balance
         state.unrealized_capital_gains[indexCash] =
            action.payload.unrealized_capital_gains
      },
      resetPortfolio: () => initialState,
   },
})

export const {
   setPortfolioAnalysis,
   setPortfolioPositions,
   setPortfolio,
   setUpdatedCash,
   setCash,
   resetPortfolio,
} = portfolioSlice.actions

export default portfolioSlice.reducer
