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

import { act, renderHook } from '@testing-library/react-hooks'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { useAppNavigate } from 'features/utils/hooks/use-app-navigate'
import { useFetchApi } from 'features/utils/hooks/use-fetch-api'
import { useHandlerMyIdeasTable } from 'features/utils/hooks/use-handler-my-ideas-table'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { setWorkflow } from 'store/slices/workflow'

const mockUseFetchApi = useFetchApi as jest.MockedFunction<typeof useFetchApi>
jest.mock('features/utils/hooks/use-fetch-api')

const mockUseAppNavigate = useAppNavigate as jest.MockedFunction<
   typeof useAppNavigate
>
jest.mock('features/utils/hooks/use-app-navigate')

const mockedUseDispatch = jest.fn()

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => mockedUseDispatch,
}))

describe('test at useHandlerMyIdeasTable', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter>
         <Provider store={store}>{children}</Provider>
      </MemoryRouter>
   )

   const mockedReps = [
      {
         ticker: 'VZ',
         status: 'OK',
         isin: 'US92343V1044',
         figi: 'BBG000HS77T5',
         name: 'Verizon Communications Inc',
         ipo: '1984-02-15',
         sector: 'Communication Services',
         url_morningstar: 'https://www.morningstar.com/stocks/xnys/VZ/quote',
         url_company: 'https://www.verizon.com/',
         url_logo:
            'https://static.finnhub.io/logo/9b7ee55a-80ec-11ea-bc1f-00000000092a.png',
         outstanding_balance: 0,
         unrealized_capital_gains: 0,
      },
   ]

   const mockedIdea = [
      {
         id: '0.0',
         original: {
            portfolio_id: 105,
            portfolio: 'VZ',
            benchmark: 'SPY',
            investment: 23369.4,
            unrealized_capital_gains: 0,
            creation_date: '2022-07-27 15:56:20',
            columnName: {
               ticker: 'VZ',
               status: 'OK',
               isin: 'US92343V1044',
               figi: 'BBG000HS77T5',
               name: 'Verizon Communications Inc',
               ipo: '1984-02-15',
               sector: 'Communication Services',
               url_morningstar: 'https://www.morningstar.com/stocks/xnys/VZ/quote',
               url_company: 'https://www.verizon.com/',
               url_logo:
                  'https://static.finnhub.io/logo/9b7ee55a-80ec-11ea-bc1f-00000000092a.png',
               outstanding_balance: 0,
               unrealized_capital_gains: 0,
            },
         },
         index: 0,
         depth: 1,
         cells: [{}],
         values: {
            columnName: {
               ticker: 'VZ',
               status: 'OK',
               isin: 'US92343V1044',
               figi: 'BBG000HS77T5',
               name: 'Verizon Communications Inc',
               ipo: '1984-02-15',
               sector: 'Communication Services',
               url_morningstar: 'https://www.morningstar.com/stocks/xnys/VZ/quote',
               url_company: 'https://www.verizon.com/',
               url_logo:
                  'https://static.finnhub.io/logo/9b7ee55a-80ec-11ea-bc1f-00000000092a.png',
               outstanding_balance: 0,
               unrealized_capital_gains: 0,
            },
            benchmark: 'SPY',
            investment: 23369.4,
            creation_date: '2022-07-27 15:56:20',
         },
         originalSubRows: [],
         subRows: [],
      },
   ]

   beforeEach(() => {
      mockUseFetchApi.mockReturnValue({
         resp: mockedReps,
         isLoading: false,
         error: '',
      })

      mockUseAppNavigate.mockReturnValue(jest.fn())
   })

   test('should call useDispatch and useNavigate', () => {
      const { result } = renderHook(() => useHandlerMyIdeasTable(), { wrapper })

      act(() => {
         result.current.loadIdeaOnRedux({
            benchmark: 'SPY',
            flow: 'analysis',
            row: mockedIdea,
         })
      })

      expect(mockUseAppNavigate).toBeCalled()
      expect(mockUseAppNavigate).toBeCalledTimes(2)
      expect(mockedUseDispatch).toBeCalled()
      expect(mockedUseDispatch).toBeCalledTimes(5)
   })
})
