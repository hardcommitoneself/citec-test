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

import { Outlet, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AppNavigate, Paths } from 'routes'
import { Topbar } from './topbar'
import {
   useValidateSoldPosition,
   useValidateTickers,
   useValidationPorfolioLoaded,
} from 'features/utils/hooks'
import Leftbar from './leftbar/leftbar-container'
import { useAppSelector } from 'store/hooks'

interface LayoutProps {
   hiddenLeftbar?: boolean
}

export const Layout = ({ hiddenLeftbar }: LayoutProps) => {
   const { pathname } = useLocation()
   const workflow = useAppSelector((state) => state.workflow.type)
   const tickers = useAppSelector((state) => state.portfolio.ticker)

   const { isPortfolioLoaded, pagesThatNoNeedPortofolioLoaded } =
      useValidationPorfolioLoaded()

   const { pagesThatNeedSoldPosition, isSomeSellPosition, is10PercentSold } =
      useValidateSoldPosition()

   const { isSomeInvalidTicker, pagesThatNoNeedTickerValidation } =
      useValidateTickers(tickers)

   const workflowWithSoldValidation = ['load', 'rebalance']

   let to = ''

   const renderPopup = (errorMsg: string) => {
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: errorMsg,
      })
   }

   if (
      isPortfolioLoaded &&
      isSomeInvalidTicker &&
      !pagesThatNoNeedTickerValidation.includes(pathname as Paths)
   ) {
      renderPopup('Please review the tickets in your portfolio')
      to = '/portfolio-loader'
   }

   if (
      !isPortfolioLoaded &&
      !pagesThatNoNeedPortofolioLoaded.includes(pathname as Paths)
   ) {
      renderPopup('You need to upload a portfolio')

      to = '/workflow'
      return <AppNavigate to={to as Paths} />
   }

   if (workflowWithSoldValidation.includes(workflow)) {
      if (
         pagesThatNeedSoldPosition.includes(pathname as Paths) &&
         !is10PercentSold
      ) {
         renderPopup('You need to sell at least 10% of the portfolio to continue')
         to = '/tax-harvesting'
      }

      if (
         pagesThatNeedSoldPosition.includes(pathname as Paths) &&
         !isSomeSellPosition
      ) {
         renderPopup('You need to sell some position')

         to = '/tax-harvesting'
      }
   }

   let classNameContent = 'container-with-left'
   if (hiddenLeftbar) classNameContent = 'w-full'

   if (to && workflowWithSoldValidation.includes(workflow))
      return <AppNavigate to={to as Paths} />

   return (
      <div className="min-h-screen flex" data-testid="bars">
         <Leftbar hidden={hiddenLeftbar} />
         <div className={classNameContent}>
            <Topbar color={hiddenLeftbar ? 'green' : 'white'} />

            <Outlet />
         </div>
      </div>
   )
}
