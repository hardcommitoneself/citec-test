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
import { BenchmarkState } from 'features/utils/interfaces/redux/rebalance-state'

const initialState: BenchmarkState = {
   ticker: [],
   hold: [],
   objective: { name: '', key: '' },
   benchmark: '',
   min_weight: 0.000001,
   number_stocks: [100, 120],
}

export const rebalanceSlice = createSlice({
   name: 'rebalance',
   initialState,
   reducers: {
      setManagePositions: (state, action) => {
         state.ticker = action.payload.ticker
         state.hold = action.payload.hold
      },
      setHold: (state, action) => {
         state.hold = [...action.payload]
      },
      setCriteria: (state, action) => {
         state.objective = action.payload.objective
         state.benchmark = action.payload.benchmark
         state.min_weight = action.payload.min_weight
         state.number_stocks = action.payload.number_stocks
      },
      setCashTicker: (state) => {
         state.ticker.push('$CASH')
         state.hold.push(0)
      },
      setObjective: (state, action) => {
         state.objective = action.payload
      },
      setNumberStocks: (state, action) => {
         state.number_stocks = action.payload
      },
      setBenchmark: (state, action) => {
         state.benchmark = action.payload
      },
      resetRebalance: () => initialState,
   },
})

export const {
   resetRebalance,
   setBenchmark,
   setCashTicker,
   setCriteria,
   setHold,
   setManagePositions,
   setNumberStocks,
   setObjective,
} = rebalanceSlice.actions

export default rebalanceSlice.reducer
