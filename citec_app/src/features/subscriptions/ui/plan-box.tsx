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
import React from 'react'
const tick = require('assets/img/tick_list.png')

const PlanBox = ({ plan, price, list, button, price_id }: any) => {

   const handleSubmit = async (price_id: string) => {

      if (price_id == 'Custom') {
         window.location = "mailto:info@citecsolutions.com" as never
      } else if (price_id == 'Coming-soon') {
         window.location.href = "/subscriptions"
      }
      const token = localStorage.getItem('token')

      try {
         const checkoutSession = await fetch(process.env.REACT_APP_API_URL + "subscriptions/checkout/?price_id=" + price_id, {
            method: "POST",
            headers: {
               'Authorization': 'Bearer ' + token,
            },
         }).then((res) => res.json())
         const checkoutObject = JSON.parse(checkoutSession);
         window.location.assign(checkoutObject.url)
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className={`PricingBox ${plan == 'Custom' && 'disable'}`}>
         <h1 className="heading">{plan}</h1>
         {price == 'Custom' ? (
            <h2 className="price CustomPrice ">{price}</h2>
         ) : (
            <h2 className="price">
               ${price}
               <span>.99</span>
            </h2>
         )}
         <button onClick={() => handleSubmit(price_id)}>{button}</button>

         <ul>
            {list.map((Each: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => (
               <li>
                  <img src={tick} alt="" />
                  <p>{Each}</p>
               </li>
            ))}
         </ul>
      </div>
   )
}
export default PlanBox
