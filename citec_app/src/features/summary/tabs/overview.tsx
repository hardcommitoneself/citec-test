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

import { renderPopup } from 'features/popups/overview-popups'
import {
   Factors,
   Sectors,
   TrackingError,
   SegmentMatrix,
   KeyMetricsTable,
} from 'features/portfolio-analisys/components'
import { TotalOverview } from 'features/portfolio-analisys/totals'
import { numberToFixed } from 'features/utils/to-fixed-number'
import { useAppSelector } from 'store/hooks'
const Group = require('assets/img/group.png')

export const Overview = ({ backtest, analysis }: any) => {
   const portfolio_analysis = analysis

   const trades = useAppSelector((state) => state.trades)

   return (
      <>       
         <TotalOverview numberPositions={trades.length} />
         <div className="RiskReturnGrid">
            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Sector composition
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => renderPopup('sectorCompositionAlert')}
                        data-testid="info-summary-overview-sectors"
                     />
                  </h1>
               </div>

               <div className="chartRiskReturn">
                  <Sectors sectors={portfolio_analysis?.sectors} />
               </div>
            </div>
            <KeyMetricsTable backtest={backtest} />

            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Segment matrix
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => renderPopup('segmentMatrixAlert')}
                        data-testid="info-summary-overview-segment"
                     />
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
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => renderPopup('factorsAlert')}
                        data-testid="info-summary-overview-factor"
                     />
                  </h1>
               </div>
               <div className="chartRiskReturn">
                  <Factors factors={portfolio_analysis?.factors} />
               </div>
            </div>
         </div>

         <div className="BacktestChartWrapper">
            <div className="rowBack">
               <p>Tracking Error probability distribution</p>
               <img
                  className="moreinfo"
                  src={Group}
                  alt=""
                  data-testid="tracking-error-test"
                  onClick={() => renderPopup('trackingErrorAlert')}
               />
            </div>
            <div className="rowBack">
               <h1>Tracking Error: </h1>
               <div className="tracking_error_green">
                  {numberToFixed(
                     backtest.tracking_expected.expected_tracking_kpis
                        .tracking_error * 100
                  )}{' '}
                  %
               </div>
            </div>
            <TrackingError tracking_expected={backtest.tracking_expected} />
         </div>
      </>
   )
}
