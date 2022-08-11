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
import { Sectors } from 'features/portfolio-analisys/components'
import { BrowserRouter } from 'react-router-dom'

class ResizeObserver {
   observe() {}
   unobserve() {}
}
jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})

describe('Rebalance Backtest - Sectors component', () => {
   beforeEach(() => {
      window.ResizeObserver = ResizeObserver
   })
   test('Snapshot', async () => {
      const sectors = {
         sector: [
            'Basic Materials',
            'Consumer Cyclical',
            'Financial Services',
            'Real Estate',
            'Communication Services',
            'Energy',
            'Industrials',
            'Technology',
            'Consumer Defensive',
            'Healthcare',
            'Utilities',
         ],
         percentage: [10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5],
         percentage_benchmark: [10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5],
      }

      const { container } = render(
         <BrowserRouter>
            <Sectors sectors={sectors} />
         </BrowserRouter>
      )
      expect(container).toMatchSnapshot()
   })
})
