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
import { useMemo } from 'react'
import { Icon } from 'assets/icons'
import { Column, useTable, useFlexLayout, useSortBy, useExpanded } from 'react-table'

interface TableProps<T extends object> {
   columns: Column<T>[]
   data: T[]
   messageNoData?: string
   showMessageNoData?: boolean
   sortable?: boolean
   renderRowSubComponent?: any
}

export const InvestTable = <T extends object>({
   columns,
   data,
   messageNoData = 'No exist data',
   showMessageNoData = true,
}: TableProps<T>) => {
   const dataMemoized = useMemo(() => data, [data])
   const columnsMemoized = useMemo(() => columns, [data])
   const defaultColumn = useMemo(
      () => ({
         minWidth: 20,
         width: 150,
         maxWidth: 140,
      }),
      []
   )

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
         {
            columns: columnsMemoized,
            data: dataMemoized,
            defaultColumn,
         },
         useFlexLayout,
         useSortBy,
         useExpanded
      )

   const noData = dataMemoized.length === 0

   return (
      <>
         {noData && showMessageNoData ? (
            <div className="p-4 flex justify-center items-center">
               <span className="text-lg text-neutral-500 font-semibold">
                  {messageNoData}
               </span>
            </div>
         ) : (
            <div className="rounded-lg overflow-hidden my-4">
               <table
                  {...getTableProps()}
                  className=" w-full"
                  data-testid="table-test"
               >
                  <thead className="bg-[#FFFFFF]">
                     {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                           {headerGroup.headers.map((column) => (
                              <th
                                 {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                 )}
                                 className="pr-0 pl-2 py-3 text-neutral-500 font-semibold text-xs"
                              >
                                 <div className="flex">
                                    {column.render('Header')}

                                    {column.id !== 'options' &&
                                       column.id !== 'expander' && (
                                          <div className=" text-neutral-400 flex flex-col mx-2">
                                             <div className="flex flex-col justify-center items-center">
                                                <Icon.Caret
                                                   selected={
                                                      column.isSorted &&
                                                      !column.isSortedDesc
                                                   }
                                                />
                                                <Icon.Caret
                                                   down
                                                   selected={
                                                      column.isSorted &&
                                                      column.isSortedDesc
                                                   }
                                                />
                                             </div>
                                          </div>
                                       )}
                                 </div>
                              </th>
                           ))}
                        </tr>
                     ))}
                  </thead>

                  <tbody {...getTableBodyProps()}>
                     {rows.map((row) => {
                        prepareRow(row)
                        return (
                           <tr
                              className={
                                 row.canExpand
                                    ? 'hover:bg-[#0baca92c] bg-[#0baca910]'
                                    : 'hover:bg-[#F6F7FBCC] bg-[#FFFFFF]'
                              }
                              {...row.getRowProps()}
                           >
                              {row.cells.map((cell) => {
                                 return (
                                    <td
                                       {...cell.getCellProps()}
                                       className="pr-0 pl-2 py-3 text-neutral-500 text-xs"
                                    >
                                       {cell.render('Cell')}
                                    </td>
                                 )
                              })}
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>
         )}
      </>
   )
}
