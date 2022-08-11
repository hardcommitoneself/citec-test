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
import { useAppSelector } from 'store/hooks'
import { formatToMoney } from 'features/utils/format-to-money'

const Tracking_grey = require('assets/img/tracking_grey.png')
const Investment = require('assets/img/investment.png')
const Bolsa = require('assets/img/bolsa.png')
const Espiga = require('assets/img/espiga.png')

export const TotalPositions = ({ backtest }: any) => {
   const portfolio_outstanding = useAppSelector(
      (state) => state.portfolio.outstanding_balance
   )
   const portfolio_unrealized = useAppSelector(
      (state) => state.portfolio.unrealized_capital_gains
   )

   const outstanding_balance_total = portfolio_outstanding
      ?.map((item: any) => item)
      .reduce((accumulator: any, curr: any) => accumulator + curr)

   const unrealized_capital_gains_total = portfolio_unrealized
      ?.map((item: any) => item)
      .reduce((accumulator: any, curr: any) => accumulator + curr)

   const negative = portfolio_unrealized.filter(function (a) {
      return a <= 0
   })

   let unrealized_capital_gains_total_negtive = 0

   if (negative.length > 0) {
      unrealized_capital_gains_total_negtive = negative.reduce(
         (accumulator: any, curr: any) => accumulator + curr
      )
   }

   const { tracking_expected } = backtest

   return (
      <div className="grid grid-cols-4 gap-6 mt-2">
         <TotalsBox
            value={formatToMoney(outstanding_balance_total)}
            text="Investment"
            img={Investment}
            numberpositions={portfolio_outstanding.length}
         />
         <TotalsBox
            value={
               (
                  tracking_expected.expected_tracking_kpis.tracking_error * 100
               ).toFixed(2) + ' %'
            }
            text="Tracking Error"
            img={Tracking_grey}
            functInfo={() => renderPopup('trackingErrorAlert')}
            info
         />
         <TotalsBox
            value={formatToMoney(unrealized_capital_gains_total)}
            text="Unrealized Gain"
            img={Bolsa}
            functInfo={() => renderPopup('unrealizedAlert')}
            info
         />
         <TotalsBox
            value={formatToMoney(unrealized_capital_gains_total_negtive)}
            text="Harvest Oportunity"
            img={Espiga}
            functInfo={() => renderPopup('harvestingAlert')}
            info
         />
      </div>
   )
}
