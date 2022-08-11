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
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import universe from './slices/universe'
import rebalance from './slices/rebalance'
import portfolio from './slices/portfolio'
import trades from './slices/trades'
import workflow from './slices/workflow'
import portfolio_optimized from './slices/portfolio-optimized'
import static_data from './slices/static-data'
import brokers from './slices/brokers'
import taxHarvesting from './slices/tax-harvesting'

import {
   FLUSH,
   PAUSE,
   PERSIST,
   persistReducer,
   PURGE,
   REGISTER,
   REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import errors from './slices/errors'
import ideas from './slices/ideas'

export const Testing = () => {
   return 'Load Store Redux'
}

const persistConfig = {
   key: 'root',
   storage,
   blacklist: [
      'errors',
      'static_data'
   ],
}
const reducers = combineReducers({
   errors,
   taxHarvesting,
   portfolio_optimized,
   portfolio,
   rebalance,
   static_data,
   trades,
   universe,
   workflow,
   brokers,
   ideas,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
})

export type RootState = ReturnType<typeof store.getState>
