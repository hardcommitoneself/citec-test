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

import { store } from 'store'

export const generatePayloadOptimization = () => {
   const rebalance = store.getState().rebalance
   const portfolio = store.getState().portfolio
   const universe = store.getState().universe
   const { factors_filter, sectors_filter, to_exclude, to_include } = universe

   const factors_keys: string[] = []
   const lower: number[] = []
   const upper: number[] = []
   let hist_w = 186

   factors_filter.forEach((factor) => {
      factors_keys.push(factor.factor)
      lower.push(factor.ranges[0] / 100)
      upper.push(factor.ranges[1] / 100)
   })

   const outstanding_balance_total = portfolio.outstanding_balance.reduce(
      (accumulator, curr) => accumulator + curr,
      0
   )
   const min_purchase = Math.max(1, 0.0001 * outstanding_balance_total)
   const min_weight = min_purchase / outstanding_balance_total

   const portfolio_ops = {
      ticker: rebalance.ticker,
      holds: rebalance.hold,
   }

   const payload = {
      portfolio: {
         portfolio: 'myportfolio',
         benchmark: rebalance.benchmark,
         ...portfolio,
      },
      portfolio_ops,
      universe: {
         universe_base: {
            name: universe.universe_base,
            description: universe.universe_base,
         },
         factors_filter: {
            factor: factors_keys,
            lower,
            upper,
         },
         sectors_filter,
         to_exclude,
         to_include,
      },
      opt_configuration: {
         objective: rebalance.objective,
         number_stocks: rebalance.number_stocks,
         benchmark: rebalance.benchmark,
         min_weight: min_weight,
      },
   }

   switch (rebalance.objective.key) {
      case 'min_tracking_error':
         hist_w = 186
         break
      case 'min_risk_parity':
         hist_w = 1095
         break
      case 'min_neg_sharpe_ratio':
         hist_w = 365
         break
      case 'min_volatility':
         hist_w = 1095
         break
      case 'min_neg_excess_returns':
         hist_w = 365
         break
      case 'max_diversification_ratio':
         hist_w = 1095
         break
      default:
         hist_w = 365
   }

   return { payloadOptimization: payload, hist_w }
}
