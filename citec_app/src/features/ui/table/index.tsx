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

import { ReactNode, useMemo } from 'react'
import { Column, useTable, useFlexLayout, useSortBy } from 'react-table'
import { Icon } from 'assets/icons'

//https://github.com/TanStack/react-table/discussions/2664

interface TableProps<T extends object> {
   children?: ReactNode
   columns: Column<T>[]
   data: T[]
   messageNoData?: string
   showMessageNoData?: boolean
   sortable?: boolean
}

export const Table = <T extends object>({
   children,
   columns,
   data,
   messageNoData = 'No exist data',
   showMessageNoData = true,
}: TableProps<T>) => {
   const dataMemoized = useMemo(() => data, [data])

   const columnsMemoized = useMemo(() => columns, [data])

   const defaultColumn = useMemo(
      () => ({
         // When using the useFlexLayout:
         minWidth: 30, // minWidth is only used as a limit for resizing
         width: 150, // width is used for both the flex-basis and flex-grow
         maxWidth: 200, // maxWidth is only used as a limit for resizing
      }),
      []
   )

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
         { columns: columnsMemoized, data: dataMemoized, defaultColumn },
         useFlexLayout,
         useSortBy
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
            <div className="shadow-sm rounded-lg overflow-hidden my-4">
               <table
                  {...getTableProps()}
                  className=" w-full"
                  data-testid="table-test"
               >
                  <thead className="bg-[#F5F6FA]">
                     {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                           // Apply the header row props
                           <tr {...headerGroup.getHeaderGroupProps()}>
                              {
                                 // Loop over the headers in each row
                                 headerGroup.headers.map((column) => (
                                    // Apply the header cell props
                                    <th
                                       {...column.getHeaderProps(
                                          column.getSortByToggleProps()
                                       )}
                                       className="p-3 text-sm text-[#56606D] font-normal"
                                    >
                                       <div className="flex">
                                          {
                                             // Render the header
                                             column.render('Header')
                                          }

                                          {column.id !== 'options' && (
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
                                 ))
                              }
                           </tr>
                        ))
                     }
                  </thead>

                  <tbody {...getTableBodyProps()}>
                     {children && (
                        <tr role="row" className="bg-[#CBEBEB] children-table">
                           <td>{children}</td>
                        </tr>
                     )}

                     {
                        // Loop over the table rows
                        rows.map((row) => {
                           // Prepare the row for display
                           prepareRow(row)
                           return (
                              // Apply the row props
                              <tr
                                 className="hover:bg-[#F6F7FBCC] bg-[#FFFFFF]"
                                 {...row.getRowProps()}
                              >
                                 {
                                    // Loop over the rows cells
                                    row.cells.map((cell) => {
                                       // Apply the cell props
                                       return (
                                          <td
                                             {...cell.getCellProps()}
                                             className="p-3 text-neutral-500"
                                          >
                                             {
                                                // Render the cell contents
                                                cell.render('Cell')
                                             }
                                          </td>
                                       )
                                    })
                                 }
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
         )}
      </>
   )
}
