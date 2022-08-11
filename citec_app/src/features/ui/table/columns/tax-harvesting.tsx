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
import { formatToMoney } from 'features/utils/format-to-money'
import { Column } from 'react-table'
import { InputTable } from '../input-table'

export interface Portfolio {
   ticker: string
   unrealized_capital_gains: number
   outstanding_balance: number
}

export const columns: Column<Portfolio>[] = [
   {
      Header: 'Ticker',
      accessor: 'ticker',
      Cell: ({ value }) => <InputTable value={value} />,
   },
   {
      Header: 'Outstanding balance, $',
      accessor: 'outstanding_balance',
      Cell: ({ value }) => <InputTable value={formatToMoney(value, true)} />,
   },
   {
      Header: 'Unrealized capital gains',
      accessor: 'unrealized_capital_gains',
      Cell: ({ value }) => <InputTable value={`(${formatToMoney(value, true)})`} />,
   },
]
