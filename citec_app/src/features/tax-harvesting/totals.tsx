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

import { TotalsBox } from 'features/ui/cards'
import { formatToMoney } from 'features/utils/format-to-money'
import { useAppSelector } from 'store/hooks'

export const TotalsTaxHarvesting = () => {
   const taxHarvestingState = useAppSelector((state) => state.taxHarvesting)

   const {
      arrayPositionSelected,
      unrealizedCapitalGains,
      unrealizedCapitalGainsNegative,
   } = taxHarvestingState

   const negativePositionsSelected = arrayPositionSelected
      .map((values) => values.unrealized_capital_gains)
      .filter((values) => values < 0)

   let totalNegativesPositionsSelected = 0

   if (negativePositionsSelected.length > 0) {
      totalNegativesPositionsSelected = negativePositionsSelected.reduce(
         (prev, curr) => prev + curr
      )
   }

   const unrealizedCapitalGainsNumber = formatToMoney(unrealizedCapitalGains)

   const totalHarvestinOpportunity =
      unrealizedCapitalGainsNegative - totalNegativesPositionsSelected

   const harvestingOpportunityNumber = formatToMoney(totalHarvestinOpportunity)

   const lossesHarvestedNumber = formatToMoney(totalNegativesPositionsSelected)

   const cards = [
      {
         img: require('assets/img/bolsa.png'),

         title: ' Unrealized Gains',
         value: unrealizedCapitalGainsNumber,
      },
      {
         img: require('assets/img/espiga.png'),
         title: 'Harvesting Opportunity',
         value: harvestingOpportunityNumber,
      },
      {
         img: require('assets/img/espiga_gray.png'),
         title: 'Losses Harvested',
         value: lossesHarvestedNumber,
      },
   ]

   return (
      <div className="w-full grid grid-cols-3 gap-11 ">
         {cards.map(({ title, value, img }, i) => (
            <TotalsBox key={i} img={img} value={value} text={title} bgWhite />
         ))}
      </div>
   )
}
