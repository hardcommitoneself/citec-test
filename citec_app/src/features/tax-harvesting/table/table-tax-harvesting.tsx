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
import { useTable, useFlexLayout, useSortBy, useRowSelect } from 'react-table'
import { Icon } from 'assets/icons'
import { columns, Portfolio } from 'features/ui/table/columns/tax-harvesting'
import { useAppSelector } from 'store/hooks'
import { CheckAll } from 'features/tax-harvesting/table/check-all'
import { useHandlerTaxHarvesting } from 'features/utils/hooks'
import { CheckboxTable } from './checkbox-table'

export const TableTaxHarvesting = () => {
   const { updateTickerOnRedux, addOrRemoveAllPositions, positions } =
      useHandlerTaxHarvesting()

   const holds = useAppSelector((state) => state.rebalance.hold)

   const dataMemoized = useMemo(() => positions, [])

   const columnsMemoized = useMemo(() => columns, [])

   const defaultColumn = useMemo(
      () => ({
         minWidth: 30,
         width: 150,
         maxWidth: 200,
      }),
      []
   )

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
         {
            columns: columnsMemoized,
            data: dataMemoized,
            defaultColumn,
            initialState: {
               sortBy: [
                  {
                     id: 'unrealized_capital_gains',
                     desc: false,
                  },
               ],
            },
         },
         useFlexLayout,
         useSortBy,
         useRowSelect,

         (hooks) => {
            hooks.visibleColumns.push((columns) => [
               {
                  id: 'options',
                  Header: () => (
                     <CheckAll addOrRemoveAllPositions={addOrRemoveAllPositions} />
                  ),
                  Cell: ({ row }: any) => (
                     <div className="h-full flex items-center">
                        <CheckboxTable
                           index={row.index}
                           updateTickerOnRedux={updateTickerOnRedux}
                           item={row.original as Portfolio}
                        />
                     </div>
                  ),
                  maxWidth: 5,
               },
               ...columns,
            ])
         }
      )

   const noData = dataMemoized.length === 0 && holds.length === 0

   return (
      <>
         {noData ? (
            <div className="p-4 flex justify-center items-center">
               <span className="text-lg text-neutral-500 font-semibold">
                  No existe data
               </span>
            </div>
         ) : (
            <div className="shadow-sm rounded-lg overflow-hidden my-4">
               <table
                  {...getTableProps()}
                  className=" w-full"
                  data-testid="table-test"
               >
                  <thead className="bg-[#F5F6FA]">
                     {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                           {headerGroup.headers.map((column) => (
                              <th
                                 {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                 )}
                                 className="p-3 text-neutral-500 font-[500]"
                              >
                                 <div className="flex">
                                    {column.render('Header')}

                                    {column.id !== 'options' && (
                                       <div className="text-[#56606D] flex flex-col mx-2">
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
                              {...row.getRowProps()}
                              className={`  ${
                                 holds[row.index] === 0 ? 'bg-[#DAF4F4]' : 'bg-white'
                              } 
                               ${row.values.ticker === '$CASH' && '!hidden'}
                              `}
                           >
                              {row.cells.map((cell) => {
                                 return (
                                    <td
                                       {...cell.getCellProps()}
                                       className="border-b border-neutral-300/70 p-3 text-neutral-500"
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
