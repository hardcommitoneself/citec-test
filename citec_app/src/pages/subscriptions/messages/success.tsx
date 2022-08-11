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
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const StripePageSuccess = () => {
   const [searchParams,] = useSearchParams();
   const session_id = searchParams.get("session_id")
   const [sessionDetails, setSessionDetails] = useState<any>(null)

   const getSession = async (session_id: string) => {
      const token = localStorage.getItem('token')

      try {
         const checkoutSession = await axios(process.env.REACT_APP_API_URL + "subscriptions/checkout/?sessionId=" + session_id, {
            method: "GET",
            headers: {
               'Authorization': 'Bearer ' + token,
            },
         })
         setSessionDetails(checkoutSession.data)
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      getSession(session_id as string)
   }, [])


   return (
      <>
         <h1>Success payment</h1>
         {sessionDetails &&
            <h2>Amount payment: {sessionDetails.amount_subtotal / 100} $</h2>
         }
         {sessionDetails &&
            <h2>Name: {sessionDetails.customer_details.name}</h2>
         }
         {sessionDetails &&
            <h2>Email: {sessionDetails.customer_details.email}</h2>
         }

      </>
   )
}
