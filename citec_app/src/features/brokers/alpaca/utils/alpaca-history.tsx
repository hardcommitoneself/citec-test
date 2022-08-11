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
import { formatDateforQuery } from 'features/brokers/alpaca/utils/format-date-for-query'
import { formatHistoryData } from 'features/brokers/alpaca/utils/format-history-data'

export const AlpacaHistory = (
   typeAccount: string,
   typeHistory: string,
   callback: any,
   callbackError: any
) => {
   const today = new Date()

   const params = {
      timeframe: '1D',
      date_end: formatDateforQuery(today),
      extended_hours: true,
      period: '1D',
      date_start: '',
   }

   switch (typeHistory) {
      case '1D': {
         params.timeframe = '5Min'
         params.period = '1D'
         break
      }
      case '1W': {
         params.timeframe = '1D'
         params.period = '1W'
         break
      }
      case '1M': {
         params.period = '1M'
         break
      }

      case '3M': {
         params.period = '3M'
         break
      }
      case '1Y': {
         params.period = '1A'
         break
      }
      case 'YTD': {
         params.period = '1A'
         params.date_end = ''
         params.date_start = formatDateforQuery(new Date(today.getFullYear(), 0, 1))
         break
      }

      default:
   }

   AlpacaApi({
      type: typeAccount,
      url: 'account/portfolio/history',
      method: 'GET',
      params: params,
   })
      .then(function (response) {
         if (response.data.equity.length == 0) {
            setDataHistory([], 0, 0, callback)
         } else {
            const actualEquity = getActualEquity(response.data.equity)
            const firstEquity = getFirstEquityValid(response.data.equity)

            const equityFinal = getFinalEquityWhitouthZero(
               response.data.equity,
               firstEquity as number
            )

            const finalTimestamp = getFinalTimestampMiliseconds(
               response.data.timestamp,
               typeHistory
            )
            const datos = formatHistoryData(finalTimestamp, equityFinal)

            if (typeHistory == '1D') {
               const params = {
                  timeframe: '1D',
                  date_end: formatDateforQuery(today),
                  extended_hours: true,
                  period: '1W',
               }

               AlpacaApi({
                  type: typeAccount,
                  url: 'account/portfolio/history',
                  method: 'GET',
                  params: params,
               })
                  .then(function (res) {
                     const lastPosition = res.data.equity.length - 2
                     const firstEquity = res.data.equity[lastPosition]
                     setDataHistory(datos, actualEquity, firstEquity, callback)
                  })
                  .catch(function (err) {
                     callbackError(err)
                  })
            } else {
               setDataHistory(datos, actualEquity, firstEquity, callback)
            }
         }
      })
      .catch(function (error) {
         callbackError(error)
      })
}

export function getFinalEquityWhitouthZero(
   arrayEquity: number[],
   value: number
): number[] {
   const equityFinal = arrayEquity.map(function (eq: number) {
      return eq == 0 ? value : eq
   })

   return equityFinal
}

export function getFinalTimestampMiliseconds(
   arrayTimestamp: number[],
   typeH: string
): number[] {
   if (typeH == '1D') return arrayTimestamp

   const dayInSeconds = 60 * 60 * 24 * 1
   const finalTimestamp = arrayTimestamp.map(function (timestmp, index) {
      return index != arrayTimestamp.length - 1 ? timestmp - dayInSeconds : timestmp
   })

   return finalTimestamp
}

export function getActualEquity(arrayEquity: number[]) {
   const filteredEquitys = arrayEquity.filter((equity: number) => equity !== null)
   const last = filteredEquitys.length - 1

   return filteredEquitys[last]
}

export function getFirstEquityValid(arrayEquity: number[]): number {
   const firstNumber = arrayEquity.find((element: number) => {
      return element != 0
   })

   return firstNumber as number
}

function setDataHistory(
   datos: number[][],
   ActualEquity: number,
   firstEquity: number,
   callback: any
) {
   const profitLoss = ActualEquity - (firstEquity as number)
   const profitLossPer =
      ((ActualEquity - (firstEquity as number)) / (firstEquity as number)) * 100

   callback(datos, ActualEquity, profitLoss, profitLossPer)
}
