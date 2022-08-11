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
import { Button } from '@mui/material'
import { formatToMoney } from 'features/utils/format-to-money'
import { AlpacaApi } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'
import { useDispatch } from 'react-redux'
import { resetBrokers } from 'store/slices/brokers'
import { useAppSelector } from 'store/hooks'

export const AlpacaBuyingPower = () => {
   const dispatch = useDispatch()

   const visibility = process.env.REACT_APP_ALPACA_VISIBILITY
   const [buyingPower, setBuyingPower] = useState(0)

   const brokers = useAppSelector((state) => state.brokers)

   useEffect(() => {
      getBuyinPower(brokers.accountTypeSelect)
      const interval = setInterval(() => {
         getBuyinPower(brokers.accountTypeSelect)
      }, 5000)

      return function cleanup() {
         clearInterval(interval)
      }
   }, [brokers.accountTypeSelect])

   const getBuyinPower = (type: string) => {
      AlpacaApi({
         type: type,
         url: 'account',
         method: 'GET',
      })
         .then(function (response) {
            setBuyingPower(response.data.buying_power)
         })
         .catch(function (error) {
            if (error.response) {
               if (error.response.status == '403') {
                  console.log(error.response.status)
                  dispatch(resetBrokers())
                  localStorage.removeItem('a1c_t')
               } else {
                  console.log(error.response.data)
                  console.log(error.response.status)
                  console.log(error.response.headers)
               }
            }
         })
   }

   return (
      <>
         {visibility == 'true' && (
            <div className="mx-10 mt-8 bg-white p-4 rounded-2xl relative balance">
               <div className="flex buying-power">
                  <h3 className="font-semibold text-[26px] text-[#2d405a]">
                     Buying Power
                  </h3>
                  <h3 className="font-semibold text-[26px] text-[#2d405a] buying-power-value">
                     {formatToMoney(Math.trunc(buyingPower))}
                  </h3>
               </div>
            </div>
         )}
      </>
   )
}
