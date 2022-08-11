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
import { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Button } from '@mui/material'
import { setSectors } from 'store/slices/universe'
import { useDispatch } from 'react-redux'
import { useGetCustomUniverse } from 'features/utils/hooks/use-get-custom-universe'

import XLSX from 'xlsx'
import { Icon } from 'assets/icons'
import { useAppSelector } from 'store/hooks'

import { Factors, SectorsUniverse, UniverseSelection } from 'features/customize'
import { TotalsScreener } from '../totals-screener'
import { fetchDataFromCitecApi } from 'features/utils/api/citec-api'
import { ValidationTickersResp } from 'features/utils/interfaces/ticker-validation-resp'
import { PageContainer } from 'features/ui/page-container'

export const Equity = () => {
   const [isDownloadingUniverse, setIsDownloadingUniverse] = useState(false)
   const customUniverse = useGetCustomUniverse()

   const dispatch = useDispatch()

   const sectors = useAppSelector((state) => state.static_data.universe.sectors)
   const sectorsFilter = useAppSelector((state) => state.universe.sectors_filter)
   const universe = useAppSelector((state) => state.universe)

   const parameters = [
      { name: 'Benchmark', component: <UniverseSelection /> },
      { name: 'Sector Screener', component: <SectorsUniverse /> },
      { name: 'Smart Beta Factor Screener', component: <Factors /> },
   ]

   const parametersWithInfo = [
      'Benchmark',
      'Sector Screener',
      'Smart Beta Factor Screener',
   ]

   const handleExportUniverseScreener = async () => {
      setIsDownloadingUniverse(true)
      const { factors_filter, universe_base, ...rest } = universe
      const lowerFactors: number[] = []
      const upperFactors: number[] = []
      const factor: string[] = []

      for (let i = 0; i < factors_filter.length; i++) {
         const element = factors_filter[i]
         lowerFactors.push(element.ranges[0])
         upperFactors.push(element.ranges[1])
         factor.push(element.factor)
      }

      const payload = {
         universe_base: {
            name: universe_base,
            description: universe_base,
         },
         factors_filter: {
            factor,
            lower: lowerFactors,
            upper: upperFactors,
         },
         ...rest,
      }

      const { data } = await fetchDataFromCitecApi<ValidationTickersResp[]>({
         endpoint: '/ai/universe/constituents/',
         method: 'POST',
         payload,
      })

      const universesFormatted = data.filter((e) => {
         delete e.url_morningstar
         delete e.url_logo
         delete e.url_company
         delete e.status
         return true
      })

      const wordBook = XLSX.utils.book_new()
      const wordSheet = XLSX.utils.json_to_sheet(universesFormatted)

      XLSX.utils.book_append_sheet(wordBook, wordSheet)
      XLSX.writeFile(wordBook, `${universe_base}.xlsx`)
      setIsDownloadingUniverse(false)
   }

   useEffect(() => {
      if (sectorsFilter.length === 0) {
         dispatch(setSectors(sectors))
      }
   }, [])

   return (
      <PageContainer
         titlePage="Summary"
         actionBtn={
            <Button
               className="mx-3"
               variant="download"
               onClick={handleExportUniverseScreener}
               disabled={isDownloadingUniverse}
               data-testid="donwload-universe"
            >
               <Icon.Download white />
            </Button>
         }
      >
         <div className="equity_wrapper">
            <div className="pb-8">
               <TotalsScreener totals={customUniverse} />
            </div>

            <div className="InvestmentBody summary dashboard_body px-0">
               {parameters.map(({ name, component }, i) => (
                  <Accordion key={i}>
                     <AccordionSummary>
                        <p className="flex items-center text-xl my-2 text-[#2d405a] ">
                           <span className="font-semibold mr-2 ">{name}</span>
                           {parametersWithInfo.includes(name) && <Icon.Info />}
                        </p>
                     </AccordionSummary>
                     <AccordionDetails>{component}</AccordionDetails>
                  </Accordion>
               ))}
            </div>
         </div>
      </PageContainer>
   )
}
