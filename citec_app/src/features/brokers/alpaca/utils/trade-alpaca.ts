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
import { AlpacaApi } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'
import { OrderAlpaca } from 'features/brokers/alpaca/utils/trades-to-order-alpaca'

export const TradeAlpaca = (type: string, order: OrderAlpaca) => {
   const getTradeAlpaca = async (type: string, order: OrderAlpaca) => {
      try {
         const data = await AlpacaApi({
            type: type,
            url: 'orders',
            method: 'POST',
            payload: JSON.stringify(order),
         })
         
         return data
      } catch (error: any) {
         if (error.response) {
            console.log('error', order)
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
         }
      }
   }

   return getTradeAlpaca(type, order)
}
