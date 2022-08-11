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
import { alpacaApiConnect } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'
import { PositionAlpaca } from 'features/brokers/alpaca/utils/position-alpaca'
import MockAdapter from 'axios-mock-adapter'

const mockAlpaca = new MockAdapter(alpacaApiConnect)

describe('test in Position Alpaca', () => {
   test('usePositionAlpaca', async () => {
      const arg = {
         data: [
            {
               asset_id: 'b0b6dd9d-8b9b-48a9-ba46-b9d54906e415',
               symbol: 'AAPL',
               exchange: 'NASDAQ',
               asset_class: 'us_equity',
               asset_marginable: true,
               qty: '5',
               avg_entry_price: '156.89',
               side: 'long',
               market_value: '730.75',
               cost_basis: '784.45',
               unrealized_pl: '-53.7',
               unrealized_plpc: '-0.0684556058384856',
               unrealized_intraday_pl: '-9.05',
               unrealized_intraday_plpc: '-0.0122330359556637',
               current_price: '146.15',
               lastday_price: '147.96',
               change_today: '-0.0122330359556637',
               qty_available: '5',
            },
         ],
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '489',
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
               Authorization: 'Bearer b6e6a91c-825e-4025-95c5-49fa1a2b97c5',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/positions',
         },
         request: {},
      }

      const resp = {
         data: [
            {
               asset_id: 'b0b6dd9d-8b9b-48a9-ba46-b9d54906e415',
               symbol: 'AAPL',
               exchange: 'NASDAQ',
               asset_class: 'us_equity',
               asset_marginable: true,
               qty: '5',
               avg_entry_price: '156.89',
               side: 'long',
               market_value: '730.75',
               cost_basis: '784.45',
               unrealized_pl: '-53.7',
               unrealized_plpc: '-0.0684556058384856',
               unrealized_intraday_pl: '-9.05',
               unrealized_intraday_plpc: '-0.0122330359556637',
               current_price: '146.15',
               lastday_price: '147.96',
               change_today: '-0.0122330359556637',
               qty_available: '5',
            },
         ],
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '489',
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
               Authorization: 'Bearer b6e6a91c-825e-4025-95c5-49fa1a2b97c5',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/positions',
         },
         request: {},
      }

      mockAlpaca.onGet('positions').reply(200, arg)
      const positions = await PositionAlpaca('PAPER')
      expect(positions).toEqual(resp)
   })
})
