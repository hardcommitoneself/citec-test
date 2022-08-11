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
import { setTickerToInclude, setTickerToExclude } from 'store/slices/universe'
import { useForm, useValidateTicker } from 'features/utils/hooks'
import { useAppSelector } from 'store/hooks'
import { AutocompleteInput } from 'features/utils/autocomplete'

interface TickersProps {
   type: 'Include' | 'Exclude'
}

export const Tickers = ({ type }: TickersProps) => {
   const dispatch = useDispatch()
   let tickers: any[] = []
   const tickers_include = useAppSelector((state) => state.universe.to_include)
   const tickers_exclude = useAppSelector((state) => state.universe.to_exclude)

   if (type == 'Include') {
      tickers = tickers_include
   } else {
      tickers = tickers_exclude
   }

   const {
      values: { ticker },
      handleInputChange,
      handleResetForm,
   } = useForm({
      ticker: '',
   })

   const addRow = (e: React.SyntheticEvent) => {
      e.preventDefault()

      if (type == 'Include') {
         dispatch(setTickerToInclude([...tickers, ticker]))
      } else {
         dispatch(setTickerToExclude([...tickers, ticker]))
      }
      handleResetForm()
   }

   const handleDeleteTicker = (ticker: string) => {
      const tickerFiltered = tickers.filter(
         (tickersOnRedux) => tickersOnRedux !== ticker
      )
      if (type == 'Include') dispatch(setTickerToInclude(tickerFiltered))
      else dispatch(setTickerToExclude(tickerFiltered))
   }

   const isValidTicker = useValidateTicker(ticker)

   return (
      <div className="mb-10">
         <h3 className="font-bold text-neutral-600 mb-4 text-lg">{type} tickers</h3>

         <form
            className="flex items-center justify-center w-full mb-3 relative"
            autoComplete="off"
            onSubmit={addRow}
         >
            <AutocompleteInput
               onChangeValue={(e) => handleInputChange(e, { toUpperCase: true })}
               value={ticker}
               name="ticker"
               error={isValidTicker || !ticker}
               noMargin
            />

            {!isValidTicker && !!ticker && (
               <span
                  className="text-sm absolute -bottom-6 left-0 text-red-500"
                  data-testid="alert-invalid"
               >
                  Ticker {ticker} is invalid
               </span>
            )}

            <button
               type="submit"
               className="ml-2 bg-[#00A393] hover:bg-green-700 btn-table-ticker"
               disabled={!isValidTicker}
               data-testid="submit-ticker"
            >
               +
            </button>
         </form>

         {tickers.map((ticker, i) => (
            <div className="flex w-full items-center mb-3" key={i}>
               <span className="table-item w-full">{ticker}</span>
               <button
                  onClick={() => handleDeleteTicker(ticker)}
                  className="ml-2 bg-[#E24646] hover:bg-red-700 btn-table-ticker"
                  data-testid="delete-ticker"
               >
                  -
               </button>
            </div>
         ))}
      </div>
   )
}
