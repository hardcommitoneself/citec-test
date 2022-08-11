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
import {
   AlpacaMyInvest,
   handleOnExportInvestments,
   loadPortfolioOnRedux
} from 'features/brokers/alpaca/ui/components/alpaca-my-invest'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { ReactNode } from 'react'
import { act } from 'react-dom/test-utils'
import { useAppNavigate, useFetchApi } from 'features/utils/hooks'

process.env.REACT_APP_ALPACA_VISIBILITY = 'true'

const mockUseFetchApi = useFetchApi as jest.MockedFunction<typeof useFetchApi>
jest.mock('features/utils/hooks/use-fetch-api')

const mockUseAppNavigate = useAppNavigate as jest.MockedFunction<
   typeof useAppNavigate
>
jest.mock('features/utils/hooks/use-app-navigate')

const mockedUseDispatch = jest.fn()

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => mockedUseDispatch,
}))

describe('My investments tests', () => {

   const mockedReps = [
      {
         ticker: 'VZ',
         status: 'OK',
         isin: 'US92343V1044',
         figi: 'BBG000HS77T5',
         name: 'Verizon Communications Inc',
         ipo: '1984-02-15',
         sector: 'Communication Services',
         url_morningstar: 'https://www.morningstar.com/stocks/xnys/VZ/quote',
         url_company: 'https://www.verizon.com/',
         url_logo:
            'https://static.finnhub.io/logo/9b7ee55a-80ec-11ea-bc1f-00000000092a.png',
         outstanding_balance: 0,
         unrealized_capital_gains: 0,
      },
   ]

   const mockedIdea = [
      {
         id: '0.0',
         original: {
            portfolio_id: 105,
            portfolio: 'VZ',
            benchmark: 'SPY',
            investment: 23369.4,
            unrealized_capital_gains: 0,
            creation_date: '2022-07-27 15:56:20',
            columnName: {
               ticker: 'VZ',
               status: 'OK',
               isin: 'US92343V1044',
               figi: 'BBG000HS77T5',
               name: 'Verizon Communications Inc',
               ipo: '1984-02-15',
               sector: 'Communication Services',
               url_morningstar: 'https://www.morningstar.com/stocks/xnys/VZ/quote',
               url_company: 'https://www.verizon.com/',
               url_logo:
                  'https://static.finnhub.io/logo/9b7ee55a-80ec-11ea-bc1f-00000000092a.png',
               outstanding_balance: 0,
               unrealized_capital_gains: 0,
            },
         },
         index: 0,
         depth: 1,
         cells: [{}],
         values: {
            investment: 23369.4,
            total_gain_loss: [0, 0]
         },
         originalSubRows: [],
         subRows: [],
      },
   ]

   beforeEach(() => {
      mockUseFetchApi.mockReturnValue({
         resp: mockedReps,
         isLoading: false,
         error: '',
      })

      mockUseAppNavigate.mockReturnValue(jest.fn())
   })

   const mockStore = configureStore()


   test('renders My investments', () => {

      const initialState = {
         brokers: {
            brokerConnected: 'Alpaca',
            cash: 0,
            accountType: ['PAPER'],
            a1c_t: '',
            accountTypeSelect: 'PAPER',
            buyingPower: 10000,
         },
      }
      
      const store = mockStore(initialState)

      const { container } = render(
         <Router>
            <Provider store={store}>
               <AlpacaMyInvest />
            </Provider>
         </Router>
      )
      const linkElement = screen.getByText(/My Investments/i)
      expect(linkElement).toBeInTheDocument()
      expect(container).toMatchSnapshot()
   })

   test('loadPortfolioOnRedux', () => {

      const store = mockStore(exampleReduxState)

      const wrapper = ({ children }: { children: ReactNode }) => (
         <MemoryRouter>
            <Provider store={store}>{children}</Provider>
         </MemoryRouter>
      )

      const { result } = renderHook(() => AlpacaMyInvest(), { wrapper })

      act(() => {
         loadPortfolioOnRedux(mockedIdea)
      })

      expect(mockUseAppNavigate).toBeCalled()
      expect(mockUseAppNavigate).toBeCalledTimes(1)
      expect(mockedUseDispatch).toBeCalled()
      expect(mockedUseDispatch).toBeCalledTimes(4)
   })

   test("Test handleOnExportInvestments valid Data", () => {

      const data = {
         values: {
            asset_class: "ETF",
            day_gain_loss: [3.2, 0.51],
            expander: undefined,
            investment: 630.62,
            options: undefined,
            price: 0,
            quantity: 2,
            total_gain_loss: [0.48, 0.08],
         },
         subRows: [
            {
               values: {
                  asset_class: "PSA",
                  day_gain_loss: ['3.2', 0.51],
                  expander: undefined,
                  investment: "630.62",
                  options: undefined,
                  price: "315.31",
                  quantity: "2",
                  total_gain_loss: ['0.48', 0.08],
               }
            },
            {
               values: {
                  asset_class: "GE",
                  day_gain_loss: ['-1.43', -2.12],
                  expander: undefined,
                  investment: "66.08",
                  options: undefined,
                  price: "66.08",
                  quantity: "1",
                  total_gain_loss: ['-1.43', -2.12],
               }
            },
         ]

      }

      expect(handleOnExportInvestments(data)).toEqual(1)

   })

   test("Test handleOnExportInvestments invalid Data", () => {

      expect(handleOnExportInvestments([])).not.toEqual(1)

   })

})