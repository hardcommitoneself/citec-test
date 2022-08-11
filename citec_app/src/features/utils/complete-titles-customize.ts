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

export const completeTitle = (name: string) => {
   let missingTitle = ''

   switch (name) {
      case 'style':
         missingTitle = '(Value vs. growth)'
         break
      case 'size':
         missingTitle = '(Market Cap)'
         break
      case 'yield':
         missingTitle = '(Dividiend Yield)'
         break

      default:
         break
   }

   return missingTitle
}

export const titleLowValue = (name: string) => {
   let lowTitle = 'Low'

   switch (name) {
      case 'style':
         lowTitle = 'Value'
         break

      case 'size':
         lowTitle = 'Small'
         break

      default:
         break
   }
   return lowTitle
}

export const titleHighValue = (name: string) => {
   let highTitle = 'High'

   switch (name) {
      case 'style':
         highTitle = 'Growth'
         break

      case 'size':
         highTitle = 'Large'
         break

      default:
         break
   }
   return highTitle
}
