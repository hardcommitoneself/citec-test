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
import { ListSuggestions } from 'features/utils/autocomplete'

describe('test at ListSuggestion component', () => {
   const mockTickers = [
      { name: 'Tesla', ticker: 'TSLA' },
      { name: 'Apple', ticker: 'AAPL' },
   ]

   const mockHandleSelectValue = jest.fn()
   const mockHandleOverList = jest.fn()

   beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      Element.prototype.scrollTo = () => {}
   })

   test('should match snapshot', () => {
      const { container } = render(
         <ListSuggestions
            isLoading={false}
            renderSuggestions={true}
            allTickers={mockTickers as never}
            handleSelectValue={mockHandleSelectValue}
            handleOverList={mockHandleOverList}
            suggestionIndex={0}
         />
      )

      expect(container).toMatchSnapshot()
   })

   test('should render No tickers found if allTicker is []', () => {
      const { getByTestId } = render(
         <ListSuggestions
            isLoading={false}
            renderSuggestions={true}
            allTickers={[]}
            handleSelectValue={mockHandleSelectValue}
            handleOverList={mockHandleOverList}
            suggestionIndex={0}
         />
      )

      const textNotFound = getByTestId('not-found')

      expect(textNotFound).toBeDefined()
   })

   test('should render Please type the ticker if allTicker is null', () => {
      const { getByTestId } = render(
         <ListSuggestions
            isLoading={false}
            renderSuggestions={true}
            allTickers={null}
            handleSelectValue={mockHandleSelectValue}
            handleOverList={mockHandleOverList}
            suggestionIndex={0}
         />
      )

      const textTypeTicker = getByTestId('type-ticker')

      expect(textTypeTicker).toBeDefined()
   })

   test('should call mockHandleSelectValue when selec ticker', () => {
      const { getByTestId } = render(
         <ListSuggestions
            isLoading={false}
            renderSuggestions={true}
            allTickers={mockTickers as never}
            handleSelectValue={mockHandleSelectValue}
            handleOverList={mockHandleOverList}
            suggestionIndex={0}
         />
      )

      const buttonTsla = getByTestId('button-TSLA')

      fireEvent.click(buttonTsla)

      expect(mockHandleSelectValue).toBeCalled()
      expect(mockHandleSelectValue).toBeCalledTimes(1)
      expect(buttonTsla).toBeDefined()
   })
   test('should render loading indicator', () => {
      const { getByTestId } = render(
         <ListSuggestions
            isLoading={true}
            renderSuggestions={true}
            allTickers={[]}
            handleSelectValue={mockHandleSelectValue}
            handleOverList={mockHandleOverList}
            suggestionIndex={0}
         />
      )

      const loadingIndicator = getByTestId('loading')

      expect(loadingIndicator).toBeDefined()
   })
})
