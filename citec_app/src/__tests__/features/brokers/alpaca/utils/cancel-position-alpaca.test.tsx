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
import { cancelPosition } from 'features/brokers/alpaca/utils/cancel-position-alpaca'
import MockAdapter from 'axios-mock-adapter'

const mockAlpaca = new MockAdapter(alpacaApiConnect)

describe('test in TradeAlpaca', () => {
   test('TradeAlpaca', async () => {
      const respmoc = {
         id: 'fcba8fc9-f2b8-4d09-9e0f-74e71db0f46e',
         client_order_id: '487cf084-b842-417d-9cd9-e4eb01d72d19',
         created_at: '2022-06-17T15:00:56.686588697Z',
         updated_at: '2022-06-17T15:00:56.686670177Z',
         submitted_at: '2022-06-17T15:00:56.686117397Z',
         filled_at: null,
         expired_at: null,
         canceled_at: null,
         failed_at: null,
         replaced_at: null,
         replaced_by: null,
         replaces: null,
         asset_id: '3a64306e-4a77-4a06-8458-15a8bfd31f55',
         symbol: 'VTI',
         asset_class: 'us_equity',
         notional: null,
         qty: '1',
         filled_qty: '0',
         filled_avg_price: null,
         order_class: '',
         order_type: 'market',
         type: 'market',
         side: 'sell',
         time_in_force: 'day',
         limit_price: null,
         stop_price: null,
         status: 'pending_new',
         extended_hours: false,
         legs: null,
         trail_percent: null,
         trail_price: null,
         hwm: null,
         subtag: null,
         source: null,
      }

      mockAlpaca.onDelete('orders/VTI').reply(200, respmoc)

      const res = await cancelPosition('PAPER', 'VTI')

      console.log(res)
      //expect(res).toEqual(resp)
   })
})
