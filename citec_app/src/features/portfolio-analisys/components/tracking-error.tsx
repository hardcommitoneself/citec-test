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
import { Tracking_expected } from 'features/utils/interfaces/backtest-api-resp'
import ReactApexChart from 'react-apexcharts'

interface TrackingErrorProps {
   tracking_expected: Tracking_expected
}

export const TrackingError = ({ tracking_expected }: TrackingErrorProps) => {
   const { tracking_error, probability } = tracking_expected

   const trackingErrorConverted = tracking_error.map((num) =>
      Number((num * 100).toFixed(3))
   )
   const probabilityConverted = probability.map((num) =>
      String((num * 100).toFixed(3))
   )

   // Y AXIS
   const series = [
      {
         name: 'Probability',
         data: probabilityConverted,
      },
   ]

   const options = {
      chart: {
         height: 350,
         type: 'bar' as const,
         background: '#f6f7fb',
      },
      colors: ['#08ACA9'],
      plotOptions: {
         bar: {
            horizontal: false,
            columnWidth: '70%',
            endingShape: 'rounded' as const,
         },
      },
      labels: trackingErrorConverted,
      dataLabels: {
         enabled: false,
      },
      stroke: {
         show: true,
         width: 2,
         colors: ['transparent'],
      },
      xaxis: {
         type: 'numeric',
         tickAmount: 'dataPoints',
         decimalesInFloat: 3,
         labels: {
            style: {
               fontSize: '11px',
               color: '#6C8394',
               fontFamily: 'Poppins',
            },
         },
         tooltip: {
            enabled: false,
         },
         title: {
            text: '',
            offsetX: 0,
            offsetY: 0,
            style: {
               color: '#6C8394',
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: 600,
               cssClass: 'apexcharts-xaxis-title',
            },
         },
      },
      yaxis: {
         tickAmount: 4,
         decimalsInFloat: 0,
         tooltip: {
            enabled: false,
         },
         title: {
            text: '',
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
               color: '#6C8394',
               fontSize: '14px',
               fontFamily: 'Poppins',
               fontWeight: 600,
               cssClass: 'apexcharts-yaxis-title',
            },
         },
      },
   } as never

   return (
      <div className="pt-3">
         <ReactApexChart
            options={options}
            series={series as never}
            type="bar"
            height={350}
         />
      </div>
   )
}
