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
import { TaxHarvestingState } from 'features/utils/interfaces/redux/tax-harvesting'
import reducer, {
   resetTaxHarvesting,
   setInitialPositions,
   setPositionSelected,
} from 'store/slices/tax-harvesting'

const initialState: TaxHarvestingState = {
   arrayPositionSelected: [],
   unrealizedCapitalGains: 0,
   unrealizedCapitalGainsNegative: 0,
}

describe('Tests at tax harvesting state', () => {
   test('should return the initial state', () => {
      expect(reducer(undefined, {} as never)).toEqual(initialState)
   })

   test('load position', () => {
      expect(
         reducer(
            initialState,
            setPositionSelected({
               arrayPositionSelected: [
                  {
                     outstanding_balance: 0,
                     ticker: '$CASH',
                     unrealized_capital_gains: 500,
                     taxAlpha: -200,
                  },
               ],
            })
         )
      ).toEqual({
         ...initialState,
         arrayPositionSelected: [
            {
               outstanding_balance: 0,
               ticker: '$CASH',
               unrealized_capital_gains: 500,
               taxAlpha: -200,
            },
         ],
      })
   })

   test('Load initial positions', () => {
      expect(
         reducer(
            initialState,
            setInitialPositions({
               unrealizedCapitalGainsNegative: 0,
               unrealizedCapitalGains: 500,
            })
         )
      ).toEqual({
         ...initialState,

         unrealizedCapitalGainsNegative: 0,
         unrealizedCapitalGains: 500,
      })
   })
   test('Reset to initial state ', () => {
      expect(reducer(initialState, resetTaxHarvesting())).toEqual(initialState)
   })
})
