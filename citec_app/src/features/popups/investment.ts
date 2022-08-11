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
import Swal from 'sweetalert2'
import { commonsConfig } from './commons-config'

type NamesPopup =
   | 'investment'
   | 'potentialSavings'
   | 'chartSimulations'

const investment = `<div class="align-left">
How much money you should Investment in <u>US Equities?</u>
<br>
&bull; Define how much money you want to allocate to <u>liquid assets</u>
<br>
&bull; Define your <u>Asset Allocation</u> based on your needs and risk tolerance (Typicaly US Equities goes from 40% to 70% of the portfolio)
   </div>`

const potentialSavings = `<div class="align-left">
You can save thousands of dollars by directly managing your money and investing directly in stocks and bonds:
<br>
&bull; <u>Advisory fees</u>: Eliminate fees payed to Wealth Managers (~1.5% a year)
<br>
&bull; <u>Structoring fees</u>: Eliminate fees payed to Asset Managers (~0.5% a year)
<br>
&bull; <u>Tax Alpha</u>: reduce overall tax bill by systematically harvest tax lossess (~1% a year)
   </div>`

const chartSimulations = `<div class="align-left">
<b>Key assumptions:</b>
<br>
&bull; <u>US Equity Market Returns </u>(~10.5% a year)
<br>
&bull; <u>Total Fees</u> including Advisory, Structoring, Trading (~2% a year)
<br>
&bull; <u>Tax Alpha</u> (~1.0%)
   </div>`


export const renderPopup = (name: NamesPopup) => {
   let html
   switch (name) {
      case 'investment':
         html = investment
         break
      case 'potentialSavings':
         html = potentialSavings
         break
      case 'chartSimulations':
         html = chartSimulations
         break
      default:
         html = ''
         break
   }

   Swal.fire({
      html,
      ...commonsConfig,
   })
}
