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
import { Security } from 'features/utils/security'

const baseURLPaper = process.env.REACT_APP_ALPACA_URL_PAPER
const baseURLLive = process.env.REACT_APP_ALPACA_URL_LIVE

type FetchDataFuncProps = {
   type: string
   url: string
   method: 'GET' | 'POST' | 'DELETE' | 'PUT'
   payload?: any
   params?: any
}

export const alpacaApiConnect = axios.create({
   headers: {
      accept: 'application/json',
   },
   timeout: 1000 * 40,
})

export const AlpacaApi = (DataFuncProps: FetchDataFuncProps) => {
   const tokenAlpaca = Security.decrypt(String(localStorage.getItem('a1c_t')))

   let baseURL
   if (DataFuncProps.type == 'PAPER') baseURL = baseURLPaper
   else if (DataFuncProps.type == 'LIVE') baseURL = baseURLLive

   alpacaApiConnect.defaults.headers.common[
      'Authorization'
   ] = `Bearer ${tokenAlpaca}`

   return alpacaApiConnect.request({
      method: DataFuncProps.method,
      baseURL,
      url: DataFuncProps.url,
      data: DataFuncProps.payload,
      params: DataFuncProps.params,
   })
}
