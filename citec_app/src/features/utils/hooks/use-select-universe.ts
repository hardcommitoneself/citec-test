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

import { useDispatch } from 'react-redux'
import { useAppSelector } from 'store/hooks'
import { setBenchmark } from 'store/slices/rebalance'
import { setUniverseBase } from 'store/slices/universe'

export const useSelectUniverse = () => {
   const dispatch = useDispatch()
   const objectives = useAppSelector(
      (state) => state.static_data?.rebalance.benchmarks
   )

   const handleSelectBenckmark = (ticker: string) => {
      const propsUniverseTicker = objectives.find(
         (universe) => universe.ticker === ticker
      )

      dispatch(setUniverseBase(propsUniverseTicker?.description))

      dispatch(setBenchmark(ticker))
   }

   const handleSelectUniverse = (universeName: string) => {
      const propsUniverseTicker = objectives.find(
         (universe) => universe.description === universeName
      )

      dispatch(setUniverseBase(universeName))
      dispatch(setBenchmark(propsUniverseTicker?.ticker))
   }
   return { handleSelectBenckmark, handleSelectUniverse }
}
