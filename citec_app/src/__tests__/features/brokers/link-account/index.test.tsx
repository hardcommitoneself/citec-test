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
import { fireEvent, prettyDOM, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { LinkAccount } from 'features/brokers/link-account'


describe('test in link-account', () => {
   process.env.REACT_APP_ALPACA_VISIBILITY = 'true'
   test('Render <linkAccount />', () => {
       const { getByTestId, container } = render(
          <Provider store={store}>
            <LinkAccount/>
          </Provider>
       )
       
       const button = screen.getByText('+ Link account')
       expect(button).toBeInTheDocument()
       expect(screen.queryByText('ADD ACCOUNT')).toBeNull();        
    })

    test('click link Account button', () => {
        const { getByTestId, container } = render(
           <Provider store={store}>
             <LinkAccount/>
           </Provider>
        )
        const button = screen.getByText('+ Link account')       
        fireEvent.click(button)        
        expect(screen.queryByText('ADD ACCOUNT')).not.toBeNull();             
     })
 })
 
