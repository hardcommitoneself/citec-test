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
import { OverviewTab } from 'features/portfolio-analisys/tabs'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { BrowserRouter } from 'react-router-dom'
import { dataTest } from '__tests__/features/rebalance/backtest/dataTest'

jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})
describe('Portfolio Analysis tab OverView', () => {
   test('renders Portfolio Analysis page', () => {
      const mockStore = configureStore()

      const store = mockStore(exampleReduxState)

      const { container } = render(
         <Provider store={store}>
            <BrowserRouter>
               <OverviewTab backtest={dataTest as never} />
            </BrowserRouter>
         </Provider>
      )
      expect(container).toMatchSnapshot()
   })
})

describe('Portfolio Analysis tab OverView SWAL', () => {
   test('calls Swal Sector', () => {
      const mockStore = configureStore()

      const store = mockStore(exampleReduxState)

      const { getByTestId } = render(
         <Provider store={store}>
            <BrowserRouter>
               <OverviewTab backtest={dataTest as never} />
            </BrowserRouter>
         </Provider>
      )

      const button = getByTestId('sector-test')
      expect(button).toBeTruthy()
   })
})
