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

import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { detectIncognito } from '../detect-incognito'

export const useGetAuth0Token = () => {
   const [token, setToken] = useState<string | null>(null)

   const auth0Props = useAuth0()
   const { getAccessTokenSilently, logout } = auth0Props

   const getToken = async () => {
      try {
         const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: 'read:current_user',
         })
         localStorage.setItem('token', accessToken)
         setToken(accessToken)
      } catch (e: any) {
         console.log(e.message)

         throw new Error('token auth0 empty')
      }
   }

   useEffect(() => {
      const detectIncognitoTimeout = setTimeout(() => {
         detectIncognito().then(({ isPrivate, browserName }) => {
            if (isPrivate && browserName !== 'Unknown') {
               return Swal.fire({
                  title: `Error in your credentials`,
                  text: `For security reasons this application does not support browsers in incognito mode, if
                     this is the case please open the application in a browser in public browsing mode
                     \n- You will be redirected back to the Login page`,
               }).then(() => logout())
            }
            getToken()
         })
      }, 2000)

      return () => {
         clearTimeout(detectIncognitoTimeout)
      }
   }, [])

   return { ...auth0Props, token }
}
