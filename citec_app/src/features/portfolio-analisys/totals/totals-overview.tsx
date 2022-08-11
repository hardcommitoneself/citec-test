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

import { renderPopup } from 'features/popups/overview-popups'
import { TotalsBox } from 'features/ui/cards'
import { formatToMoney } from 'features/utils/format-to-money'
import { useAppSelector } from 'store/hooks'

const Cap = require('assets/img/cap.png')
const Investment = require('assets/img/investment.png')
const Overview_percentage = require('assets/img/overview_percentage.png')
const Price = require('assets/img/price.png')

interface TotalOverviewProps {
   numberPositions?: number
}

export const TotalOverview = ({ numberPositions }: TotalOverviewProps) => {
   const portfolio_outstanding = useAppSelector(
      (state) => state.portfolio.outstanding_balance
   )
   const portfolio_analysis = useAppSelector((state) => state.portfolio.analysis)
   const outstanding_balance_total = portfolio_outstanding.reduce(
      (accumulator, curr) => accumulator + curr,
      0
   )

   return (
      <div className="grid grid-cols-4 gap-6 mt-2">
         <TotalsBox
            value={formatToMoney(Math.trunc(outstanding_balance_total))}
            text="Investment"
            img={Investment}
            numberpositions={numberPositions || portfolio_outstanding.length}
         />
         <TotalsBox
            value={formatToMoney(
               Math.trunc(portfolio_analysis?.fundamentals.avg_market_cap as number)
            )}
            text="Avg. market cap"
            img={Cap}
            functInfo={() => renderPopup('avgMarketCapAlert')}
            info
         />
         <TotalsBox
            value={portfolio_analysis!.fundamentals.pe.toFixed(2)}
            text="Price per earnings"
            img={Price}
            functInfo={() => renderPopup('priceEarningAlert')}
            info
         />
         <TotalsBox
            value={`${portfolio_analysis!.fundamentals.dividend_yield.toFixed(2)}%`}
            text="Dividend yield"
            img={Overview_percentage}
            functInfo={() => renderPopup('dividendYieldAlert')}
            info
         />
      </div>
   )
}
