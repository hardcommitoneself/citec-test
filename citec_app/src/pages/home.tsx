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
import { Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'

import { AppLink } from 'routes/AppLink'
import { AlpacaBalance } from 'features/brokers/alpaca/ui/components/alpaca-balance'
import { AlpacaBuyingPower } from 'features/brokers/alpaca/ui/components/alpaca-buying-power'
import { AlpacaMyInvest } from 'features/brokers/alpaca/ui/components/alpaca-my-invest'
import { InvestTable } from 'features/brokers/utils/table/invest-table'
import { LinkAccount } from 'features/brokers/link-account'
import { PageContainer } from 'features/ui/page-container'
import { renderColumnIdeas } from 'features/ui/table/columns/my-portfolios'
import { resetPortfolio } from 'store/slices/portfolio'
import { resetPortfolioOptimized } from 'store/slices/portfolio-optimized'
import { resetRebalance } from 'store/slices/rebalance'
import { resetTaxHarvesting } from 'store/slices/tax-harvesting'
import { resetTrades } from 'store/slices/trades'
import { resetUniverse } from 'store/slices/universe'
import { resetWorkflow } from 'store/slices/workflow'
import { useAppSelector } from 'store/hooks'
import { useHandlerMyIdeasTable } from 'features/utils/hooks/use-handler-my-ideas-table'
import { useValidateRegisteredUser } from 'features/utils/hooks'
import { resetStaticData } from 'store/slices/static-data'

export interface MyPortfolio {
   portfolio_id: number
   investment: number
   portfolio: string
   benchmark: string
   creation_date: string
   columnName: string
}

export const Home = () => {
   const { user } = useAuth0()
   const dispatch = useDispatch()

   const brokers = useAppSelector((state) => state.brokers)

   const { dataIdeasTable, loadIdeaOnRedux, removeIdeaFromRedux } =
      useHandlerMyIdeasTable()

   useValidateRegisteredUser(user?.email as string)

   useEffect(() => {
      dispatch(resetStaticData())
      dispatch(resetPortfolio())
      dispatch(resetUniverse())
      dispatch(resetRebalance())
      dispatch(resetPortfolioOptimized())
      dispatch(resetWorkflow())
      dispatch(resetTrades())
      dispatch(resetTaxHarvesting())
   }, [brokers.brokerConnected])

   return (
      <div>
         {brokers.brokerConnected !== '' && (
            <>
               <AlpacaBalance />
               <AlpacaBuyingPower />
               <AlpacaMyInvest />
            </>
         )}
         <PageContainer
            titlePage="My ideas"
            bgWhite
            actionBtn={
               <>
                  {brokers.brokerConnected !== 'undefined' &&
                     brokers.brokerConnected === '' && <LinkAccount />}
                  <AppLink to="/workflow">
                     <Button variant="home">
                        <span className="text-sm">Create+</span>
                     </Button>
                  </AppLink>
               </>
            }
         >
            {!!dataIdeasTable && (
               <InvestTable
                  columns={renderColumnIdeas(loadIdeaOnRedux, removeIdeaFromRedux)}
                  data={dataIdeasTable}
                  messageNoData=""
               />
            )}
         </PageContainer>
      </div>
   )
}
