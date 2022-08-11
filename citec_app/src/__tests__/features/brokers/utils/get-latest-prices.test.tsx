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
import { getLatestPrices } from 'features/brokers/utils/get-latest-prices'
import { fetchDataFromCitecApi } from 'features/utils/api/citec-api'

jest.mock('features/utils/api/citec-api')

describe('test in GetLatestPrices', () => {
   test('GetLatestPrices', async () => {
      const data = [
         'AAPL',
         'TSLA',
         'WMT',
         'BMY',
         'BDX',
         'JNJ',
         'GILD',
         'MO',
         'CHTR',
         'AMZN',
         'MMM',
         'KO',
         'T',
         'NFLX',
         'MDT',
         'XOM',
         'CMCSA',
      ]
      fetchDataFromCitecApi.mockResolvedValue()
      await getLatestPrices(data)
      expect(fetchDataFromCitecApi).toHaveBeenCalledWith({
         endpoint: 'ai/assets/latest_prices',
         method: 'POST',
         payload: JSON.stringify(data),
      })
   })
})
