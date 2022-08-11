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
import { Trades } from 'features/utils/interfaces/trades'
import { Column } from 'react-table'

export const columns: Column<Trades>[] = [
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Name</p>,
      accessor: 'columnName',
      Cell: ({ value }: any ) => (
         <div className="relative grid grid-cols-2 gap-x-2">
            <img src={ value?.url_logo } className="w-6 h-6 rounded-full" />
            <div className="absolute w-40 ml-11">
               <p className=" text-[#6C8394] text-sm">{ value?.name }</p>
            </div>
         </div>
      ),
      width: 350,
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Theoretical Investment</p>,
      accessor: 'volume',
      Cell: ({ value }) => (
         <span className="text-[#6C8394] text-sm">{formatToMoney(value)}</span>
      )
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Quantity</p>,
      accessor: 'stocks_number',
      Cell: ({ value }) => (
         <span className="text-[#6C8394] text-sm">{ value }</span>
      ),
      width: 100
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Price</p>,
      accessor: 'price',
      Cell: ({ value }) => (
         <span className="text-[#6C8394] text-sm">{ value? formatToMoney(value): value }</span>
      ),
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Real Investment</p>,
      accessor: 'expected_volume',
      Cell: ({ value }) => (
         <span className="text-[#6C8394] text-sm">{ formatToMoney(value) }</span>
      ),
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Delta</p>,
      accessor: 'delta_volume',
      Cell: ({ value }) => <span className='loss'>{formatToMoney(value)}</span>,
   },
   {
      Header: <p className="text-[#CACED8] text-sm font-normal">Gain / Loss</p>,
      accessor: 'gain_loss',
      Cell: ({ value }) => (
         value ? 
         <span className={value[0] >= 0? 'profit' : 'loss'}>
            {formatToMoney(value[0])} ({value[1]}%)
         </span> :
         value
      ),
   },
   {
      Header: '',
      id: 'options',
      accessor: 'operation',
      width: 80,
      Cell: ({ value }) => (
         <div className="flex justify-between">
            {value === 'BUY' && <Icon.Buy />}
            {value === 'HOLD' && <Icon.Hold />}
            {value === 'SELL' && <Icon.Sell />}
            <button>
               <Icon.Trash></Icon.Trash>
            </button>
         </div>
      ),
   },
]
