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
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDataFromCitecApi } from 'features/utils/api/citec-api'
import { UniversesBaseResp } from 'features/utils/interfaces/universes-bases-resp'
import {
   ListBenchmark,
   Objective,
} from 'features/utils/interfaces/redux/rebalance-state'

export const getUniverseData = async () => {
   const universesPromise = fetchDataFromCitecApi<UniversesBaseResp[]>({
      endpoint: '/settings/universe_bases',
      method: 'GET',
   })

   const sectorsPromise = fetchDataFromCitecApi<string[]>({
      endpoint: '/settings/sectors',
      method: 'GET',
   })

   const factorsPromise = fetchDataFromCitecApi<string[]>({
      endpoint: '/settings/factors',
      method: 'GET',
   })

   const [universesResp, sectorsResp, factorsResp] = await Promise.all([
      universesPromise,
      sectorsPromise,
      factorsPromise,
   ])

   const sectorsFiltered = sectorsResp.data.filter((sector) => sector !== 'N/A')

   const factorsWithRange = factorsResp.data.map((factor) => ({
      factor,
      ranges: [0, 100],
   }))

   return {
      universes: universesResp.data,
      sectors: sectorsFiltered,
      factors_filter: factorsWithRange,
      factors: factorsResp.data,
   }
}

export const fetchStaticUniverseData = createAsyncThunk(
   'setStaticData/universe',
   getUniverseData
)

export const getRelabanceData = async () => {
   const benchmarkPromise = fetchDataFromCitecApi<ListBenchmark[]>({
      endpoint: '/settings/benchmarks',
      method: 'GET',
   })

   const portfolioObjPromise = fetchDataFromCitecApi<Objective[]>({
      endpoint: '/settings/portfolio_objectives',
      method: 'GET',
   })

   const [benchmarkResp, portfolioObjResp] = await Promise.all([
      benchmarkPromise,
      portfolioObjPromise,
   ])

   return {
      objectives: portfolioObjResp.data,
      benchmarks: benchmarkResp.data,
   }
}

export const fetchStaticRebalanceData = createAsyncThunk(
   'setStaticData/rebalance',
   getRelabanceData
)
