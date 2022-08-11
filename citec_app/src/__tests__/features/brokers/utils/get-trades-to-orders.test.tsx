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
import { getTradesToOrders } from 'features/brokers/utils/get-trades-to-orders'
import { fetchDataFromCitecApi } from 'features/utils/api/citec-api'

jest.mock('features/utils/api/citec-api')

describe('Test on GetTradesToOrders', () => {
   const trades = [
      {
         ticker: 'AAPL',
         operation: 'SELL',
         volume: 132.18,
         realized_capital_gains: -0.01,
         unrealized_capital_gains: 0,
         stocks_number: null,
      },
      {
         ticker: 'TSLA',
         operation: 'SELL',
         volume: 653.23,
         realized_capital_gains: 6.23,
         unrealized_capital_gains: 0,
         stocks_number: null,
      },
      {
         ticker: 'WMT',
         operation: 'BUY',
         volume: 162.57,
         realized_capital_gains: 0,
         unrealized_capital_gains: 0,
         stocks_number: null,
      },
   ]

   const latest_prices = [
      {
         ticker: 'AAPL',
         price: 132.27,
      },
      {
         ticker: 'TSLA',
         price: 652.5801,
      },
      {
         ticker: 'WMT',
         price: 118.6536,
      },
   ]

   it('makes the api call successfully', async () => {
      fetchDataFromCitecApi.mockResolvedValue()
      await getTradesToOrders({
         trades: trades,
         latest_prices: latest_prices,
      })

      expect(fetchDataFromCitecApi).toHaveBeenCalledWith({
         endpoint: 'ai/portfolio/trades_to_orders',
         method: 'POST',
         payload: JSON.stringify({
            trades: trades,
            latest_prices: latest_prices,
         }),
      })
   })
})
