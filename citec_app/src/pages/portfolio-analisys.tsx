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
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'

import { BacktestRes } from 'features/utils/interfaces/backtest-api-resp'

import { Loading } from 'features/ui'
import { PageContainer } from 'features/ui/page-container'
import { PortfolioAnalisysResp } from 'features/utils/interfaces/portfolio-analysis-resp'
import { PositionsResp } from 'features/utils/interfaces/positions-resp'
import { setPortfolioAnalysis, setPortfolioPositions } from 'store/slices/portfolio'
import { useAppNavigate, useFetchApi } from 'features/utils/hooks'
import { useAppSelector } from 'store/hooks'
import {
   RiskreturnTab,
   Backtest,
   OverviewTab,
   Positions,
} from 'features/portfolio-analisys/tabs'
import { savePortfolio } from 'features/utils/save-portfolio'

export const PortfolioAnalysis = () => {
   const navigate = useAppNavigate()

   const { ticker, outstanding_balance, unrealized_capital_gains } = useAppSelector(
      (state) => state.portfolio
   )

   const outstanding_balance_total = outstanding_balance?.reduce(
      (accumulator, curr) => accumulator + curr
   )

   const benchmark = useAppSelector((state) => state.rebalance.benchmark)

   const { resp, isLoading, error } = useFetchApi<PortfolioAnalisysResp>({
      endpoint: '/ai/portfolio/analysis',
      method: 'POST',
      params: {
         hist_w: 5000,
      },
      payload: {
         portfolio: 'myportfolio',
         benchmark,
         ticker,
         outstanding_balance,
         unrealized_capital_gains,
      },
   })
   const { resp: backtest } = useFetchApi<BacktestRes>({
      endpoint: '/ai/portfolio/backtest',
      method: 'POST',
      params: {
         hist_w: 365,
      },
      payload: {
         portfolio: 'myportfolio',
         benchmark,
         ticker,
         outstanding_balance,
         unrealized_capital_gains,
      },
   })

   const { resp: positions } = useFetchApi<PositionsResp>({
      endpoint: '/ai/portfolio/positions',
      method: 'POST',
      payload: {
         portfolio: 'myportfolio',
         benchmark,
         ticker,
         outstanding_balance,
         unrealized_capital_gains,
      },
   })

   const handleSavePortfolio = () => {
      savePortfolio({
         navigate,
         benchmark,
         outstanding_balance,
         ticker,
         unrealized_capital_gains,
      })
   }

   const [active, setActive] = useState('Positions')
   const dispatch = useDispatch()

   const views = ['Positions', 'Overview', 'Risk', 'Backtest']

   useEffect(() => {
      if (resp) {
         dispatch(setPortfolioAnalysis({ ...resp }))
      }
      if (positions) {
         const newArr1 = positions.map((v) => ({
            ...v,
            weight: (
               (v.outstanding_balance * 100) /
               outstanding_balance_total
            ).toFixed(2),
         }))

         dispatch(setPortfolioPositions(newArr1))
      }
   }, [resp])

   const enabledViews = ['Positions', 'Risk', 'Overview', 'Backtest']

   if (isLoading) return <Loading />

   return (
      <PageContainer error={error}>
         <div className="InvestmentBody summary dashboard_body_portfolio_analysis">
            <div className="inner_dashboard_cri">
               <div className="options_summary_buttons">
                  {views.map((view) => (
                     <button
                        key={view}
                        className={active === view ? 'active-btn' : 'null'}
                        disabled={
                           //disabled is temporal, when the functionality is ready must remove this line
                           !enabledViews.includes(view)
                        }
                        onClick={() => {
                           setActive(view)
                        }}
                        data-testid={`btn-${view.toLowerCase}`}
                     >
                        {view}
                     </button>
                  ))}
               </div>
               {resp && backtest && (
                  <>
                     {active === 'Positions' && <Positions backtest={backtest} />}
                     {active === 'Backtest' && <Backtest backtest={backtest} />}
                     {active === 'Risk' && <RiskreturnTab />}
                     {active === 'Overview' && <OverviewTab backtest={backtest} />}
                  </>
               )}
               <div className="buttons_wrapper">
                  <Button
                     className="w-28 h-12"
                     color="secondary"
                     onClick={() => navigate('goBack')}
                  >
                     <span className="text-base font-normal">Back</span>
                  </Button>

                  <Button
                     className="w-28 h-12"
                     variant="save"
                     onClick={handleSavePortfolio}
                  >
                     <span>Save</span>
                  </Button>
               </div>
            </div>
         </div>
      </PageContainer>
   )
}
