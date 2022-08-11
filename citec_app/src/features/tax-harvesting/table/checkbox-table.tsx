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

import { Checkbox, CheckboxProps } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'store/hooks'
import { setPositionSelected } from 'store/slices/tax-harvesting'
import { Portfolio } from '../../ui/table/columns/tax-harvesting'

interface CheckboxTableProps extends CheckboxProps {
   item: Portfolio
   index: number
   updateTickerOnRedux: (isChecked: boolean, index: number) => void
}

export const CheckboxTable = ({
   item,
   updateTickerOnRedux,
   index,
}: CheckboxTableProps) => {
   const taxHarvestingState = useAppSelector((state) => state.taxHarvesting)
   const holds = useAppSelector((state) => state.rebalance.hold)
   const dispatch = useDispatch()

   const handleSelectCheck = ({
      target: { checked },
   }: React.ChangeEvent<HTMLInputElement>) => {
      const { arrayPositionSelected } = taxHarvestingState

      updateTickerOnRedux(checked, index)

      const positionsAddedItem = [...arrayPositionSelected, item]
      const positionsFilteredItem = arrayPositionSelected.filter(
         (item2) => item2.ticker !== item.ticker
      )

      dispatch(
         setPositionSelected({
            arrayPositionSelected: checked
               ? positionsAddedItem
               : positionsFilteredItem,
         })
      )
   }

   return (
      <Checkbox
         className="p-0"
         checked={holds[index] === 0}
         onChange={handleSelectCheck}
      />
   )
}
