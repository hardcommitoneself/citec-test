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

import { render, fireEvent, screen } from '@testing-library/react'
import { ButtonChangeBenchmark } from 'features/portfolio-loader'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
// import { useSelectUniverse } from 'features/utils/hooks/use-select-universe'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockHandleSelectBenchmark = jest.fn()

jest.mock('features/utils/hooks/use-select-universe', () => ({
   ...jest.requireActual('features/utils/hooks/use-select-universe'),
   handleSelectBenckmark: () => mockHandleSelectBenchmark,
}))

describe('test at ButtonChangeBenchmark ', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   test('should render popup and close', () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <ButtonChangeBenchmark />
         </Provider>
      )

      fireEvent.click(getByTestId('edit-benchmark'))

      const cancelButton = screen.getByText('Cancel')
      const titleModal = screen.getByText('Select benchmark')

      expect(titleModal).toBeDefined()

      fireEvent.click(cancelButton)

      expect(titleModal).toBeDefined()
   })

   test('should not call dispatch actions if not are a benchmark selected', async () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <ButtonChangeBenchmark />
         </Provider>
      )

      fireEvent.click(getByTestId('edit-benchmark'))

      const saveButton = screen.getByText('Save')

      fireEvent.click(saveButton)

      expect(mockHandleSelectBenchmark).not.toBeCalled()
   })
})
