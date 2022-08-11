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

import { renderPopup } from 'features/popups/summary-popups'
import { TotalsBox } from 'features/ui/cards'
import { formatToMoney } from 'features/utils/format-to-money'
import { useAppSelector } from 'store/hooks'

const buy = require('assets/img/green-asterisk.png')
const sell = require('assets/img/red-asterisk.png')
const investment = require('assets/img/investment.png')
const bolsa = require('assets/img/bolsa.png')

export const TotalTrades = () => {
   const trades = useAppSelector((state) => state.trades)
   const portfolio_outstanding = useAppSelector(
      (state) => state.portfolio.outstanding_balance
   )

   let filteredTrades = [...trades]
   let filteredOutstanding = [...portfolio_outstanding]

   const isCashOnTrades = trades.some((trades) => trades.ticker === '$CASH')

   if (isCashOnTrades) {
      const indexCash = trades.findIndex((trade) => trade.ticker === '$CASH')
      filteredTrades = trades.filter((trade) => trade.ticker !== '$CASH')
      filteredOutstanding = [...portfolio_outstanding]
      filteredOutstanding[indexCash] = 0
   }

   const buy_trades = filteredTrades
      .filter((item) => item.operation == 'BUY')
      ?.map((item) => item)
   const buy_total = filteredTrades
      .filter((item) => item.operation == 'BUY')
      ?.map((item) => item.volume)
      .reduce((accumulator, curr) => accumulator + curr, 0)
   const sell_trades = filteredTrades
      .filter((item) => item.operation == 'SELL')
      ?.map((item) => item)
   const sell_total = filteredTrades
      .filter((item) => item.operation == 'SELL')
      ?.map((item) => item.volume)
      .reduce((accumulator, curr) => accumulator + curr, 0)
   const realized_capital_gains_total = filteredTrades
      ?.map((item) => item.realized_capital_gains)
      .reduce((accumulator, curr) => accumulator + curr, 0)

   return (
      <div className="grid grid-cols-4 gap-6 mt-2">
         <TotalsBox
            value={formatToMoney(Math.trunc(buy_total - sell_total))}
            text="Net new Investment"
            img={investment}
            numberpositions={trades.length}
         />
         <TotalsBox
            value={formatToMoney(Math.trunc(buy_total))}
            text="Buy"
            img={buy}
            numberpositions={buy_trades.length}
         />
         <TotalsBox
            value={formatToMoney(Math.trunc(sell_total))}
            text="Sell"
            img={sell}
            numberpositions={sell_trades.length || undefined}
         />
         <TotalsBox
            value={formatToMoney(Math.trunc(realized_capital_gains_total))}
            text="Realized Gains"
            img={bolsa}
            functInfo={() => renderPopup('realizedGains')}
            dataTestid="info-summary-trades-realized-gains"
            info
         />
      </div>
   )
}
