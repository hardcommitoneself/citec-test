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
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Auth0Provider } from '@auth0/auth0-react'
import App from 'pages/app'
import './assets/styles/index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { ThemeProvider } from '@mui/material'
import { theme } from 'assets/theme/mui'

const persistor = persistStore(store)

ReactDOM.render(
   <React.StrictMode>
      <Auth0Provider
         domain={process.env.REACT_APP_AUTH0_APPLICATION_DOMAIN as string}
         clientId={process.env.REACT_APP_AUTH0_APPLICATION_CLIENT_ID as string}
         redirectUri={window.location.origin}
      >
         <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
               <Router>
                  <ThemeProvider theme={theme}>
                     <App />
                  </ThemeProvider>
               </Router>
            </PersistGate>
         </Provider>
      </Auth0Provider>
   </React.StrictMode>,
   document.getElementById('root')
)
