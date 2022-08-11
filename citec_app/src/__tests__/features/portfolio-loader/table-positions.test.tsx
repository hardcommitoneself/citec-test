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
import { render, fireEvent } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { TablePositions } from 'features/portfolio-loader'

const excelData = [
   {
      outstanding_balance: 111,
      ticker: 'AAPL',
      unrealized_capital_gains: 5000,
   },
]

describe('test at table positios component', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   const setExcelData = jest.fn()

   beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      Element.prototype.scrollTo = () => {}
   })

   test('Snapshot', () => {
      const { container } = render(
         <Provider store={store}>
            <TablePositions excelData={excelData} setExcelData={setExcelData} />
         </Provider>
      )

      expect(container).toMatchSnapshot()
   })

   test('render table and simulate delete data', () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <TablePositions excelData={excelData} setExcelData={setExcelData} />
         </Provider>
      )

      fireEvent.click(getByTestId('btn-delete'))

      expect(setExcelData).toHaveBeenCalledTimes(1)
      expect(getByTestId('table-positions')).toBeTruthy()
      expect(getByTestId('btn-delete')).toBeTruthy()
   })
})
