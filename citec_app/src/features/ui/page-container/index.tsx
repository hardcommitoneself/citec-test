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

import { Alert, AlertTitle } from '@mui/material'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'store/hooks'
import { resetError } from 'store/slices/errors'

interface PageContainerProps {
   actionBtn?: ReactNode
   bgWhite?: boolean
   className?: string
   secondaryTitle?: string
   titlePage?: string
   error?: string
   alertTitle?: any
}

export const PageContainer: FC<PageContainerProps> = ({
   actionBtn,
   bgWhite,
   children,
   className,
   error,
   secondaryTitle,
   titlePage,
   alertTitle,
}) => {
   const errorOnRedux = useAppSelector((state) => state.errors)
   const dispatch = useDispatch()

   const Group = require('assets/img/group.png')

   useEffect(() => {
      return () => {
         if (errorOnRedux) dispatch(resetError())
      }
   }, [])

   return (
      <div
         className={`${className} my-8 mx-10 ${
            bgWhite && 'bg-white p-4'
         } rounded-2xl relative`}
         id="pagecontainer"
      >
         <div className="criteria_title flex justify-between">
            {titlePage && (
               <h3 className="mb-4 font-semibold text-[26px] text-[#2d405a]">
                  {titlePage}
                  {alertTitle && (
                     <img
                        className="moreinfo ml-8"
                        src={Group}
                        alt=""
                        onClick={() => alertTitle()}
                     />
                  )}
               </h3>
            )}
            {actionBtn && <div>{actionBtn}</div>}
         </div>

         {secondaryTitle && (
            <h3 className="mt-16 mb-5 text-neutral-500 text-2xl text-center">
               {secondaryTitle}
            </h3>
         )}

         {error ? (
            <Alert severity="error" className="mb-3">
               <AlertTitle>
                  <strong>Error</strong>
               </AlertTitle>
               {error}
            </Alert>
         ) : (
            children
         )}
      </div>
   )
}
