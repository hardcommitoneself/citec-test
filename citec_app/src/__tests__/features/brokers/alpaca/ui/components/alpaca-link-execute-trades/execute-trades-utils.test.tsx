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

import {
   removeCash,
   getAllStatus,
   processBuy,
   getMape,
} from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/execute-trades-utils'
import { Trades } from 'features/utils/interfaces/trades'

describe('Testing removeCash in execute-trades-utils', () => {
   test('Test removeCash with cash and other tickers', () => {
      const trades: Trades[] = [
         {
            operation: 'SELL',
            realized_capital_gains: -1.15,
            ticker: '$CASH',
            unrealized_capital_gains: 0,
            volume: 250,
            stocks_number: 11,
            expected_volume: 250,
            delta_volume: 0
         },
         {
            operation: 'SELL',
            realized_capital_gains: -1.15,
            ticker: 'GILD',
            unrealized_capital_gains: 0,
            volume: 247.76,
            stocks_number: 11,
            expected_volume: 248,
            delta_volume: 0.24
         },
         {
            operation: 'BUY',
            realized_capital_gains: 0,
            ticker: 'META',
            unrealized_capital_gains: 0,
            volume: 500,
            stocks_number: 11,
            expected_volume: 470,
            delta_volume: -30
         },
      ]

      const resp: Trades[] = [
         {
            operation: 'SELL',
            realized_capital_gains: -1.15,
            ticker: 'GILD',
            unrealized_capital_gains: 0,
            volume: 247.76,
            stocks_number: 11,
            expected_volume: 248,
            delta_volume: 0.24
         },
         {
            operation: 'BUY',
            realized_capital_gains: 0,
            ticker: 'META',
            unrealized_capital_gains: 0,
            volume: 500,
            stocks_number: 11,
            expected_volume: 470,
            delta_volume: -30
         },
      ]

      expect(removeCash(trades)).toEqual(resp)
   })

   test('Test removeCash with just cash', () => {
      const trades: Trades[] = [
         {
            operation: 'SELL',
            realized_capital_gains: -1.15,
            ticker: '$CASH',
            unrealized_capital_gains: 0,
            volume: 250,
            stocks_number: 11,
            expected_volume: 250,
            delta_volume: 0
         },
      ]

      const resp: Trades[] = []

      expect(removeCash(trades)).toEqual(resp)
   })
})

describe('Test getAllStatus', () => {
   const type = 'PAPER'

   test('Test getAllStatus for just errors', () => {
      const ordersIds: string[] = [
         'error',
         'error',
         'error',
         'error',
         'error',
         'error',
      ]

      expect(getAllStatus(type, ordersIds).length).toEqual(ordersIds.length)
   })

   test('Test getAllStatus for empty array', () => {
      expect(getAllStatus(type, [])).toEqual([])
   })
})

describe('Test processBuy', () => {
   test('test empty array for the status', () => {
      expect(processBuy([])).toEqual(true)
   })

   test('test with just filled status', () => {
      const statusOrders: string[] = ['filled', 'filled', 'filled']
      expect(processBuy(statusOrders)).toEqual(true)
   })

   test('Test with different status', () => {
      const statusOrders: string[] = ['filled', 'accepted', 'filled', 'filled']
      expect(processBuy(statusOrders)).toEqual(false)
   })
})

describe('Test getMape function', () => {
   test("Test for trades with data", () => {
      const trades: Trades[] = [
         {
            operation: 'SELL',
            realized_capital_gains: -1.15,
            ticker: 'GILD',
            unrealized_capital_gains: 0,
            volume: 247.76,
            stocks_number: 11,
            expected_volume: 248,
            delta_volume: 0.24
         },
         {
            operation: 'BUY',
            realized_capital_gains: 0,
            ticker: 'META',
            unrealized_capital_gains: 0,
            volume: 500,
            stocks_number: 11,
            expected_volume: 470,
            delta_volume: -30
         },
      ]

      const resp = 4.04

      expect(getMape(trades)).toEqual(resp)
   })

   test("Test for empty array", () => {
      expect(getMape([])).toEqual(0)
   })

   test("Test for total volume expecto equal to 0", () => {
      const trades: Trades[] = [
         {
            operation: 'SELL',
            realized_capital_gains: -1.15,
            ticker: 'GILD',
            unrealized_capital_gains: 0,
            volume: 0,
            stocks_number: 0,
            expected_volume: 0,
            delta_volume: 0
         },
         {
            operation: 'BUY',
            realized_capital_gains: 0,
            ticker: 'META',
            unrealized_capital_gains: 0,
            volume: 0,
            stocks_number: 0,
            expected_volume: 0,
            delta_volume: 0
         },
      ]
      expect(getMape(trades)).toEqual(0)
   })
})