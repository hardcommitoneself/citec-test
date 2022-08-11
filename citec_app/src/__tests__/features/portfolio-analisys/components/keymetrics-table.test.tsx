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

import { render } from '@testing-library/react'
import { KeyMetricsTable } from 'features/portfolio-analisys/components'
import { exampleReduxState } from 'features/utils/const/exampleReduxState'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('test at key metrics table', () => {
   test('should match snapshot', () => {
      const mockStore = configureStore()
      const store = mockStore(exampleReduxState)

      const props = {
         tracking: {
            tracking_difference: 10,
            r_square: 14,
         },
         risk: {
            beta: 0.02,
         },
      }

      const { container } = render(
         <Provider store={store}>
            <KeyMetricsTable backtest={props as never} />,
         </Provider>
      )
      expect(container).toMatchSnapshot()
   })
})
