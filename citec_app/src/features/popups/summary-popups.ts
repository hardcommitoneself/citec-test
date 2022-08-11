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

type NamesPopup = 'realizedGains'

const realizedGains = `<div class="align-left">
<b>Realized Capital Gains</b> are the Capital Gains / losses  resolting from selling certain positions. 
These positions are subject to taxes. Realized Gains can be divided in Short-Term Capial Gains (Positions held for less than a year)
 and Long-Term Capital Gains (Positions held for more than one year).
</div>`


export const renderPopup = (name: NamesPopup) => {
   let html
   switch (name) {
      case 'realizedGains':
         html = realizedGains
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
