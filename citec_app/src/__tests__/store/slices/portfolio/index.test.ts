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
   setPortfolio,
   setPortfolioAnalysis,
   resetPortfolio,
   setPortfolioPositions,
   setCash,
   setUpdatedCash,
} from 'store/slices/portfolio'

const initialState = {
   ticker: [],
   outstanding_balance: [],
   unrealized_capital_gains: [],
   analysis: null,
   positions: [],
}

describe('Portfolio redux state tests', () => {
   test('should return the initial state', () => {
      expect(reducer(undefined, {} as never)).toEqual({
         outstanding_balance: [],
         ticker: [],
         unrealized_capital_gains: [],
         analysis: null,
         positions: [],
      })
   })

   test('update cash in Redux', () => {
      const initialState = {
         ticker: ['$CASH'],
         outstanding_balance: [100],
         unrealized_capital_gains: [100],
         analysis: null,
         positions: [],
      }

      expect(
         reducer(
            initialState,
            setUpdatedCash({
               outstanding_balance: 200,
               unrealized_capital_gains: 200,
            })
         )
      ).toEqual({
         ...initialState,
         outstanding_balance: [200],
         unrealized_capital_gains: [200],
      })
   })
   test('set cash in Redux', () => {
      expect(
         reducer(
            initialState,
            setCash({
               outstanding_balance: 100,
               unrealized_capital_gains: 100,
            })
         )
      ).toEqual({
         ...initialState,
         outstanding_balance: [100],
         unrealized_capital_gains: [100],
         ticker: ['$CASH'],
      })
   })

   test('set positions in Redux', () => {
      const data_state = [
         {
            figi: 'BBG000B9XRY4',
            ipo: '1980-12-12',
            isin: 'US0378331005',
            name: 'Apple Inc',
            outstanding_balance: 78259,
            sector: 'Information Technology',
            status: 'OK',
            ticker: 'AAPL',
            unrealized_capital_gains: 0,
            weight: '7.99',
         },
      ]

      expect(reducer(initialState, setPortfolioPositions(data_state))).toEqual({
         ...initialState,
         positions: data_state,
      })
   })

   test('set Portfolio in Redux', () => {
      const data_state = {
         ticker: ['$CASH', 'AAPL'],
         outstanding_balance: [1000000, 50000],
         unrealized_capital_gains: [0, 11234],
      }

      expect(reducer(initialState, setPortfolio(data_state))).toEqual({
         outstanding_balance: [1000000, 50000],
         ticker: ['$CASH', 'AAPL'],
         unrealized_capital_gains: [0, 11234],
         analysis: null,
         positions: [],
      })
   })

   test('Reset Posrtfolio in Redux', () => {
      const data_state = {
         fundamentals: {
            total_assets: 4,
            total_positions: 4,
            pe: 73.739873,
            pb: 28.025954,
            dividend_yield: 0.517303,
         },
         risk: {
            sharpe: -1.002506,
            volatility: 0.068686,
            beta: 0.315348,
            alpha: -0.000072,
         },
         returns: {
            returns_1M: -0.0148,
            returns_3M: -0.0103,
            returns_6M: null,
            CAGR: -0.0575,
         },
         capital_gains: {
            outstanding_balance: 1310000,
            unrealized_cap_losses: 101000,
            unrealized_cap_gains: 11234,
            realized_cap_losses: 0,
            realized_cap_gains: 0,
            taxes_cost: 0,
            taxes_rate: 0.4,
         },
         sectors: {
            sector: ['Cash', 'Consumer Discretionary', 'Information Technology'],
            percentage: [0.763359, 0.007634, 0.229008],
         },
         factors: {
            factor: [
               'style',
               'size',
               'yield',
               'quality',
               'volatility',
               'momentum',
               'liquidity',
            ],
            percentage: [
               0.513052, 0.618264, 0.59449, 0.5672, 0.432629, 0.529742, 0.465484,
            ],
         },
         segment_matrix: {
            style: [
               'Val',
               'Val',
               'Val',
               'Bld',
               'Bld',
               'Bld',
               'Gwth',
               'Gwth',
               'Gwth',
            ],
            size: [
               'Large',
               'Mid',
               'Small',
               'Large',
               'Mid',
               'Small',
               'Large',
               'Mid',
               'Small',
            ],
            weight: [0, 0, 0, 19.083969, 0, 0, 4.580153, 0, 0],
         },
         top_holdings: {
            ticker: ['$CASH', 'MSFT', 'AAPL', 'TSLA'],
            weight: [0.763359, 0.19084, 0.038168, 0.007634],
            outstanding_balance: [1000000, 250000, 50000, 10000],
            unrealized_capital_gains: [0, -65000, 11234, -36000],
         },
         concentration: {
            ticker: ['$CASH', 'MSFT', 'AAPL', 'TSLA'],
            concentration: [76.335878, 95.419847, 99.236641, 100],
         },
         var: {
            quantile: [
               5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
               95,
            ],
            value: [
               0, 0, 0, 0, 0.010967, 0.021321, 0.030917, 0.040021, 0.04883, 0.0575,
               0.066169, 0.074978, 0.084083, 0.093678, 0.104032, 0.115563, 0.129003,
               0.145913, 0.170978,
            ],
         },
         risk_returns: {
            ticker: ['portfolio', 'benchmark'],
            returns: [-0.0575, -0.122369],
            volatility: [0.068686, 0.190293],
            sharpe: [0.837133, 0.643053],
         },
      }

      expect(reducer(data_state as any, resetPortfolio())).toEqual(initialState)
   })

   test('set Portfolio Analysis in Redux', () => {
      const data_state = {
         fundamentals: {
            total_assets: 4,
            total_positions: 4,
            pe: 73.739873,
            pb: 28.025954,
            dividend_yield: 0.517303,
         },
         risk: {
            sharpe: -1.002506,
            volatility: 0.068686,
            beta: 0.315348,
            alpha: -0.000072,
         },
         returns: {
            returns_1M: -0.0148,
            returns_3M: -0.0103,
            returns_6M: null,
            CAGR: -0.0575,
         },
         capital_gains: {
            outstanding_balance: 1310000,
            unrealized_cap_losses: 101000,
            unrealized_cap_gains: 11234,
            realized_cap_losses: 0,
            realized_cap_gains: 0,
            taxes_cost: 0,
            taxes_rate: 0.4,
         },
         sectors: {
            sector: ['Cash', 'Consumer Discretionary', 'Information Technology'],
            percentage: [0.763359, 0.007634, 0.229008],
         },
         factors: {
            factor: [
               'style',
               'size',
               'yield',
               'quality',
               'volatility',
               'momentum',
               'liquidity',
            ],
            percentage: [
               0.513052, 0.618264, 0.59449, 0.5672, 0.432629, 0.529742, 0.465484,
            ],
         },
         segment_matrix: {
            style: [
               'Val',
               'Val',
               'Val',
               'Bld',
               'Bld',
               'Bld',
               'Gwth',
               'Gwth',
               'Gwth',
            ],
            size: [
               'Large',
               'Mid',
               'Small',
               'Large',
               'Mid',
               'Small',
               'Large',
               'Mid',
               'Small',
            ],
            weight: [0, 0, 0, 19.083969, 0, 0, 4.580153, 0, 0],
         },
         top_holdings: {
            ticker: ['$CASH', 'MSFT', 'AAPL', 'TSLA'],
            weight: [0.763359, 0.19084, 0.038168, 0.007634],
            outstanding_balance: [1000000, 250000, 50000, 10000],
            unrealized_capital_gains: [0, -65000, 11234, -36000],
         },
         concentration: {
            ticker: ['$CASH', 'MSFT', 'AAPL', 'TSLA'],
            concentration: [76.335878, 95.419847, 99.236641, 100],
         },
         var: {
            quantile: [
               5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
               95,
            ],
            value: [
               0, 0, 0, 0, 0.010967, 0.021321, 0.030917, 0.040021, 0.04883, 0.0575,
               0.066169, 0.074978, 0.084083, 0.093678, 0.104032, 0.115563, 0.129003,
               0.145913, 0.170978,
            ],
         },
         risk_returns: {
            ticker: ['portfolio', 'benchmark'],
            returns: [-0.0575, -0.122369],
            volatility: [0.068686, 0.190293],
            sharpe: [0.837133, 0.643053],
         },
      }

      expect(reducer(initialState as any, setPortfolioAnalysis(data_state))).toEqual(
         {
            outstanding_balance: [],
            ticker: [],
            unrealized_capital_gains: [],
            analysis: {
               fundamentals: {
                  total_assets: 4,
                  total_positions: 4,
                  pe: 73.739873,
                  pb: 28.025954,
                  dividend_yield: 0.517303,
               },
               risk: {
                  sharpe: -1.002506,
                  volatility: 0.068686,
                  beta: 0.315348,
                  alpha: -0.000072,
               },
               returns: {
                  returns_1M: -0.0148,
                  returns_3M: -0.0103,
                  returns_6M: null,
                  CAGR: -0.0575,
               },
               capital_gains: {
                  outstanding_balance: 1310000,
                  unrealized_cap_losses: 101000,
                  unrealized_cap_gains: 11234,
                  realized_cap_losses: 0,
                  realized_cap_gains: 0,
                  taxes_cost: 0,
                  taxes_rate: 0.4,
               },
               sectors: {
                  sector: [
                     'Cash',
                     'Consumer Discretionary',
                     'Information Technology',
                  ],
                  percentage: [0.763359, 0.007634, 0.229008],
               },
               factors: {
                  factor: [
                     'style',
                     'size',
                     'yield',
                     'quality',
                     'volatility',
                     'momentum',
                     'liquidity',
                  ],
                  percentage: [
                     0.513052, 0.618264, 0.59449, 0.5672, 0.432629, 0.529742,
                     0.465484,
                  ],
               },
               segment_matrix: {
                  style: [
                     'Val',
                     'Val',
                     'Val',
                     'Bld',
                     'Bld',
                     'Bld',
                     'Gwth',
                     'Gwth',
                     'Gwth',
                  ],
                  size: [
                     'Large',
                     'Mid',
                     'Small',
                     'Large',
                     'Mid',
                     'Small',
                     'Large',
                     'Mid',
                     'Small',
                  ],
                  weight: [0, 0, 0, 19.083969, 0, 0, 4.580153, 0, 0],
               },
               top_holdings: {
                  ticker: ['$CASH', 'MSFT', 'AAPL', 'TSLA'],
                  weight: [0.763359, 0.19084, 0.038168, 0.007634],
                  outstanding_balance: [1000000, 250000, 50000, 10000],
                  unrealized_capital_gains: [0, -65000, 11234, -36000],
               },
               concentration: {
                  ticker: ['$CASH', 'MSFT', 'AAPL', 'TSLA'],
                  concentration: [76.335878, 95.419847, 99.236641, 100],
               },
               var: {
                  quantile: [
                     5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
                     85, 90, 95,
                  ],
                  value: [
                     0, 0, 0, 0, 0.010967, 0.021321, 0.030917, 0.040021, 0.04883,
                     0.0575, 0.066169, 0.074978, 0.084083, 0.093678, 0.104032,
                     0.115563, 0.129003, 0.145913, 0.170978,
                  ],
               },
               risk_returns: {
                  ticker: ['portfolio', 'benchmark'],
                  returns: [-0.0575, -0.122369],
                  volatility: [0.068686, 0.190293],
                  sharpe: [0.837133, 0.643053],
               },
            },
            positions: [],
         }
      )
   })
})
