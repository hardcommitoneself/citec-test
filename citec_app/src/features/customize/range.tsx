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
import Slider from '@mui/material/Slider'
import { setFactors } from 'store/slices/universe'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Icon } from 'assets/icons'
import { customizePopups } from 'features/popups/customize-popups'
import {
   completeTitle,
   titleHighValue,
   titleLowValue,
} from 'features/utils/complete-titles-customize'

interface RangeProps {
   name: string
   state: number[]
   index?: number
   min?: number
   max?: number
}
export const Range = ({ name, state, index, min, max }: RangeProps) => {
   const dispatch = useDispatch()

   const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1)

   const [rangeValues, setRangeValues] = useState<number[]>(state)

   const setRangeValueOnRedux = (value: number | number[]) => {
      const payload = {
         index,
         value,
      }
      dispatch(setFactors(payload))
   }

   return (
      <div className="mb-2">
         <div className="flex mb-4 text-[#0BACA9]">
            <h4 className="text-xl flex items-center">
               {nameUpperCase} {completeTitle(name)}
            </h4>

            <button className="ml-2" onClick={() => customizePopups(name)}>
               <Icon.Info />
            </button>
         </div>
         <div className="w-full flex justify-between mt-1 text-[#79828D] text-sm">
            <span>{titleLowValue(name)}</span>
            <span>{titleHighValue(name)}</span>
         </div>
         <div className="px-2">
            <Slider
               value={rangeValues}
               onChangeCommitted={(_, newValue) => setRangeValueOnRedux(newValue)}
               onChange={(_, newValue) => {
                  setRangeValues(newValue as never)
               }}
               valueLabelDisplay="auto"
               min={min ?? 0}
               max={max ?? 100}
            />
         </div>
      </div>
   )
}
