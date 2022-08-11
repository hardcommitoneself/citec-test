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
import { Slider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Swal from 'sweetalert2'
import { Icon } from 'assets/icons'

import { PageContainer } from 'features/ui/page-container'
import { setNumberStocks, setObjective } from 'store/slices/rebalance'
import { useAppNavigate, useValidateNumberStocks } from 'features/utils/hooks'
import { useAppSelector } from 'store/hooks'
import { useSelectUniverse } from 'features/utils/hooks/use-select-universe'
import { ButtonAndModalCustomize } from 'features/customize'

const infoGray = require('assets/img/group.png')
const infoGreen = require('assets/img/group_green.png')

export const Criteria = () => {
   const dispatch = useDispatch()
   const navigate = useAppNavigate()

   const objectives = useAppSelector(
      (state) => state.static_data.rebalance.objectives
   )

   const benchmarks = useAppSelector(
      (state) => state.static_data.rebalance.benchmarks
   )
   const objective = useAppSelector((state) => state.rebalance.objective)
   const benchmark = useAppSelector((state) => state.rebalance.benchmark)
   const stocks = useAppSelector((state) => state.rebalance.number_stocks)
   const [rangeStocks, setRangeStocks] = useState(stocks)

   const { handleSelectBenckmark } = useSelectUniverse()
   const { isValidPortfolio } = useValidateNumberStocks()

   useEffect(() => {
      if (!isValidPortfolio)
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The total amount of the portfolio is low. It is recommended to add more cash',
         })
   }, [isValidPortfolio])

   const benchmarkTitleAlert = () => {
      Swal.fire({
         html: `<div class="align-left">
            <b>The benchmark</b> is the market index against which you will be
            comparing your portfolio. Generally indexes are well-diversified and 
            a good representation of the overall market performance.
            </div>`,
         confirmButtonColor: '#0baca9',
         confirmButtonText: '<a href="about:blank" target="_blank">Learn more</a>',
         showCloseButton: true,
      })
   }

   const objectiveAlert = (key: any) => {
      switch (key) {
         case 'min_tracking_error':
            Swal.fire({
               html: `<div class="align-left">
                  <b>Direct indexing</b> consist of replicating the index/benchmark's
                  performance by selecting the combination of stocks and weights among 
                  a given universe that allows to minimize the tracking error.
                  </div>`,
               confirmButtonColor: '#0baca9',
               confirmButtonText:
                  '<a href="about:blank" target="_blank">Learn more</a>',
               showCloseButton: true,
            })
            break
         case 'min_neg_sharpe_ratio':
            Swal.fire({
               html: `<div class="align-left">
                  <b>The Sharpe ratio</b> is measured as return over volatility (Risk 
                  proxy). This optimization will look for the combination of stocks and 
                  weigths among a given universe that allows to maximize this ratio 
                  for simulated scenarios.
                  </div>`,
               confirmButtonColor: '#0baca9',
               confirmButtonText:
                  '<a href="about:blank" target="_blank">Learn more</a>',
               showCloseButton: true,
            })
            break
         case 'min_volatility':
            Swal.fire({
               html: `<div class="align-left">
                  <b>Volatility</b> is measured as the standard deviation of the 
                  portoflio's value. This optimization will look for the combination of
                  stocks and weigths among a given universe that allows to minimize 
                  the portfolio volatility for the simulated scenarios.
                  </div>`,
               confirmButtonColor: '#0baca9',
               confirmButtonText:
                  '<a href="about:blank" target="_blank">Learn more</a>',
               showCloseButton: true,
            })
            break
         case 'min_risk_parity':
            Swal.fire({
               html: `<div class="align-left">
                  <b>Risk parity</b> consists in allocating the same level of risk
                  to each of a universe's stocks. The more volatility, the less
                  capital you allocate to those stocks.
                  </div>`,
               confirmButtonColor: '#0baca9',
               confirmButtonText:
                  '<a href="about:blank" target="_blank">Learn more</a>',
               showCloseButton: true,
            })
            break
         default:
            break
      }
   }

   const stocksAlert = () => {
      Swal.fire({
         html: `<div class="align-left">
            <p>The number of positions should be less than investment/$300
            (average stock price). Additionally, the recommended number of 
            stocks differs depending on the type of optimization:</p>
            <ul style="list-style-type:square">
               <li>
               <b>-Direct Indexing:</b> +80 positions for tracking errors <0.5%
               </li>
               <li>
               <b>-Sharpe ratio:</b> +20 positions to leverage diversification
               </li>
               <li>
               <b>-Min volatility:</b> +20 postions to leverage diversification
               </li>
               <li>
               <b>-Risk parity:</b> N/A
               </li>
            </ul>
            </div>`,
         confirmButtonColor: '#0baca9',
         confirmButtonText: '<a href="about:blank" target="_blank">Learn more</a>',
         showCloseButton: true,
      })
   }

   const benchmarksFormatter = (benchmark: string) => {
      switch (benchmark) {
         case 'VTI':
            return 'Total US Market'
         case 'QQQ':
            return 'Nasdaq 100'
         case 'SPY':
            return 'S&P 500'
         case 'SNPE':
            return 'S&P 500 ESG'
         case 'IWM':
            return 'Russell 2000'
         default:
            break
      }
   }

   const objectivesFormatter = (objective: string) => {
      switch (objective) {
         case 'min_tracking_error':
            return 'Direct Indexing'
         case 'min_risk_parity':
            return 'Risk Parity'
         case 'min_volatility':
            return 'Min Volatility'
         case 'max_diversification_ratio':
            return 'Max Diversification'
         default:
            break
      }

      return ''
   }

   const filteredObjectives = objectives.filter(({ key }) => {
      const allowedObjectives = [
         'min_tracking_error',
         'min_volatility',
         'max_diversification_ratio',
         'min_risk_parity',
      ]

      return allowedObjectives.indexOf(key) > -1
   })

   const renamedObjectives = filteredObjectives.map((obj) => ({
      ...obj,
      name: objectivesFormatter(obj.key),
   }))

   const sortedObjectives = renamedObjectives.sort((a, b) => {
      //sort alphabetical

      return a.name.localeCompare(b.name)
   })

   const objectivesIcons = (objective: string) => {
      switch (objective) {
         case 'min_tracking_error':
            return <Icon.DirectIndexing />
         case 'min_risk_parity':
            return <Icon.RiskParity />
         case 'min_volatility':
            return <Icon.MinVolatility />
         case 'max_diversification_ratio':
            return <Icon.MaxDiversification />
         default:
            break
      }
   }

   return (
      <PageContainer
         titlePage="What do you want to optimize?"
         actionBtn={<ButtonAndModalCustomize />}
      >
         <div className="InvestmentBody dashboard_body">
            <div className="inner_dashboard_cri">
               <div className="select_wrapper">
                  <h1>
                     Select benchmark
                     <img
                        className="moreinfo"
                        src={infoGreen}
                        alt=""
                        onClick={() => {
                           benchmarkTitleAlert()
                        }}
                     />
                  </h1>
                  <div className="boxwrapper grid_4">
                     {benchmarks.map(({ description, key, ticker }) => (
                        <div
                           className="box"
                           key={key}
                           onClick={() => handleSelectBenckmark(ticker)}
                        >
                           <input
                              checked={benchmark === ticker}
                              type="radio"
                              name="benchmark"
                              id={description}
                              readOnly
                           />
                           <label>{benchmarksFormatter(key)}</label>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="select_wrapper">
                  <h1>Select objective</h1>
                  <div className="boxwrapper grid_4">
                     {sortedObjectives.map(({ name, key }) => (
                        <div
                           className="box"
                           key={key}
                           onClick={() =>
                              dispatch(
                                 setObjective({
                                    name,
                                    key,
                                 })
                              )
                           }
                        >
                           <input
                              checked={objective.key === key}
                              type="radio"
                              name="objective"
                              id={name}
                              readOnly
                           />
                           <label htmlFor="DirectIndexing">
                              <div className="mr-2.5">{objectivesIcons(key)}</div>
                              {name}
                              {key != 'max_diversification_ratio' && (
                                 <img
                                    className="moreinfo"
                                    src={infoGray}
                                    alt=""
                                    onClick={() => {
                                       objectiveAlert(key)
                                    }}
                                 />
                              )}
                           </label>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="select_wrapper">
                  <h1 style={{ marginBottom: 20 }}>
                     Select number of stocks
                     <img
                        className="moreinfo"
                        src={infoGreen}
                        alt=""
                        onClick={() => {
                           stocksAlert()
                        }}
                     />
                  </h1>

                  <Slider
                     value={rangeStocks}
                     onChangeCommitted={(_, newValue) =>
                        dispatch(setNumberStocks(newValue))
                     }
                     onChange={(_, newValue) => {
                        setRangeStocks(newValue as never[])
                     }}
                     valueLabelDisplay="on"
                     min={10}
                     max={200}
                  />
               </div>

               <div className="buttons_wrapper">
                  <Button
                     id="criteria_run_back_buttons"
                     color="secondary"
                     onClick={() => navigate('goBack')}
                  >
                     Back
                  </Button>
                  <Button
                     id="criteria_run_back_buttons"
                     variant="optimize"
                     onClick={() => navigate('/summary')}
                  >
                     Run
                  </Button>
               </div>
            </div>
         </div>
      </PageContainer>
   )
}
