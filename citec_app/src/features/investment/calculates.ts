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
export const calculateProgressionSavingFeesAndTaxes = (
   years: number,
   type: string,
   investment: number,
   setInvestmentAcumulative: any,
   setSerieInvestmentPerYearWithSavings: any,
   setSerieInvestmentPerYearWithoutSavings: any
) => {
   let acumulativeSavings = 0
   let acumulativeAmount = investment
   let acumulativeAmount10Percent = investment
   const acumulativePerYearWithSavings = []
   const acumulativePerYearWithoutSavings = []
   acumulativePerYearWithSavings[0] = investment
   acumulativePerYearWithoutSavings[0] = investment

   for (let i = 1; i <= years; i++) {

      acumulativePerYearWithSavings[i] = acumulativePerYearWithSavings[i - 1] * 1.11
      acumulativePerYearWithoutSavings[i] = acumulativePerYearWithoutSavings[i - 1] * 1.08
      acumulativeAmount *= 1.11
      acumulativeAmount10Percent *= 1.1

   }

   if (type == 'fees') {
      acumulativeSavings = acumulativeAmount10Percent - acumulativePerYearWithoutSavings[years]
   } else {
      acumulativeSavings = acumulativeAmount - acumulativeAmount10Percent
   }
   setInvestmentAcumulative(acumulativeAmount)
   setSerieInvestmentPerYearWithSavings(acumulativePerYearWithSavings)
   setSerieInvestmentPerYearWithoutSavings(acumulativePerYearWithoutSavings)
   return acumulativeSavings
}