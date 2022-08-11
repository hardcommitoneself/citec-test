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

import { useNavigate } from 'react-router-dom'

export const Error404 = () => {
   const navigate = useNavigate()

   return (
      <div className="z-[60] absolute left-0 top-0 bg-white w-full h-full flex items-center justify-center">
         <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">
               <h4 className="-rotate-90 text-red-600 text-2xl uppercase font-bold">
                  error
               </h4>

               <h2 className="text-9xl font-bold text-red-600 ">404</h2>
            </div>
            <span className="my-3 text-lg ">
               The page you are trying to find does not exist
            </span>
            <button
               className="btn-footer mt-2 w-full"
               onClick={() => navigate('/')}
            >
               Go home
            </button>
         </div>
      </div>
   )
}
