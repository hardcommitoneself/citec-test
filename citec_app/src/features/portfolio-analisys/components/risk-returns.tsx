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
import ReactApexChart from 'react-apexcharts'

export const RiskReturns = (data: any) => {
   const risk = data.risks
   const series: Array<any> = []

   //https://apexcharts.com/javascript-chart-demos/scatter-charts/basic/

   for (let i = 0; i < risk['ticker'].length; i++) {
      series.push({
         name:
            risk['ticker'][i].charAt(0).toUpperCase() + risk['ticker'][i].slice(1),
         data: [
            [
               (risk['volatility'][i] * 100).toFixed(2),
               (risk['returns'][i] * 100).toFixed(2),
            ],
         ],
      })
   }

   const options: ApexCharts.ApexOptions = {
      chart: {
         height: 350,
         type: 'scatter' as const,
         zoom: {
            enabled: true,
            type: 'xy' as const,
         },
      },
      legend: {
         //https://apexcharts.com/docs/options/legend/
         show: true,
         position: 'top' as const,
         markers: {
            fillColors: ['#20BBB7', '#56CCF2'],
         },
      },
      markers: {
         //https://apexcharts.com/docs/options/markers/
         size: [18, 18],
         colors: ['#20BBB7', '#56CCF2'],
      },
      xaxis: {
         // apexcharts.com/docs/options/xaxis/
         type: 'numeric' as const,
         categories: [],
         tickPlacement: 'between',
         min: 0,
         max: 30,
         floating: false,
         decimalsInFloat: 0,
         position: 'bottom',
         labels: {
            style: {
               colors: ['#6C8394'],
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: 'normal',
            },
         },
         title: {
            text: 'Risk',
            offsetX: 0,
            offsetY: 5,
            style: {
               color: '#6C8394',
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: 'normal',
            },
         },
      },
      yaxis: {
         tickAmount: undefined, // apexcharts.com/docs/options/yaxis/
         min: undefined,
         max: undefined,
         floating: false,
         decimalsInFloat: 0,
         labels: {
            style: {
               colors: ['#6C8394'],
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: 'normal',
            },
         },
         title: {
            text: 'Return',
            offsetX: 0,
            offsetY: 0,
            style: {
               color: '#6C8394',
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: 'normal',
            },
         },
      },
   }

   return (
      <ReactApexChart
         options={options}
         series={series}
         type="scatter"
         height={450}
      />
   )
}
