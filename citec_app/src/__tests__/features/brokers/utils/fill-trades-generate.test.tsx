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

import { fillTradesGenerated } from "features/brokers/utils/fill-trades-generate"
import { fetchDataFromCitecApi } from "features/utils/api/citec-api"
import { Trades } from "features/utils/interfaces/trades"

jest.mock('features/utils/api/citec-api')

describe("Test function fillTradesGenerated", () => {
    const trades: Trades[] = [
        {
           operation: 'SELL',
           realized_capital_gains: 0,
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

    const positions = [
        {
            ticker: 'GILD',
            url: "url",
            name: 'Gilead Sciences, Inc'
        },
        {
            ticker: 'META',
            url: "url",
            name: 'Meta Platforms Inc'
        },
        {
            ticker: 'TSLA',
            url: "url",
            name: 'Tesla Inc'
        }
    ]

    it('Teste that filledTrades is generated', async () => {

        const filledTrades = await fillTradesGenerated(trades, positions, prices)
        expect(filledTrades).toBeDefined()
    })
})