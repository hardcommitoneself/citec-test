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
import ReactApexChart from 'react-apexcharts'
import { renderPopup } from 'features/popups/investment'
const Group = require('assets/img/group.png')

interface ChartSimulationProps {
   years: number
   setYears: React.Dispatch<React.SetStateAction<number>>
   acumulative: number
   serieInvestmentPerYearWithSavings: Array<number>
   serieInvestmentPerYearWithoutSavings: Array<number>
}

export const ChartSimulation = ({
   years,
   setYears,
   acumulative,
   serieInvestmentPerYearWithSavings,
   serieInvestmentPerYearWithoutSavings,
}: ChartSimulationProps) => {
   let customCategoriesX = [] as Array<string>

   const series = [
      {
         name: 'Performance with savings',
         data: serieInvestmentPerYearWithSavings,
      },
      {
         name: 'Performance without savings',
         data: serieInvestmentPerYearWithoutSavings,
      },
   ]

   if (series.length == 6) {
      customCategoriesX = ['0', '1', '2', '3', '4', '5']
   } else if (series.length == 11) {
      customCategoriesX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
   } else {
      customCategoriesX = [
         '0',
         '1',
         '2',
         '3',
         '4',
         '5',
         '6',
         '7',
         '8',
         '9',
         '10',
         '11',
         '12',
         '13',
         '14',
         '15',
         '16',
         '17',
         '18',
         '19',
         '20',
      ]
   }

   const options = {
      colors: ['#20BBB7', '#38B2ED'],
      chart: {
         type: 'area' as const,
         height: 350,
         zoom: {
            autoScaleYaxis: true,
         },
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: 'straight' as const,
         width: 2.5,
      },
      legend: {
         //https://apexcharts.com/docs/options/legend/
         show: true,
         position: 'bottom' as const,
         floating: true,
         horizontalAlign: 'right' as const,
         offsetY: 8,
         fontSize: '13px',
      },
      xaxis: {
         categories: customCategoriesX,
         title: {
            text: 'Years',
            style: {
               cssClass: 'apexcharts-yaxis-label-investment',
            },
         },
      },
      yaxis: {
         tickAmount: 4, // apexcharts.com/docs/options/yaxis/
         decimalsInFloat: 0,
         overwriteCategories: undefined,
         labels: {
            style: {
               cssClass: 'apexcharts-yaxis-label-investment',
            },
            /**
             * Allows users to apply a custom formatter function to x-axis labels.
             *
             * @param { String } value - The default value generated
             * @param { Number } timestamp - In a datetime series, this is the raw timestamp
             * @param { object } contains dateFormatter for datetime x-axis
             */
            formatter: function (value: any) {
               return formatToMoney(Math.trunc(value))
            },
         },
      },
      tooltip: {
         x: {
            show: false,
         },
      },
   }

   return (
      <div className="box chart_box">
         <div className="top_content">
            <div className="left_side ">
               <div className="row-chart-investment">
                  <h1>Simulations</h1>
               </div>
            </div>
            <div className="right_side">
               <div className="row-chart-investment">
                  <h1 className="investement-expected-value">
                     Expected value:{' '}
                     <span> {formatToMoney(Math.trunc(acumulative))}</span>
                  </h1>
               </div>
            </div>
         </div>

         <div className="top_content">
            <div className="left_side" style={{ paddingTop: '20px' }}>
               <div className="investment-text-after-returns">
                  <span className="flex items-center text-[#0BACA9]">
                     <p className="mr-2">After tax returns simulations</p>
                     <img
                        className="moreinfo"
                        src={Group}
                        alt=""
                        onClick={() => {
                           renderPopup('chartSimulations')
                        }}
                        style={{ marginLeft: '2px' }}
                     />
                  </span>
               </div>
            </div>
            <div className="right_side">
               <div className="buttons_small_area items-end">
                  <button
                     className={years === 5 ? 'active' : ''}
                     onClick={() => setYears(5)}
                     data-testid="5Y"
                  >
                     5Y
                  </button>
                  <button
                     className={years === 10 ? 'active' : ''}
                     onClick={() => setYears(10)}
                     data-testid="10Y"
                  >
                     10Y
                  </button>
                  <button
                     data-testid="20Y"
                     className={years === 20 ? 'active' : ''}
                     onClick={() => setYears(20)}
                  >
                     20Y
                  </button>
               </div>
            </div>
         </div>

         <div className="pt-2">
            <ReactApexChart
               options={options}
               series={series}
               type="area"
               height={350}
            />
         </div>
      </div>
   )
}
