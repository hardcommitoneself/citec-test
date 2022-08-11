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

import { useAppSelector } from 'store/hooks'
import { useSelectUniverse } from 'features/utils/hooks/use-select-universe'

export const UniverseSelection = () => {
   const { handleSelectUniverse } = useSelectUniverse()

   const universes = useAppSelector((state) => state.static_data.universe.universes)
   const universeSelected = useAppSelector((state) => state.universe.universe_base)

   return (
      <div className="grid grid-cols-4 w-full mb-2 gap-3">
         {universes.map((universe, key) => (
            <button
               key={key}
               className={
                  universeSelected === universe.name
                     ? 'universe-btn-select'
                     : 'universe-btn'
               }
               onClick={() => handleSelectUniverse(universe.name)}
            >
               {universe?.description}
            </button>
         ))}
      </div>
   )
}
