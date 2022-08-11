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

import { getTickers, removeCash } from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/execute-trades-utils'
import { getLatestPrices } from 'features/brokers/utils/get-latest-prices'
import { store } from 'store'
import { fetchDataFromCitecApi } from './api/citec-api'
import { Trades } from './interfaces/trades'

export const generatePayloadTrades = async () => {
   const { ticker, outstanding_balance, unrealized_capital_gains } =
      store.getState().portfolio
   const rebalance = store.getState().rebalance
   const portfolioOptimized = store.getState().portfolio_optimized

   const payloadTradesGeneration = {
      portfolio: {
         portfolio: 'myportfolio',
         benchmark: rebalance.benchmark,
         ticker,
         outstanding_balance,
         unrealized_capital_gains,
      },
      portfolio_ops: {
         ticker: rebalance.ticker,
         holds: rebalance.hold,
      },
      portfolio_target: {
         portfolio: 'new_portfolio',
         benchmark: portfolioOptimized?.benchmark,
         ticker: portfolioOptimized?.ticker,
         outstanding_balance: portfolioOptimized?.outstanding_balance,
         unrealized_capital_gains: portfolioOptimized?.unrealized_capital_gains,
      },
   }

   try {
      const trades = await fetchDataFromCitecApi<Trades[]>({
         endpoint: '/ai/portfolio/trades_generation/',
         method: 'POST',
         params: {
            hist_w: 182,
         },
         payload: payloadTradesGeneration,
      })
   
      const filteredData = removeCash(trades.data)
   
      const tickers = getTickers(filteredData)
      const latestPrices = await getLatestPrices(tickers)
   
      const payload = {
         trades: filteredData,
         latest_prices: latestPrices,
      }
   
      return payload
   } catch (error: any) {
      return error
   }  
}
