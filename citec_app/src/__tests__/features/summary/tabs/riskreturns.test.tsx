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
import '@testing-library/jest-dom'
import { Risk } from 'features/summary/tabs/riskreturns'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { ValueAtRisk } from 'features/portfolio-analisys/components'

jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})

describe('Portfolio Analysis RiskreturnTab', () => {
   const initialState = {
      portfolio: {
         ticker: ['$CASH', 'AAPL', 'MSFT', 'TSLA'],
         outstanding_balance: [1000000, 50000, 250000, 10000],
         unrealized_capital_gains: [0, 11234, -65000, -36000],
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
                  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
                  90, 95,
               ],
               value: [
                  0, 0, 0, 0, 0.010967, 0.021321, 0.030917, 0.040021, 0.04883,
                  0.0575, 0.066169, 0.074978, 0.084083, 0.093678, 0.104032, 0.115563,
                  0.129003, 0.145913, 0.170978,
               ],
            },
            risk_returns: {
               ticker: ['portfolio', 'benchmark'],
               returns: [-0.0575, -0.122369],
               volatility: [0.068686, 0.190293],
               sharpe: [0.837133, 0.643053],
            },
         },
      },
   }

   const valueatrisk = {
      quantile: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      value: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 10.0],
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

   const mockStore = configureStore()
   const store = mockStore(initialState)

   test('renders Portfolio Analysis page', async () => {
      const { container } = render(
         <Provider store={store}>
            <Risk analysis={analysis} />
         </Provider>
      )
      expect(container).toMatchSnapshot()
   })

   test('Test Value and Risk component', async () => {
      const { container } = render(<ValueAtRisk valueatrisk={valueatrisk} />)
      expect(container).toMatchSnapshot()
   })

   test('Show box Risk and Return of Apexchart', () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <Risk analysis={analysis} />
         </Provider>
      )
      const graph = getByTestId('graph-risk-returns-analisys')
      expect(graph).toBeTruthy()
   })

   it('click on information icons', () => {
      const component = mount(
         <Provider store={store}>
            <Risk analysis={analysis} />
         </Provider>
      )
      component.find({ 'data-testid': 'info-summary-risk-var' }).simulate('click')
      component.find({ 'data-testid': 'info-summary-risk-risk' }).simulate('click')
      component
         .find({ 'data-testid': 'info-summary-risk-concentration' })
         .simulate('click')
      component.find({ 'data-testid': 'info-summary-risk-top10' }).simulate('click')
   })
})
