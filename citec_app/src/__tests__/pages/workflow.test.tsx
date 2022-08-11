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
import { Workflow } from 'pages'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

describe('test at Workflow page', () => {
   const initialState = {
      workflow: {
         type: 'load',
      },
   }
   const mockStore = configureStore()
   const store = mockStore(initialState)

   test('should render page', () => {
      const { container } = render(
         <Provider store={store}>
            <BrowserRouter>
               <Workflow />
            </BrowserRouter>
         </Provider>
      )
      expect(container.getElementsByClassName('PortfolioCreate')).toBeDefined()
      expect(container).toMatchSnapshot()
   })

   test('click Create New', () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <BrowserRouter>
               <Workflow />
            </BrowserRouter>
         </Provider>
      )

      fireEvent.click(getByTestId('label-create-new-portfolio'))
   })

   test('click Uplado', () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <BrowserRouter>
               <Workflow />
            </BrowserRouter>
         </Provider>
      )

      fireEvent.click(getByTestId('label-upload-portfolio'))
   })
})
