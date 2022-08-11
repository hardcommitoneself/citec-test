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
import { TaxHarvestingState } from 'features/utils/interfaces/redux/tax-harvesting'

const initialState: TaxHarvestingState = {
   arrayPositionSelected: [],
   unrealizedCapitalGains: 0,
   unrealizedCapitalGainsNegative: 0,
}

export const taxHarvestingSlice = createSlice({
   name: 'tax-harvesting',
   initialState,
   reducers: {
      setPositionSelected: (state, action) => {
         state.arrayPositionSelected = action.payload.arrayPositionSelected
      },
      setInitialPositions: (state, action) => {
         state.unrealizedCapitalGains = action.payload.unrealizedCapitalGains
         state.unrealizedCapitalGainsNegative =
            action.payload.unrealizedCapitalGainsNegative
      },

      resetTaxHarvesting: () => initialState,
   },
})

export const { resetTaxHarvesting, setInitialPositions, setPositionSelected } =
   taxHarvestingSlice.actions

export default taxHarvestingSlice.reducer
