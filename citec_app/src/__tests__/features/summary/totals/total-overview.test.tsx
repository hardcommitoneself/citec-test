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
import { BrowserRouter } from 'react-router-dom'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { TotalOverview } from 'features/summary/totals'

jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})

const backtest = {
   fundamentals: {
      total_assets: 75,
      total_positions: 75,
      pe: 31.733708,
      pb: 11.404961,
      dividend_yield: 1.970252,
   },
   risk: {
      sharpe: -1.107185,
      volatility: 0.239029,
      beta: 1.034119,
      alpha: -1e-5,
   },
   returns: {
      returns_1M: -0.0164,
      returns_3M: -0.0522,
      returns_6M: -0.136,
      CAGR: -0.2258,
   },
   tracking: {
      tracking_error: 0.015409,
      tracking_difference: -4.3e-5,
      information_ratio: -0.710898,
      r_square: 0.99693,
      alpha: -1e-5,
      beta: 1.034119,
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
      percentage: [0.093291, 0.10149, 0.047595],
   },
   factors: {
      factor: ['style', 'size'],
      percentage: [
         0.527408, 0.986136, 0.411154, 0.638232, 0.275876, 0.597158, 0.423822,
      ],
   },
   segment_matrix: {
      style: ['Val', 'Val', 'Val', 'Bld', 'Bld', 'Bld', 'Gwth', 'Gwth', 'Gwth'],
      size: ['Large', 'Mid', 'Small'],
      weight: [31.526847, 0.0, 0.0],
   },
   tracking_expected: {
      expected_tracking_kpis: {
         tracking_error: 0.015409,
         tracking_difference: -4.3e-5,
         information_ratio: -0.710898,
         r_square: 0.99693,
         alpha: -1e-5,
         beta: 1.034119,
      },
      observation: [0, 1, 2],
      tracking_error: [-0.03003, -0.028923, -0.027815],
      probability: [0.001, 0.0, 0.001],
   },
   ts_backtest: {
      date: ['24-11-2021', '26-11-2021', '29-11-2021'],
      benchmark: [1.00267, 0.980307, 0.992332, 0.973024],
      portfolio: [1.0028, 0.9793, 0.99247],
   },
   ts_drawdowns: {
      date: ['24-11-2021', '26-11-2021', '29-11-2021'],
      benchmark: [0.0, -0.022303, -0.01031],
      portfolio: [0.0, -0.023434, -0.010301],
   },
}
const analysis = {
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
         5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
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

describe('test in Backtest tab', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   test('match snapshot', () => {
      const wrapper = mount(
         <Provider store={store}>
            <BrowserRouter>
               <TotalOverview backtest={backtest} analysis={analysis} />
            </BrowserRouter>
         </Provider>
      )
      expect(wrapper).toMatchSnapshot()
   })

   it('click on information icons', () => {
      const component = mount(
         <Provider store={store}>
            <BrowserRouter>
               <TotalOverview backtest={backtest} analysis={analysis} />
            </BrowserRouter>
         </Provider>
      )
      component
         .find({ 'data-testid': 'info-summary-overview-market_cap' })
         .simulate('click')
      component.find({ 'data-testid': 'info-summary-overview-pe' }).simulate('click')
      component
         .find({ 'data-testid': 'info-summary-overview-yield' })
         .simulate('click')
   })
})
