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

import { validateAssetsExchange } from "features/brokers/utils/validate-assets-exchange"
import { assetsAlpaca } from "features/brokers/alpaca/utils/assets-alpaca"
import { getAssetType } from "features/brokers/utils/get-asset-type"

jest.mock("features/brokers/alpaca/utils/assets-alpaca")
jest.mock("features/brokers/utils/get-asset-type")

describe("Testing validateAssetsExchange function", () => {

    test("Testing for empty array of assets", async () => {     

        const tickers = ['TSLA', 'META', 'KO']
        const type = 'PAPER'
    
        assetsAlpaca.mockResolvedValue()
        getAssetType.mockResolvedValue()

        await validateAssetsExchange(type, tickers)

        expect(assetsAlpaca).toHaveBeenCalled()
        expect(getAssetType).toHaveBeenCalled()
    })

    test("Testing for valid to trade arrays of assets", async () => {

        const tickers = ['TSLA', 'META', 'KO']
        const type = 'PAPER'

        const brokerAssets = [
                {
                    symbol: 'TSLA',
                    exchange: 'NASDAQ'
                },
                {
                    symbol: 'META',
                    exchange: 'NASDAQ'
                },
                {
                    symbol: 'KO',
                    exchange: 'NYSE'
                }
            ]

        const citecAssets = [
                {
                    ticker: 'TSLA',
                    exchange: 'NASDAQ'
                },
                {
                    ticker: 'META',
                    exchange: 'NASDAQ'
                },
                {
                    ticker: 'KO',
                    exchange: 'NYSE'
                }
            ]

        assetsAlpaca.mockReturnValue(brokerAssets)
        getAssetType.mockReturnValue(citecAssets)

        

        expect(await validateAssetsExchange(type, tickers)).toEqual(true)

    })

    test("Testing for invalid to trade arrays of assets", async () => {

        const tickers = ['TSLA', 'META', 'KO']
        const type = 'PAPER'

        const brokerAssets = [
            {
                symbol: 'TSLA',
                exchange: 'NASDAQ'
            },
            {
                symbol: 'META',
                exchange: 'NYSE'
            },
            {
                symbol: 'KO',
                exchange: 'NYSE'
            }
        ]

        const citecAssets = [
            {
                ticker: 'TSLA',
                exchange: 'NASDAQ'
            },
            {
                ticker: 'META',
                exchange: 'NASDAQ'
            }
        ]

        assetsAlpaca.mockReturnValue(brokerAssets)
        getAssetType.mockReturnValue(citecAssets)

        expect(await validateAssetsExchange(type, tickers)).toEqual(false)

    })
})