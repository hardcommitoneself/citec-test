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
import axios from "axios"
import Swal from "sweetalert2"

export const useAppSubscriptions = (user: any, pathname: string) => {
   const trial_period = process.env.REACT_APP_TRIAL_PERIOD as any

   if (user &&
      process.env.REACT_APP_ACTIVATE_SUBSCRIPTIONS == 'true' &&
      pathname != '/subscriptions') {

      const hasExpirationDate = !!user["https://citecsolutions.com/timestamp_expiration_datess"]
      if (hasExpirationDate) {
         checkIfExpirationDateIsLessToday(user["https://citecsolutions.com/timestamp_expiration_date"])
      } else {
         addTrialPeriod(trial_period)
      }
   }
}


const checkIfExpirationDateIsLessToday = (expiration_date: number) => {
   const timestamp_current = Math.floor(Date.now() / 1000)

   if (expiration_date < timestamp_current) {
      Swal.fire({
         title: 'Your subscription has expired!',
         html: 'The last day you had access was '
            + new Date(expiration_date * 1000).toLocaleDateString("en-US"),
         timer: 6000,
         timerProgressBar: true,
         didOpen: () => {
            Swal.showLoading()
         },
         willClose: () => {
            window.location.href = "/subscriptions"
         }
      })
   }
}

const addTrialPeriod = (days: number) => {
   try {
      //Logic add trial period to Auth0
      send_welcome_email()
   } catch (e: any) {
      console.log(e.message)
      return e.message
   }
}

const send_welcome_email = () => {
   const body = { "key": process.env.REACT_APP_MAILCHIMP_API_KEY }
   axios({
      headers: {
         'Content-Type': 'application/json',
      },
      method: 'POST',
      url: 'https://mandrillapp.com/api/1.0/users/ping',
      data: body,
   })
      .then(function (response) {
         return {
            code: 'sucess',
            value: response.data,
         }
      })
      .catch(function (error) {
         return {
            code: 'error',
            value: error,
         }
      })
}