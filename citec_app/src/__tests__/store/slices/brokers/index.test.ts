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
import reducer, {
   setBrokers,
   setA1c_t,
   setBrokerConnected,
   resetBrokers,
   setAccountType,
   setAccountTypeSelect,  
} from 'store/slices/brokers'

describe('Brokers redux state tests', () => {
   test('should return the initial state', () => {
      expect(reducer(undefined, {} as never)).toEqual({
           brokerConnected: '',
           balance: 0,
           accountType: [],
           a1c_t:'' ,
           accountTypeSelect: ''           
      })
   })

   test('set Brokers in Redux', () => {
      const initialState = {
       brokerConnected: '',
       balance: 0,
       accountType: [],
       a1c_t:'' ,
       accountTypeSelect: '',
      }
      const data_state = {
       brokerConnected: 'Alpaca',
       balance: 100000,
       accountType: ['LIVE', 'PAPER'],
       a1c_t:'%t&lo90==' ,
      }

      expect(reducer(initialState as any, setBrokers(data_state))).toEqual({
       brokerConnected: 'Alpaca',
       balance: 100000,
       accountType: ['LIVE', 'PAPER'],
       a1c_t:'%t&lo90==' ,
      })
   })
       
    test('set setBrokerConnected in Redux', () => {
       const initialState = {
        brokerConnected: '',
        balance: 0,
        accountType: [],
        a1c_t:'' ,
       }
      
       expect(reducer(initialState as any, setBrokerConnected({brokerConnected:'Alpaca'}))).toEqual({
        brokerConnected: 'Alpaca',
        balance: 0,
        accountType: [],
        a1c_t:'' ,
       })
    })

    test('set setAccountType in Redux', () => {
     const initialState = {
      brokerConnected: '',
      balance: 0,
      accountType: [],
      a1c_t:'' ,
      accountTypeSelect: '',
     }
    
     expect(reducer(initialState as any, setAccountType({accountType: ['PAPER', 'LIVE']}))).toEqual({
      brokerConnected: '',
      balance: 0,
      accountType: ['PAPER', 'LIVE'],
      a1c_t:'' ,
      accountTypeSelect: '',
     })
  })

  test('set setAccountTypeSelect in Redux', () => {
     const initialState = {
      brokerConnected: '',
      balance: 0,
      accountType: [],
      a1c_t:'' ,
      accountTypeSelect: '',
     }
    
     expect(reducer(initialState as any, setAccountTypeSelect({accountTypeSelect: 'LIVE'}))).toEqual({
      brokerConnected: '',
      balance: 0,
      accountType: [],
      a1c_t:'' ,
      accountTypeSelect: 'LIVE',
     })
  })

  test('Reset brokers in Redux', () => {
       const previusState = {
        brokerConnected: 'Alpaca',
        balance: 80000,
        accountType: ['PAPER'],
        a1c_t:'po&=%%o' ,
        accountTypeSelect: 'PAPER',        
       }
       
 
       expect(reducer(previusState as any, resetBrokers())).toEqual({
        brokerConnected: '',
        balance: 0,
        accountType: [],
        a1c_t:'' ,
        accountTypeSelect: '',        
       })
    })

   
})