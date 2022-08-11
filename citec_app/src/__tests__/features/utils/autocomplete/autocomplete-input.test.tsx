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
import { AutocompleteInput } from 'features/utils/autocomplete'
import { useFetchApi } from 'features/utils/hooks'

const mockUseFetchApi = useFetchApi as jest.MockedFunction<typeof useFetchApi>
jest.mock('features/utils/hooks/use-fetch-api')

describe('test at AutocompleteInput component', () => {
   const allTickers = [
      { name: 'Tesla', ticker: 'TSLA' },
      { name: 'Apple', ticker: 'AAPL' },
   ]

   beforeEach(() => {
      mockUseFetchApi.mockReturnValue({
         resp: allTickers,
         isLoading: false,
         error: '',
      })

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      Element.prototype.scrollTo = () => {}
   })

   const mockOnChange = jest.fn()

   test('should match snapshot', () => {
      const { container } = render(
         <AutocompleteInput
            error={false}
            name="ticker"
            onChangeValue={mockOnChange}
            value="TSLA"
         />
      )
      expect(container).toMatchSnapshot()
   })

   test('should call onChangeFunction', () => {
      const { getByTestId } = render(
         <AutocompleteInput
            error={false}
            name="ticker"
            onChangeValue={mockOnChange}
            value="TSLA"
         />
      )

      const buttonTsla = getByTestId('button-TSLA')

      fireEvent.click(buttonTsla)

      expect(mockOnChange).toBeCalled()
      expect(mockOnChange).toBeCalledTimes(1)
      expect(buttonTsla).toBeDefined()
   })

   test('should call onChangeFunction on keyEnter value', () => {
      const { getByRole } = render(
         <AutocompleteInput
            error={false}
            name="ticker"
            onChangeValue={mockOnChange}
            value="TSLA"
         />
      )

      const input = getByRole('textbox')

      fireEvent.keyDown(input, { key: 'ArrowDown' })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(mockOnChange).toBeCalled()
   })

   test('should not call onChangeFunction on keydown value', () => {
      const { getByRole } = render(
         <AutocompleteInput
            error={false}
            name="ticker"
            onChangeValue={mockOnChange}
            value="TSLA"
         />
      )
      const input = getByRole('textbox')

      fireEvent.keyDown(input, { key: 'ArrowDown' })
      fireEvent.keyDown(input, { key: 'ArrowDown' })

      expect(mockOnChange).not.toBeCalled()
   })
})
