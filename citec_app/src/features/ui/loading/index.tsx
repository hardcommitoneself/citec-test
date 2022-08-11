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

export const Loading = () => {
   const generateBars = () => {
      const bars = []

      for (let index = 0; index < 10; index++) {
         bars.push(<div key={index} className={`rect${index + 1}`}></div>)
      }

      return bars
   }

   return (
      <div className="flex flex-col justify-center items-center h-screen bg-black w-full z-50">
         <div className="spinner" data-testid="loading">
            {generateBars()}
         </div>

         <h3 id="loading-content" className="mt-3 text-white"></h3>
      </div>
   )
}
