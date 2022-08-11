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
import { fireEvent, render, screen } from '@testing-library/react'
import { Tickers } from 'features/customize'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { useValidateTicker } from 'features/utils/hooks/use-validate-ticker'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockUseValidateTicker = useValidateTicker as jest.MockedFunction<
   typeof useValidateTicker
>
jest.mock('features/utils/hooks/use-validate-ticker')

const mockedUseDispatch = jest.fn()

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => mockedUseDispatch,
}))

describe('test at Tickers form', () => {
   beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      Element.prototype.scrollTo = () => {}
      mockUseValidateTicker.mockReturnValue(true)
   })

   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   test('should change input value, submit form and delete ticker', () => {
      render(
         <Provider store={store}>
            <Tickers type="Exclude" />
         </Provider>
      )

      const input = screen.getByRole('textbox')
      const submitButton = screen.getByTestId('submit-ticker')

      fireEvent.input(input, { target: { value: 'TSLA' } })

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(input.value).toBe('TSLA')

      fireEvent.click(submitButton)

      expect(mockedUseDispatch).toBeCalled()
   })

   test('should change input value, submit form and delete ticker at include', () => {
      render(
         <Provider store={store}>
            <Tickers type="Include" />
         </Provider>
      )

      const input = screen.getByRole('textbox')
      const submitButton = screen.getByTestId('submit-ticker')

      fireEvent.input(input, { target: { value: 'TSLA' } })

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(input.value).toBe('TSLA')

      fireEvent.click(submitButton)

      expect(mockedUseDispatch).toBeCalled()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(input.value).toBe('')
   })

   test('should call useDispatch on delete ticker', () => {
      const store = mockStore({
         ...exampleReduxState,
         universe: {
            ...exampleReduxState.universe,
            to_exclude: ['AAPL'],
         },
      })

      render(
         <Provider store={store}>
            <Tickers type="Exclude" />
         </Provider>
      )
      const deleteButton = screen.getByTestId('delete-ticker')

      fireEvent.click(deleteButton)

      expect(mockedUseDispatch).toBeCalled()
   })

   test('should show is invalid ticker', () => {
      mockUseValidateTicker.mockReturnValue(false)

      render(
         <Provider store={store}>
            <Tickers type="Exclude" />
         </Provider>
      )

      const input = screen.getByRole('textbox')
      fireEvent.input(input, { target: { value: '467' } })

      const alertInvalid = screen.getByTestId('alert-invalid')

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(input.value).toBe('467')
      expect(alertInvalid).toBeDefined()
   })
})
