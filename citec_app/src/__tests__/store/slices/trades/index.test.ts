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
import { Trades } from 'features/utils/interfaces/trades'
import reducer, { resetTrades, setTrades } from 'store/slices/trades'

const initialState = [] as Trades[]

describe('Trades redux state tests', () => {
   test('should return the initial state', () => {
      expect(reducer(undefined, {} as never)).toEqual([])
   })

   test('Reset Trades in Redux', () => {
      const data_state = [
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

      expect(reducer(data_state as any, resetTrades())).toEqual(initialState)
   })

   test('load Trades random', () => {
      const data_state = [
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

      expect(reducer(initialState, setTrades(data_state))).toEqual([
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
      ])
   })

   test('Reset the initial state', () => {
      const initialState = [] as Trades[]
      expect(reducer(initialState, resetTrades())).toEqual([])
   })
})
