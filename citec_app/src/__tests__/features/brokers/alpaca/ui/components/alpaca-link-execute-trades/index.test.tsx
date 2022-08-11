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

import { LinkExecuteTrades } from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/index'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'store'
import Swal from 'sweetalert2'
import { BrowserRouter as Router } from 'react-router-dom'
import { Trades } from 'features/utils/interfaces/trades'
import { validateAssetsExchange } from 'features/brokers/utils/validate-assets-exchange'

process.env.REACT_APP_ALPACA_VISIBILITY = 'true'

jest.mock('features/brokers/utils/validate-assets-exchange')

describe('Test in LinkExecuteTrades component', () => {
   const trades: Trades[] = [
      {
         operation: 'SELL',
         realized_capital_gains: -1.15,
         ticker: '$CASH',
         unrealized_capital_gains: 0,
         volume: 500,
      },
      {
         operation: 'SELL',
         realized_capital_gains: -1.15,
         ticker: 'GILD',
         unrealized_capital_gains: 0,
         volume: 247.76,
      },
      {
         operation: 'BUY',
         realized_capital_gains: 0,
         ticker: 'META',
         unrealized_capital_gains: 0,
         volume: 250,
      },
   ]

   test('Click on button Execute Trades', () => {
      
      const { getByTestId, container } = render(
         <Router>
            <Provider store={store}>
               <LinkExecuteTrades data={trades} />
            </Provider>
         </Router>
      )

      validateAssetsExchange.mockReturnValue(Promise.resolve(true))

      const button = getByTestId('test-execute-trades')
      fireEvent.click(button)
      expect(button).toBeTruthy()
   })

   test('Click on confirmation button to execute trades', () => {

      validateAssetsExchange.mockReturnValue(Promise.resolve(true))

      const { getByTestId, container } = render(
         <Router>
            <Provider store={store}>
               <LinkExecuteTrades data={trades} />
            </Provider>
         </Router>
      )

      const button = getByTestId('test-execute-trades')
      fireEvent.click(button)
      Swal.clickConfirm()
      setTimeout(() => {
         expect(Swal.getCancelButton()).toEqual('Close')
      }, 5000)
   })
})
