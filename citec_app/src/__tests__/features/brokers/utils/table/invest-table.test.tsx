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
import { fireEvent, queryByTestId, render } from '@testing-library/react'
import { InvestTable } from 'features/brokers/utils/table/invest-table'
import { MyInvestments } from 'features/brokers/alpaca/ui/components/alpaca-my-invest'
import { columns } from 'features/brokers/utils/table/my-invest'
import { mount, shallow } from 'enzyme'

const data: MyInvestments[] = [
   {
      asset_class: 'US Equities',
      quantity: 0,
      price: 0,
      investment: 1000000,
      day_gain_loss: [2000, 1.2],
      total_gain_loss: [12000, 1.5],
      subRows: [
         {
            asset_class: 'GOOGL',
            quantity: 5,
            price: 2336,
            investment: 11681,
            day_gain_loss: [-0.85, -0.01],
            total_gain_loss: [331.73, 2.92],
            subRows: undefined,
         },
         {
            asset_class: 'AAPL',
            quantity: 9,
            price: 148.35,
            investment: 1335.15,
            day_gain_loss: [19.89, 1.51],
            total_gain_loss: [38.56, 2.97],
            subRows: undefined,
         },
      ],
   },
   {
      asset_class: 'Crypto',
      quantity: 0,
      price: 0,
      investment: 1000000,
      day_gain_loss: [-1000, -0.8],
      total_gain_loss: [12000, 1.5],
      subRows: [
         {
            asset_class: 'BTCUSD',
            quantity: 1,
            price: 31437,
            investment: 31437,
            day_gain_loss: [1929, 6.48],
            total_gain_loss: [2296, 7.89],
            subRows: undefined,
         },
      ],
   },
]

describe('Test in table component', () => {
   test('should render table', () => {
      const { getByTestId } = render(<InvestTable columns={columns} data={data} />)

      expect(getByTestId('table-test')).toBeTruthy()
   })

   it('click on button download icons', () => {
      const onRemove = jest.fn()
      const component = mount(
         <InvestTable columns={columns} data={data} />
      )
      component.find({ "data-testid": "test-export-investment" }).at(0).prop('onClick')
   })

   it('click on button load portfolio on redux', () => {
      const onRemove = jest.fn()
      const component = mount(
         <InvestTable columns={columns} data={data} />
      )
      component.find({ "data-testid": "test-load-portfolio-on-redux" }).at(0).prop('onClick')
   })
})
