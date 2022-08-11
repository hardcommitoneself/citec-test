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
import { useAppSelector } from 'store/hooks'
import { SummaryResp } from '../interfaces/universes-bases-resp'
import { fetchDataFromCitecApi } from '../api/citec-api'

export interface Universe {
   number_stocks: number
   market_cap: number
   pe: number
   pb: number
   dividend_yield: number
}

const initialState = {
   dividend_yield: 0,
   market_cap: 0,
   number_stocks: 0,
   pb: 0,
   pe: 0,
}

export const useGetCustomUniverse = () => {
   const { universe } = useAppSelector((state) => state)
   const { factors_filter, sectors_filter, to_exclude, to_include, universe_base } =
      universe

   const [customUniverse, setCustomUniverse] = useState<Universe>(initialState)

   const getUniverseDetail = async () => {
      const factors_keys: string[] = []
      const lower: number[] = []
      const upper: number[] = []

      factors_filter.forEach((factor) => {
         factors_keys.push(factor.factor)
         lower.push(factor.ranges[0] / 100)
         upper.push(factor.ranges[1] / 100)
      })
      const payload = {
         universe_base: {
            name: universe_base,
            description: universe_base,
         },
         factors_filter: {
            factor: factors_keys,
            lower,
            upper,
         },
         sectors_filter,
         to_include,
         to_exclude,
      }

      try {
         const { data } = await fetchDataFromCitecApi<SummaryResp>({
            endpoint: '/ai/universe/summary/',
            method: 'POST',
            payload,
         })

         setCustomUniverse(data)
      } catch (error: any) {
         console.log(error.response)
      }
   }

   useEffect(() => {
      getUniverseDetail()
   }, [sectors_filter, factors_filter, universe_base, to_include, to_exclude])

   return customUniverse
}
