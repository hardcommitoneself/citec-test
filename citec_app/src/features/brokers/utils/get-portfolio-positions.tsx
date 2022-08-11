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

import { fetchDataFromCitecApi } from "features/utils/api/citec-api"
import { store } from "store"

export const getPortfolioPositions = async (tickers: string[]) => {
    
    const outstaing_balance = Array(tickers.length).fill(0)
    const unrealized_capital_gains = Array(tickers.length).fill(0)
    const porfolioOptimized = store.getState().portfolio_optimized

    try {
        const positions = await fetchDataFromCitecApi<any>({
            endpoint: '/ai/portfolio/positions',
            method: 'POST',
            payload: {
                portfolio: 'myportfolio',
                benchmark: porfolioOptimized?.benchmark,
                ticker: tickers,
                outstanding_balance: outstaing_balance,
                unrealized_capital_gains: unrealized_capital_gains,
            },
        })

        return positions.data
    } catch (error: any) {
        return error
    }
}