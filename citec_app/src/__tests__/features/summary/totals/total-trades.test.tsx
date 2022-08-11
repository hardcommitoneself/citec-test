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
import { BrowserRouter } from 'react-router-dom'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { TotalTrades } from 'features/summary/totals'

jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})

describe('test in Backtest tab', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   test('match snapshot', () => {
      const wrapper = mount(
         <Provider store={store}>
            <BrowserRouter>
               <TotalTrades />
            </BrowserRouter>
         </Provider>
      )
      expect(wrapper).toMatchSnapshot()
   })

   it('click on information icons', () => {
      const component = mount(
         <Provider store={store}>
            <BrowserRouter>
               <TotalTrades />
            </BrowserRouter>
         </Provider>
      )
      component
         .find({ 'data-testid': 'info-summary-trades-realized-gains' })
         .simulate('click')
   })
})
