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

import { Skeleton } from '@mui/material'

import { formatToMoney } from 'features/utils/format-to-money'
import { renderPopup } from 'features/popups/overview-popups'
import { Universe } from 'features/utils/hooks/use-get-custom-universe'
import { TotalsBox } from 'features/ui/cards'

interface TotalsScreenerProps {
   totals: Universe
}

const investmentIcon = require('assets/img/investment.png')
const marketIcon = require('assets/img/cap.png')
const dollarIcon = require('assets/img/price.png')
const yieldIcon = require('assets/img/overview_percentage.png')

export const TotalsScreener = ({ totals }: TotalsScreenerProps) => {
   const { number_stocks, market_cap, dividend_yield, pe } = totals

   const cards = [
      {
         text: 'Number of positions',
         img: investmentIcon,
         value: number_stocks,
      },
      {
         text: 'Avg. market cap',
         img: marketIcon,
         value: formatToMoney(market_cap),
         info: true,
         functInfo: () => renderPopup('avgMarketCapAlert'),
      },
      {
         text: 'Price per earnings',
         img: dollarIcon,
         value: pe,
         info: true,
         functInfo: () => renderPopup('priceEarningAlert'),
      },

      {
         text: 'Dividend yield',
         img: yieldIcon,
         value: `${dividend_yield.toFixed(2)}%`,
         info: true,
         functInfo: () => renderPopup('dividendYieldAlert'),
      },
   ]

   return !totals.dividend_yield ? (
      <Skeleton />
   ) : (
      <div className="grid grid-cols-4 gap-6 relative transition-all duration-100">
         {cards.map((vals, i) => (
            <TotalsBox key={i} {...vals} />
         ))}
      </div>
   )
}
