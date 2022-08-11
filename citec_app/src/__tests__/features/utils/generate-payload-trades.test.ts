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

import { generatePayloadTrades } from 'features/utils/generate-payload-trades'
import { fetchDataFromCitecApi } from 'features/utils/api/citec-api'

jest.mock('features/utils/api/citec-api')

describe('test at generatePayloadTrades func', () => {
   test('should return a valid value', () => {
      const payloadTrades = generatePayloadTrades()

      expect(payloadTrades).toBeDefined()
   })

   test('trades and latest_prices should be in payload', async () => {
      
      fetchDataFromCitecApi.mockResolvedValue()

      await generatePayloadTrades()

      expect(fetchDataFromCitecApi).toHaveBeenCalledTimes(1)
   })

})
