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

import { AppLink } from 'routes/AppLink'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import { Icon } from 'assets/icons'
import LeftbarLink from './leftbar-link'
import { useAppSelector } from 'store/hooks'

const bars = require('assets/img/dashboard_bars.png')
const logo = require('assets/img/dashboard_logo.png')

interface LeftbarProps {
   hidden?: boolean
}

const Leftbar = ({ hidden }: LeftbarProps) => {
   const [small, setSmall] = useState(false)
   const { pathname } = useLocation()
   const workflow = useAppSelector((state) => state.workflow.type)

   const links = [
      {
         label: 'Investment',
         icon: <Icon.Arrows currentColor />,
         to: 'investment',
      },
      {
         label: 'Criteria',
         icon: <Icon.Chart currentColor />,
         to: 'criteria',
      },
      { label: 'Summary', icon: <Icon.Cpu />, to: 'summary' },
   ]

   if (workflow !== 'new')
      links.splice(1, 0, {
         label: 'Tax harvesting',
         icon: <Icon.TaxHarvesting />,
         to: 'tax-harvesting',
      })

   const homeLinks = [
      {
         label: 'Home',
         icon: <Icon.Home color={'green'} />,
         to: '/',
      },
      {
         label: 'Portfolio Builder',
         icon: <Icon.Builder />,
         to: '/workflow',
      },
      {
         label: 'Screener',
         icon: <Icon.ScreenerIcon />,
         to: '/universe-screener',
      },
   ]

   const pathWorkflow = ['/', '/workflow', '/universe-screener']

   return (
      <div
         className={`Sidebar ${small && 'small'} ${hidden && 'hidden'}`}
         id="active"
         data-testid="leftbar"
      >
         <div className="top_area">
            <AppLink to="/">
               <img src={logo} alt="" className="logo" />
            </AppLink>

            <span
               className="bars"
               onClick={() => {
                  setSmall(!small)
                  document.documentElement.style.setProperty(
                     '--transition-content-page',
                     '0.3s ease all'
                  )
                  if (
                     getComputedStyle(document.documentElement).getPropertyValue(
                        '--margin-left-content-page'
                     ) == '50px'
                  ) {
                     document.documentElement.style.setProperty(
                        '--margin-left-content-page',
                        '20%'
                     )
                  } else {
                     document.documentElement.style.setProperty(
                        '--margin-left-content-page',
                        '50px'
                     )
                  }
               }}
            >
               <img src={bars} alt="" />
            </span>
         </div>
         <nav>
            {pathWorkflow.includes(pathname)
               ? homeLinks.map(({ icon, label, to }, i) => (
                    <LeftbarLink key={i} icon={icon} to={to}>
                       {label}
                    </LeftbarLink>
                 ))
               : links.map(({ icon, label, to }, i) => (
                    <LeftbarLink key={i} icon={icon} to={to}>
                       {label}
                    </LeftbarLink>
                 ))}
         </nav>
      </div>
   )
}

export default Leftbar
