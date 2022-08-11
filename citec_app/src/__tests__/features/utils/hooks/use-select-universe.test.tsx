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
import { useSelectUniverse } from 'features/utils/hooks'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockedUseDispatch = jest.fn()

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => mockedUseDispatch,
}))

describe('test at useSelecUniverse hook', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   test('handleSelectUniverse should call 2 times useDispatch', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
         <Provider store={store}>{children}</Provider>
      )

      const { result } = renderHook(() => useSelectUniverse(), { wrapper })

      act(() => {
         result.current.handleSelectUniverse('SPY')
      })

      expect(mockedUseDispatch).toBeCalled()
   })

   test('handleSelectBenckmark should call 2 times useDispatch', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
       <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useSelectUniverse(), { wrapper })

    act(() => {
       result.current.handleSelectBenckmark('SPY')
    })

    expect(mockedUseDispatch).toBeCalled()
 })
})
