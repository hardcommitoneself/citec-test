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

import { useState } from 'react'
import { Spinner } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { ProviderAlpaca } from 'features/brokers/alpaca/utils/provider-alpaca'
import {
   setBrokerConnected,
   setA1c_t,
   setAccountType,
   setAccountTypeSelect,
   resetBrokers,
} from 'store/slices/brokers'
import { AlpacaApi } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'

export let requestIsValid: any

export const AlpacaOauth = () => {
   const dispatch = useDispatch()

   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   async function connectToAlpaca() {
      setLoading(true)
      const random_string = '4Frt9x6'
      const codeURI =
         `https://app.alpaca.markets/oauth/authorize?` +
         `response_type=code&` +
         `client_id=${process.env.REACT_APP_ALPACA_CLIENT_ID}&` +
         `redirect_uri=${process.env.REACT_APP_ALPACA_REDIRECT_URI}&` +
         `state=${random_string}&` +
         `scope=account:write%20trading`
      try {
         const alpacaResponse: any = await openAlpacaPopUp(codeURI)
         if (!requestIsValid(random_string, alpacaResponse.state)) {
            throw new Error('Alpaca Authentication Invalid')
         }

         const tokenAlpaca = await ProviderAlpaca.SetTokenAuth0Alpaca(
            alpacaResponse.code
         )
         if (tokenAlpaca.code == 'sucess') {
            dispatch(setBrokerConnected({ brokerConnected: 'Alpaca' }))
            dispatch(setA1c_t({ a1c_t: tokenAlpaca.value }))
            getAccountTypes()
            setLoading(false)
         } else {
            throw new Error(tokenAlpaca.value)
         }
      } catch (error) {
         let message = ''
         if (error instanceof Error) {
            message = error.message
         } else {
            message = String(error)
         }

         setError(message)
         setLoading(false)
      }
   }

   requestIsValid = (inital_state: string, returned_state: string) => {
      return inital_state === returned_state
   }

   const getAccountTypes = () => {
      AlpacaApi({
         type: 'LIVE',
         url: 'account',
         method: 'GET',
      })
         .then(function (response) {
            if (response.data.status != 'PAPER_ONLY') {
               dispatch(setAccountType({ accountType: ['PAPER', 'LIVE'] }))
            } else {
               dispatch(setAccountType({ accountType: ['PAPER'] }))
            }

            dispatch(setAccountTypeSelect({ accountTypeSelect: 'PAPER' }))
         })
         .catch(function (error) {
            if (error.response) {
               if (error.response.status == '403') {
                  dispatch(resetBrokers())
                  localStorage.removeItem('a1c_t')
               } else {
                  console.log(error.response.data)
                  console.log(error.response.status)
                  console.log(error.response.headers)
               }
            }
         })
   }

   const openAlpacaPopUp = (uri: string) => {
      return new Promise((resolve, reject) => {
         const authWindow = window.open(
            uri,
            '_blank',
            'toolbar=yes,scrollbars=yes,resizable=yes,top=400,left=400,width=500,height=400'
         )
         let snippet: any = ''

         const interval = setInterval(async () => {
            try {
               if (authWindow == null || authWindow.closed) {
                  reject('An ocurred error')
                  clearInterval(interval)
               } else {
                  snippet =
                     authWindow && authWindow.location && authWindow.location.search
               }
            } catch (e) {
               console.log((e as Error).message)
            }
            if (snippet) {
               const rawCode = snippet.substring(1)
               const code = JSON.parse(
                  '{"' + rawCode.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                  function (key, value) {
                     return key === '' ? value : decodeURIComponent(value)
                  }
               )
               authWindow?.close()
               resolve(code)
               clearInterval(interval)
            }
         }, 100)
      })
   }

   return (
      <>
         {loading ? (
            <Spinner animation="border" role="status">
               <span className="sr-only">Loading...</span>
            </Spinner>
         ) : (
            <div
               className="account-item-body"
               data-testid="lnk-alpaca-oauth"
               onClick={() => connectToAlpaca()}
            >
               <img src={require('assets/img/brokers/alpaca.png')} />
               Alpaca
            </div>
         )}
         {error && <p>{error}</p>}
      </>
   )
}
