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
import { BacktestRes } from 'features/utils/interfaces/backtest-api-resp'
import { DailyReturns } from 'features/backtest/components'
import { TotalBacktest } from 'features/portfolio-analisys/totals'

type BacktestProps = Pick<BacktestRes, 'risk' | 'tracking' | 'ts_backtest'>

export const Backtest = ({ risk, tracking, ts_backtest }: BacktestProps) => {
   const backtest = {
      risk,
      tracking,
   }

   return (
      <>
         <TotalBacktest backtest={backtest as never} />

         <div className="BacktestChartWrapper">
            <div className="top_area">
               <h1>Returns %</h1>
            </div>
            <div className="line_chart_wrapper_backtest">
               <DailyReturns ts_backtest={ts_backtest} />
            </div>
         </div>
      </>
   )
}
