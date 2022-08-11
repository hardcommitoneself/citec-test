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
import { act } from '@testing-library/react'
import { render } from 'enzyme'

import { buildDataIdeas } from 'features/ideas/positions'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import App from 'pages/app'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

process.env.REACT_APP_ACTIVATE_SUBSCRIPTIONS = 'true'

const mockBuildDataIdeas = buildDataIdeas as jest.MockedFunction<
   typeof buildDataIdeas
>
jest.mock('features/ideas/positions')

// intercept the useAuth0 function and mock it
jest.mock('@auth0/auth0-react', () => ({
   ...jest.requireActual('@auth0/auth0-react'),
   Auth0Provider: ({ children }: { children: any }) => children,
   withAuthenticationRequired: (component: any) => component,
   useAuth0: () => {
      return {
         isLoading: false,
         user: {
            email: 'rafael_pastor@citecsolutions.com',
            email_verified: true,
            'https://citecsolutions.com/timestamp_expiration_date': 1651094578,
            name: 'rafael_pastor@citecsolutions.com',
            nickname: 'rafael_pastor',
            picture:
               'https://s.gravatar.com/avatar/52b2841a69982ced167b888390a6f4a7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fra.png',
            sub: 'auth0|6228c1e31175d70069b9e7b7',
            updated_at: '2022-07-25T10:43:13.389Z',
         },
         isAuthenticated: true,
         loginWithRedirect: jest.fn(),
      }
   },
}))

const mockStore = configureStore()
const store = mockStore(exampleReduxState)

act(() => {
   mockBuildDataIdeas.mockReturnValue({
      benchmark: 'SPY',
      columnName: 'Omar portfolio',
      creation_date: '2022-06-24 11:37:20',
      investment: 50000.00000000002,
      portfolio: 'Omar portfolio',
      portfolio_id: 26,
      subRows: [
         {
            creation_date: '2022-06-24 11:37:20',
            investment: 3124.03,
            portfolio: 'DIS',
            portfolio_id: 26,
            subRows: undefined,
         },
      ],
   } as never)
})

test('renders Home page', () => {
   const wrapper = render(
      <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>
   )

   expect(wrapper.text().includes('Home')).toBeTruthy()
   expect(wrapper).toMatchSnapshot()
})
