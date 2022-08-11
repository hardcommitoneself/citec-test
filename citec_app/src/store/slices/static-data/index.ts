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
import { fetchStaticUniverseData, fetchStaticRebalanceData } from './thunk'

const initialState = {
   universe: {
      universes: [
         {
            name: "SPDR S&P 500",
            description: "SPDR S&P 500"
         },
      ],
      sectors: [
         "Cash",
         "Communication Services",
         "Consumer Discretionary",
         "Consumer Staples",
         "Energy",
         "Financials",
         "Health Care",
         "Industrials",
         "Information Technology",
         "Materials",
         "Others",
         "Real Estate",
         "Utilities"
      ],
      factors: [
         "style",
         "size",
         "yield",
         "quality",
         "volatility",
         "momentum",
         "liquidity"
      ]
   },
   rebalance: {
      objectives: [
         {
            key: 'min_tracking_error',
            name: 'Minimize tracking error',
         },
         {
            key: 'min_risk_parity',
            name: 'Minimize risk parity',
         },
         {
            key: 'min_neg_sharpe_ratio',
            name: 'Maximize sharpe ratio',
         },
         {
            key: 'min_volatility',
            name: 'Minimize volatility',
         },
         {
            key: 'min_neg_excess_returns',
            name: 'Maximize excess returns',
         }
      ],
      benchmarks: [
         {
            key: 'SPY',
            description: 'SPDR S&P 500',
            ticker: 'SPY',
         },
         {
            key: 'QQQ',
            description: 'Invesco QQQ Trust Series 1',
            ticker: 'QQQ',
         }
      ],
   }
}

export const staticDataSlice = createSlice({
   name: 'static_data',
   initialState,
   reducers: {
      resetStaticData: () => initialState
   },
   extraReducers: (builder) => {
      builder.addCase(fetchStaticUniverseData.fulfilled, (state, action) => {
         state.universe.universes = action.payload.universes
         state.universe.sectors = action.payload.sectors
         state.universe.factors = action.payload.factors
      });
      builder.addCase(fetchStaticRebalanceData.fulfilled, (state, action) => {
         state.rebalance.objectives = action.payload.objectives
         state.rebalance.benchmarks = action.payload.benchmarks
      });
   },
})

export const { resetStaticData } = staticDataSlice.actions

export default staticDataSlice.reducer
