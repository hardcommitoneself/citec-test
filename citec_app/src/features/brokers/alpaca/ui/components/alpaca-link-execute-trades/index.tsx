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
import {
   getAllStatus,
   getTickers,
   processBuy,
   removeCash,
} from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/execute-trades-utils'
import { TradeAlpaca } from 'features/brokers/alpaca/utils/trade-alpaca'
import { cancelPosition } from 'features/brokers/alpaca/utils/cancel-position-alpaca'
import { useAppSelector } from 'store/hooks'
import { Button } from '@mui/material'
import { executeOperations } from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/execute-trades-utils'

import Swal from 'sweetalert2'
import { useAppNavigate } from 'features/utils/hooks'
import { validateAssetsExchange } from 'features/brokers/utils/validate-assets-exchange'
import { messageHighMape } from 'features/brokers/utils/message-high-mape'


export type linkExecuteTradesProps = {
   data: any
   mape: number
}

export const LinkExecuteTrades = ({ data, mape }: linkExecuteTradesProps) => {
   const visibility = process.env.REACT_APP_ALPACA_VISIBILITY

   const navigate = useAppNavigate()

   const brokers = useAppSelector((state) => state.brokers) 

   const executeTrades = (data: any) => {

      const tickers = getTickers(removeCash(data))
      const isValid = validateAssetsExchange(brokers.accountTypeSelect, tickers)

      isValid.then((valid) => {
         if (valid) {
            Swal.fire({
               title: 'Execute trades',
               text: 'Are you sure you want to execute these trades?',
               icon: 'warning',
               showCancelButton: false,
               confirmButtonText: 'Yes, Execute it!',
               cancelButtonText: '<span style="color:#79828D">No, cancel!</span>',
               showLoaderOnConfirm: true,
               confirmButtonColor: '#9C2B85',
               reverseButtons: true,
            }).then((result) => {
               if (result.isConfirmed) {
                  Swal.fire({
                     title: 'Execute trades',
                     html: `Processing the orders:
                     <ul>                  
                        <li><b>Sell</b>: - / - trades</li>
                        <li><b>Buy</b>: - / - trades</li>
                     </ul>`,
                     allowOutsideClick: false,
                     didOpen: async () => {
                        Swal.showLoading()
                        const { sell, buy } = await executeOperations(data)
                        const totalBuy = buy.length
                        const totalSell = sell.length
                        let valBuy = 0
                        let valSell = 0
                        const ordersIds: string[] = []
      
                        sell.map(async (s) => {
                           const resultSell = await cancelPosition(
                              brokers.accountTypeSelect,
                              s.symbol
                           )
      
                           ordersIds.push(
                              resultSell !== undefined ? resultSell.data.id : 'error'
                           )
      
                           valSell++
                           Swal.update({
                              html: `Processing the orders:
                                    <ul>                                 
                                       <li><b>Sell</b>: ${valSell} / ${totalSell} trades</li>
                                       <li><b>Buy</b>: ${valBuy} / ${totalBuy} trades</li>
                                    </ul>`,
                           })
                        })
      
                        setTimeout(() => {
                           const statusOrders = getAllStatus(
                              brokers.accountTypeSelect,
                              ordersIds
                           )
      
                           const proceedToBuy = processBuy(statusOrders)
                           if (proceedToBuy) {
                              buy.map(async (b) => {
                                 await TradeAlpaca(brokers.accountTypeSelect, b)
                                 valBuy++
                                 Swal.update({
                                    html: `Processing the orders:
                                          <ul>                                    
                                             <li><b>Sell</b>: ${valSell} / ${totalSell} trades</li>
                                             <li><b>Buy</b>: ${valBuy} / ${totalBuy} trades</li>
                                          </ul>`,
                                 })
                              })
                           }
                        }, 1000)
      
                        Swal.hideLoading()
                        Swal.update({
                           showCancelButton: true,
                           showConfirmButton: false,
                           cancelButtonText: '<span style="color:#79828D">Close</span>',
                           cancelButtonColor: '#E8EFF6',
                        })
                        navigate('/')
                     },
                  })
               }
            })
         } else {
            Swal.fire({
               title: "Trades can't be executed",
               text: "Trades can't be executed because at least one of the Alpaca market assets does not match",
               icon: 'warning',
               showCancelButton: false,
               confirmButtonText: 'Ok!',
               confirmButtonColor: '#9C2B85',
               allowOutsideClick: true,
               backdrop: true
            })
         }
      })
      
   }

   if (mape > 5) {
      messageHighMape(mape)
   }

   return (
      <>
         {visibility !== 'undefined' && visibility == 'true' && (
            <div className='inline mr-3.5'>
               <Button
                  variant="actionButtonCitec"
                  className= "h-[35px] min-w-0"
                  onClick={() => executeTrades(data)}
                  data-testid="test-execute-trades"
               >
                  Execute trades
               </Button>
            </div>
            
         )}
      </>
   )
}
