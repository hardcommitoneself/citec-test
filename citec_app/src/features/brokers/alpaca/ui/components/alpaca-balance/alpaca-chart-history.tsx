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
import { formatToMoney } from 'features/utils/format-to-money'

interface HistoryProps {
   data: number[][]
}

export const ChartHistoryPortfolio = (data: HistoryProps) => {
   const series = [
      {
         name: '',
         data: data.data,
      },
   ]

   const options = {
      colors: ['#21BAB7'],
      stroke: {
         width: 2,
         curve: 'straight',
      },
      chart: {
         id: 'area-datetime',
         type: 'area',
         height: 350,
         toolbar: {
            show: false,
         },
         zoom: {
            autoScaleYaxis: true,
         },
         animations: {
            enabled: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      markers: {
         size: 0,
         style: 'hollow',
      },
      xaxis: {
         type: 'datetime',
         tooltip: {
            enabled: false,
         },
         labels: {
            datetimeFormatter: {
               year: 'MM/dd/yyyy',
               month: 'MM/dd/yyyy',
               day: 'MM/dd/yyyy',
               hour: 'HH:mm'
            }
         }
      },
      yaxis: {
         labels: {
            formatter: function (value: any) {
               return formatToMoney(value)
            },
         },
      },
      tooltip: {
         x: {
            format: 'dd MMM yyyy',
         },
      },
      fill: {
         type: 'gradient',
         gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
         },
      },
   }

   return (
      <div id="chart">
         <div>
            <ReactApexChart
               options={options as never}
               series={series as any}
               type="area"
               height={350}
            />
         </div>
      </div>
   )
}
