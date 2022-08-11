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
import {
   separateTrades,
   getTickers,
} from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/execute-trades-utils'

describe('test in Execute trades utils', () => {
   test('separateTrades', () => {
      const arg = [
         {
            symbol: 'AAPL',
            side: 'sell',
            qty: 1,
            type: 'market',
            time_in_force: 'day',
         },
         {
            symbol: 'TSLA',
            side: 'sell',
            qty: 1,
            type: 'market',
            time_in_force: 'day',
         },
         {
            symbol: 'WMT',
            side: 'buy',
            qty: 2,
            type: 'market',
            time_in_force: 'day',
         },
      ]

      const resSolv = {
         sell: [
            {
               symbol: 'AAPL',
               side: 'sell',
               qty: 1,
               type: 'market',
               time_in_force: 'day',
            },
            {
               symbol: 'TSLA',
               side: 'sell',
               qty: 1,
               type: 'market',
               time_in_force: 'day',
            },
         ],
         buy: [
            {
               symbol: 'WMT',
               side: 'buy',
               qty: 2,
               type: 'market',
               time_in_force: 'day',
            },
         ],
      }

      const resp = separateTrades(arg)

      expect(resp).toEqual(resSolv)
   })
   test('obtainTickets', () => {
      const arg = [
         {
            ticker: 'AAPL',
            operation: 'SELL',
            volume: 132.18,
            realized_capital_gains: -0.01,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'TSLA',
            operation: 'SELL',
            volume: 653.23,
            realized_capital_gains: 6.23,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'WMT',
            operation: 'BUY',
            volume: 162.57,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'BMY',
            operation: 'BUY',
            volume: 115.16,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'BDX',
            operation: 'BUY',
            volume: 103.56,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'JNJ',
            operation: 'BUY',
            volume: 101.3,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'GILD',
            operation: 'BUY',
            volume: 79.87,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'MO',
            operation: 'BUY',
            volume: 79.61,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'CHTR',
            operation: 'BUY',
            volume: 43.72,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'AMZN',
            operation: 'BUY',
            volume: 24.64,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'MMM',
            operation: 'BUY',
            volume: 15.86,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'KO',
            operation: 'BUY',
            volume: 15.66,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'T',
            operation: 'BUY',
            volume: 15.04,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'NFLX',
            operation: 'BUY',
            volume: 12.79,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'MDT',
            operation: 'BUY',
            volume: 11.71,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'XOM',
            operation: 'BUY',
            volume: 2.88,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
         {
            ticker: 'CMCSA',
            operation: 'BUY',
            volume: 1.04,
            realized_capital_gains: 0,
            unrealized_capital_gains: 0,
         },
      ]

      const resEs = [
         'AAPL',
         'TSLA',
         'WMT',
         'BMY',
         'BDX',
         'JNJ',
         'GILD',
         'MO',
         'CHTR',
         'AMZN',
         'MMM',
         'KO',
         'T',
         'NFLX',
         'MDT',
         'XOM',
         'CMCSA',
      ]

      const resp = getTickers(arg)
      expect(resp).toEqual(resEs)
   })
})
