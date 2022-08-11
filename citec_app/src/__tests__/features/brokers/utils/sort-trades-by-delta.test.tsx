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

import { sortTradesByDelta } from "features/brokers/utils/sort-trades-by-delta"
import { Trades } from 'features/utils/interfaces/trades'

describe("Test function sortTradesByDelta", () => {
    
    test("Base case with not sorted trades", () => {
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
            {
                operation: 'BUY',
                realized_capital_gains: 0,
                ticker: 'TSLA',
                unrealized_capital_gains: 0,
                volume: 471,
                stocks_number: 11,
                expected_volume: 500,
                delta_volume: 29
             },
         ]

         const resp: Trades[] = [
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
            {
                operation: 'BUY',
                realized_capital_gains: 0,
                ticker: 'TSLA',
                unrealized_capital_gains: 0,
                volume: 471,
                stocks_number: 11,
                expected_volume: 500,
                delta_volume: 29
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
             }
         ]

         expect(sortTradesByDelta(trades)).toEqual(resp)
    })

    test("Case for sorted trades", () => {

         const data: Trades[] = [
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
            {
                operation: 'BUY',
                realized_capital_gains: 0,
                ticker: 'TSLA',
                unrealized_capital_gains: 0,
                volume: 471,
                stocks_number: 11,
                expected_volume: 500,
                delta_volume: 29
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
             }
         ]

         expect(sortTradesByDelta(data)).toEqual(data)
    })

    test('Test for empty array', () => {
        expect(sortTradesByDelta([])).toEqual([])
    })
})