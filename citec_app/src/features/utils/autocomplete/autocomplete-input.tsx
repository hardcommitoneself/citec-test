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
import React, { useState } from 'react'

import { ListSuggestions } from './list-suggestion'
import { SearchTickerResp } from 'features/utils/interfaces/search-ticker-resp'
import { useDebounce, useFetchApi } from 'features/utils/hooks'

interface AutocompleteInputProps<T> {
   error: boolean
   name: string
   onChangeValue: (arg: T) => void
   value: string
   noMargin?: boolean
}

export const AutocompleteInput = ({
   error,
   name,
   onChangeValue,
   value,
   noMargin,
}: AutocompleteInputProps<React.ChangeEvent<HTMLInputElement>>) => {
   const [renderSuggestions, setRenderSuggestions] = useState(false)
   const [suggestionIndex, setSuggestionIndex] = useState(-1)

   const debounceValue = useDebounce(value)

   const { resp: allTickers, isLoading } = useFetchApi<SearchTickerResp[]>({
      endpoint: '/ai/assets/search_ticker/',
      method: 'GET',
      params: {
         ticker: debounceValue.trim().toUpperCase(),
         asset_type: 'Common Stock',
      },
      startCallInmediatly: debounceValue.length > 1,
      dependency: debounceValue,
   })

   const handleSelectValue = (value: string) => {
      setRenderSuggestions(false)
      //simulated event
      const e = {
         target: {
            value,
            name,
         },
      }

      onChangeValue(e as never)
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!allTickers) return

      if (e.key === 'ArrowUp') {
         if (suggestionIndex === -1) {
            return
         }
         setSuggestionIndex(suggestionIndex - 1)
      } else if (e.key === 'ArrowDown') {
         if (suggestionIndex + 1 === allTickers.length) {
            return
         }
         setSuggestionIndex(suggestionIndex + 1)
      } else if (e.key === 'Enter') {
         const e = {
            target: {
               value: allTickers[suggestionIndex].ticker,
               name,
            },
         }

         onChangeValue(e as never)

         setSuggestionIndex(-1)
         setRenderSuggestions(false)
      }
   }

   const handleOverList = () => {
      setSuggestionIndex(-1)
   }

   return (
      <div className={`input-${!noMargin ? 'table' : 'ticker'}  relative`}>
         <input
            className={` input-common   input-${error ? 'valid' : 'invalid '}`}
            value={value}
            onFocus={() => setRenderSuggestions(true)}
            onChange={onChangeValue}
            onBlur={() => setRenderSuggestions(false)}
            data-testid="ticker"
            onKeyDown={handleKeyDown}
            name={name}
            placeholder="Ticker | Company Name"
            required
            type="text"
         />

         <ListSuggestions
            allTickers={allTickers}
            handleSelectValue={handleSelectValue}
            isLoading={isLoading}
            renderSuggestions={renderSuggestions}
            suggestionIndex={suggestionIndex}
            handleOverList={handleOverList}
         />
      </div>
   )
}
