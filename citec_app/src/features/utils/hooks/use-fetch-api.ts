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
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { fetchDataFromCitecApi } from '../api/citec-api'
import { setError } from 'store/slices/errors'
import { useAppSelector } from 'store/hooks'

type UseFetchApiProps = {
   endpoint: string
   method: 'POST' | 'GET' | 'DELETE' | 'PUT'
   payload?: any
   params?: any
   startCallInmediatly?: boolean
   dependency?: any
}

export const useFetchApi = <T>({
   endpoint,
   payload,
   method,
   params,
   dependency,
   startCallInmediatly = true,
}: UseFetchApiProps) => {
   const [resp, setResp] = useState<T | null>(null)
   const [isLoading, setIsLoading] = useState(false)
   const error = useAppSelector((state) => state.errors)

   const dispatch = useDispatch()

   useEffect(() => {
      const fetchApi = async () => {
         setIsLoading(true)
         try {
            const { data } = await fetchDataFromCitecApi<T>({
               endpoint,
               method,
               params,
               payload,
            })
            setResp(data)
         } catch (e: any) {
            //timeout error

            if (e.code === 'ECONNABORTED') {
               dispatch(
                  setError(
                     'This process is taking too long, please refresh the page'
                  )
               )
            }

            if (e.response) {
               dispatch(setError(`An error ${e.response.status} has occurred `))
            } else {
               dispatch(
                  setError(
                     'Please go back and verify the configuration selected previously.'
                  )
               )
            }
         }

         setIsLoading(false)
      }

      if (startCallInmediatly) {
         fetchApi()
      }
      return () => {
         setResp(null)
      }
   }, [startCallInmediatly, dependency])

   return { resp, isLoading, error }
}
