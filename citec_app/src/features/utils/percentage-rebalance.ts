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

import { PortfolioLoaded } from 'features/utils/interfaces/portfolio-loaded'

interface CheckNegativePositions {
   outstanding_balance: number[]
   ticker: string[]
   unrealized_capital_gains: number[]
}

interface Check100Percentage {
   holds: number[]
   negativeUnrealized: PortfolioLoaded[]
   ticker: string[]
}

interface Check25or50Percentage extends CheckNegativePositions {
   holds: number[]
}

export const checkNegativePositions = ({
   outstanding_balance,
   ticker,
   unrealized_capital_gains,
}: CheckNegativePositions) => {
   const negativeUnrealized = []

   for (let index = 0; index < ticker.length; index++) {
      const unrealizedGains = unrealized_capital_gains[index]
      if (unrealizedGains < 0) {
         const result = {
            ticker: ticker[index],
            outstanding_balance: outstanding_balance[index],
            unrealized_capital_gains: unrealized_capital_gains[index],
         }
         negativeUnrealized.push(result)
      }
   }

   const isSomeNegativePosition = negativeUnrealized.length > 0

   return { negativeUnrealized, isSomeNegativePosition }
}

export const check100Percentage = ({
   holds,
   negativeUnrealized,
   ticker,
}: Check100Percentage) => {
   const newHolds = [...holds]

   for (let i = 0; i < negativeUnrealized.length; i++) {
      const tickerName = negativeUnrealized[i].ticker
      const indexTicker = ticker.indexOf(tickerName)

      newHolds[indexTicker] = 0
   }

   return newHolds
}

export const check25or50Percentage = ({
   holds,
   outstanding_balance,
   ticker,
   unrealized_capital_gains,
}: Check25or50Percentage) => {
   const negativeUnrealizedPercentage = []

   for (let i = 0; i < ticker.length; i++) {
      const nameTicker = ticker[i]

      if (nameTicker !== '$CASH' && holds[i] === 0) {
         negativeUnrealizedPercentage.push({
            ticker: ticker[i],
            outstanding_balance: outstanding_balance[i],
            unrealized_capital_gains: unrealized_capital_gains[i],
         })
      }
   }

   return negativeUnrealizedPercentage
}
