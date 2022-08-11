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
import { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { Loading } from 'features/ui'
import { routes } from 'routes'
import { useAppReduxLoader, useGetAuth0Token, useAppSubscriptions } from 'features/utils/hooks'

import TagManager from 'react-gtm-module'

function App() {
   const { pathname } = useLocation()

   const { isAuthenticated, isLoading, loginWithRedirect, error, logout, token, user } =
      useGetAuth0Token()

   const location = useLocation()

   useAppReduxLoader(token)

   useEffect(() => {
      if (error?.message === 'Access denied.') {
         logout()
      }

   }, [])

   useAppSubscriptions(user, pathname)

   useEffect(() => {
      const tagManagerArgs = {
         gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID as string
      }

      TagManager.initialize(tagManagerArgs)

   }, [location])

   const element = useRoutes(routes)

   if (isLoading) return <Loading />

   return (
      <div className="App" data-testid="app-container">
         {isAuthenticated ? element : loginWithRedirect()}
      </div>
   )
}

export default App