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

import { Button, Tooltip } from '@mui/material'
import { useState } from 'react'
import Swal from 'sweetalert2'

import { AppNavigate } from 'routes'
import { Loading } from 'features/ui'
import { PageContainer } from 'features/ui/page-container'
import {
   useAppNavigate,
   useGetSummary,
   useValidationCriteriaSelected,
} from 'features/utils/hooks'
import { useAppSelector } from 'store/hooks'
import { Backtest, Overview, Risk, Trades } from 'features/summary/tabs'
import { savePortfolio } from 'features/utils/save-portfolio'
import { renderPopup } from 'features/popups/backtest-popups'

type ActiveViews = 'trades' | 'overview' | 'risk' | 'backtest'

const Group = require('assets/img/group.png')

export const Summary = () => {
   const { isLoading, backtest, analysis } = useGetSummary()

   const error = useAppSelector((state) => state.errors)
   const { ticker, outstanding_balance, unrealized_capital_gains } = useAppSelector(
      (state) => state.portfolio_optimized
   )
   const benchmark = useAppSelector((state) => state.rebalance.benchmark)

   const [activeView, setActiveView] = useState<ActiveViews>('trades')

   const navigate = useAppNavigate()
   const views = ['Trades', 'Overview', 'Risk', 'Backtest']
   const disabledViews = ['']

   const isCriteriaSelected = useValidationCriteriaSelected()
   if (!isCriteriaSelected) {
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'You need to upload select a benchmark and objective',
      })

      return <AppNavigate to="/criteria" />
   }

   const handleSavePortfolio = () => {
      savePortfolio({
         navigate,
         benchmark,
         outstanding_balance,
         ticker,
         unrealized_capital_gains,
      })
   }

   if (isLoading) return <Loading />

   return (
      <PageContainer error={error}>
         <div className="dashboard_wrapper">
            <div className="InvestmentBody summary dashboard_body">
               <div className="inner_dashboard_cri mt-0">
                  <h1>
                     <span>Congrats!</span> You have created a portfolio. Check if
                     you like it
                  </h1>

                  <div className="options_summary_buttons">
                     {views.map((view) => (
                        <button
                           key={view}
                           className={
                              activeView === view.toLowerCase()
                                 ? 'active-btn'
                                 : 'null'
                           }
                           disabled={disabledViews.includes(view)}
                           onClick={() => {
                              setActiveView(view.toLowerCase() as ActiveViews)
                           }}
                           data-testid={`btn-${view.toLowerCase}`}
                        >
                           {view}
                        </button>
                     ))}
                  </div>
                  <div className="bg-white p-2" data-testid={`active-${activeView}`}>
                     <div className="summary_content_wrapper">
                        { activeView !== 'trades' && (
                           <div className="action_summary">
                              {activeView === 'backtest' && (
                                 <>
                                    <h1>Performance Backtest</h1>
                                    <img
                                       className="moreinfo"
                                       src={Group}
                                       alt=""
                                       onClick={() => {
                                          renderPopup('perfBacktestAlert')
                                       }}
                                       style={{ marginLeft: '15px' }}
                                       data-testid="info-summary-backtest"
                                    />
                                 </>
                              )}
                              {activeView === 'overview' && <h1>Overview</h1>}
                              {activeView === 'risk' && <h1>Risk and Return</h1>}
                              <div className='button_download_trades'>
                                 <Button
                                    className="h-[35px] min-w-0 rounded"
                                    variant="save"
                                    onClick={handleSavePortfolio}
                                 >
                                    <span>Save</span>
                                 </Button>
                              </div>
                           </div>
                        )}
                        {activeView === 'trades' && <Trades />}
                        {activeView === 'backtest' && !!backtest && (
                           <Backtest {...backtest} />
                        )}
                        {activeView == 'overview' && (
                           <Overview backtest={backtest} analysis={analysis} />
                        )}
                        {activeView == 'risk' && <Risk analysis={analysis} />}
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </PageContainer>
   )
}
