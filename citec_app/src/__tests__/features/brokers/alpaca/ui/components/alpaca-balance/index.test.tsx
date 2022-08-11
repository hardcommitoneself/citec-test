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
import { render, screen, prettyDOM } from '@testing-library/react'
import { AlpacaBalance } from 'features/brokers/alpaca/ui/components/alpaca-balance'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { alpacaApiConnect } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'
import MockAdapter from 'axios-mock-adapter'

process.env.REACT_APP_ALPACA_VISIBILITY = 'true'

jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})

const mockAlpaca = new MockAdapter(alpacaApiConnect)

const initialState = {
   brokers: {
      brokerConnected: 'Alpaca',
      balance: 0,
      accountType: ['PAPER', 'LIVE'],
      a1c_t: '',
      accountTypeSelect: 'PAPER',
      buyingPower: 10000,
   },
}
const mockStore = configureStore()
const store = mockStore(initialState)
describe('Brokers redux state tests', () => {
   test('renders Balance Alpaca Component', () => {
      jest.useFakeTimers()
      jest.spyOn(global, 'setInterval')

      const resp = {
         data: {
            timestamp: [1654300800, 1654560000, 1654646400, 1654732800, 1654808365],
            equity: [100419.38, 100673.44, 102367.46, 101341.29, 101075.86],
            profit_loss: [-1846.45, 266.06, 1694.02, -1025.17, -265.43],
            profit_loss_pct: [
               0, 0.0026494885748149, 0.019520952256154384, 0.009310849410734142,
               -0.0026191693435124027,
            ],
            base_value: 0,
            timeframe: '1D',
         },
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '326',
            'content-type': 'application/json; charset=UTF-8',
         },
         config: {
            transitional: {
               silentJSONParsing: true,
               forcedJSONParsing: true,
               clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: {
               Accept: 'application/json',
               Authorization: 'Bearer 640a9d05-7f79-4aea-87d2-6beaec40f9a8',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account/portfolio/history',
            params: {
               timeframe: '1D',
               date_end: '2022-06-09',
               extended_hours: true,
               period: '1W',
               date_start: '',
            },
         },
         request: {},
      }
      mockAlpaca.onGet('account/portfolio/history').reply(200, resp)

      const { container } = render(
         <Provider store={store}>
            <AlpacaBalance />
         </Provider>
      )
      const linkElement = screen.getAllByText(/Account/i)
      expect(linkElement[0]).toBeInTheDocument()
      expect(container).toMatchSnapshot()
      jest.useRealTimers()
   })
})
