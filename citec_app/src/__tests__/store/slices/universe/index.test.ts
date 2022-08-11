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
   setUniverseDefinition,
   setTickerToInclude,
   setTickerToExclude,
   setUniverseBase,
   setSectors,
   setFactors,
   resetUniverse,
} from 'store/slices/universe'

const initialState = {
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

describe('Universe redux state tests', () => {
   test('should return the initial state', () => {
      expect(reducer(undefined, {} as any)).toEqual({
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
      })
   })

   test('Define default Universe', () => {
      const data_state = {
         factors_filter: [
            {
               factor: 'Style',
               ranges: [20, 90],
            },
            {
               factor: 'Size',
               ranges: [25, 65],
            },
            {
               factor: 'Dividend Yield',
               ranges: [20, 37],
            },
            {
               factor: 'Quality',
               ranges: [25, 37],
            },
            {
               factor: 'Volatility',
               ranges: [20, 57],
            },
            {
               factor: 'Momentum',
               ranges: [20, 97],
            },
            {
               factor: 'Liquidity',
               ranges: [10, 37],
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
            'Real Estate',
            'Energy',
            'Utilities',
         ],
         to_exclude: [
            {
               code: 'U',
               name: 'Unity Software Inc.',
            },
            {
               code: 'RBLX',
               name: 'Roblox Corp.',
            },
         ],
         to_include: [
            {
               code: 'PM',
               name: 'Philip Morris',
            },
            {
               code: 'LMT',
               name: 'Lockheed Martin',
            },
         ],
         universe_base: 'SPDR S&P 500',
      }
      expect(reducer(initialState, setUniverseDefinition(data_state))).toEqual({
         factors_filter: [
            {
               factor: 'Style',
               ranges: [20, 90],
            },
            {
               factor: 'Size',
               ranges: [25, 65],
            },
            {
               factor: 'Dividend Yield',
               ranges: [20, 37],
            },
            {
               factor: 'Quality',
               ranges: [25, 37],
            },
            {
               factor: 'Volatility',
               ranges: [20, 57],
            },
            {
               factor: 'Momentum',
               ranges: [20, 97],
            },
            {
               factor: 'Liquidity',
               ranges: [10, 37],
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
            'Real Estate',
            'Energy',
            'Utilities',
         ],
         to_exclude: [
            {
               code: 'U',
               name: 'Unity Software Inc.',
            },
            {
               code: 'RBLX',
               name: 'Roblox Corp.',
            },
         ],
         to_include: [
            {
               code: 'PM',
               name: 'Philip Morris',
            },
            {
               code: 'LMT',
               name: 'Lockheed Martin',
            },
         ],
         universe_base: 'SPDR S&P 500',
      })
   })

   test('Test Tickers To include', () => {
      const data_state = [
         {
            code: 'PM',
            name: 'Philip Morris',
         },
         {
            code: 'LMT',
            name: 'Lockheed Martin',
         },
      ]
      expect(reducer(initialState, setTickerToInclude(data_state))).toEqual({
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
         to_include: [
            {
               code: 'PM',
               name: 'Philip Morris',
            },
            {
               code: 'LMT',
               name: 'Lockheed Martin',
            },
         ],
         universe_base: 'SPDR S&P 500',
      })
   })

   test('Test Tickers To exclude', () => {
      const data_state = [
         {
            code: 'U',
            name: 'Unity Software Inc.',
         },
         {
            code: 'RBLX',
            name: 'Roblox Corp.',
         },
      ]
      expect(reducer(initialState, setTickerToExclude(data_state))).toEqual({
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
         to_exclude: [
            {
               code: 'U',
               name: 'Unity Software Inc.',
            },
            {
               code: 'RBLX',
               name: 'Roblox Corp.',
            },
         ],
         to_include: [],
         universe_base: 'SPDR S&P 500',
      })
   })

   test('Set Universe Base', () => {
      const data_state = 'SPDR DJ Industrial Average ETF Trust'

      expect(reducer(initialState, setUniverseBase(data_state))).toEqual({
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
         universe_base: 'SPDR DJ Industrial Average ETF Trust',
      })
   })

   test('Set sectors filters', () => {
      expect(
         reducer(
            initialState,
            setSectors(['Industrials', 'Financials', 'Health Care'])
         )
      ).toEqual({
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
         sectors_filter: ['Industrials', 'Financials', 'Health Care'],
         to_exclude: [],
         to_include: [],
         universe_base: 'SPDR S&P 500',
      })
   })

   test('Set factors', () => {
      const initState = {
         factors_filter: [
            {
               factor: 'style',
               ranges: [0, 100],
            },
         ],
         sectors_filter: [],
         to_exclude: [],
         to_include: [],
         universe_base: '',
      }

      expect(reducer(initState, setFactors({ index: 0, value: [0, 95] }))).toEqual({
         factors_filter: [
            {
               factor: 'style',
               ranges: [0, 95],
            },
         ],
         sectors_filter: [],
         to_exclude: [],
         to_include: [],
         universe_base: '',
      })
   })

   test('Reset Universe in Redux', () => {
      const data_state = [
         {
            factors_filter: [
               {
                  factor: 'style',
                  ranges: [10, 100],
               },
               {
                  factor: 'size',
                  ranges: [10, 100],
               },
               {
                  factor: 'yield',
                  ranges: [0, 44],
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
               'Real Estate',
               'Energy',
               'Utilities',
            ],
            to_exclude: [],
            to_include: [],
            universe_base: 'SPDR S&P 500',
         },
      ]

      expect(reducer(data_state as any, resetUniverse())).toEqual(initialState)
   })
})
