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

interface ChartProps {
   currentColor?: boolean
}

export const Chart = ({ currentColor }: ChartProps) => {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M1.66699 18.334H18.3337"
            stroke={currentColor ? 'currentColor' : '#56CCF2'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M8.125 3.33268V18.3327H11.875V3.33268C11.875 2.41602 11.5 1.66602 10.375 1.66602H9.625C8.5 1.66602 8.125 2.41602 8.125 3.33268Z"
            stroke={currentColor ? 'currentColor' : '#56CCF2'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M2.5 8.33268V18.3327H5.83333V8.33268C5.83333 7.41602 5.5 6.66602 4.5 6.66602H3.83333C2.83333 6.66602 2.5 7.41602 2.5 8.33268Z"
            stroke={currentColor ? 'currentColor' : '#56CCF2'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M14.167 12.5007V18.334H17.5003V12.5007C17.5003 11.584 17.167 10.834 16.167 10.834H15.5003C14.5003 10.834 14.167 11.584 14.167 12.5007Z"
            stroke={currentColor ? 'currentColor' : '#56CCF2'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   )
}
