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
import { useValidateNumberStocks } from 'features/utils/hooks'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

const mockedUseDispatch = jest.fn()

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => mockedUseDispatch,
}))

describe('test at useValidateNumberStocks hook', () => {
   const mockStore = configureStore()

   const initialState = {
      rebalance: {
         ticker: ['$CASH'],
         number_stocks: [10, 200],
      },
      portfolio: {
         outstanding_balance: [9000],
      },
   }

   const store = mockStore(initialState)

   const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter>
         <Provider store={store}>{children}</Provider>
      </MemoryRouter>
   )

   test('should return invalid positions ', () => {
      const { result } = renderHook(() => useValidateNumberStocks(), { wrapper })

      act(() => {
         result.current.checkValidStocks()
      })

      expect(result.current.isValidPortfolio).toBeFalsy()
      expect(mockedUseDispatch).toBeCalledTimes(1)
   })

   test('should return is valid positions with 80000 cash', () => {
      initialState.portfolio.outstanding_balance = [80000]

      const { result } = renderHook(() => useValidateNumberStocks(), { wrapper })

      act(() => {
         result.current.checkValidStocks()
      })

      expect(result.current.isValidPortfolio).toBeTruthy()
      expect(mockedUseDispatch).toBeCalledTimes(1)
   })

   test('should return is valid positions with 45000', () => {
      initialState.portfolio.outstanding_balance = [45000]

      const { result } = renderHook(() => useValidateNumberStocks(), { wrapper })
      act(() => {
         result.current.checkValidStocks()
      })

      expect(result.current.isValidPortfolio).toBeTruthy()
      expect(mockedUseDispatch).toBeCalledTimes(1)
   })

   test('should return is valid positions with 200000 cash', () => {
      initialState.portfolio.outstanding_balance = [200000]

      const { result } = renderHook(() => useValidateNumberStocks(), { wrapper })

      act(() => {
         result.current.checkValidStocks()
      })

      expect(result.current.isValidPortfolio).toBeTruthy()
      expect(mockedUseDispatch).toBeCalledTimes(1)
   })
})
