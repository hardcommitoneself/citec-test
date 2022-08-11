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
import * as React from 'react'

const Asterisk = (
   props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
   <svg
      width={15}
      height={15}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <path
         d="M15 8.333H9.5l3.917 3.917-1.167 1.167L8.333 9.5V15H6.667V9.417L2.75 13.333l-1.167-1.166 3.75-3.834H0V6.667h5.5L1.583 2.75 2.75 1.583 6.667 5.5V0h1.666v5.333L12.167 1.5l1.166 1.25-3.916 3.917H15v1.666Z"
         fill="#E05955"
      />
   </svg>
)

export default Asterisk
