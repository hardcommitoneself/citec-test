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
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PortfolioAnalysis } from 'pages/portfolio-analisys'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'

// intercept the useAuth0 function and mock it
jest.mock('@auth0/auth0-react', () => ({
   Auth0Provider: ({ children }: { children: ReactNode }) => children,
   withAuthenticationRequired: (component: unknown) => component,
   useAuth0: () => {
      return {
         isLoading: false,
         user: { sub: 'foobar' },
         isAuthenticated: true,
         loginWithRedirect: jest.fn(),
      }
   },
}))

describe('Portfolio Analysis Page', () => {
   const mockStore = configureStore()
   let store

   test('Render page', () => {
      store = mockStore(exampleReduxState)

      const { container } = render(
         <Provider store={store}>
            <BrowserRouter>
               <PortfolioAnalysis />
            </BrowserRouter>
         </Provider>
      )
      expect(container).toMatchSnapshot()
   })
})
