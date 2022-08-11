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

import { Icon } from 'assets/icons'

const infoImg = require('assets/img/group.png')

interface TotalBoxProps {
   bgWhite?: boolean
   dataTestid?: string
   functInfo?: () => void | null
   img: any
   info?: boolean
   numberpositions?: number
   text: string
   value: number | string
}

export const TotalsBox = ({
   value,
   text,
   img,
   functInfo,
   info,
   numberpositions,
   bgWhite = false,
   dataTestid,
}: TotalBoxProps) => {
   return (
      <div className={`CustomizationBox ${bgWhite ? '!bg-white' : 'bg-inherit'}`}>
         {info && (
            <button
               className="moreinfo info-totals text-[#0BACA9]"
               onClick={functInfo}
               data-testid={dataTestid}
            >
               <Icon.Info />
            </button>
         )}
         <img src={img} alt="" />
         <div className="presentation">
            <p>{value}</p>
            <h1>{text}</h1>
            {numberpositions && (
               <p>
                  <span>No. of Positions </span>
                  <span style={{ marginLeft: 'auto' }}>{numberpositions}</span>
               </p>
            )}
         </div>
      </div>
   )
}
