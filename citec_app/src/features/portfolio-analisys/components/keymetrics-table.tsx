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
import { useAppSelector } from 'store/hooks'
import { renderPopup } from 'features/popups/overview-popups'
import { Icon } from 'assets/icons'

interface KeyMetricsTableProps {
   backtest: BacktestRes
}

export const KeyMetricsTable = ({ backtest }: KeyMetricsTableProps) => {
   const { tracking, risk } = backtest
   const portfolio_analysis = useAppSelector((state) => state.portfolio.analysis)

   const dataKeyMetrics = [
      {
         label: 'Return (3 months)',
         portfolioValue: `${(portfolio_analysis!.returns.returns_3M * 100).toFixed(
            2
         )}%`,
         benchmarkValue: `${(
            portfolio_analysis!.returns.bnch_returns_3M * 100
         ).toFixed(2)}%`,
      },
      {
         label: 'Return (6 months)',
         portfolioValue: `${(portfolio_analysis!.returns.returns_6M * 100).toFixed(
            2
         )}%`,
         benchmarkValue: `${(
            portfolio_analysis!.returns.bnch_returns_6M * 100
         ).toFixed(2)}%`,
      },
      {
         label: 'CAGR',
         popupName: 'cagrAlert',
         portfolioValue: `${(portfolio_analysis!.returns.CAGR * 100).toFixed(2)}%`,
         benchmarkValue: `${(portfolio_analysis!.returns.bnch_CAGR * 100).toFixed(
            2
         )}%`,
      },
      {
         label: 'Prices per earnings',
         portfolioValue: portfolio_analysis!.fundamentals.pe.toFixed(2),
      },
      {
         label: 'Price per book value',
         popupName: 'pricePerBookAlert',
         portfolioValue: portfolio_analysis!.fundamentals.pb.toFixed(2),
      },
      {
         label: 'Dividend yield',
         portfolioValue: `${portfolio_analysis!.fundamentals.dividend_yield.toFixed(
            2
         )}%`,
      },
      {
         label: 'Beta',
         popupName: 'betaAlert',
         portfolioValue: `${risk.beta.toFixed(2)}`,
      },
      {
         label: 'Alpha',
         popupName: 'alfaAlert',
         portfolioValue: `${(portfolio_analysis!.risk.alpha * 100).toFixed(2)}%`,
      },
      {
         label: 'Tracking difference',
         popupName: 'trackingDifferenceAlert',
         portfolioValue: `${(tracking!.tracking_difference * 100).toFixed(2)}%`,
      },
      {
         label: 'R square',
         popupName: 'rsquareAlert',
         portfolioValue: `${(100 * tracking!.r_square).toFixed(2)}%`,
      },
   ]

   return (
      <div className="box_chart_area KeyMetricsTableAreaWrapper">
         <div className="top_area !text-[14px]">
            <h1>Key metrics</h1>

            <table className="KeyMetricsTableArea">
               <thead>
                  <tr>
                     <th></th>
                     <th>Portfolio</th>
                     <th>Benchmark</th>
                  </tr>
               </thead>
               <tbody>
                  {dataKeyMetrics.map(
                     ({ label, portfolioValue, benchmarkValue, popupName }) => (
                        <tr key={label}>
                           <td className="keyWhithInfo p-2">
                              {label}
                              {popupName && (
                                 <button
                                    className="mx-2"
                                    data-testid={`${popupName.toLowerCase()}-test`}
                                    onClick={() => renderPopup(popupName as never)}
                                 >
                                    <Icon.Info />
                                 </button>
                              )}
                           </td>
                           <td>{portfolioValue}</td>
                           <td>{benchmarkValue || 'N.A'}</td>
                        </tr>
                     )
                  )}
               </tbody>
            </table>
         </div>
      </div>
   )
}
