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
import { UniverseState } from 'features/utils/interfaces/redux/universe-state'
import { fetchStaticUniverseData } from '../static-data/thunk'

const initialState: UniverseState = {
   factors_filter: [
      {
         factor: 'style',
         ranges: [0, 100],
      },
      {
         factor: 'size',
         ranges: [0, 100],
      },
      {
         factor: 'yield',
         ranges: [0, 100],
      },
      {
         factor: 'quality',
         ranges: [0, 100],
      },
      {
         factor: 'volatility',
         ranges: [0, 100],
      },
      {
         factor: 'momentum',
         ranges: [0, 100],
      },
      {
         factor: 'liquidity',
         ranges: [0, 100],
      },
   ],
   sectors_filter: [
      'Industrials',
      'Financials',
      'Health Care',
      'Consumer Staples',
      'Communication Services',
      'Information Technology',
      'Consumer Discretionary',
      'Materials',
      'Cash',
      'Others',
      'Real Estate',
      'Energy',
      'Utilities',
   ],
   to_exclude: [],
   to_include: [],
   universe_base: 'SPDR S&P 500',
}

export const universeSlice = createSlice({
   name: 'universe',
   initialState,
   reducers: {
      setUniverseDefinition: (state, action) => {
         state.factors_filter = action.payload.factors_filter
         state.sectors_filter = action.payload.sectors_filter
         state.to_exclude = action.payload.to_exclude
         state.to_include = action.payload.to_include
         state.universe_base = action.payload.universe_base
      },
      setSectors: (state, action) => {
         state.sectors_filter = action.payload
      },
      setTickerToInclude: (state, action) => {
         state.to_include = action.payload
      },
      setTickerToExclude: (state, action) => {
         state.to_exclude = action.payload
      },
      setFactors: (state, action) => {
         state.factors_filter[action.payload.index].ranges = action.payload.value
      },
      setUniverseBase: (state, action) => {
         state.universe_base = action.payload
      },

      resetUniverse: () => initialState,
   },
   extraReducers: (builder) => {
      builder.addCase(fetchStaticUniverseData.fulfilled, (state, action) => {
         state.factors_filter = action.payload.factors_filter
         state.sectors_filter = action.payload.sectors
      })
   },
})

export const {
   resetUniverse,

   setFactors,
   setSectors,
   setTickerToExclude,
   setTickerToInclude,
   setUniverseBase,
   setUniverseDefinition,
} = universeSlice.actions

export default universeSlice.reducer
