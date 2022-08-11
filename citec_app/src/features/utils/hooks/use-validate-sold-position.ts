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
import { Paths } from 'routes/routes'
import { store } from 'store'
import { useAppSelector } from 'store/hooks'
import { setPositionSelected } from 'store/slices/tax-harvesting'

export const useValidateSoldPosition = () => {
   const dispatch = useDispatch()

   const outstandingBalance = useAppSelector(
      (state) => state.portfolio.outstanding_balance
   )
   const positionsSelected = useAppSelector(
      (state) => state.taxHarvesting.arrayPositionSelected
   )
   const totalsPositionsSelected = positionsSelected
      .map((position) => position.outstanding_balance)
      .reduce((acc, curr) => acc + curr, 0)

   const totalPortfolio = outstandingBalance.reduce((acc, curr) => acc + curr, 0)
   const minimunValueSold = Math.round((10 / 100) * totalPortfolio)
   const is10PercentSold = totalsPositionsSelected >= minimunValueSold

   const holds = useAppSelector((state) => state.rebalance.hold)
   const tickers = useAppSelector((state) => state.portfolio.ticker)

   const isSomeSellPosition = holds.some((value) => value === 0)

   const indexCash = tickers.indexOf('$CASH')

   const isCashOnTickers = indexCash >= 0

   const pagesThatNeedSoldPosition: Paths[] = ['/criteria', '/summary']

   const soldCashOnTaxharvesting = (amountCash: number) => {
      const unrealizedGains = store.getState().portfolio.unrealized_capital_gains
      const updatedTickers = store.getState().portfolio.ticker

      const indexUpdatedCash = updatedTickers.indexOf('$CASH')

      const copyPositionsSelected = [...positionsSelected]
      const positionCashSelected = copyPositionsSelected.findIndex(
         (item) => item.ticker === '$CASH'
      )

      const copyPositionCashSelected = {
         ...copyPositionsSelected[positionCashSelected],
      }

      const isCashSelected = positionCashSelected > 0

      const filteredPositionsWithoutCash = copyPositionsSelected.filter(
         (item) => item.ticker !== '$CASH'
      )

      copyPositionCashSelected.outstanding_balance = amountCash

      if (!isCashSelected) {
         copyPositionCashSelected.ticker = '$CASH'
         copyPositionCashSelected.unrealized_capital_gains =
            unrealizedGains[indexUpdatedCash]
      }

      dispatch(
         setPositionSelected({
            arrayPositionSelected: [
               ...filteredPositionsWithoutCash,
               copyPositionCashSelected,
            ],
         })
      )
   }

   return {
      indexCash,
      is10PercentSold,
      isCashOnTickers,
      isSomeSellPosition,
      pagesThatNeedSoldPosition,
      soldCashOnTaxharvesting,
   }
}
