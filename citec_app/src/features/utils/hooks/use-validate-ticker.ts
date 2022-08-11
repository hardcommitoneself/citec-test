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
import { fetchDataFromCitecApi } from '../api/citec-api'
import { ValidationTickersResp } from '../interfaces/ticker-validation-resp'
import { useDebounce } from './use-debounce'

export const useValidateTicker = (ticker: string) => {
   const [isValidTicker, setIsValidTicker] = useState(false)
   const debouncedValue = useDebounce(ticker)

   const validateTicker = async () => {
      setIsValidTicker(false)

      if (ticker.length === 0) return

      const { data } = await fetchDataFromCitecApi<ValidationTickersResp[]>({
         endpoint: '/ai/assets/stocks_summary',
         method: 'POST',
         params: {
            detail: false,
         },
         payload: [ticker],
      })
      const isInvalidTicker = data[0].name === 'missing'

      setIsValidTicker(!isInvalidTicker)
   }

   useEffect(() => {
      validateTicker()
   }, [debouncedValue])

   return isValidTicker
}
