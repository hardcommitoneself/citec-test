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
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { store } from 'store'
import { BrowserRouter } from 'react-router-dom'
import { PortfolioLoader } from 'pages/portfolio-loader'

describe('Portfolio loader Page', () => {
   beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      Element.prototype.scrollTo = () => {}
   })

   test('Snapshot', () => {
      const { container } = render(
         <BrowserRouter>
            <Provider store={store}>
               <PortfolioLoader />
            </Provider>
         </BrowserRouter>
      )
      expect(container).toMatchSnapshot()
   })
})