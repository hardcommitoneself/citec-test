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
import { Button } from '@mui/material'
import { DailyReturns } from 'features/backtest/components'
import { TotalBacktest } from 'features/portfolio-analisys/totals'
import { useAppNavigate } from 'features/utils/hooks'
import { BacktestRes } from 'features/utils/interfaces/backtest-api-resp'

interface BacktestProps {
   backtest: BacktestRes
}

export const Backtest = ({ backtest }: BacktestProps) => {
   const navigate = useAppNavigate()

   return (
      <div className="summary_content_wrapper">
         <div className="action_portfolio_analysis">
            <h1>Performance Backtest</h1>
            <div className="button_rebalance_positions">
               <Button
                  className="w-36 h-10"
                  variant="optimize"
                  onClick={() => navigate('/investment')}
               >
                  <img
                     src={require('assets/img/investment_white.png')}
                     style={{ marginRight: '15px' }}
                  />
                  <span className="text-base">Rebalance</span>
               </Button>
            </div>
         </div>

         <TotalBacktest backtest={backtest} />

         {backtest && (
            <>
               <div className="BacktestChartWrapper">
                  <div className="top_area">
                     <h1>Returns %</h1>
                  </div>
                  <div className="line_chart_wrapper_backtest">
                     <DailyReturns ts_backtest={backtest.ts_backtest} />
                  </div>
               </div>
            </>
         )}
      </div>
   )
}
