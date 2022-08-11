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

import { Checkbox } from '@mui/material'
import { useValidateSoldPosition } from 'features/utils/hooks'
import { useDispatch } from 'react-redux'
import { store } from 'store'
import { useAppSelector } from 'store/hooks'
import { setHold } from 'store/slices/rebalance'

interface CheckAllProps {
   addOrRemoveAllPositions: (checked: boolean) => void
}

export const CheckAll = ({ addOrRemoveAllPositions }: CheckAllProps) => {
   const holds = useAppSelector((state) => state.rebalance.hold)
   const { isCashOnTickers, indexCash } = useValidateSoldPosition()

   const dispatch = useDispatch()

   const removeOrAddAll = ({
      target: { checked },
   }: React.ChangeEvent<HTMLInputElement>) => {
      const updatedHolds = store.getState().rebalance.hold
      const allTickersSelected = updatedHolds.every((value) => value === 0)
      const newHolds = [...updatedHolds]

      if (checked && allTickersSelected) {
         newHolds.fill(0)
      } else if (checked && !allTickersSelected) {
         newHolds.fill(0)
      } else if (!checked && allTickersSelected) {
         newHolds.fill(1)
      } else if (!checked && !allTickersSelected) {
         newHolds.fill(1)
      }

      if (isCashOnTickers) newHolds[indexCash] = 0

      dispatch(setHold(newHolds))
      addOrRemoveAllPositions(checked)
   }

   return (
      <Checkbox
         className="p-0"
         onChange={removeOrAddAll}
         checked={holds.every((vals) => vals === 0)}
      />
   )
}
