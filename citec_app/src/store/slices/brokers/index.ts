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
import { createSlice } from '@reduxjs/toolkit'
import { Security } from 'features/utils/security'

const initialState = {
   brokerConnected: '',
   balance: 0,
   accountType: [],
   a1c_t:'' ,
   accountTypeSelect: ''    
}

export const brokersSlice = createSlice({
   name: 'brokers',

   initialState,
   reducers: {     
      setBrokers: (state, action) => {
         state.brokerConnected = action.payload.brokerConnected
         state.balance = action.payload.balance
         state.accountType = action.payload.accountType
         state.a1c_t = action.payload.a1c_t
         state.accountTypeSelect = action.payload.accountTypeSelect         
      },
      resetBrokers: () => initialState,
      setA1c_t:(state, action) =>{        
        state.a1c_t= Security.encrypt(action.payload.a1c_t)
        localStorage.setItem('a1c_t', state.a1c_t)
      },
      setBrokerConnected:(state, action) =>{        
        state.brokerConnected= action.payload.brokerConnected
      },   
      setAccountType:(state, action) =>{        
         state.accountType= action.payload.accountType
       },  
      setAccountTypeSelect:(state, action) =>{        
         state.accountTypeSelect= action.payload.accountTypeSelect
       },       
   },
})

export const { setBrokers, resetBrokers,  setA1c_t, setBrokerConnected, setAccountType, setAccountTypeSelect } =
   brokersSlice.actions

export default brokersSlice.reducer
