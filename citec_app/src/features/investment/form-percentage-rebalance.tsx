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
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { fetchDataFromCitecApi } from 'features/utils/api/citec-api'
import { setPositionSelected } from 'store/slices/tax-harvesting'
import { setHold } from 'store/slices/rebalance'
import { useAppSelector } from 'store/hooks'
import {
   check100Percentage,
   check25or50Percentage,
   checkNegativePositions,
} from 'features/utils/percentage-rebalance'
import { useState } from 'react'

interface TaxHarvestingResp {
   ticker: string[]
   holds: number[]
}

export const FormPercentageRebalance = () => {
   const [value, setValue] = useState(0)
   const portfolio = useAppSelector((state) => state.portfolio)
   const portfolioOptimized = useAppSelector((state) => state.portfolio_optimized)
   const holds = useAppSelector((state) => state.rebalance.hold)

   const dispatch = useDispatch()

   const handleSelectPercentaje = async ({
      target,
   }: React.ChangeEvent<HTMLInputElement>) => {
      const selectedValue = Number(target.value)
      const { outstanding_balance, unrealized_capital_gains, ticker } = portfolio

      setValue(selectedValue)

      const { isSomeNegativePosition, negativeUnrealized } = checkNegativePositions({
         outstanding_balance,
         ticker,
         unrealized_capital_gains,
      })

      if (!isSomeNegativePosition) return

      if (selectedValue === 0) return

      if (selectedValue === 100) {
         const updatedHolds = check100Percentage({
            holds,
            negativeUnrealized,
            ticker,
         })

         dispatch(
            setPositionSelected({
               arrayPositionSelected: negativeUnrealized,
            })
         )

         dispatch(setHold(updatedHolds))

         return
      }

      const {
         benchmark,
         portfolio_id,
         creation_date,
         portfolio: portfolioName,
         optimization_status,
      } = portfolioOptimized

      const payload = {
         portfolio_id,
         portfolio: portfolioName,
         creation_date,
         benchmark,
         ticker,
         outstanding_balance,
         unrealized_capital_gains,
         optimization_status,
      }

      const { data } = await fetchDataFromCitecApi<TaxHarvestingResp>({
         endpoint: '/ai/portfolio/tax_harvesting/',
         method: 'POST',
         params: {
            pct_losses: `.${selectedValue}`,
         },
         payload,
      })

      const indexCash = ticker.indexOf('$CASH')

      data.holds[indexCash] = 0

      dispatch(setHold(data.holds))

      const negativeUnrealizedPercentage = check25or50Percentage({
         holds: data.holds,
         outstanding_balance,
         ticker,
         unrealized_capital_gains,
      })

      dispatch(
         setPositionSelected({
            arrayPositionSelected: negativeUnrealizedPercentage,
         })
      )
   }

   const formValues = [0, 25, 50, 100]

   return (
      <FormControl>
         <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleSelectPercentaje}
            value={value}
         >
            {formValues.map((val) => (
               <FormControlLabel
                  key={val}
                  value={val}
                  control={<Radio />}
                  label={
                     val === 0 ? 'Harvest losses manualy' : `${val}% of tax losses`
                  }
               />
            ))}
         </RadioGroup>
      </FormControl>
   )
}
