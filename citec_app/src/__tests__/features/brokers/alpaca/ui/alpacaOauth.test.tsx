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
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { store } from 'store'
import { AlpacaOauth, requestIsValid } from 'features/brokers/alpaca/ui/'

describe('test in Alpaca Oauth', () => {
   let windowOpenSpy: jest.SpyInstance
   beforeEach(() => {
      windowOpenSpy = jest.spyOn(window, 'open')
   })

   test('Render <AlpacaOauth />', () => {
      const { container } = render(
         <Provider store={store}>
            <AlpacaOauth />
         </Provider>
      )

      expect(container).toHaveTextContent('Alpaca')
   })

   test('Call requestIsValid sucefull', () => {
      expect(requestIsValid('0thlp999%F(','0thlp999%F(')).toEqual(true);     
    })

    
   test('click link Alpaca', async () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <AlpacaOauth />
         </Provider>
      )

      const link = getByTestId('lnk-alpaca-oauth')
      act(() => {
         fireEvent.click(link)
      })
      expect(windowOpenSpy).toBeCalled()
   })
})
