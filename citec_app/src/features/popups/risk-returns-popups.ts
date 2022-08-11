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

type NamesPopup = 'valueAtRisk' | 'risk' | 'concentration' | 'top10'

const valueAtRisk = `<div class="align-left">
<b>Value at risk</b> quantifies the portfolio’s possible financial losses 
(in dollars or in percentage) over a specific time frame at a 
defined confidence level..
</div>`

const risk = `<div class="align-left">
<b>Risk vs. return</b> analysis is used to determine how close your portfolio is to 
the efficiency frontier, compared to the benchmark. The efficiency frontier refers 
to the highest returns at a given level of risk. A portfolio is said to be efficient 
if no other portfolio offers higher returns for a lower or equal amount of risk. 
Where portfolios are located on the efficiency frontier depends on the investor’s 
degree of risk tolerance.
</div>`

const concentration = `<div class="align-left">
<b>Concentration</b> Analysis helps you understand the level of exposure to the companies in which 
you are investing more money. The graph shows the accumulated exposure to top positions, this means 
if you select 10 stocks in the x axis the y axis shows the percentage of the money invested in 
the top 10 positions.
</div>`

const top10 = `   <div class="align-left">
   Here are the <b>top 10 companies</b> with higher level of investment (Money invested)
   </div>`

export const renderPopup = (name: NamesPopup) => {
   let html
   switch (name) {
      case 'valueAtRisk':
         html = valueAtRisk
         break
      case 'risk':
         html = risk
         break
      case 'concentration':
         html = concentration
         break
      case 'top10':
         html = top10
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
