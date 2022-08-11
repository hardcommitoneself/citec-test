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
import converterArrays from 'features/utils/converterArrays'
import { numberToFixed } from 'features/utils/to-fixed-number'

export const Factors = ({ factors }: any) => {
   const dataSeriesMultipliedBy100: { x: any; y: number }[] = []

   const dataSeries = converterArrays({
      x: factors['factor'],
      y: factors['percentage'],
   })
   dataSeries.map(function (row) {
      dataSeriesMultipliedBy100.push({
         x: row.x,
         y: numberToFixed(row.y * 100, 0),
      })
   })

   const series = [
      {
         data: dataSeriesMultipliedBy100,
      },
   ]

   const options = {
      chart: {
         height: 350,
         type: 'bar' as const,
      },
      colors: [
         function ({ dataPointIndex }: any) {
            if (dataPointIndex == 0) {
               return '#6576FF'
            } else if (dataPointIndex == 1) {
               return '#FFA6A6'
            } else if (dataPointIndex == 2) {
               return '#56CCF2'
            } else if (dataPointIndex == 3) {
               return '#0BACA9'
            } else if (dataPointIndex == 4) {
               return '#FF9E37'
            } else if (dataPointIndex == 5) {
               return '#8E547F'
            } else {
               return '#83CA76'
            }
         },
      ],
      plotOptions: {
         bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 10,
            endingShape: 'rounded' as const,
         },
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         show: true,
         width: 2,
         colors: ['transparent'],
      },
      grid: {
         //https://apexcharts.com/docs/options/grid/
         show: false,
      },
      yaxis: {
         decimalsInFloat: 0,
         labels: {
            style: {
               colors: [
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
               ],
               fontSize: '14px',
               fontFamily: 'Poppins',
               cssClass: 'apexcharts-font-citec',
            },
         },
      },
      xaxis: {
         labels: {
            rotateAlways: true,
            rotate: -90,
            style: {
               colors: [
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
                  '#79828d',
               ],
               fontFamily: 'Poppins',
               cssClass: 'apexcharts-font-citec',
               fontSize: '14px',
            },
         },
         axisTicks: {
            show: true,
         },
      },
      tooltip: {
         //https://apexcharts.com/docs/options/tooltip/
         enabled: true,
         x: {
            show: false,
         },
         y: {
            title: {
               formatter: () => '',
            },
         },
         marker: {
            show: true,
         },
      },
   }

   return (
      <ReactApexChart options={options} series={series} type="bar" height={450} />
   )
}
