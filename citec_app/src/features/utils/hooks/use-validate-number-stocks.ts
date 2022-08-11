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

import { inRange } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { setNumberStocks } from 'store/slices/rebalance'

export const useValidateNumberStocks = () => {
   const { pathname } = useLocation()

   const [isValidPortfolio, setIsValidPortfolio] = useState(true)
   const dispatch = useDispatch()

   const portfolioOustading = useAppSelector(
      (state) => state.portfolio.outstanding_balance
   )

   const totalPortfolio = portfolioOustading.reduce((acc, curr) => acc + curr, 0)

   const setMaxStock = (stocks: number) => {
      dispatch(setNumberStocks([10, stocks]))
   }

   const setValid = () => {
      setIsValidPortfolio(true)
   }

   const checkValidStocks = () => {
      if (totalPortfolio <= 9999) {
         setMaxStock(15)
         return setIsValidPortfolio(false)
         // https://lodash.com/docs/4.17.15#inRange
      } else if (inRange(totalPortfolio, 10000, 49999)) {
         return setMaxStock(30)
      } else if (inRange(totalPortfolio, 50000, 199999)) {
         return setMaxStock(60)
      } else if (inRange(totalPortfolio, 200000, 500000)) {
         return setMaxStock(80)
      }

      setMaxStock(200)
      setValid()
   }

   useEffect(() => {
      const _isValidPortfolio = totalPortfolio >= 10000

      if (pathname === '/criteria') setIsValidPortfolio(_isValidPortfolio)
   }, [])

   return { isValidPortfolio, checkValidStocks }
}
