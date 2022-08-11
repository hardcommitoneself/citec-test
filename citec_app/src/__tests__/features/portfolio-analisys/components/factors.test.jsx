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
import { Factors } from 'features/portfolio-analisys/components'

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

const factors = {
   factor: [
      'style',
      'size',
      'yield',
      'quality',
      'volatility',
      'momentum',
      'liquidity',
   ],
   percentage: [
      0.9079539523809522, 0.9913419047619048, 0.47945845238095236,
      0.4450155714285714, 0.9432695714285714, 0.8419916190476191, 0.939307619047619,
   ],
}

describe('Factors component', () => {
   test('Snapshot', async () => {
      window.ResizeObserver = ResizeObserver
      const { container } = render(<Factors factors={factors} />)
      expect(container).toMatchSnapshot()
   })
})
