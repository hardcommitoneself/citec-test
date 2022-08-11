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

import { MyIdeas } from 'features/utils/interfaces/my-ideas'

export function buildDataIdeas(ideas: any, positions: any) {
   const portfolios_saved: MyIdeas[] = []

   ideas.map(async (idea: any) => {
      const subrows: any[] = []
      idea.ticker.map((position: any, index: any) => {
         const result = positions.filter((obj: any) => {
            return obj.ticker === position
         })

         subrows.push({
            portfolio_id: idea.portfolio_id,
            portfolio: position, // Name Ticker
            benchmark: idea.benchmark,
            investment: idea.outstanding_balance[index], // Investment each ticker
            unrealized_capital_gains: idea.unrealized_capital_gains[index],
            creation_date: idea.creation_date,
            columnName: result[0], //here there is position info: logo_url, name, ticker....
            subRows: undefined,
         })
      })

      const investment = idea.outstanding_balance
         ?.map((item: any) => item)
         .reduce((accumulator: any, curr: any) => accumulator + curr)

      portfolios_saved.push({
         portfolio_id: idea.portfolio_id,
         portfolio: idea.portfolio,
         benchmark: idea.benchmark,
         investment: investment,
         creation_date: idea.creation_date,
         columnName: idea.portfolio,
         subRows: subrows,
      })
   })
   return portfolios_saved
}
