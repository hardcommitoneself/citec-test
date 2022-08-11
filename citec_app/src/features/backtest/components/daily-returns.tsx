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
import { Ts } from 'features/utils/interfaces/backtest-api-resp'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'

interface DailyReturnsProps {
   ts_backtest: Ts
}

export const DailyReturns = ({ ts_backtest }: DailyReturnsProps) => {
   const { benchmark, portfolio, date } = ts_backtest

   const portfolioConverted = portfolio.map((num) => Number((num * 100).toFixed(3)))
   const benchmarkConverted = benchmark.map((num) => Number((num * 100).toFixed(3)))
   // Y AXIS

   const series = [
      {
         name: 'Portfolio',
         data: portfolioConverted,
      },
      {
         name: 'Benchmark',
         data: benchmarkConverted,
      },
   ]

   // const type = "line" as const;

   const options: ApexCharts.ApexOptions = {
      chart: {
         type: 'line' as const,
         height: 350,
         background: '#f6f7fb',
      },
      dataLabels: {
         enabled: false,
      },
      labels: date,
      stroke: {
         curve: 'straight' as const,
         width: 1.5,
      },
      grid: {
         row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      xaxis: {
         tickAmount: 11,
         categories: [],
         labels: {
            rotate: 0,
            formatter(value) {
               const formatedDate = moment(value, 'DD-MM-YYYY').format('MM-YYYY')

               return formatedDate
            },
         },
      },
      yaxis: {
         tickAmount: undefined, // apexcharts.com/docs/options/yaxis/
         floating: false,
         decimalsInFloat: 0,
      },
   }

   return (
      <ReactApexChart options={options} series={series} type="line" height={350} />
   )
}
