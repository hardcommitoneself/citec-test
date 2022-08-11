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
import { formatToMoney } from 'features/utils/format-to-money'
import { renderPopup } from 'features/popups/risk-returns-popups'
import {
   Concentration,
   RiskReturns,
   ValueAtRisk,
} from 'features/portfolio-analisys/components'

const Group = require('assets/img/group.png')

export const Risk = ({ analysis }: any) => {
   const portfolio_analysis = analysis

   return (
      <>
         <div className="RiskReturnGrid">
            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Value at risk
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => {
                           renderPopup('valueAtRisk')
                        }}
                        data-testid="info-summary-risk-var"
                     />
                  </h1>
               </div>

               <div className="">
                  <ValueAtRisk valueatrisk={portfolio_analysis?.var} />
               </div>
            </div>
            <div className="box_chart_area">
               <div className="top_area">
                  <h1 data-testid="graph-risk-returns-analisys">
                     Risk vs. return
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => {
                           renderPopup('risk')
                        }}
                        data-testid="info-summary-risk-risk"
                     />
                  </h1>
               </div>
               <div className="">
                  <RiskReturns risks={portfolio_analysis?.risk_returns} />
               </div>
            </div>
            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Concentration
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => {
                           renderPopup('concentration')
                        }}
                        data-testid="info-summary-risk-concentration"
                     />
                  </h1>
               </div>
               <div className="">
                  <Concentration concentration={portfolio_analysis?.concentration} />
               </div>
            </div>
            <div className="box_chart_area RiskReturnTableAreaWrapper">
               <div className="top_area">
                  <h1>
                     Top 10 companies
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => {
                           renderPopup('top10')
                        }}
                        data-testid="info-summary-risk-top10"
                     />
                  </h1>
               </div>
               <div className="chartRiskReturn" style={{ alignItems: 'flex-start' }}>
                  <table className="RiskReturnTableArea">
                     <thead>
                        <tr>
                           <th>Ticker</th>
                           <th>Name</th>
                           <th>% of total</th>
                           <th>Investment</th>
                        </tr>
                     </thead>
                     <tbody>
                        {portfolio_analysis?.top_holdings.ticker.map(
                           (ticker: string, key: number) => (
                              <tr key={key}>
                                 <td>{ticker}</td>
                                 <td></td>
                                 <td>
                                    {(
                                       portfolio_analysis.top_holdings.weight[key] *
                                       100
                                    ).toFixed(1)}
                                    %
                                 </td>
                                 <td>
                                    {formatToMoney(
                                       portfolio_analysis.top_holdings
                                          .outstanding_balance[key]
                                    )}
                                 </td>
                              </tr>
                           )
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </>
   )
}
