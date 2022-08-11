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
import '@testing-library/jest-dom'
//import { fireEvent, prettyDOM, render, screen } from '@testing-library/react'


import { ProviderAlpaca } from 'features/brokers/alpaca/utils/provider-alpaca'

describe('test in Provider Alpaca', () => {

  test('getToken',  async () => {
     const token = await ProviderAlpaca.getToken('code')     
     expect(token.code).toEqual('error')
  })

   test('when get Token is successful', async () => {
                                
      ProviderAlpaca.getToken = jest.fn((oauth_code: string) => Promise.resolve({code:'sucess', value:'6uplkjimnpljk=='}));
    
      const token = await ProviderAlpaca.SetTokenAuth0Alpaca('code')
      expect(token).toEqual({code:'sucess', value:'6uplkjimnpljk=='})
      
    })

   test('When get Token fails',  async () => {
        ProviderAlpaca.getToken = jest.fn((oauth_code: string) => Promise.resolve({code:'error', value:'Error in Alpaca Connection'}));
    
        const token = await ProviderAlpaca.SetTokenAuth0Alpaca('code')
        expect(token).toEqual({code:'error', value:'Error in Alpaca Connection'})
     })

     test('setToken',  async () => {
      ProviderAlpaca.getToken = jest.fn((oauth_code: string) => Promise.resolve('Hola'));
  
      const token = await ProviderAlpaca.setTokenAlpaca('code')
      expect(token).toEqual('Hola')
   })  
     
 })
 