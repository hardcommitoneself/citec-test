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
import { TradeAlpaca } from 'features/brokers/alpaca/utils/trade-alpaca'
import MockAdapter from 'axios-mock-adapter'

const mockAlpaca = new MockAdapter(alpacaApiConnect)

describe('test in TradeAlpaca', () => {
   test('TradeAlpaca', async () => {
      const respmoc = {
         id: 'c9e7caa8-ab2e-476f-b497-7417c9a14b96',
         client_order_id: '94f78e9a-6097-4f4a-9205-dace9457740c',
         created_at: '2022-06-17T03:02:00.802776533Z',
         updated_at: '2022-06-17T03:02:00.802776533Z',
         submitted_at: '2022-06-17T03:02:00.798886783Z',
         filled_at: null,
         expired_at: null,
         canceled_at: null,
         failed_at: null,
         replaced_at: null,
         replaced_by: null,
         replaces: null,
         asset_id: '69b15845-7c63-4586-b274-1cfdfe9df3d8',
         symbol: 'GOOGL',
         asset_class: 'us_equity',
         notional: null,
         qty: '1',
         filled_qty: '0',
         filled_avg_price: null,
         order_class: '',
         order_type: 'market',
         type: 'market',
         side: 'buy',
         time_in_force: 'ioc',
         limit_price: null,
         stop_price: null,
         status: 'accepted',
         extended_hours: false,
         legs: null,
         trail_percent: null,
         trail_price: null,
         hwm: null,
         subtag: null,
         source: null,
      }

      mockAlpaca
         .onPost('orders', {
            symbol: 'WMT',
            qty: 1,
            side: 'buy',
            type: 'market',
            time_in_force: 'day',
         })
         .reply(200, respmoc)

      const res = await TradeAlpaca('PAPER', {
         symbol: 'WMT',
         qty: 0,
         side: 'buy',
         type: 'market',
         time_in_force: 'ioc',
      })

      console.log(res)
      //expect(res).toEqual(resp)
   })
})
