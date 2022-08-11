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

export const Concentration = (data: {
   [x: string]: { [x: string]: string | any[] }
}) => {
   const series: Array<any> = [
      {
         name: 'weight',
         data: data['concentration']['concentration'],
      },
   ]

   const stylesFonts = {
      color: '#6C8394',
      fontSize: '14px',
      fontFamily: 'Poppins',
      fontWeight: 'normal',
   }

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
         categories: [],
         tickAmount: 10,
         title: {
            text: 'Number of stocks',
            offsetX: 0,
            offsetY: 5,
            style: {
               ...stylesFonts,
            },
         },
         labels: {
            show: true,
            rotate: 0,
            style: {
               ...stylesFonts,
            },
         },
      },
      yaxis: {
         // apexcharts.com/docs/options/yaxis/
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
   }

   return (
      <div>
         <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={450}
         />
      </div>
   )
}
