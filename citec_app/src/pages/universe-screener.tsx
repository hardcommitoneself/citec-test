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
import { useDispatch } from 'react-redux'

import { setSectors } from 'store/slices/universe'
import { useAppSelector } from 'store/hooks'

import { Equity } from 'features/universe-screener/tabs'

type ActiveViews = 'equity' | 'mutual funds' | 'etfs'

export const UniverseScreener = () => {
   const dispatch = useDispatch()

   const disabledViews = ['']

   const sectors = useAppSelector((state) => state.static_data.universe.sectors)
   const sectorsFilter = useAppSelector((state) => state.universe.sectors_filter)

   const views = ['Equity' /* , 'Mutual Funds', 'ETFs' */]
   const [activeView, setActiveView] = useState<ActiveViews>('equity')

   useEffect(() => {
      if (sectorsFilter.length === 0) {
         dispatch(setSectors(sectors))
      }
   }, [])

   return (
      <div className="dashboard_wrapper">
         <div className="InvestmentBody summary dashboard_body">
            <div className="inner_dashboard_cri mt-0">
               <div className="options_summary_buttons">
                  {views.map((view) => (
                     <button
                        key={view}
                        className={
                           activeView === view.toLowerCase() ? 'active-btn' : 'null'
                        }
                        disabled={disabledViews.includes(view)}
                        onClick={() => {
                           setActiveView(view.toLowerCase() as ActiveViews)
                        }}
                        data-testid={`btn-${view.toLowerCase}`}
                     >
                        {view}
                     </button>
                  ))}
               </div>
               <div className="bg-white p-2" data-testid={`active-${activeView}`}>
                  {activeView === 'equity' && <Equity />}
               </div>
            </div>
         </div>
      </div>
   )
}
