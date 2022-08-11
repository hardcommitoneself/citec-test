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
import { formatToMoney } from 'features/utils/format-to-money'
import { renderPopup } from 'features/popups/investment'

const Group = require('assets/img/group.png')

const savings = require('assets/img/savings.png')

interface PotentialsSavingsProps {
   fees: number
   taxes: number
   years: number
   serieInvestmentPerYearWithSavings: Array<number>
   serieInvestmentPerYearWithoutSavings: Array<number>
}

export const PotentialsSavings = ({
   fees,
   taxes,
   years,
   serieInvestmentPerYearWithSavings,
   serieInvestmentPerYearWithoutSavings
}: PotentialsSavingsProps) => {
   const sizeArray = serieInvestmentPerYearWithSavings.length
   const totalSavings = (
      serieInvestmentPerYearWithSavings[sizeArray - 1] -
      serieInvestmentPerYearWithoutSavings[sizeArray - 1]
   )

   return (
      <div className="box">
         <img src={savings} alt="" />
         <div className="bottom_area">
            <div className="row_custom" style={{ width: '100%' }}>
               <h3 className="potential_savings">
                  Potential savings in {years} years
                  <img
                     className="moreinfo"
                     src={Group}
                     alt=""
                     onClick={() => {
                        renderPopup('potentialSavings')
                     }}
                     style={{ marginLeft: '3px' }}
                  />
               </h3>
            </div>
            <div className="row_custom">
               <h1>Savings in fees:</h1>
               <p>{formatToMoney(Math.trunc(fees))}</p>
            </div>
            <div className="row_custom" style={{ paddingTop: '0px' }}>
               <h1>Savings in taxes:</h1>
               <p>{formatToMoney(Math.trunc(taxes))}</p>
            </div>
            <div className="footer_row row_custom">
               <h1>Total savings:</h1>
               <p>{formatToMoney(Math.trunc(totalSavings))}</p>
            </div>
         </div>
      </div>
   )
}
