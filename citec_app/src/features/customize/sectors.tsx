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
import { Checkbox } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'store/hooks'
import { setSectors } from 'store/slices/universe'

export const SectorsUniverse = () => {
   const dispatch = useDispatch()
   const defaultSectors = useAppSelector(
      (state) => state.static_data.universe.sectors
   )
   const sectorsFilter = useAppSelector((state) => state.universe.sectors_filter)

   const handleOnChange = (sector: string) => {
      if (sectorsFilter.includes(sector)) {
         const response = sectorsFilter.filter((e) => e !== sector)
         dispatch(setSectors(response))
      } else {
         const response = [...sectorsFilter]
         response.push(sector)
         dispatch(setSectors(response))
      }
   }

   return (
      <div className="grid grid-cols-4 gap-2">
         {defaultSectors.map((sector, key) => (
            <label className="text-neutral-600 cursor-pointer" key={key}>
               <Checkbox
                  id={`custom-checkbox-${key}`}
                  data-testid={`custom-checkbox-${key}`}
                  name={sector}
                  checked={sectorsFilter.includes(sector)}
                  onChange={() => handleOnChange(sector)}
               />
               {sector}
            </label>
         ))}
      </div>
   )
}
