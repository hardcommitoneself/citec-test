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
import { useState, useEffect } from 'react'
import { ChartHistoryPortfolio } from './alpaca-chart-history'
import { AlpacaHistory } from 'features/brokers/alpaca/utils/alpaca-history'
import { useAppSelector } from 'store/hooks'
import { formatToMoney } from 'features/utils/format-to-money'
import { numberToFixed } from 'features/utils/to-fixed-number'

export const HistoryPortfolio = (/*Propiedades*/) => {
   const [selection, setSelection] = useState('1D')
   const [dataHistory, setDataHistory] = useState([[0, 0]])
   const [equity, setEquity] = useState(0)
   const [profitLoss, setProfitLoss] = useState(0)
   const [profitLossPer, setProfitLossPer] = useState(0)

   const brokers = useAppSelector((state) => state.brokers)

   const buttons = ['1D', '1W', '1M', '3M', '1Y', 'YTD']

   useEffect(() => {
      setDataHistoryBalance(selection)

      const interval = setInterval(() => {
         setDataHistoryBalance(selection)
      }, 5000)

      return function cleanup() {
         clearInterval(interval)
      }
   }, [selection, brokers.accountTypeSelect])

   const setDataHistoryBalance = (timeline: string) => {
      AlpacaHistory(
         brokers.accountTypeSelect,
         timeline,
         (
            dataHistory: number[][],
            actualEquity: number,
            profitLoss: number,
            profitLossPer: number
         ) => {
            setDataHistory(dataHistory)
            setEquity(actualEquity)
            setProfitLoss(profitLoss)
            setProfitLossPer(profitLossPer)
         },
         (error: any) => {
            if (error.response) {
               console.log(error.response.data)
               console.log(error.response.status)
               console.log(error.response.headers)
            }
         }
      )
   }

   const updateData = (timeline: string) => {
      setSelection(timeline)
      setDataHistoryBalance(timeline)
   }

   return (
      <div>
         <div className="head-broker">
            <div className="bodyBroker">
               <img src={require('assets/img/brokers/broker-balance.png')} />
               <div className="data-head-invest">
                  <span className="label-head-invest">My Investments</span>
                  <span className="amount-balance">
                     {formatToMoney(Math.trunc(equity))}
                  </span>
               </div>
               <div
                  className={
                     profitLoss >= 0 ? 'profitloss profit' : 'profitloss loss'
                  }
               >
                  {profitLoss >= 0 ? '+' : ''}
                  {formatToMoney(profitLoss)} ({numberToFixed(profitLossPer)}%)
               </div>
            </div>
            <div className="toolbar-hitory">
               {buttons.map((btnHistory) => (
                  <button
                     key={btnHistory}
                     id={btnHistory}
                     onClick={() => updateData(btnHistory)}
                     className={
                        selection === btnHistory
                           ? 'btn-filter-history active'
                           : 'btn-filter-history'
                     }
                  >
                     {btnHistory}
                  </button>
               ))}
            </div>
         </div>
         <div id="chart">
            <ChartHistoryPortfolio data={dataHistory} />
         </div>
      </div>
   )
}
