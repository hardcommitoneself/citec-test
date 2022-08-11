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

import moment from 'moment'
import { AllPaths } from 'routes'
import { store } from 'store'
import { resetIdeas } from 'store/slices/ideas'
import { fetchIdeas } from 'store/slices/ideas/thunk'
import Swal from 'sweetalert2'
import { fetchDataFromCitecApi } from './api/citec-api'

interface SavePortfolioProps {
   benchmark: string
   ticker: string[]
   outstanding_balance: number[]
   unrealized_capital_gains: number[]
   navigate: (goTo: AllPaths) => void
}

export const savePortfolio = ({
   benchmark,
   outstanding_balance,
   ticker,
   unrealized_capital_gains,
   navigate,
}: SavePortfolioProps) => {
   Swal.fire({
      title: 'Save portfolio',
      text: 'Save as',
      input: 'text',
      width: 300,
      customClass: {
         actions: 'btns-summary-popup',
         confirmButton: 'btn-confirm-summary-popup',
         cancelButton: 'btn-cancel-summary-popup',
      },
      reverseButtons: true,
      inputPlaceholder: 'Name',
      inputAttributes: {
         autocapitalize: 'off',
      },
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      showCancelButton: true,
      backdrop: true,
      preConfirm: (name) => {
         const payload = {
            portfolio: name,
            benchmark,
            creation_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            ticker,
            outstanding_balance,
            unrealized_capital_gains,
         }
         return fetchDataFromCitecApi({
            endpoint: 'citec/portfolio',
            method: 'POST',
            payload,
         })
      },
      allowOutsideClick: () => !Swal.isLoading(),
   }).then((result) => {
      if (result.isConfirmed) {
         store.dispatch(resetIdeas())
         store.dispatch(fetchIdeas())
         Swal.fire({
            title: `The portfolio is saved correctly`,
         }).then(() => navigate('/'))
      }
   })
}
