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
import { Icon } from 'assets/icons'
import CardStandard from 'features/ui/cards/card-standard'
import { BacktestRes } from 'features/utils/interfaces/backtest-api-resp'

type TotalsProps = BacktestRes

export const Totals = ({
   capital_gains,
   tracking_expected,
   fundamentals,
}: TotalsProps) => {
   const nf = new Intl.NumberFormat('en-US')

   const { unrealized_cap_losses, realized_cap_gains, outstanding_balance } =
      capital_gains
   const { expected_tracking_kpis } = tracking_expected
   const { total_positions } = fundamentals

   const calculatePercentaje = (value: number) => {
      if (value === 0) return '0'

      return (value * 100) / outstanding_balance
   }

   const cards = [
      {
         title: 'Expected tracking error',
         value: `${(expected_tracking_kpis.tracking_error * 100).toFixed(3)} %`,
         icon: <Icon.Error />,
      },
      {
         title: 'Unrealized losses to harvest',
         value: `$ ${nf.format(unrealized_cap_losses)}`,
         percentageBalance: calculatePercentaje(unrealized_cap_losses),
         numberPositions: total_positions,
         icon: <Icon.Harvest />,
      },
      {
         title: 'Realized capital gains',
         value: `$ ${nf.format(realized_cap_gains)}`,
         percentageBalance: calculatePercentaje(realized_cap_gains),
         numberPositions: total_positions,
         icon: <Icon.Capital />,
      },
   ]

   return (
      <div className="grid grid-cols-3 gap-x-11 w-full">
         {cards.map(
            ({ title, value, icon, numberPositions, percentageBalance }, i) => (
               <CardStandard key={i} className="!px-3 !py-5 flex flex-col">
                  <div className="flex flex-row justify-between relative ">
                     <h3 className="font-bold text-neutral-600 text-sm">
                        {title}
                     </h3>

                     {icon}
                  </div>

                  <span className="text-neutral-600 font-semibold text-2xl">
                     {value}
                  </span>
                  {percentageBalance && (
                     <span className="text-neutral-500 text-sm mt-2">
                        % of outstandig balance: {percentageBalance} %
                     </span>
                  )}

                  {numberPositions && (
                     <span className="text-neutral-500 text-sm mt-2">
                        Number of positions: {numberPositions}
                     </span>
                  )}
               </CardStandard>
            )
         )}
      </div>
   )
}
