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
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Profile } from 'pages'

// intercept the useAuth0 function and mock it
jest.mock('@auth0/auth0-react', () => ({
   Auth0Provider: ({ children }: any) => children,
   withAuthenticationRequired: (component: any) => component,
   useAuth0: () => {
      return {
         isLoading: false,
         user: { sub: 'foobar' },
         isAuthenticated: true,
         loginWithRedirect: jest.fn(),
      }
   },
}))

const initialState = {
   workflow: {
      path: '/profile',
   },
   static_data: {
      universe: {
         universes: [
            {
               name: 'SPDR S&P 500',
               description: 'SPDR S&P 500',
               number_stocks: 499,
               market_cap: 40844915.05,
               pe: 36,
               pb: 8,
               dividend_yield: 0.761479,
            },
         ],
         sectors: [],
      },
   },
}
const mockStore = configureStore()
const store = mockStore(initialState)

describe('test at profile page', () => {
   test('Load Content page Login', async () => {
      render(
         <Provider store={store}>
            <BrowserRouter>
               <Profile />
            </BrowserRouter>
         </Provider>
      )
      expect(screen.getByTestId('boxLoginContent')).toBeInTheDocument()
   })
})
