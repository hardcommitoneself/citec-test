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

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setSectors } from 'store/slices/universe'
import { useAppSelector } from 'store/hooks'
import { useGetCustomUniverse } from 'features/utils/hooks/use-get-custom-universe'
import { Icon } from 'assets/icons'
import {
   Factors,
   SectorsUniverse,
   Tickers,
   TotalsUniverse,
   UniverseSelection,
} from 'features/customize'

export const Customize = () => {
   const customUniverse = useGetCustomUniverse()

   const dispatch = useDispatch()

   const sectors = useAppSelector((state) => state.static_data.universe.sectors)
   const sectorsFilter = useAppSelector((state) => state.universe.sectors_filter)

   const parameters = [
      { name: 'Market Screener', component: <UniverseSelection /> },
      { name: 'Sector Screener', component: <SectorsUniverse /> },
      { name: 'Smart Beta Factor Screener', component: <Factors /> },
      {
         name: 'Include/Exclude',
         component: (
            <div className="grid grid-cols-2 gap-3">
               <Tickers type="Include" /> <Tickers type="Exclude" />
            </div>
         ),
      },
   ]

   const parametersWithInfo = ['Sector Screener', 'Smart Beta Factor Screener']

   useEffect(() => {
      if (sectorsFilter.length === 0) {
         dispatch(setSectors(sectors))
      }
   }, [])

   return (
      <>
         <TotalsUniverse totals={customUniverse} />

         <div className="my-3">
            {parameters.map(({ name, component }, i) => (
               <Accordion key={i}>
                  <AccordionSummary>
                     <p className="flex items-center text-xl my-2 text-[#2d405a]">
                        <span className="font-semibold mr-2 ">{name}</span>
                        {parametersWithInfo.includes(name) && <Icon.Info />}
                     </p>
                  </AccordionSummary>
                  <AccordionDetails>{component}</AccordionDetails>
               </Accordion>
            ))}
         </div>
      </>
   )
}
