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

export const ProviderAlpaca = {
   SetTokenAuth0Alpaca(oauth_code: string) {
      return ProviderAlpaca.setTokenAlpaca(oauth_code)
   },

   async getToken(oauth_code: string) {
      const body = {
         grant_type: 'authorization_code',
         code: oauth_code,
         client_id: process.env.REACT_APP_ALPACA_CLIENT_ID as string,
         client_secret: process.env.REACT_APP_ALPACA_CLIENT_SECRET as string,
         redirect_uri: process.env.REACT_APP_ALPACA_REDIRECT_URI as string,
      }

      const objectBody = Object.keys(body) as Array<keyof typeof body>

      const encodedBody = objectBody
         .map((key) => `${key}=${encodeURIComponent(body[key])}`)
         .join('&')

      let data = {
         code: '',
         value: '',
      }

      await axios({
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         method: 'POST',
         url: 'https://api.alpaca.markets/oauth/token',
         data: encodedBody,
      })
         .then(function (response) {
            data = {
               code: 'sucess',
               value: response.data.access_token,
            }
         })
         .catch(function (error) {
            data = {
               code: 'error',
               value: error,
            }
         })

      return data
   },

   async setTokenAlpaca(code: string) {
      const token = await ProviderAlpaca.getToken(code)
      return token
   },
}
