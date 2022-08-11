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

import { useEffect, useState } from 'react'
import { Paths } from 'routes'
import { fetchDataFromCitecApi } from '../api/citec-api'
import { ValidationTickersResp } from '../interfaces/ticker-validation-resp'

export const useValidateTickers = (tickers: string[]) => {
   const [invalidTickers, setInvalidTickers] = useState<string[]>([])

   const isSomeInvalidTicker = invalidTickers.length > 0
   const isTableLoaded = tickers.length > 0

   const validateTickers = async () => {
      const { data: validatedTickers } = await fetchDataFromCitecApi<
         ValidationTickersResp[]
      >({
         endpoint: '/ai/assets/stocks_summary/',
         method: 'POST',
         params: {
            detail: false,
         },
         payload: tickers,
      })

      const invalidNameTickers = []

      for (let index = 0; index < validatedTickers.length; index++) {
         const { name, ticker } = validatedTickers[index]
         if (name === 'missing') invalidNameTickers.push(ticker)
      }

      setInvalidTickers(invalidNameTickers)
   }

   const pagesThatNoNeedTickerValidation: Paths[] = [
      '/',
      '/workflow',
      '/portfolio-loader',
      '/profile',
   ]

   useEffect(() => {
      if (isTableLoaded) {
         validateTickers()
      }
   }, [tickers])

   return { invalidTickers, isSomeInvalidTicker, pagesThatNoNeedTickerValidation }
}
