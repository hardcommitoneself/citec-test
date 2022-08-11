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

import { Checkbox } from '@mui/material'
import { mount } from 'enzyme'
import { CheckAll } from 'features/tax-harvesting'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('test at <CheckAll />', () => {
   const mockStore = configureStore()

   const store = mockStore(exampleReduxState)
   const addOrRemoveAllPositions = jest.fn()

   const wrapper = mount(
      <Provider store={store}>
         <CheckAll addOrRemoveAllPositions={addOrRemoveAllPositions} />
      </Provider>
   )

   test('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
   })

   test('should render checkbox mui', () => {
      const checkBox = wrapper.find(Checkbox) as any

      expect(checkBox).toHaveLength(1)
   })

   test('should calls to functions', () => {
      const checkBox = wrapper.find(Checkbox) as any

      checkBox.prop('onChange')({ target: { checked: true } })
      expect(addOrRemoveAllPositions).toBeCalled()

      checkBox.prop('onChange')({ target: { checked: false } })
      expect(addOrRemoveAllPositions).toBeCalled()
   })
})
