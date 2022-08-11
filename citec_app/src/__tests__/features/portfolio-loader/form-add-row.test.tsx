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
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react'
import { FormAddRow } from 'features/portfolio-loader'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { Provider } from 'react-redux'

describe('test at form add row test', () => {
   beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      Element.prototype.scrollTo = () => {}
   })

   const setExcelData = jest.fn()
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   test('Snapshot', () => {
      const { container } = render(
         <Provider store={store}>
            <FormAddRow setExcelData={setExcelData} />
         </Provider>
      )

      expect(container).toMatchSnapshot()
   })

   test('Button click in submit button', () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <FormAddRow setExcelData={setExcelData} />
         </Provider>
      )

      const button = getByTestId('btn-add-row')
      expect(button).not.toBeNull()
   })
})
