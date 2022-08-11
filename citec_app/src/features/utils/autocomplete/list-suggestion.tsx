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
import { CircularProgress, Grow } from '@mui/material'
import { isEqual } from 'lodash'
import { SearchTickerResp } from 'features/utils/interfaces/search-ticker-resp'
import { useLayoutEffect, useRef } from 'react'

interface ListSuggestionsProps {
   allTickers: SearchTickerResp[] | null
   handleSelectValue: (value: string) => void
   isLoading: boolean
   renderSuggestions: boolean
   suggestionIndex: number
   handleOverList: () => void
}

export const ListSuggestions = ({
   allTickers,
   handleSelectValue,
   isLoading,
   renderSuggestions,
   suggestionIndex,
   handleOverList,
}: ListSuggestionsProps) => {
   const searchResultRef = useRef<any>(null)

   useLayoutEffect(() => {
      const scrollIntoView = (position: number) => {
         if (searchResultRef.current) {
            console.log(searchResultRef.current!.parentNode.scrollTo)

            searchResultRef.current!.parentNode!.scrollTo({
               top: position * 40,
               behavior: 'smooth',
            })
         }
      }

      scrollIntoView(suggestionIndex)
   }, [suggestionIndex])

   return (
      <Grow
         in={renderSuggestions}
         style={{ transformOrigin: '0 0 0' }}
         {...(renderSuggestions ? { timeout: 500 } : {})}
         className="absolute top-[62px] w-full bg-white custom_cell py-2 max-h-80 rounded-lg shadow-md selector overflow-y-scroll z-20 scroll"
         onMouseEnter={handleOverList}
      >
         <div>
            {isLoading && (
               <div className="flex justify-center p-1" data-testid="loading">
                  <CircularProgress size={20} />
               </div>
            )}

            {!allTickers && !isLoading && (
               <p className="text-neutral-400 text-center" data-testid="type-ticker">
                  Please type the ticker
               </p>
            )}
            <div
               className="flex flex-col items-center justify-center"
               ref={searchResultRef}
            >
               {allTickers?.map(({ name, ticker }, i) => (
                  <button
                     className={`transition-all duration-75 hover:bg-[#0BACA9]/30 m-1 p-1 text-left rounded-md cursor-pointer block w-[96%] ${
                        i === suggestionIndex && 'bg-[#0BACA9]/30'
                     }`}
                     key={i}
                     onClick={() => handleSelectValue(ticker)}
                     type="button"
                     tabIndex={0}
                     data-testid={`button-${ticker}`}
                  >
                     {ticker} - {name}
                  </button>
               ))}
            </div>

            {isEqual(allTickers, []) && (
               <p className="text-neutral-400 text-center" data-testid="not-found">
                  No tickers found
               </p>
            )}
         </div>
      </Grow>
   )
}
