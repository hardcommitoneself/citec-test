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
import { render, screen } from '@testing-library/react'
import * as reactRedux from 'react-redux'
import { renderHook } from '@testing-library/react-hooks'
import { useFetchApi } from 'features/utils/hooks'
import * as fetchDataFromCitecApiFactory from 'features/utils/api/citec-api'
import { act } from 'react-dom/test-utils'
jest.mock('react-redux', () => ({
   useDispatch: jest.fn(),
   useSelector: jest.fn(),
}))

jest.mock('axios')

const useDispatchMock = <jest.Mock<any>>reactRedux.useDispatch
const useSelectorMock = <jest.Mock<any>>reactRedux.useSelector
const mockSelectors = (selector: any, store: any) => {
   return selector(store)
}
const mockStore = {
   errors: [],
}
const mockDispatch = jest.fn()

describe('Test useFetchApi Hook', () => {
   beforeEach(() => {
      useDispatchMock.mockReturnValue(mockDispatch)
      useSelectorMock.mockImplementation((selector) =>
         mockSelectors(selector, mockStore)
      )
   })
   afterEach(() => {
      useDispatchMock.mockClear()
      useSelectorMock.mockClear()
   })

   test('renderHook with no errors useFetchApi Hook', async () => {
      const fetchDataFromCitecApiMock = jest.spyOn(
         fetchDataFromCitecApiFactory,
         'fetchDataFromCitecApi'
      )
      fetchDataFromCitecApiMock.mockReturnValue(
         Promise.resolve({
            status: 200,
            data: {},
            statusText: 'Ok',
            headers: {},
            config: {},
         })
      )
      const { result } = renderHook(() => useFetchApi({
         endpoint: 'url',
         method: 'GET'
      }))
      useSelectorMock.mockReturnValue({ errors: ['Error'] })
   })
   test('renderHook with error Response useFetchApi Hook', async () => {
      const fetchDataFromCitecApiMock = jest.spyOn(
         fetchDataFromCitecApiFactory,
         'fetchDataFromCitecApi'
      )
      act(() => {
      fetchDataFromCitecApiMock.mockReturnValue(
         Promise.reject({
            code: 'ECONNABORTED',
            response: {
               status: 500,
            },
         })
      )
      })
      try {
         renderHook(() => useFetchApi({
            endpoint: 'url',
            method: 'GET'
         }))
      } catch {}
   })
   test('renderHook with no error Response useFetchApi Hook', async () => {
      const fetchDataFromCitecApiMock = jest.spyOn(
         fetchDataFromCitecApiFactory,
         'fetchDataFromCitecApi'
      )
      act(() => {

         fetchDataFromCitecApiMock.mockReturnValue(
            Promise.reject({
               code: 'ECONNABORTED',
            })
            )
         })
      try {
         renderHook(() => useFetchApi({
            endpoint: 'url',
            method: 'GET'
         }))
      } catch {}
   })
})
