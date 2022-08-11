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

import { getRelabanceData, getUniverseData } from 'store/slices/static-data/thunk'
import MockAdapter from 'axios-mock-adapter'
import { citecApi } from 'features/utils/api/citec-api'

const mock = new MockAdapter(citecApi)

const mockResponse = {
   universes: [
      {
         name: 'INVESCO QQQ TRUST SERIES 1',
         description: 'INVESCO QQQ TRUST SERIES 1',
      },
      {
         name: 'ISHARES MSCI USA ESG SELECT',
         description: 'ISHARES MSCI USA ESG SELECT',
      },
   ],
   sectors: [
      'Cash',
      'Communication Services',
      'Consumer Discretionary',
      'Consumer Staples',
   ],
   factors: ['style', 'size', 'yield', 'quality'],
   benchmarks: [
      {
         key: 'sp_500',
         description: 'S&P 500 universe',
         ticker: 'SPY',
      },
      {
         key: 'nasdaq_100',
         description: 'NASDAQ 100',
         ticker: 'QQQ',
      },
   ],
   objectives: [
      {
         key: 'min_tracking_error',
         name: 'Minimize tracking error',
      },
      {
         key: 'min_risk_parity',
         name: 'Minimize risk parity',
      },
   ],
}

describe('test in thunk static data', () => {
   test('should return data in getUniverseData()', async () => {
      mock.onGet('/settings/universe_bases/').reply(200, [
         {
            name: 'INVESCO QQQ TRUST SERIES 1',
            description: 'INVESCO QQQ TRUST SERIES 1',
         },
         {
            name: 'ISHARES MSCI USA ESG SELECT',
            description: 'ISHARES MSCI USA ESG SELECT',
         },
      ])
      mock
         .onGet('/settings/sectors/')
         .reply(200, [
            'Cash',
            'Communication Services',
            'Consumer Discretionary',
            'Consumer Staples',
         ])
      mock
         .onGet('/settings/factors/')
         .reply(200, ['style', 'size', 'yield', 'quality'])

      const response = await getUniverseData()

      expect(response.universes).toEqual(mockResponse.universes)
      expect(response.factors).toEqual(mockResponse.factors)
      expect(response.sectors).toEqual(mockResponse.sectors)
   })

   test('should return data in getRelabanceData()', async () => {
      mock.onGet('/settings/benchmarks/').reply(200, [
         {
            key: 'sp_500',
            description: 'S&P 500 universe',
            ticker: 'SPY',
         },
         {
            key: 'nasdaq_100',
            description: 'NASDAQ 100',
            ticker: 'QQQ',
         },
      ])
      mock.onGet('/settings/portfolio_objectives/').reply(200, [
         {
            key: 'min_tracking_error',
            name: 'Minimize tracking error',
         },
         {
            key: 'min_risk_parity',
            name: 'Minimize risk parity',
         },
      ])

      const response = await getRelabanceData()

      expect(response.benchmarks).toEqual(mockResponse.benchmarks)
      expect(response.objectives).toEqual(mockResponse.objectives)
   })
})
