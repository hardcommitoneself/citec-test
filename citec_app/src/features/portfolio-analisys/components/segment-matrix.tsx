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

export const SegmentMatrix = ({ segmentmatrix }: any) => {
   const names: { [key: string]: string } = {
      Val: 'Value',
      Bld: 'Mixed',
      Gwth: 'Growth',
   }

   const series: Array<{ name: string; data: any }> = [
      {
         name: 'Small',
         data: [],
      },
      {
         name: 'Medium',
         data: [],
      },
      {
         name: 'Large',
         data: [],
      },
   ]

   const array_converted = converterArrays({
      style: segmentmatrix['style'],
      size: segmentmatrix['size'],
      weight: segmentmatrix['weight'],
   })
   Object.entries(array_converted).map(([, row]) => {
      if (row.size == 'Small') {
         series[0].data.push({
            x: names[row.style],
            y: row.weight.toFixed() + '%',
         })
      }
      if (row.size == 'Mid') {
         series[1].data.push({
            x: names[row.style],
            y: row.weight.toFixed() + '%',
         })
      }
      if (row.size == 'Large') {
         series[2].data.push({
            x: names[row.style],
            y: row.weight.toFixed() + '%',
         })
      }
   })

   const options = {
      chart: {
         height: 350,
         type: 'heatmap' as const,
      },
      dataLabels: {
         enabled: true,
      },
      plotOptions: {
         heatmap: {
            radius: 10,
         },
      },
      colors: ['#40C6A8'],
      xaxis: {
         //https://apexcharts.com/docs/options/xaxis/
         position: 'top',
         labels: {
            show: true,
            style: {
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: '500',
               colors: '#6C8394',
            },
         },
         axisTicks: {
            show: false,
         },
      },
      yaxis: {
         labels: {
            style: {
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: '500',
               colors: ['#6C8394'],
            },
         },
      },
   }

   return (
      <ReactApexChart
         options={options}
         series={series}
         type="heatmap"
         height={450}
      />
   )
}
