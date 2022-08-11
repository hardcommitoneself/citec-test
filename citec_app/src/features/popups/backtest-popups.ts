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

type NamesPopup = 'perfBacktestAlert' | 'trackDiffAlert' | 'betAlert' | 'rsqrAlert'

const perfBacktestAlert = `<div class="align-left">            
<b>Backtesting</b> is the process of simulating an investment strategy using historical prices to test 
how well the strategy would have done in the past. While extended in time, the result can have a 
survival bias (holdings dropped out of the index/underperforming over that period cannot be selected). 
For this reason, the results can only be used as a reference.
</div>`

const trackDiffAlert = `<div class="align-left">            
<b>Tracking difference</b> measures the difference between the portfolio’s and benchmark’s performances.
</div>`

const betAlert = `<div class="align-left">            
<b>Beta</b> measures a stock's volatility compared to the overall market. A stock that swings more than 
the market over time has a beta above 1.0. If it swings less than the market, it has a beta below one.
</div>`

const rsqrAlert = `<div class="align-left">            
<b>R-squared</b> measures the relationship between a portfolio and its benchmark index. It is expressed 
as a percentage from one to 100. R-squared is not a measure of the portfolio’s performance. Rather, it 
measures the correlation between the portfolio's returns and the benchmark's returns.
</div>`

export const renderPopup = (name: NamesPopup, confirmButton = true) => {
   let html
   switch (name) {
      case 'perfBacktestAlert':
         html = perfBacktestAlert
         break
      case 'trackDiffAlert':
         html = trackDiffAlert
         break
      case 'betAlert':
         html = betAlert
         break
      case 'rsqrAlert':
         html = rsqrAlert
         break
      default:
         html = ''
         break
   }

   Swal.fire({
      html,
      ...commonsConfig,
      showConfirmButton: confirmButton,
   })
}
