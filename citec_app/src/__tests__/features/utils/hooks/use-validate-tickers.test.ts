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
import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { citecApi } from 'features/utils/api/citec-api'

import { useValidateTickers } from 'features/utils/hooks'

describe('test at useValidateTickers hook', () => {
   const mock = new MockAdapter(citecApi)

   test('should return valid tickers', async () => {
      const validTickers = ['AAPL', 'TSLA']
      mock.onPost('/ai/assets/stocks_summary/', validTickers).reply(200, [
         {
            ticker: 'AAPL',
            asset_type: 'Common Stock',
            status: 'OK',
         },
         {
            ticker: 'TSLA',
            asset_type: 'Common Stock',
            status: 'OK',
         },
      ])

      const { result, waitForNextUpdate } = renderHook(() =>
         useValidateTickers(validTickers)
      )

      await waitForNextUpdate()

      expect(result.current.isSomeInvalidTicker).toBeFalsy()
   })
   test('should return invalid tickers', async () => {
      const validTickers = ['AAPL', 'TSLA1111']
      mock.onPost('/ai/assets/stocks_summary/', validTickers).reply(200, [
         {
            ticker: 'AAPL',
            asset_type: 'Common Stock',
            status: 'OK',
         },
         {
            ticker: 'TSLA1111',
            asset_type: 'Common Stock',
            name: 'missing',
         },
      ])

      const { result, waitForNextUpdate } = renderHook(() =>
         useValidateTickers(validTickers)
      )

      await waitForNextUpdate()

      expect(result.current.isSomeInvalidTicker).toBeTruthy()
      expect(result.current.invalidTickers).toBeDefined()
      expect(result.current.invalidTickers).toEqual(['TSLA1111'])
   })
})
