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

import { mount, shallow } from 'enzyme'
import { Trades } from 'features/summary/tabs'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

describe('Test in Trades tab', () => {
   const mockStore = configureStore()
   const store = mockStore(exampleReduxState)

   const wrapper = shallow(
      <Provider store={store}>
         <Trades />
      </Provider>
   )

   test('snapshot', () => {
      expect(wrapper).toMatchSnapshot()
   })

   it('click on button download icons', () => {
      const component = mount(
         <Provider store={store}>
            <BrowserRouter>
               <Trades />
            </BrowserRouter>
         </Provider>
      )

      component
         .find({ 'data-testid': 'info-summary-trades-download' })
         .simulate('click')
   })
})
