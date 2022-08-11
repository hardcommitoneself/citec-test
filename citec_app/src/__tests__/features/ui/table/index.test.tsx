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
import { render } from '@testing-library/react'

import { Table } from 'features/ui/table'
import { Trades } from 'features/utils/interfaces/trades'
import { Column } from 'react-table'

const data: Trades[] = [
   {
      ticker: '$CASH',
      operation: 'SELL',
      volume: 100.0,
      realized_capital_gains: 0.0,
      unrealized_capital_gains: 0.0,
   },
   {
      ticker: 'AAPL',
      operation: 'BUY',
      volume: 100.0,
      realized_capital_gains: 0.0,
      unrealized_capital_gains: 0.0,
   },
]

const columns: Column<Trades>[] = [
   {
      Header: 'Ticker',
      accessor: 'ticker' as never, // accessor is the "key" in the data
   },
   {
      Header: 'Company name',
      accessor: 'companyName' as never,
   },
]

describe('Test in table component', () => {
   test('should render table', () => {
      const { getByTestId } = render(<Table columns={columns} data={data} />)

      expect(getByTestId('table-test')).toBeTruthy()
   })
})
