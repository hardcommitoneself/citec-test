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
import { OrderAlpaca } from 'features/brokers/alpaca/utils/trades-to-order-alpaca'
import { AlpacaApi } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'
import { getLatestPrices } from 'features/brokers/utils/get-latest-prices'
import { getTradesToOrders } from 'features/brokers/utils/get-trades-to-orders'
import { getTradesToOrderAlpaca } from 'features/brokers/alpaca/utils/trades-to-order-alpaca'
import { Trades } from 'features/utils/interfaces/trades'

export function separateTrades(data: OrderAlpaca[]) {
   const sell: OrderAlpaca[] = []
   const buy: OrderAlpaca[] = []

   data.map((stock: any) => {
      if (stock.side == 'sell') sell.push(stock)
      else buy.push(stock)
   })

   return { sell, buy }
}

export function getTickers(data: Trades[]) {
   const tickets: string[] = []

   data.map((stock: any) => {
      tickets.push(stock.ticker)
   })

   return tickets
}

export function removeCash(data: Trades[]) {
   const filteredData: Trades[] = []

   data.map((stock: any) => {
      if (stock.ticker != '$CASH') filteredData.push(stock)
   })

   return filteredData
}

export function getMape(data: Trades[]) {

   let sumAbsoluteDelta = 0
   let totalVolume = 0
   let mape = 0

   if ( data.length == 0) {
      return mape
   }

   data.map((stock: any) => {
      sumAbsoluteDelta += Math.abs(stock.delta_volume)
      totalVolume += stock.volume
   })

   if ( totalVolume != 0) {
      mape = Math.round((sumAbsoluteDelta/totalVolume) * 10000) / 100
   }

   return mape
}

export function getAllStatus(type: string, ordersIds: string[]) {
   const statusOrders: string[] = []

   const getStatus = async (type: string, id: string) => {
      const data = await AlpacaApi({
         type: type,
         url: 'orders/' + id,
         method: 'GET',
      })
      return data.data.status
   }

   for (const id of ordersIds) {
      if (id == 'error') {
         statusOrders.push(id)
      } else {
         getStatus(type, id).then((value) => {
            statusOrders.push(value)
         })
      }
   }
   return statusOrders
}

export function processBuy(statusOrders: string[]) {
   let toProcess = true
   let i = 0
   while (toProcess && i < statusOrders.length) {
      if (statusOrders[i] != 'filled') {
         toProcess = false
      }
      i++
   }
   return toProcess
}

export async function executeOperations(data: any) {
   const filteredData = removeCash(data)

   const tickets = getTickers(filteredData)

   const latestPrices = await getLatestPrices(tickets)

   const dataPrepared = {
      trades: filteredData,
      latest_prices: latestPrices,
   }

   const tradesToOrders = await getTradesToOrders(dataPrepared)

   const tradesToOrdersAlpaca = getTradesToOrderAlpaca(tradesToOrders)

   const { sell, buy } = separateTrades(tradesToOrdersAlpaca)

   return { sell, buy }
}
