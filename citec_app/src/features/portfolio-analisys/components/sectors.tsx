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
import { useEffect, useState } from 'react'

interface SectorsProps {
   sectors: {
      percentage: number[]
      percentage_benchmark: number[]
      sector: string[]
   }
}

export const Sectors = ({ sectors }: SectorsProps) => {
   const sectorsName = [...sectors.sector]
   const sectorsPercentage = [...sectors.percentage]
   const benchmarkPercentaje = [...sectors.percentage_benchmark]

   const [values, setValues] = useState([]) as any

   const [series, setSeries] = useState([
      {
         name: 'Portfolio',
         data: [],
      },
   ]) as any

   const topPercentage = series[0].data[0] + 22

   useEffect(() => {
      const valuesPortfolio = []
      const valuesBenchmark: number[] = []

      for (let i = 0; i < sectorsName.length; i++) {
         const indexValueBenchmark = parseFloat(
            (benchmarkPercentaje[i] * 100).toFixed(2)
         )

         const value = {
            percentage: 0,
            name: '',
         }
         valuesBenchmark.push(indexValueBenchmark)

         value.percentage = parseFloat((sectorsPercentage[i] * 100).toFixed(2))
         value.name = sectorsName[i]
         valuesPortfolio.push(value)
      }

      valuesBenchmark.sort((a, b) => {
         return b - a
      })
      valuesPortfolio.sort((a, b) => {
         return b.percentage - a.percentage
      })

      setValues(valuesPortfolio)

      setSeries([
         {
            name: 'Portfolio',
            data: valuesPortfolio.map((i) => i.percentage),
         },
         {
            name: 'Benchmark',
            data: valuesBenchmark,
         },
      ])
   }, [])

   const options = {
      chart: {
         foreColor: '#6C8394',
         offsetX: 5,
         offsetY: 30,
         type: 'bar' as const,
         toolbar: {
            show: false,
         },
      },
      legend: {
         show: false,
         showForSingleSeries: true,
         markers: {
            fillColors: ['#21BAB7', '#3CB4EE'],
         },
      },
      colors: ['#21BAB7', '#3CB4EE'],
      plotOptions: {
         bar: {
            barHeight: '70%',
            borderRadius: 1,
            horizontal: true,
            dataLabels: {
               position: 'top',
               hideOverflowingLabels: false,
            },
         },
      },
      labels: values.map((value: { name: any }) => value.name),
      dataLabels: {
         enabled: true,
         style: {
            fontSize: '10px',
            fontFamily: 'Poppins',
            fontWeight: '500',
            colors: ['#6C8394'],
         },
         formatter: function (value: any) {
            return value + '%'
         },
         offsetX: 39,
      },

      xaxis: {
         //https://apexcharts.com/docs/options/xaxis/
         max: topPercentage,
         position: 'bottom',
         labels: {
            show: false,
         },
         axisTicks: {
            show: false,
         },
      },
      yaxis: {
         labels: {
            align: 'left' as const,
            show: true,
            maxWidth: 360,
            style: {
               fontSize: '14px',
               fontFamily: 'Poppins',
            },
         },
      },
      stroke: {
         show: true,
         width: 1,
         colors: ['#fff'],
      },
      grid: {
         //https://apexcharts.com/docs/options/grid/
         show: false,
         xaxis: {
            lines: {
               show: false,
            },
         },
      },
   }

   return (
      <div className="">
         <div className="text-[#6C8394] text-sm">
            <div className="flex justify-center items-center">
               <div className="h-3 w-3 rounded-sm bg-[#21BAB7]" />
               <span className="ml-2">Porftolio</span>
               <div className="ml-2 h-3 w-3 rounded-sm bg-[#3CB4EE]" />
               <span className="ml-2">Benchmark</span>
            </div>
         </div>
         <div className="-mt-12">
            <ReactApexChart
               options={options}
               series={series}
               type="bar"
               height={480}
            />
         </div>
      </div>
   )
}
