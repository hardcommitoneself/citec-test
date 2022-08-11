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
import { Icon } from 'assets/icons'
import { Link } from 'react-router-dom'
import { TopbarUserMenu } from './topbar-user-menu'

const search = require('assets/img/search.png')

interface TopbarProps {
   color?: 'white' | 'green'
}

export const Topbar = ({ color = 'white' }: TopbarProps) => {
   return (
      <div
         data-testid="topbar"
         className={`dashbaord_header px-7  ${
            color === 'green' ? 'bg-[#0baca9] h-[80px] ' : 'h-[100px] '
         }`}
      >
         {color === 'green' ? (
            <AppLink to="/">
               <Icon.LogoCT />
            </AppLink>
         ) : (
            <>
               <div />
               <div className="search_wrapper !hidden">
                  <img src={search} alt="" />
                  <input type="text" placeholder="Search  anything..." />
               </div>
            </>
         )}

         <div
            className={`right_side ${
               color === 'white' ? 'text-[#79828D]' : 'text-white'
            }`}
         >
            <nav>
               <Link to="/" className="hidden">
                  <Icon.Message color={color} />
               </Link>
               <Link to="/">
                  <Icon.Home color={color} />
               </Link>
            </nav>

            <TopbarUserMenu />
         </div>
      </div>
   )
}
