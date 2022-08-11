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

export const ValueAtRisk = ({ valueatrisk }: any) => {
   const valores = valueatrisk?.value.map(function (x: any) {
      return (x * 100).toFixed(2)
   })
   const series = [
      {
         name: 'value',
         data: valores,
      },
   ]

   let i = 0
   let mininmo = 100
   let posicion_minimo = 0
   for (i = 0, valueatrisk?.value.length; i < valueatrisk?.value.length; i++) {
      if (valueatrisk?.value[i] > 0) {
         mininmo = Math.min(mininmo, valueatrisk?.value[i])
         if (mininmo == valueatrisk?.value[i]) {
            posicion_minimo = i
         }
      }
   }

   const stylesFonts = {
      color: '#6C8394',
      fontSize: '14px',
      fontFamily: 'Poppins',
      fontWeight: 'normal',
   }

   const categories = valueatrisk?.quantile

   const options: ApexCharts.ApexOptions = {
      chart: {
         height: 350,
         type: 'line' as const,
         zoom: {
            enabled: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      tooltip: {
         //https://apexcharts.com/docs/options/tooltip/
         enabled: true,
         x: {
            show: false,
         },
         marker: {
            show: false,
         },
      },
      stroke: {
         //https://apexcharts.com/docs/options/stroke/
         curve: 'straight' as const,
         colors: ['#20BBB7'],
      },
      markers: {
         //https://apexcharts.com/docs/options/markers/
         colors: ['#20BBB7'],
      },
      grid: {
         row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      xaxis: {
         // apexcharts.com/docs/options/xaxis/
         type: 'numeric' as const,
         categories: categories,
         min: valueatrisk?.quantile[posicion_minimo],
         tickAmount: 10,
         decimalsInFloat: 0,
         title: {
            text: 'Quantile',
            offsetX: 0,
            offsetY: 5,
            style: {
               ...stylesFonts,
            },
         },
         labels: {
            style: {
               ...stylesFonts,
            },
         },
      },
      yaxis: {
         // apexcharts.com/docs/options/yaxis/
         tickAmount: undefined,
         min: undefined,
         max: undefined,
         floating: false,
         decimalsInFloat: 0,
         title: {
            text: '',
            offsetX: 0,
            offsetY: 0,
         },
         labels: {
            style: {
               ...stylesFonts,
            },
         },
      },
      annotations: {
         xaxis: [
            {
               // in a datetime series, the x value should be a timestamp, just like it is generated below
               x: 95,
               strokeDashArray: 0,

               borderColor: '#775DD0',
               label: {
                  borderColor: '#775DD0',
                  style: {
                     color: '#fff',
                     background: '#775DD0',
                     fontFamily: 'Poppins',
                  },
                  text: '95% confidence',
               },
            },
         ],
      },
   }

   return (
      <ReactApexChart options={options} series={series} type="line" height={450} />
   )
}
