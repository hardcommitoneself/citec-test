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
import { formatToMoney } from 'features/utils/format-to-money'
import { Column } from 'react-table'

export interface interfacePositionsAnalysis {
   ticker: string
   status: string
   isin: string
   figi: string
   name: string
   ipo: Date
   //price?: number
   //quantity?: number
   sector: string
   url_morningstar: string
   url_company: string
   url_logo: string
   outstanding_balance: number
   unrealized_capital_gains: number
   weight: number
}

export const columns: Column<interfacePositionsAnalysis>[] = [
   {
      Header: 'Name',
      accessor: 'name',
      width: 250,
      Cell: (props) => (
         <>
            <div className="company-name-positions py-2.5">
               <div className="flex w-6 h-6 items-center">
                  <img
                     src={props.row.original.url_logo}
                     className="positions-logo rounded-full"
                  />
               </div>
               <p className="text-[#6C8394] text-sm">{props.row.original.name}</p>
            </div>
         </>
      ),
   },
   {
      Header: 'Real Weight',
      accessor: 'weight',
      Cell: ({ value }) => (
         <div className="text-[#6C8394] text-sm py-2.5">{value + ' %'}</div>
      ),
   },
   /* {
      Header: <p className="text-[#56606D] text-sm font-normal">Quantity</p>,
      accessor: 'quantity',
      width: 100,
      Cell: ({ value }) => <p className="text-[#6C8394] text-sm">{value}</p>,
   }, */
   /* {
      Header: <p className="text-[#56606D] text-sm font-normal">Price</p>,
      accessor: 'price',
      Cell: ({ value }) => (
         <div className="text-[#6C8394] text-sm">{formatToMoney(value)}</div>
      ),
      width: 120,
   }, */
   {
      Header: 'Investment',
      accessor: 'outstanding_balance',
      Cell: ({ value }) => (
         <div className="text-[#6C8394] text-sm py-2.5">{formatToMoney(value)}</div>
      ),
   },
   {
      Header: 'Gain / loss',
      accessor: 'unrealized_capital_gains',
      Cell: ({ value }) => (
         <div className={value >= 0 ? 'profit py-2.5' : 'loss py-2.5'}>
            {formatToMoney(value)}
         </div>
      ),
   },
]
