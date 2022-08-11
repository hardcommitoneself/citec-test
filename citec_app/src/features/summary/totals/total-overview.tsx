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

export const TotalOverview = ({ analysis }: any) => {
   const portfolio_outstanding = useAppSelector(
      (state) => state.portfolio.outstanding_balance
   )
   const portfolio_analysis = analysis
   const outstanding_balance_total = portfolio_outstanding
      ?.map((item: any) => item)
      .reduce((accumulator: any, curr: any) => accumulator + curr)

   return (
      <div className="grid grid-cols-4 gap-6 mt-2">
         <TotalsBox
            value={formatToMoney(outstanding_balance_total)}
            text="Investment"
            img={Investment}
            numberpositions={portfolio_outstanding.length}
         />
         <TotalsBox
            value={'$ 68,000'}
            text="Avg. market cap"
            img={Cap}
            functInfo={() => renderPopup('avgMarketCapAlert')}
            dataTestid="info-summary-overview-market_cap"
            info
         />
         <TotalsBox
            value={portfolio_analysis!.fundamentals.pe.toFixed(2)}
            text="Price per earnings"
            img={Price}
            functInfo={() => renderPopup('priceEarningAlert')}
            dataTestid="info-summary-overview-pe"
            info
         />
         <TotalsBox
            value={`${portfolio_analysis!.fundamentals.dividend_yield.toFixed(2)}%`}
            text="Dividend yield"
            img={Overview_percentage}
            functInfo={() => renderPopup('dividendYieldAlert')}
            dataTestid="info-summary-overview-yield"
            info
         />
      </div>
   )
}
