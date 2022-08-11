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
import { formatToMoney } from 'features/utils/format-to-money'
import { LoadIdeaOnReduxProps } from 'features/utils/hooks/use-handler-my-ideas-table'
import moment from 'moment'
import { MyPortfolio } from 'pages/home'
import { Column } from 'react-table'
import XLSX from 'xlsx'

const handleOnExport = (row: any, fileName: any) => {
   const ideas = row.map((cell: any) => {
      let cellClone = { ...cell }
      cellClone.ticker = cellClone.portfolio
      cellClone.outstanding_balance = cellClone.investment
      cellClone = {
         ticker: cellClone.ticker,
         outstanding_balance: cellClone.outstanding_balance,
         unrealized_capital_gains: cellClone.unrealized_capital_gains,
         benchmark: cellClone.benchmark,
      }
      return cellClone
   })

   const wordBook = XLSX.utils.book_new()
   const wordSheet = XLSX.utils.json_to_sheet(ideas)

   XLSX.utils.book_append_sheet(wordBook, wordSheet)
   XLSX.writeFile(wordBook, `${fileName.columnName}.xlsx`)
}

export const renderColumnIdeas = (
   loadIdeaOnRedux: ({ row, benchmark, flow }: LoadIdeaOnReduxProps) => void,
   removeIdeaFromRedux: (portfolio_id: number) => void
) => {
   const columns: Column<MyPortfolio>[] = [
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
         accessor: 'columnName',
         Cell: ({ row, value }: any) =>
            row.canExpand ? (
               <span className="text-[#21BAB7] text-sm font-semibold">
                  <button
                     onClick={() =>
                        loadIdeaOnRedux({
                           benchmark: row.original.benchmark,
                           flow: 'load',
                           row: row.subRows,
                        })
                     }
                     data-testid="test-load-idea-on-redux"
                  >
                     {value}
                  </button>
               </span>
            ) : (
               <div className="relative company-name-positions w-6 h-6">
                  <img
                     src={value.url_logo}
                     className="positions-logo rounded-full"
                  />
                  <div className="absolute w-64 ml-10">
                     <p className=" text-[#6C8394] text-sm">{value.name}</p>
                  </div>
               </div>
            ),
         width: 350,
      },
      {
         Header: <p className="text-[#CACED8] text-sm font-normal">Benchmark</p>,
         accessor: 'benchmark',
         width: 70,
         Cell: ({ value }) => <p className="text-[#6C8394] text-sm">{value}</p>,
      },
      {
         Header: <p className="text-[#CACED8] text-sm font-normal">Investment</p>,
         accessor: 'investment',
         width: 70,
         Cell: ({ value }: any) => (
            <span className="text-[#6C8394] text-sm">{formatToMoney(value)}</span>
         ),
      },
      {
         Header: <p className="text-[#CACED8] text-sm font-normal">Date</p>,
         accessor: 'creation_date',
         width: 70,
         Cell: ({ row, value }: any) =>
            row.canExpand ? (
               <p className="text-[#6C8394] text-sm">
                  {
                  moment(value.slice(0, 10), "YYYY-MM-DD").format("MM/DD/YYYY")
                  }</p>
            ) : (
               <p className="text-[#6C8394] text-sm"></p>
            ),
      },
      {
         Header: '',
         id: 'options',
         disableSortBy: true,
         width: 48,
         Cell: ({ row }: any) =>
            row.canExpand ? (
               <div className="flex justify-between">
                  <button
                     onClick={() =>
                        loadIdeaOnRedux({
                           benchmark: row.original.benchmark,
                           flow: 'analysis',
                           row: row.subRows,
                        })
                     }
                  >
                     <Icon.Chart />
                  </button>

                  <button
                     onClick={() => {
                        handleOnExport(row.originalSubRows, row.original)
                     }}
                  >
                     <Icon.Download />
                  </button>

                  <button
                     className="mr-2"
                     onClick={() => {
                        removeIdeaFromRedux(row.original.portfolio_id)
                     }}
                  >
                     <Icon.Trash />
                  </button>
               </div>
            ) : (
               <div className="flex justify-between"></div>
            ),
      },
   ]

   return columns
}
