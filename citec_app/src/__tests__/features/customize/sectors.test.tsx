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
import { fireEvent, render, screen } from '@testing-library/react'
import { SectorsUniverse } from 'features/customize'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const initialState = {
   static_data: {
      universe: {
         sectors: [
            'Industrials',
            'Financials',
            'Health Care',
            'Consumer Staples',
            'Communication Services',
            'Information Technology',
            'Consumer Discretionary',
            'Materials',
            'Cash',
            'Real Estate',
            'Energy',
            'Utilities',
         ],
      },
   },
   universe: {
      sectors_filter: [
         'Industrials',
         'Financials',
         'Health Care',
         'Consumer Staples',
         'Communication Services',
         'Information Technology',
         'Consumer Discretionary',
         'Materials',
         'Cash',
         'Real Estate',
         'Energy',
         'Utilities',
      ],
   },
}

const initialStateWithoutSectorFilter = {
   static_data: {
      universe: {
         sectors: [
            'Industrials',
            'Financials',
            'Health Care',
            'Consumer Staples',
            'Communication Services',
            'Information Technology',
            'Consumer Discretionary',
            'Materials',
            'Cash',
            'Real Estate',
            'Energy',
            'Utilities',
         ],
      },
   },
   universe: {
      sectors_filter: [],
   },
}

const mockStore = configureStore()
const store = mockStore(initialState)
const storeWithoutSectorFilter = mockStore(initialStateWithoutSectorFilter)

test('test Sectors Universe screening', () => {
   const { container } = render(
      <Provider store={store}>
         <SectorsUniverse />
      </Provider>
   )
   const linkElement = screen.getByText(/Energy/i)
   expect(linkElement).toBeInTheDocument()
   expect(container).toMatchSnapshot()
})

test('click Sector full marked', () => {
   const { getByTestId } = render(
      <Provider store={store}>
         <SectorsUniverse />
      </Provider>
   )

   fireEvent.click(getByTestId('custom-checkbox-5'))
})

test('click Sector without markers', () => {
   const { getByTestId } = render(
      <Provider store={storeWithoutSectorFilter}>
         <SectorsUniverse />
      </Provider>
   )

   fireEvent.click(getByTestId('custom-checkbox-5'))
})
