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
import NumberFormat from 'react-number-format'

import { useForm, useValidateTicker } from 'features/utils/hooks'
import { PortfolioLoaded } from 'features/utils/interfaces/portfolio-loaded'
import { AutocompleteInput } from 'features/utils/autocomplete'

interface FormAddRowProps {
   setExcelData: React.Dispatch<React.SetStateAction<[] | PortfolioLoaded[]>>
}

const initialFormState = {
   ticker: '',
   outstanding_balance: '',
   unrealized_capital_gains: '',
}

export const FormAddRow = ({ setExcelData }: FormAddRowProps) => {
   const { values, handleInputChange, handleResetForm, handleInputNumberChange } =
      useForm(initialFormState)

   const { ticker, outstanding_balance, unrealized_capital_gains } = values

   const addRow = (e: React.SyntheticEvent) => {
      e.preventDefault()
      setExcelData((state: [] | PortfolioLoaded[]) => [
         {
            ticker,
            outstanding_balance: Number(outstanding_balance),
            unrealized_capital_gains: Number(unrealized_capital_gains),
         },
         ...state,
      ])

      handleResetForm()
   }

   const isValidTicker = useValidateTicker(ticker)

   return (
      <>
         <form
            className="flex flex-1 form-table relative"
            autoComplete="off"
            onSubmit={addRow}
         >
            <AutocompleteInput
               onChangeValue={(e) => handleInputChange(e, { toUpperCase: true })}
               value={ticker}
               name="ticker"
               error={isValidTicker || ticker == ""}
            />

            <NumberFormat
               value={outstanding_balance}
               thousandSeparator={true}
               min={1}
               onValueChange={({ value }) => {
                  handleInputNumberChange('outstanding_balance', value)
               }}
               className="input-table input-common input-valid"
               placeholder="$"
               id="outstanding_balance"
               required
            />
            <NumberFormat
               value={unrealized_capital_gains}
               thousandSeparator={true}
               min={1}
               onValueChange={({ value }) => {
                  handleInputNumberChange('unrealized_capital_gains', value)
               }}
               className="input-table input-common  input-valid"
               placeholder="$"
               id="unrealized_capital_gains"
               required
            />

            <div className="delete-row">
               <button
                  type="submit"
                  data-testid="btn-add-row"
                  className="btn-add-row bg-green-600 hover:bg-green-700 "
                  disabled={!isValidTicker}
               >
                  +
               </button>
            </div>
            {!isValidTicker && ticker != "" && (
               <span className="left-5 text-sm text-red-500 absolute -bottom-[3px]">
                  Ticker {values.ticker} is invalid
               </span>
            )}
         </form>
      </>
   )
}
