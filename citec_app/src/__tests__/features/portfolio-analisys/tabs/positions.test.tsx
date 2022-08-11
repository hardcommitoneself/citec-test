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
import { Positions } from 'features/portfolio-analisys/tabs'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
import { dataTest } from '__tests__/features/rebalance/backtest/dataTest'

jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})

const initialState = {
   portfolio: {
      ticker: ['$CASH', 'AAPL'],
      outstanding_balance: [1000000, 50000],
      unrealized_capital_gains: [0, 11234],
      positions: [
         {
            ticker: 'TSLA',
            status: 'OK',
            isin: 'US88160R1014',
            figi: 'BBG000N9MNX3',
            name: 'Tesla Inc',
            ipo: '2010-06-09',
            sector: 'Consumer Discretionary',
            url_morningstar: 'https://www.morningstar.com/stocks/xnas/TSLA/quote',
            url_company: 'https://www.tesla.com/',
            url_logo:
               'https://static.finnhub.io/logo/2dd96524-80c9-11ea-aaac-00000000092a.png',
            outstanding_balance: 1111,
            unrealized_capital_gains: -1500,
            weight: '0.11',
         },
         {
            ticker: 'AAPL',
            status: 'OK',
            isin: 'US0378331005',
            figi: 'BBG000B9XRY4',
            name: 'Apple Inc',
            ipo: '1980-12-12',
            sector: 'Information Technology',
            url_morningstar: 'https://www.morningstar.com/stocks/xnas/AAPL/quote',
            url_company: 'https://www.apple.com/',
            url_logo:
               'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png',
            outstanding_balance: 78259,
            unrealized_capital_gains: 0,
            weight: '7.98',
         },
      ],
   },
}

describe('Portfolio Analysis tab Positions', () => {
   const mockStore = configureStore()
   let store

   test('renders Portfolio Analysis page', () => {
      store = mockStore(initialState)

      const { container } = render(
         <Provider store={store}>
            <BrowserRouter>
               <Positions backtest={dataTest} />
            </BrowserRouter>
         </Provider>
      )
      expect(container).toMatchSnapshot()
   })
})
