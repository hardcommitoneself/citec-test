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
import { Icon } from 'assets/icons'
import { renderPopup } from 'features/popups/overview-popups'
import { useAppNavigate } from 'features/utils/hooks'
import { BacktestRes } from 'features/utils/interfaces/backtest-api-resp'
import { numberToFixed } from 'features/utils/to-fixed-number'
import { useAppSelector } from 'store/hooks'
import {
   Factors,
   Sectors,
   TrackingError,
   SegmentMatrix,
   KeyMetricsTable,
} from '../components'
import { TotalOverview } from '../totals/totals-overview'

interface OverviewTabProps {
   backtest: BacktestRes
}

export const OverviewTab = ({ backtest }: OverviewTabProps) => {
   const navigate = useAppNavigate()

   const portfolio_analysis = useAppSelector((state) => state.portfolio.analysis)

   const { tracking_expected } = backtest

   return (
      <div className="summary_content_wrapper">
         <div className="action_portfolio_analysis">
            <h1>Overview</h1>
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

         <TotalOverview />

         <div className="RiskReturnGrid">
            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Sector composition
                     <button
                        className="mx-2"
                        onClick={() => renderPopup('sectorCompositionAlert')}
                        data-testid="sector-test"
                     >
                        <Icon.Info />
                     </button>
                  </h1>
               </div>

               <div className="chartRiskReturn">
                  <Sectors sectors={portfolio_analysis?.sectors as never} />
               </div>
            </div>

            <KeyMetricsTable backtest={backtest} />

            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Segment matrix
                     <button
                        className="mx-2"
                        onClick={() => renderPopup('segmentMatrixAlert')}
                     >
                        <Icon.Info />
                     </button>
                  </h1>
               </div>
               <div className="chartRiskReturn">
                  <SegmentMatrix
                     segmentmatrix={portfolio_analysis!.segment_matrix}
                  />
               </div>
            </div>
            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Factors
                     <button
                        className="mx-2"
                        onClick={() => renderPopup('factorsAlert')}
                     >
                        <Icon.Info />
                     </button>
                  </h1>
               </div>
               <div className="chartRiskReturn">
                  <Factors factors={portfolio_analysis?.factors} />
               </div>
            </div>
         </div>

         <div className="BacktestChartWrapper">
            <div className="rowBack">
               <p className="!text-[#2D405A] text-[18px] font-[600]">
                  Tracking Error probability distribution
               </p>

               <button
                  className="mx-2"
                  onClick={() => renderPopup('trackingErrorAlert')}
               >
                  <Icon.Info />
               </button>
            </div>
            <div className="rowBack">
               <h1 className="text-[20px]">Tracking Error: </h1>
               <div className="tracking_error_green">
                  {numberToFixed(
                     tracking_expected.expected_tracking_kpis.tracking_error * 100
                  )}
                  %
               </div>
            </div>
            <TrackingError tracking_expected={backtest.tracking_expected} />
         </div>
      </div>
   )
}
