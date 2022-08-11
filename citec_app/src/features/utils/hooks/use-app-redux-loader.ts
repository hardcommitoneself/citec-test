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
import { useEffect } from 'react'
import {
   fetchStaticRebalanceData,
   fetchStaticUniverseData,
} from 'store/slices/static-data/thunk'
import { fetchIdeas } from 'store/slices/ideas/thunk'
import { useAppSelector } from 'store/hooks'

export const useAppReduxLoader = (token: string | null) => {
   const dispatch = useDispatch()

   const universes = useAppSelector((state) => state.static_data.universe.universes)
   const ideas = useAppSelector((state) => state.ideas)
   const isUniversesOnRedux = universes.length > 1
   const isIdeasOnRedux = ideas.length > 0

   useEffect(() => {
      //get all static data
      if (token && !isUniversesOnRedux) {
         setTimeout(() => {
            dispatch(fetchStaticUniverseData())
            dispatch(fetchStaticRebalanceData())
         }, 500) // Timeout for Testing app.test.tsx
      }
      if (token && !isIdeasOnRedux) {
         dispatch(fetchIdeas())
      }
   }, [token, universes])

   return null
}
