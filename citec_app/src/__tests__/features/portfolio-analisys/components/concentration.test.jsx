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
import { Concentration } from 'features/portfolio-analisys/components'

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

const concentration = {
   ticker: ['AAPL', 'TSLA', 'MSFT'],
   concentration: [33.33333333333333, 66.66666666666666, 100.0],
}

describe('Concentration component', () => {
   test('Snapshot', async () => {
      window.ResizeObserver = ResizeObserver

      const { container } = render(<Concentration concentration={concentration} />)

      expect(container).toMatchSnapshot()
   })
})
