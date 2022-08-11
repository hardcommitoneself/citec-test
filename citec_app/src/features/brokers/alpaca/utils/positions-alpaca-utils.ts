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
import { MyInvestments } from 'features/brokers/alpaca/ui/components/alpaca-my-invest'
import { numberToFixed } from 'features/utils/to-fixed-number'

export function getStockForValidation(dataPosition: any) {
   const stocks: string[] = []

   if (dataPosition) {
      dataPosition.map((pos: any) => {
         if (pos.asset_class != 'crypto') stocks.push(pos.symbol)
      })
   }

   return stocks
}

export function getTypeStock(stock: string, arrayStocks: any) {
   const searchIndex = arrayStocks.findIndex((stc: any) => stc.ticker == stock)
   return arrayStocks[searchIndex].asset_type
}

export function buildDataInvest(dataPosition: any, DataStock: any) {
   const us_equity_positions: MyInvestments[] = []
   const crypto_positions: MyInvestments[] = []
   const etf_positions: MyInvestments[] = []
   let us_equity_sum = {
      qtys: 0,
      costo: 0,
      invest: 0,
      profit_loss_total: 0,
      profit_los_day: 0,
   }
   let crypto_sum = {
      qtys: 0,
      costo: 0,
      invest: 0,
      profit_loss_total: 0,
      profit_los_day: 0,
   }

   let etf_sum = {
      qtys: 0,
      costo: 0,
      invest: 0,
      profit_loss_total: 0,
      profit_los_day: 0,
   }

   const allowed_types = ['Common Stock', 'REIT']

   if (dataPosition) {
      dataPosition.map((position: any, index: number) => {
         const data = {
            asset_class: position.symbol,
            quantity: position.qty,
            price: position.current_price,
            investment: position.market_value,
            day_gain_loss: [
               position.unrealized_intraday_pl,
               numberToFixed(Number(position.unrealized_intraday_plpc) * 100),
            ],
            total_gain_loss: [
               position.unrealized_pl,
               numberToFixed(Number(position.unrealized_plpc) * 100),
            ],
            url_logo: DataStock[index]?.url_logo,
            subRows: undefined,
         }
   
         if (position.asset_class == 'us_equity') {
            const type = getTypeStock(position.symbol, DataStock)
            if (allowed_types.includes(type)) {
               us_equity_positions.push(data)
               us_equity_sum = {
                  qtys: Number(us_equity_sum.qtys) + Number(position.qty),
                  costo: Number(us_equity_sum.costo) + Number(position.cost_basis),
                  invest: Number(us_equity_sum.invest) + Number(position.market_value),
                  profit_loss_total:
                     Number(us_equity_sum.profit_loss_total) +
                     Number(position.unrealized_pl),
                  profit_los_day:
                     Number(us_equity_sum.profit_los_day) +
                     Number(position.unrealized_intraday_pl),
               }
            } else {
               etf_positions.push(data)
               etf_sum = {
                  qtys: Number(etf_sum.qtys) + Number(position.qty),
                  costo: Number(etf_sum.costo) + Number(position.cost_basis),
                  invest: Number(etf_sum.invest) + Number(position.market_value),
                  profit_loss_total:
                     Number(etf_sum.profit_loss_total) + Number(position.unrealized_pl),
                  profit_los_day:
                     Number(etf_sum.profit_los_day) +
                     Number(position.unrealized_intraday_pl),
               }
            }
         } else {
            crypto_positions.push(data)
            crypto_sum = {
               qtys: Number(crypto_sum.qtys) + Number(position.qty),
               costo: Number(crypto_sum.costo) + Number(position.cost_basis),
               invest: Number(crypto_sum.invest) + Number(position.market_value),
               profit_loss_total:
                  Number(crypto_sum.profit_loss_total) + Number(position.unrealized_pl),
               profit_los_day:
                  Number(crypto_sum.profit_los_day) +
                  Number(position.unrealized_intraday_pl),
            }
         }
      })
   }

   let us_equity = {} as MyInvestments
   if (us_equity_positions.length > 0) {
      us_equity = {
         asset_class: 'US Equities',
         quantity: us_equity_sum.qtys,
         price: 0,
         investment: us_equity_sum.invest,
         day_gain_loss: [
            us_equity_sum.profit_los_day,
            numberToFixed(
               (us_equity_sum.profit_los_day /
                  (us_equity_sum.invest - us_equity_sum.profit_los_day)) *
                  100
            ),
         ],
         total_gain_loss: [
            us_equity_sum.profit_loss_total,
            numberToFixed(
               (us_equity_sum.profit_loss_total / us_equity_sum.costo) * 100
            ),
         ],

         subRows: us_equity_positions,
      }
   }
   let crypto = {} as MyInvestments
   if (crypto_positions.length > 0) {
      crypto = {
         asset_class: 'Crypto',
         quantity: crypto_sum.qtys,
         price: 0,
         investment: crypto_sum.invest,
         day_gain_loss: [
            crypto_sum.profit_los_day,
            numberToFixed(
               (crypto_sum.profit_los_day /
                  (crypto_sum.invest - crypto_sum.profit_los_day)) *
                  100
            ),
         ],
         total_gain_loss: [
            crypto_sum.profit_loss_total,
            numberToFixed((crypto_sum.profit_loss_total / crypto_sum.costo) * 100),
         ],
         subRows: crypto_positions,
      }
   }

   let etf = {} as MyInvestments
   if (etf_positions.length > 0) {
      etf = {
         asset_class: 'ETF',
         quantity: etf_sum.qtys,
         price: 0,
         investment: etf_sum.invest,
         day_gain_loss: [
            etf_sum.profit_los_day,
            numberToFixed(
               (etf_sum.profit_los_day / (etf_sum.invest - etf_sum.profit_los_day)) *
                  100
            ),
         ],
         total_gain_loss: [
            etf_sum.profit_loss_total,
            numberToFixed((etf_sum.profit_loss_total / etf_sum.costo) * 100),
         ],
         subRows: etf_positions,
      }
   }
   const respuesta = []

   if (Object.entries(us_equity).length > 0) respuesta.push(us_equity)
   if (Object.entries(crypto).length > 0) respuesta.push(crypto)
   if (Object.entries(etf).length > 0) respuesta.push(etf)

   return respuesta
}
