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
import { Icon } from 'assets/icons'
import {
   MyInvestments,
   loadPortfolioOnRedux,
   handleOnExportInvestments,
} from 'features/brokers/alpaca/ui/components/alpaca-my-invest'
import { Column } from 'react-table'
import { formatToMoney } from 'features/utils/format-to-money'

export const columns: Column<MyInvestments>[] = [
   {
      Header: () => null,
      id: 'expander',
      width: 1,
      disableSortBy: true,
      Cell: ({ row }: any) =>
         row.canExpand ? (
            <span className="w-2 block" {...row.getToggleRowExpandedProps()}>
               {row.isExpanded ? (
                  '-'
               ) : (
                  <img
                     className="mt-1 ml-2"
                     src={require('assets/img/expand.png')}
                  />
               )}
            </span>
         ) : null,
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Name</p>,
      accessor: 'asset_class',
      width: 130,
      Cell: ({ row, value }) =>
         row.canExpand ? (
            <span className="text-[#21BAB7] text-sm font-semibold">{value}</span>
         ) : (
            <div className="relative grid grid-cols-2 gap-x-2">
               <img src={row.original.url_logo} className="w-6 h-6 rounded-full" />
               <div className="absolute w-24 ml-11">
                  <p className=" text-[#6C8394] text-sm">{value}</p>
               </div>
            </div>
         ),
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Quantity</p>,
      accessor: 'quantity',
      width: 100,
      Cell: ({ value }) => <p className="text-[#6C8394] text-sm">{value}</p>,
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Price</p>,
      accessor: 'price',
      Cell: ({ row, value }) => (
         <span className="text-[#6C8394] text-sm">
            {row.canExpand ? 'NA' : formatToMoney(value)}
         </span>
      ),
      width: 120,
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Investment</p>,
      accessor: 'investment',
      Cell: ({ value }) => (
         <span className="text-[#6C8394] text-sm">{formatToMoney(value)}</span>
      ),
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Day Gain / loss</p>,
      accessor: 'day_gain_loss',
      Cell: ({ value }) => (
         <span className={value[0] >= 0 ? 'profit' : 'loss'}>
            {formatToMoney(value[0])} ({value[1]}%)
         </span>
      ),
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Gain / loss</p>,
      accessor: 'total_gain_loss',
      Cell: ({ value }) => (
         <span className={value[0] >= 0 ? 'profit' : 'loss'}>
            {formatToMoney(value[0])} ({value[1]}%)
         </span>
      ),
   },
   {
      Header: '',
      id: 'options',
      width: 100,
      disableSortBy: true,
      Cell: ({ row }: any) =>
         row.canExpand ? (
            <div className="flex justify-between">
               {row.values.asset_class == 'US Equities' ? (
                  <>
                     <button
                        onClick={() => loadPortfolioOnRedux(row.subRows, 'analysis')}
                        data-testid="test-load-portfolio-on-redux"
                        >
                        <Icon.Chart />
                     </button>
                     <button
                        onClick={() => loadPortfolioOnRedux(row.subRows, 'rebalance')}>
                        <Icon.Arrows/>
                     </button>
                  </>
                  
               ) : (
                  <div></div>
               )}
               <button
                  className="mr-2"
                  onClick={() => handleOnExportInvestments(row)}
                  data-testid="test-export-investment"
               >
                  <Icon.Download />
               </button>
            </div>
         ) : (
            <></>
         ),
   },
]
