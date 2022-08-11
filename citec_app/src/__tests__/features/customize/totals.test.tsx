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
import { TotalsUniverse } from 'features/customize'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const totals = {
   number_stocks: 505,
   market_cap: 38135686.86999999,
   pe: 30,
   pb: 7,
   dividend_yield: 2.031125,
}
const mockStore = configureStore()
const store = mockStore()

test('test Totals Universe screening', () => {
   const { container } = render(
      <Provider store={store}>
         <TotalsUniverse totals={totals} />
      </Provider>
   )
   const linkElement = screen.getByText(/505/i)
   expect(linkElement).toBeInTheDocument()
   expect(container).toMatchSnapshot()
})
