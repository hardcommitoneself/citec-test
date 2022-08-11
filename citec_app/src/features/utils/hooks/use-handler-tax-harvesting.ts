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
import { useEffect } from 'react'
import { store } from 'store'
import _ from 'lodash'

import { Portfolio } from 'features/ui/table/columns/tax-harvesting'
import { setCashTicker, setHold, setManagePositions } from 'store/slices/rebalance'
import { useAppSelector } from 'store/hooks'
import converterArrays from '../converterArrays'
import {
   setInitialPositions,
   setPositionSelected,
} from 'store/slices/tax-harvesting'

export interface HandleSelectCheck {
   checked: boolean
   item: Portfolio
   index: number
}

export const useHandlerTaxHarvesting = () => {
   const dispatch = useDispatch()

   const portfolio = useAppSelector((state) => state.portfolio)
   const holds = useAppSelector((state) => state.rebalance.hold)
   const rebalanceTicker = useAppSelector((state) => state.rebalance.ticker)
   const portfolio_unrealized = useAppSelector(
      (state) => state.portfolio.unrealized_capital_gains
   )

   const updateTickerOnRedux = (isChecked: boolean, index: number) => {
      const updatedHolds = store.getState().rebalance.hold

      const arrayHold = [...updatedHolds]

      arrayHold[index] = isChecked ? 0 : 1

      dispatch(setHold(arrayHold))
   }

   const { outstanding_balance, ticker, unrealized_capital_gains } = portfolio

   const positions = converterArrays({
      outstanding_balance,
      ticker,
      unrealized_capital_gains,
   }) as Portfolio[]

   const addOrRemoveAllPositions = (checked: boolean) => {
      dispatch(
         setPositionSelected({
            arrayPositionSelected: checked ? positions : [],
         })
      )
   }

   useEffect(() => {
      const totalUnrealizedGains = positions
         .map((item) => item.unrealized_capital_gains)
         .reduce((accumulator, curr) => curr + accumulator, 0)

      const negativePositions1 = portfolio_unrealized.filter((a) => a <= 0)

      let totalUnrealizedGainsNegative = 0

      if (negativePositions1.length > 0) {
         totalUnrealizedGainsNegative = negativePositions1.reduce(
            (accumulator, curr) => accumulator + curr,
            0
         )
      }

      dispatch(
         setInitialPositions({
            unrealizedCapitalGains: totalUnrealizedGains,
            unrealizedCapitalGainsNegative: totalUnrealizedGainsNegative,
         })
      )
   }, [])

   const sellCash = () => {
      const indexCash = positions.findIndex((x) => x.ticker === '$CASH')
      const updatedHolds = store.getState().rebalance.hold

      const arrayHold = [...updatedHolds]

      arrayHold[indexCash] = 0

      dispatch(setHold(arrayHold))
   }

   useEffect(() => {
      //https://lodash.com/docs/4.17.15#difference
      const diffPositions = _.difference(ticker, rebalanceTicker)
      //https://lodash.com/docs/4.17.15#uniq
      const uniqTickers = _.uniq([...diffPositions, ...ticker])

      const holdsDiffPositions = new Array(diffPositions.length).fill(1)

      const arrayTicker: string[] = []
      const arrayHold: number[] = []

      positions.forEach(({ ticker }) => {
         arrayTicker.push(ticker)
         arrayHold.push(1)
      })

      const isHoldsEmpty = holds.length === 0

      dispatch(
         setManagePositions({
            ticker: isHoldsEmpty ? arrayTicker : uniqTickers,
            hold: isHoldsEmpty ? arrayHold : [...holdsDiffPositions, ...holds],
         })
      )

      const isCashOnPortfolio = positions.some((e) => e.ticker === '$CASH')

      if (isCashOnPortfolio) sellCash()
      else dispatch(setCashTicker())
   }, [])

   return {
      addOrRemoveAllPositions,
      updateTickerOnRedux,
      positions,
   }
}
