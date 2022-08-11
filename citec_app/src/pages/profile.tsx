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
import { useAuth0 } from '@auth0/auth0-react'

export const Profile = () => {
   const { logout, user } = useAuth0()

   const handleSubmit = async () => {

      const token = localStorage.getItem('token')

      try {
         const customerPortalSession = await fetch(process.env.REACT_APP_API_URL + "subscriptions/portal/", {
            method: "POST",
            headers: {
               'Authorization': 'Bearer ' + token,
            },
         }).then((res) => res.json())
         const portalSessionObject = JSON.parse(customerPortalSession);
         window.location.assign(portalSessionObject.url)
      } catch (err) {
         console.log(err);
      }
   }


   return (
      <div
         data-testid="boxLoginContent"
         style={{
            height: '90vh',
         }}
         className="flex justify-center items-center"
      >
         <div>
            <img key={user?.picture} src={user?.picture} alt={user?.name} />
            <h2 key={user?.name}>{user?.name}</h2>
            <p key={Math.random()}>Email: {user?.email}</p>
            {user && (
               <>
                  <p key={Math.random()}>Expiration Date of subscription: &nbsp;
                     <b>
                        {new Date(user["https://citecsolutions.com/timestamp_expiration_date"] * 1000).toLocaleDateString("en-US")}
                     </b>
                  </p>
                  <button onClick={() => handleSubmit()}>Manage billing</button>
               </>
            )}
         </div>
         <button
            onClick={() => logout({ returnTo: window.location.origin })}
            name="logout"
            className="loginButton"
         >
            Logout
         </button>
      </div>
   )
}
