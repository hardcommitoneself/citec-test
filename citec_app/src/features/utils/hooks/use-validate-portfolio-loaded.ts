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

import { Paths } from 'routes/routes'
import { useAppSelector } from 'store/hooks'

export const useValidationPorfolioLoaded = () => {
   const outstandingBalance = useAppSelector(
      (state) => state.portfolio.outstanding_balance
   )
   const tickers = useAppSelector((state) => state.portfolio.ticker)
   const unrealizedCapitalGains = useAppSelector(
      (state) => state.portfolio.unrealized_capital_gains
   )

   const portfolioValues = [
      outstandingBalance.length,
      tickers.length,
      unrealizedCapitalGains.length,
   ]

   const isPortfolioLoaded = portfolioValues.every((value) => value !== 0)

   const pagesThatNoNeedPortofolioLoaded: Paths[] = [
      '/',
      '/workflow',
      '/portfolio-loader',
      '/investment',
      '/profile',
      '/universe-screener',
   ]

   return { isPortfolioLoaded, pagesThatNoNeedPortofolioLoaded }
}
