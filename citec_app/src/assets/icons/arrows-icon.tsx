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

interface ArrowsProps {
   white?: boolean
   currentColor?: boolean
}

export const Arrows = ({ white, currentColor }: ArrowsProps) => {
   let color

   if (white) color = '#ffff'
   else color = '#9C2B85'

   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M7.50033 18.3327H12.5003C16.667 18.3327 18.3337 16.666 18.3337 12.4993V7.49935C18.3337 3.33268 16.667 1.66602 12.5003 1.66602H7.50033C3.33366 1.66602 1.66699 3.33268 1.66699 7.49935V12.4993C1.66699 16.666 3.33366 18.3327 7.50033 18.3327Z"
            stroke={currentColor ? 'currentColor' : color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M8.48353 14.2931L5.9502 11.7598"
            stroke={currentColor ? 'currentColor' : color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M8.4834 5.70898V14.2923"
            stroke={currentColor ? 'currentColor' : color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M11.5166 5.70898L14.0499 8.24232"
            stroke={currentColor ? 'currentColor' : color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M11.5166 14.2923V5.70898"
            stroke={currentColor ? 'currentColor' : color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   )
}
