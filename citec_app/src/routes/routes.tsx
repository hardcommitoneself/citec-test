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

import type { RouteObject } from 'react-router-dom'
import {
   Criteria,
   Error404,
   Home,
   Investment,
   PortfolioAnalysis,
   PortfolioLoader,
   Profile,
   StripeForm,
   StripePageCancel,
   StripePageSuccess,
   Summary,
   TaxHarvesting,
   UniverseScreener,
   Workflow,
} from 'pages'
import { Layout } from 'features/ui/layout'

export type Paths =
   | '/'
   | '/dashboard'
   | '/criteria'
   | '/investment'
   | '/old-portfolio-analysis'
   | '/portfolio-analysis'
   | '/portfolio-analysis'
   | '/portfolio-loader'
   | '/profile'
   | '/subscriptions'
   | '/subscriptions/cancel'
   | '/subscriptions/success'
   | '/summary'
   | '/tax-harvesting'
   | '/universe-screener'
   | '/workflow'

type FunctionalPaths = '*' | 'goBack'

export type AllPaths = Paths | FunctionalPaths

type Routes = Omit<RouteObject, 'path' | 'children'> & {
   path?: AllPaths
   children?: Omit<RouteObject, 'path'> &
      {
         path?: AllPaths
      }[]
}

export const routes: Routes[] = [
   {
      path: '/',
      element: <Layout />,
      children: [
         { element: <Criteria />, path: '/criteria' },
         { element: <Home />, index: true },
         { element: <Investment />, path: '/investment' },
         { element: <Summary />, path: '/summary' },
         { element: <TaxHarvesting />, path: '/tax-harvesting' },
         { element: <UniverseScreener />, path: '/universe-screener' },
         { element: <Workflow />, path: '/workflow' },
      ],
   },
   {
      path: '/',
      element: <Layout hiddenLeftbar />,
      children: [
         { element: <PortfolioLoader />, path: '/portfolio-loader' },
         { element: <PortfolioAnalysis />, path: '/portfolio-analysis' },
         { element: <Profile />, path: '/profile' },
      ],
   },
   { path: '/subscriptions', element: <StripeForm /> },
   { path: '/subscriptions/success', element: <StripePageSuccess /> },
   { path: '/subscriptions/cancel', element: <StripePageCancel /> },
   { path: '*', element: <Error404 /> },
]
