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

export const exampleReduxState = {
   errors: '',
   taxHarvesting: {
      arrayPositionSelected: [
         {
            outstanding_balance: 0,
            ticker: '$CASH',
            unrealized_capital_gains: 500,
            taxAlpha: -200,
         },
      ],
      positionsTable: [
         {
            outstanding_balance: 50000,
            ticker: 'AAPL',
            unrealized_capital_gains: -1000,
            taxAlpha: 400,
         },
         {
            outstanding_balance: 0,
            ticker: '$CASH',
            unrealized_capital_gains: 500,
            taxAlpha: -200,
         },
      ],
      taxAlpha: -400,
      unrealizedCapitalGains: -500,
      unrealizedCapitalGainsNegative: -1000,
      unrealizedCapitalGainsSelected: 0,
   },
   portfolio: {
      ticker: ['$CASH', 'AAPL'],
      outstanding_balance: [1000000, 50000],
      unrealized_capital_gains: [0, 11234],
      analysis: {
         fundamentals: {
            total_assets: 2,
            total_positions: 2,
            pe: 24.32,
            pb: 38.96,
            dividend_yield: 0.59,
         },
         risk: {
            sharpe: 0.305683,
            volatility: 0.0147,
            beta: 0.048719,
            alpha: 0.000035,
         },
         returns: {
            returns_1M: -0.0021,
            returns_3M: -0.0037,
            returns_6M: -0.0028,
            CAGR: -0.1058,
         },
         capital_gains: {
            outstanding_balance: 1050000,
            unrealized_cap_losses: 0,
            unrealized_cap_gains: 11234,
            realized_cap_losses: 0,
            realized_cap_gains: 0,
            taxes_cost: 0,
            taxes_rate: 0.4,
         },
         sectors: {
            sector: ['Cash', 'Information Technology'],
            percentage: [0.952381, 0.047619],
            percentage_benchmark: [0.3333333333333333, 0.6666666666666666],
         },
         factors: {
            factor: ['style', 'size'],
            percentage: [0.502991, 0.52381],
         },
         segment_matrix: {
            style: ['Val', 'Val'],
            size: ['Large', 'Mid'],
            weight: [0, 0],
         },
         top_holdings: {
            ticker: ['$CASH', 'AAPL'],
            weight: [0.952381, 0.047619],
            outstanding_balance: [1000000, 50000],
            unrealized_capital_gains: [0, 11234],
         },
         concentration: {
            ticker: ['$CASH', 'AAPL'],
            concentration: [95.238095, 100],
         },
         var: {
            quantile: [2, 4],
            value: [0.000072, 0.001334],
         },
         risk_returns: {
            ticker: ['portfolio', 'benchmark'],
            returns: [0.004722, 0.119508],
            volatility: [0.008561, 0.205196],
            sharpe: [0.551568, 0.582407],
         },
      },
   },
   universe: {
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
      to_exclude: [],
      to_include: [],
      universe_base: 'SPDR S&P 500',
   },
   rebalance: {
      ticker: ['$CASH', 'AAPL'],
      hold: [0, 1],
      objective: {
         name: 'Minimize tracking error',
         key: 'min_tracking_error',
      },
      benchmark: 'SPY',
      min_weight: 0.000001,
      number_stocks: [10, 200],
   },
   portfolio_optimized: {
      portfolio_id: null,
      portfolio: 'optimized_portfolio',
      benchmark: 'SPY',
      creation_date: null,
      ticker: ['AAPL', 'MSFT'],
      outstanding_balance: [72506.52, 63477.37],
      unrealized_capital_gains: [0, 0],
      optimization_status: 'Optimization terminated successfully',
   },
   trades: [
      {
         ticker: 'MRK',
         operation: 'SELL',
         volume: 275161.76,
         realized_capital_gains: 0,
         unrealized_capital_gains: 0,
         stocks_number: 3053,
         expected_volume: 275193,
         delta_volume: 31,
         price: 90.1388,
         columnName: {
            url_logo:
               'https://static.finnhub.io/logo/2eedcaa6-80ec-11ea-853f-00000000092a.png',
            name: 'Merck & Co Inc',
         },
         gain_loss: [0, 0],
      },
      {
         ticker: 'BMY',
         operation: 'SELL',
         volume: 152166.26,
         realized_capital_gains: 0,
         unrealized_capital_gains: 0,
         stocks_number: 2072,
         expected_volume: 152146,
         delta_volume: -19,
         price: 73.43,
         columnName: {
            url_logo:
               'https://static.finnhub.io/logo/8b628318-80eb-11ea-93a2-00000000092a.png',
            name: 'Bristol-Myers Squibb Co',
         },
         gain_loss: [0, 0],
      },
      {
         ticker: 'WMT',
         operation: 'SELL',
         volume: 83898.27,
         realized_capital_gains: 0,
         unrealized_capital_gains: 0,
         stocks_number: 679,
         expected_volume: 83845,
         delta_volume: -53,
         price: 123.4832,
         columnName: {
            url_logo:
               'https://static.finnhub.io/logo/52057505dd05a752d364065fcddf7772a700b31c47c39e9dcb41e393f6693d52.png',
            name: 'Walmart Inc',
         },
         gain_loss: [0, 0],
      },
   ],
   workflow: {
      type: 'load',
   },
   static_data: {
      universe: {
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
            { key: 'min_volatility', name: 'Minimize volatility' },
            {
               key: 'max_diversification_ratio',
               name: 'Maximize diversification ratio',
            },
         ],
         benchmarks: [
            {
               key: 'sp_500',
               description: 'S&P 500 universe',
               ticker: 'SPY',
            },
            {
               key: 'nasdaq_100',
               description: 'NASDAQ 100',
               ticker: 'QQQ',
            },
         ],
      },
   },
   brokers: {
      brokerConnected: '',
      balance: 0,
      accountType: [],
      a1c_t: '',
   },
   ideas: [
      {
         portfolio_id: 16,
         portfolio: 'my_first_portfolio_sadasd',
         benchmark: 'SPY',
         creation_date: '2022-04-06 16:10:19',
         ticker: ['MSFT', 'AAPL'],
         outstanding_balance: [200000, 100000],
         unrealized_capital_gains: [0, 35700],
         optimization_status: null,
      },
      {
         portfolio_id: 18,
         portfolio: 'testing',
         benchmark: 'SPY',
         creation_date: '2022-04-06 16:10:19',
         ticker: ['MSFT', 'AAPL'],
         outstanding_balance: [200000, 100000],
         unrealized_capital_gains: [0, 35700],
         optimization_status: null,
      },
      {
         portfolio_id: 19,
         portfolio: 'Jueves',
         benchmark: 'SPY',
         creation_date: '2022-06-23 10:38:00',
         ticker: [
            'CMCSA',
            'REGN',
            'VTR',
            'RTX',
            'NEE',
            'AAPL',
            'MMM',
            'TMO',
            'BLK',
            'MSFT',
            'QCOM',
            'NVDA',
            'CSX',
            'ADBE',
            'XOM',
            'AVGO',
            'BAC',
            'TSLA',
            'SHW',
            'TXN',
            'NFLX',
            'GOOGL',
            'C',
            'MMC',
            'BKNG',
            'COST',
            'NKE',
            'DIS',
            'EL',
            'CSCO',
            'BRK.B',
            'META',
            'AMZN',
            'DG',
            'CCI',
            'ORCL',
            'USB',
            'TGT',
            'PG',
            'ICE',
            'GOOG',
            'AMD',
            'MCD',
            'CVS',
            'HD',
            'CME',
            'MU',
            'UNH',
            'ATVI',
            'V',
            'EOG',
            'GS',
            'HUM',
            'COP',
         ],
         outstanding_balance: [
            80352.37, 74072.31, 59343.2, 54736.44, 41924.05, 41510.68, 35441.43,
            27349.74, 26308.48, 26136.99, 25646.73, 25479.44, 24726.53, 24075.27,
            23856.18, 23763.38, 23735.12, 23092.02, 22995.95, 21888.81, 21775.5,
            21090.31, 16734.94, 16192.87, 15720.33, 14020.04, 14018.61, 13225.5,
            12996.74, 11693.52, 11315.64, 10798.53, 10583.72, 10309.54, 10245.54,
            9611.94, 8747.21, 8723.18, 6339.86, 5866.02, 5426.94, 4912.02, 4857.23,
            3915.03, 3395.13, 3370.41, 3322.34, 3184.94, 3001.78, 1983.75, 1858.2,
            1789.12, 1309.98, 1228.49,
         ],
         unrealized_capital_gains: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
         ],
         optimization_status: null,
      },
      {
         portfolio_id: 20,
         portfolio: 'Min volatility',
         benchmark: 'SPY',
         creation_date: '2022-06-23 11:25:41',
         ticker: [
            'MRK',
            'BMY',
            'WMT',
            'CMCSA',
            'REGN',
            'VTR',
            'RTX',
            'NEE',
            'MMM',
            'CSX',
            'XOM',
            'SHW',
            'TXN',
            'C',
            'BRK.B',
            'BA',
            'BSX',
            'CB',
            'CI',
            'CL',
            'CME',
            'COP',
            'COST',
            'CRM',
            'ZTS',
            'ADBE',
            'AMZN',
            'AVGO',
         ],
         outstanding_balance: [
            275161.76, 152166.26, 83898.27, 80352.37, 74072.31, 59343.2, 54736.44,
            41924.05, 35441.43, 24726.53, 23856.18, 22995.95, 21888.81, 16734.94,
            11315.64, 2116.49, 2116.49, 2116.49, 2116.49, 2116.49, 2116.49, 2116.49,
            2116.49, 2116.49, 2116.49, 119.48, 96.79, 4.71,
         ],
         unrealized_capital_gains: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0,
         ],
         optimization_status: null,
      },
      {
         portfolio_id: 21,
         portfolio: 'min2',
         benchmark: 'SPY',
         creation_date: '2022-06-23 11:27:32',
         ticker: [
            'MRK',
            'BMY',
            'WMT',
            'CMCSA',
            'REGN',
            'VTR',
            'RTX',
            'NEE',
            'MMM',
            'CSX',
            'XOM',
            'SHW',
            'TXN',
            'C',
            'BRK.B',
            'BA',
            'BSX',
            'CB',
            'CI',
            'CL',
            'CME',
            'COP',
            'COST',
            'CRM',
            'ZTS',
            'ADBE',
            'AMZN',
            'AVGO',
         ],
         outstanding_balance: [
            275161.76, 152166.26, 83898.27, 80352.37, 74072.31, 59343.2, 54736.44,
            41924.05, 35441.43, 24726.53, 23856.18, 22995.95, 21888.81, 16734.94,
            11315.64, 2116.49, 2116.49, 2116.49, 2116.49, 2116.49, 2116.49, 2116.49,
            2116.49, 2116.49, 2116.49, 119.48, 96.79, 4.71,
         ],
         unrealized_capital_gains: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0,
         ],
         optimization_status: null,
      },
   ],
}
