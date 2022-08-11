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
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { resetBrokers } from 'store/slices/brokers'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export const TopbarUserMenu = () => {
   const [toggleDropdown, setToggleDropdown] = useState(false)

   const handleToggleDropdown = () => setToggleDropdown(!toggleDropdown)

   const { logout, user } = useAuth0()

   const dispatch = useDispatch()

   return (
      <div className="profile_area" data-testid="topbar-user-menu">
         <p>{user?.name}</p>
         <img src={user?.picture} alt="" className="profile_icon" />
         {/* <img src={Arrow} alt="" /> */}

         <Dropdown isOpen={toggleDropdown} toggle={handleToggleDropdown}>
            <DropdownToggle
               aria-expanded
               data-toggle="dropdown"
               tag="span"
               caret
               className="cursor-pointer"
            >
               {' '}
            </DropdownToggle>
            <DropdownMenu right>
               <DropdownItem>
                  <AppLink to="/profile" className="flex">
                     My Profile
                  </AppLink>
               </DropdownItem>
               <DropdownItem
                  onClick={() => {
                     logout({ returnTo: window.location.origin })
                     dispatch(resetBrokers())
                  }}
               >
                  Logout
               </DropdownItem>
            </DropdownMenu>
         </Dropdown>
      </div>
   )
}
