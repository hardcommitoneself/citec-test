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
import { render, screen } from '@testing-library/react'
import { AlpacaBuyingPower } from 'features/brokers/alpaca/ui/components/alpaca-buying-power'
import { Provider } from 'react-redux'
import { alpacaApiConnect } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'

process.env.REACT_APP_ALPACA_VISIBILITY = 'true'

const mockAlpaca = new MockAdapter(alpacaApiConnect)

const initialState = {
   brokers: {
      brokerConnected: 'Alpaca',
      balance: 0,
      accountType: ['PAPER'],
      a1c_t: '',
      accountTypeSelect: 'PAPER',
      buyingPower: 10000,
   },
}
const mockStore = configureStore()
const store = mockStore(initialState)

test('renders Buying Power Page', () => {
   const resp = {
      data: {
         id: '90c79b54-d423-498d-99ff-9aca6e482d69',
         account_number: 'PA3LAA0J2GIL',
         status: 'ACTIVE',
         crypto_status: 'ACTIVE',
         currency: 'USD',
         buying_power: '199148.4',
         regt_buying_power: '199148.4',
         daytrading_buying_power: '0',
         non_marginable_buying_power: '99216.7',
         cash: '99216.7',
         accrued_fees: '0',
         pending_transfer_in: '0',
         portfolio_value: '99931.7',
         pattern_day_trader: false,
         trading_blocked: false,
         transfers_blocked: false,
         account_blocked: false,
         created_at: '2022-01-21T14:37:49.518386Z',
         trade_suspended_by_user: false,
         multiplier: '2',
         shorting_enabled: true,
         equity: '99931.7',
         last_equity: '99956.5',
         long_market_value: '715',
         short_market_value: '0',
         initial_margin: '357.5',
         maintenance_margin: '214.5',
         last_maintenance_margin: '221.94',
         sma: '99960.25',
         daytrade_count: 0,
      },
      status: 200,
      statusText: 'OK',
      headers: {
         'content-length': '790',
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
            Authorization: 'Bearer 88352ca3-b340-43df-8ab0-daeb76b5f443',
         },
         method: 'get',
         url: 'https://paper-api.alpaca.markets/v2/account',
      },
      request: {},
   }

   mockAlpaca.onGet('account').reply(200, resp)

   const { container } = render(
      <Provider store={store}>
         <AlpacaBuyingPower />
      </Provider>
   )
   const linkElement = screen.getByText(/Buying Power/i)
   expect(linkElement).toBeInTheDocument()
   expect(container).toMatchSnapshot()
})

test('renders Buying Power Page fail API', () => {
   const err = new Error('Wrong inputs passed in')
   mockAlpaca.onGet('account').reply(200, err)

   const { container } = render(
      <Provider store={store}>
         <AlpacaBuyingPower />
      </Provider>
   )
   const linkElement = screen.getByText(/Buying Power/i)
   expect(linkElement).toBeInTheDocument()
})
