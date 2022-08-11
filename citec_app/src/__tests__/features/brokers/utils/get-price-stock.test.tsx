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

import { getPriceStock } from "features/brokers/utils/get-price-stock";
import { Trades } from "features/utils/interfaces/trades";

describe("Test on getPriceStock", () => {

    const stock: Trades = {
        operation: 'SELL',
        realized_capital_gains: 0,
        ticker: 'GILD',
        unrealized_capital_gains: 0,
        volume: 247.76,
        stocks_number: 11,
        expected_volume: 248,
        delta_volume: 0.24
     }

     test("Test when stock is in prices array", () => {
        const prices = [
            {
                ticker: 'GILD',
                price: 705
            },
            {
                ticker: 'META',
                price: 400
            },
            {
                ticker: 'TSLA',
                price: 240
            }
        ]

        expect(getPriceStock(stock, prices)).toEqual(705)
     })

     test("Test when stock is not in prices array", () => {
        expect(getPriceStock(stock, [])).toEqual(0)
     })
    
})