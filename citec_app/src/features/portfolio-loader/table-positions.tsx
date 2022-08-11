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
import { Column, useFlexLayout, useSortBy, useTable } from 'react-table'

import { FormAddRow } from './form-add-row'
import { resetPortfolio } from 'store/slices/portfolio'
import { InputTable } from 'features/ui/table/input-table'
import { useAppSelector } from 'store/hooks'
import { setHold } from 'store/slices/rebalance'
import { formatToMoney } from 'features/utils/format-to-money'
import { PortfolioLoaded } from 'features/utils/interfaces/portfolio-loaded'
import { useMemo } from 'react'
import { Icon } from 'assets/icons'

interface TablePositionsProps {
   excelData: PortfolioLoaded[]
   setExcelData: React.Dispatch<React.SetStateAction<[] | PortfolioLoaded[]>>
   invalidPositions?: string[]
}

export const TablePositions = ({
   excelData,
   setExcelData,
   invalidPositions,
}: TablePositionsProps) => {
   const dispatch = useDispatch()
   const holds = useAppSelector((state) => state.rebalance.hold)

   const handleDeletePositions = (index: number) => {
      const dataCopy = [...excelData]

      if (holds) {
         const copyHolds = [...holds]

         delete copyHolds[index]

         const resetedHolds = copyHolds.filter(Number)

         dispatch(setHold(resetedHolds))
      }

      dataCopy.splice(index, 1)

      if (excelData.length === 1) dispatch(resetPortfolio())

      setExcelData(dataCopy)
   }

   const columns: Column<PortfolioLoaded>[] = [
      {
         Header: 'Ticker | Company name ',
         accessor: 'ticker',
         Cell: ({ value }) => <InputTable value={value} />,
      },
      {
         Header: 'Investment, $',
         accessor: 'outstanding_balance',
         Cell: ({ value }) => (
            <InputTable value={formatToMoney(value as number, true)} />
         ),
      },
      {
         Header: 'Capital gain, $',
         accessor: 'unrealized_capital_gains',
         Cell: ({ value }) => (
            <InputTable value={formatToMoney(value as number, true)} />
         ),
      },
      {
         Header: '',
         id: 'options',
         accessor: 'ticker',
         width: 50,
         Cell: ({ row }) => (
            <button
               className="btn-delete mt-2"
               data-testid="btn-delete"
               onClick={() => handleDeletePositions(row.index)}
            >
               -
            </button>
         ),
      },
   ]
   const dataMemoized = useMemo(() => excelData, [excelData])

   const columnsMemoized = useMemo(() => columns, [excelData])

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
         { columns: columnsMemoized, data: dataMemoized, defaultColumn },
         useFlexLayout,
         useSortBy
      )

   return (
      <div className="mb-2" data-testid="table-positions">
         <div className="shadow-sm rounded-lg  my-4">
            <table {...getTableProps()} className=" w-full" data-testid="table-test">
               <thead className="bg-[#F5F6F8]">
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
                  <tr role="row" className="bg-[#CBEBEB] children-table">
                     <td>
                        <FormAddRow setExcelData={setExcelData} />
                     </td>
                  </tr>

                  {rows.map((row) => {
                     prepareRow(row)
                     const values = row.original.ticker

                     return (
                        <tr
                           {...row.getRowProps()}
                           className={
                              invalidPositions?.includes(values) ? 'bg-red-200' : ''
                           }
                        >
                           {row.cells.map((cell) => {
                              return (
                                 <td
                                    {...cell.getCellProps()}
                                    className={`border-b border-neutral-300/70 p-3 text-neutral-500 `}
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
      </div>
   )
}
