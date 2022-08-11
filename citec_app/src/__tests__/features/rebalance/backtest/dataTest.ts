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

export const dataTest = {
   fundamentals: {
      total_assets: 75,
      total_positions: 75,
      pe: 19.155117,
      pb: 11.343511,
      dividend_yield: 2.012137,
      avg_market_cap: 242652.664865,
   },
   risk: {
      sharpe: -1.096323,
      volatility: 0.244204,
      bnch_sharpe: -1.096323,
      bnch_volatility: 0.254246,
      beta: 1.039269,
      alpha: 7e-6,
   },
   returns: {
      returns_1M: 0.0379,
      returns_3M: -0.0102,
      returns_6M: null,
      CAGR: -0.2368,
      bnch_returns_1M: 0.0328,
      bnch_returns_3M: -0.0062,
      bnch_returns_6M: null,
      bnch_CAGR: -0.2304,
   },
   tracking: {
      tracking_error: 0.017934,
      tracking_difference: 0.000146,
      information_ratio: -0.470872,
      r_square: 0.996447,
      alpha: 7e-6,
      beta: 1.039269,
   },
   capital_gains: {
      outstanding_balance: 100.01,
      unrealized_cap_losses: 0.0,
      unrealized_cap_gains: 0.0,
      realized_cap_losses: 0.0,
      realized_cap_gains: 0.0,
      taxes_cost: 0.0,
      taxes_rate: 0.4,
   },
   sectors: {
      sector: ['Communication Services', 'Consumer Discretionary'],
      percentage: [0.0933, 0.1015],
      percentage_benchmark: [0.0706, 0.1086],
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
         0.523819, 0.985687, 0.397478, 0.636753, 0.278066, 0.57453, 0.403251,
      ],
   },
   segment_matrix: {
      style: ['Val', 'Val', 'Val', 'Bld', 'Bld', 'Bld', 'Gwth', 'Gwth', 'Gwth'],
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
      weight: [32.766723, 0.0, 0.0, 25.507449, 0.0, 0.0, 41.725827, 0.0, 0.0],
   },
   tracking_expected: {
      observation: [0, 1],
      tracking_error: [-0.038326, -0.036819],
      probability: [0.003, 0.002],
      expected_tracking_kpis: {
         tracking_error: 0.013011,
         tracking_difference: -0.009683,
         information_ratio: -0.404998,
         r_square: 0.996925,
         alpha: 0.003044,
         beta: 1.035788,
      },
   },
   ts_backtest: {
      date: ['10-01-2022', '11-01-2022'],
      benchmark: [0.998756, 1.007853],
      portfolio: [0.998596, 1.008083],
   },
   ts_drawdowns: {
      date: ['10-01-2022', '11-01-2022'],
      benchmark: [0.0, 0.0, 0],
      portfolio: [0.0, 0.0],
   },
}

test('1 + 2 equal 3', () => {
   expect(1 + 2).toBe(3)
})
