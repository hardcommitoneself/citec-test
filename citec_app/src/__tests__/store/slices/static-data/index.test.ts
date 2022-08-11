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
import reducer, { resetStaticData } from 'store/slices/static-data'
import {
   fetchStaticRebalanceData,
   fetchStaticUniverseData,
} from 'store/slices/static-data/thunk'

describe('Static Data redux state tests', () => {

   test('Test resetStaticData function', () => {
      const initialState = {
         universe: {
            universes: [
               {
                  name: 'SPDR S&P 500',
                  description: 'SPDR S&P 500',
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
               'style',
               'size',
               'yield',
               'quality',
               'volatility',
               'momentum',
               'liquidity',
            ],
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
               },
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
               },
            ],
         },
      }

      const intermediateState = {
         universe: {
            universes: [
               {
                  name: 'SPDR S&P 500',
                  description: 'SPDR S&P 500',
               },
            ],
            sectors: [],
            factors: [],
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
               },
               {
                  key: 'nasdaq_1002',
                  description: 'Invesco QQQ Trust Series 1',
                  ticker: 'QQQ',
               },
            ],
         },
      }

      expect(reducer(intermediateState as any, resetStaticData())).toEqual(
         initialState
      )
   })

   const initialState = {
      universe: {
         universes: [],
         sectors: [],
         factors: [],
      },
      rebalance: {
         objectives: [],
         benchmarks: [],
      },
   }

   test('should dispatch response getUniverseData() thunk', () => {
      const responseStaticUniverseData = {
         universes: [
            {
               name: 'INVESCO QQQ TRUST SERIES 1',
               description: 'INVESCO QQQ TRUST SERIES 1',
            },
            {
               name: 'ISHARES MSCI USA ESG SELECT',
               description: 'ISHARES MSCI USA ESG SELECT',
            },
         ],
         sectors: [
            'Cash',
            'Communication Services',
            'Consumer Discretionary',
            'Consumer Staples',
         ],
         factors: ['style', 'size', 'yield', 'quality'],
      }

      const action = {
         type: fetchStaticUniverseData.fulfilled,
         payload: responseStaticUniverseData,
      }

      const state = reducer(initialState, action)
      expect(state).toEqual({
         ...initialState,
         universe: {
            ...responseStaticUniverseData,
         },
      })
   })
   test('should dispatch response getRelabanceData() thunk', () => {
      const responseStaticRebalanceData = {
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
            },
         ],
         objectives: [
            {
               key: 'min_tracking_error',
               name: 'Minimize tracking error',
            },
            {
               key: 'min_risk_parity',
               name: 'Minimize risk parity',
            },
         ],
      }

      const action = {
         type: fetchStaticRebalanceData.fulfilled,
         payload: responseStaticRebalanceData,
      }

      const state = reducer(initialState, action)
      expect(state).toEqual({
         ...initialState,
         rebalance: {
            ...responseStaticRebalanceData,
         },
      })
   })
})
