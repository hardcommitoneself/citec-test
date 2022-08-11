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
import axios from 'axios'
import QueryString from 'qs'

const baseURL = process.env.REACT_APP_API_URL

type FetchDataFuncProps = {
   endpoint: string
   method: 'GET' | 'POST' | 'DELETE' | 'PUT'
   payload?: any
   params?: any
}

export const citecApi = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
   },
   timeout: 1000 * 30,
   paramsSerializer(params) {
      return QueryString.stringify(params, { encode: false })
   },
})

export const fetchDataFromCitecApi = <T>({
   method,
   endpoint,
   payload,
   params,
}: FetchDataFuncProps) => {
   const token = localStorage.getItem('token')

   citecApi.defaults.headers.common['Authorization'] = `Bearer ${token}`

   const lastCharEndpoint = endpoint.substr(endpoint.length - 1)
   if (lastCharEndpoint != '/') endpoint += '/'

   return citecApi.request<T>({
      method,
      url: endpoint,
      data: payload,
      params,
   })
}
