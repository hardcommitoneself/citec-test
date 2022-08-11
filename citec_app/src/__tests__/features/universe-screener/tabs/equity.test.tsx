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

import { fireEvent, render } from '@testing-library/react'
import { Equity } from 'features/universe-screener/tabs'

import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import XLSX from 'xlsx'
import * as fetchDataFromCitecApiFactory from 'features/utils/api/citec-api'

describe('test at Equity tab', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   test('should call to XLSX functions to download file', () => {
      jest.resetAllMocks()
      const fetchDataFromCitecApiMock = jest.spyOn(
         fetchDataFromCitecApiFactory,
         'fetchDataFromCitecApi'
      )
      fetchDataFromCitecApiMock.mockReturnValue(
         Promise.resolve({
            status: 200,
            data: [
               {
                  ticker: 'TSLA',
                  asset_type: 'Common Stock',
                  exchange: 'XNAS',
                  status: 'OK',
                  isin: 'US88160R1014',
                  figi: 'BBG000N9MNX3',
                  name: 'TESLA INC',
                  ipo: '2010-06-09',
                  sector: 'Consumer Discretionary',
                  market_cap: 846451.0,
                  pe: 100.36,
                  pb: 25.41,
                  dividend_yield: 1.55,
                  url_morningstar:
                     'https://www.morningstar.com/stocks/xnas/TSLA/quote',
                  url_company: 'https://www.tesla.com/',
                  url_logo:
                     'https://static.finnhub.io/logo/2dd96524-80c9-11ea-aaac-00000000092a.png',
               },
            ],
            statusText: 'Ok',
            headers: {},
            config: {},
         })
      )

      jest.spyOn(XLSX.utils, 'json_to_sheet').mockReturnValue([
         {
            A2: { t: 's', v: 'TSLA' },
            B2: { t: 's', v: 'Common Stock' },
            C2: { t: 's', v: 'XNAS' },
            D2: { t: 's', v: 'OK' },
            E2: { t: 's', v: 'US88160R1014' },
            F2: { t: 's', v: 'BBG000N9MNX3' },
            G2: { t: 's', v: 'TESLA INC' },
            H2: { t: 's', v: '2010-06-09' },
            I2: { t: 's', v: 'Consumer Discretionary' },
            J2: { t: 'n', v: 846451 },
            K2: { t: 'n', v: 100.36 },
            L2: { t: 'n', v: 25.41 },
            M2: { t: 'n', v: 1.55 },
            N2: {
               t: 's',
               v: 'https://www.morningstar.com/stocks/xnas/TSLA/quote',
            },
            O2: { t: 's', v: 'https://www.tesla.com/' },
            P2: {
               t: 's',
               v: 'https://static.finnhub.io/logo/2dd96524-80c9-11ea-aaac-00000000092a.png',
            },
            A1: { t: 's', v: 'ticker' },
            B1: { t: 's', v: 'asset_type' },
            C1: { t: 's', v: 'exchange' },
            D1: { t: 's', v: 'status' },
            E1: { t: 's', v: 'isin' },
            F1: { t: 's', v: 'figi' },
            G1: { t: 's', v: 'name' },
            H1: { t: 's', v: 'ipo' },
            I1: { t: 's', v: 'sector' },
            J1: { t: 's', v: 'market_cap' },
            K1: { t: 's', v: 'pe' },
            L1: { t: 's', v: 'pb' },
            M1: { t: 's', v: 'dividend_yield' },
            N1: { t: 's', v: 'url_morningstar' },
            O1: { t: 's', v: 'url_company' },
            P1: { t: 's', v: 'url_logo' },
            '!ref': 'A1:P2',
         },
      ])

      const { getByTestId } = render(
         <Provider store={store}>
            <Equity />
         </Provider>
      )

      const donwloadButton = getByTestId('donwload-universe')

      expect(donwloadButton).toBeDefined()
      fireEvent.click(donwloadButton)
   })
})
