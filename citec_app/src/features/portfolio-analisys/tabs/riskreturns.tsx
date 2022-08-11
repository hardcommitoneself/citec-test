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
import Swal from 'sweetalert2'
import { Concentration, RiskReturns, ValueAtRisk } from '../components'
import { formatToMoney } from 'features/utils/format-to-money'
import { Icon } from 'assets/icons'
import { useAppSelector } from 'store/hooks'

export const RiskreturnTab = () => {
   const portfolio_analysis = useAppSelector((state) => state.portfolio.analysis)

   const valueAtRiskAlert = () => {
      Swal.fire({
         html: `<div class="align-left">
         <b>Value at risk</b> quantifies the portfolio’s possible financial losses 
         (in dollars or in percentage) over a specific time frame at a 
         defined confidence level..
            </div>`,
         confirmButtonColor: '#0baca9',
         confirmButtonText: '<a href="about:blank" target="_blank">Learn more</a>',
         showCloseButton: true,
      })
   }

   const riskVsReturnAlert = () => {
      Swal.fire({
         html: `<div class="align-left">
         <b>Risk vs. return</b> analysis is used to determine how close your portfolio is to 
         the efficiency frontier, compared to the benchmark. The efficiency frontier refers 
         to the highest returns at a given level of risk. A portfolio is said to be efficient 
         if no other portfolio offers higher returns for a lower or equal amount of risk. 
         Where portfolios are located on the efficiency frontier depends on the investor’s 
         degree of risk tolerance.
            </div>`,
         confirmButtonColor: '#0baca9',
         confirmButtonText: '<a href="about:blank" target="_blank">Learn more</a>',
         showCloseButton: true,
      })
   }

   const concentrationAlert = () => {
      Swal.fire({
         html: `<div class="align-left">
         <b>Concentration</b> Analysis helps you understand the level of exposure to the companies in which 
         you are investing more money. The graph shows the accumulated exposure to top positions, this means 
         if you select 10 stocks in the x axis the y axis shows the percentage of the money invested in 
         the top 10 positions
            </div>`,
         confirmButtonColor: '#0baca9',
         confirmButtonText: '<a href="about:blank" target="_blank">Learn more</a>',
         showCloseButton: true,
      })
   }

   const top10CompaniesAlert = () => {
      Swal.fire({
         html: `<div class="align-left">
         Here are the <b>top 10 companies</b> with higher level of investment (Money invested)
         </div>`,
         confirmButtonColor: '#0baca9',
         confirmButtonText: '<a href="about:blank" target="_blank">Learn more</a>',
         showCloseButton: true,
      })
   }

   return (
      <div className="summary_content_wrapper">
         <h1>Risk and Return </h1>

         <div className="RiskReturnGrid">
            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Value at risk
                     <button className="moreinfo ml-2" onClick={valueAtRiskAlert}>
                        <Icon.Info />
                     </button>
                  </h1>
               </div>

               <div className="">
                  <ValueAtRisk valueatrisk={portfolio_analysis?.var} />
               </div>
            </div>
            <div className="box_chart_area">
               <div className="top_area">
                  <h1>
                     Risk vs. return
                     <button className="moreinfo ml-2" onClick={riskVsReturnAlert}>
                        <Icon.Info />
                     </button>
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
                     <button className="moreinfo ml-2" onClick={concentrationAlert}>
                        <Icon.Info />
                     </button>
                  </h1>
               </div>
               <div>
                  <Concentration
                     concentration={portfolio_analysis?.concentration as never}
                  />
               </div>
            </div>
            <div className="box_chart_area RiskReturnTableAreaWrapper">
               <div className="top_area">
                  <h1>
                     Top 10 companies
                     <button className="moreinfo ml-2" onClick={top10CompaniesAlert}>
                        <Icon.Info />
                     </button>
                  </h1>
               </div>
               <div className="chartRiskReturn" style={{ alignItems: 'flex-start' }}>
                  <table className="RiskReturnTableArea">
                     <thead>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>% of total</th>
                        <th>Investment</th>
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
      </div>
   )
}
