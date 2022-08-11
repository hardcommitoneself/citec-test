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

import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { useAppSelector } from 'store/hooks'
import { InvestTable } from 'features/brokers/utils/table/invest-table'
import { columns } from 'features/brokers/utils/table/my-invest'
import {
   getStockForValidation,
   buildDataInvest,
} from 'features/brokers/alpaca/utils/positions-alpaca-utils'
import { useDispatch } from 'react-redux'
import { setPortfolio } from 'store/slices/portfolio'
import { setWorkflow } from 'store/slices/workflow'
import { PositionAlpaca } from 'features/brokers/alpaca/utils/position-alpaca'
import { getAssetType } from 'features/brokers/utils/get-asset-type'
import { formatInvestmentData } from 'features/brokers/alpaca/utils/format-investment-data'
import XLSX from 'xlsx'
import { useAppNavigate } from 'features/utils/hooks'
import { useSelectUniverse } from 'features/utils/hooks'


export interface MyInvestments {
   asset_class: string
   quantity: number
   price: number
   investment: number
   day_gain_loss: number[]
   total_gain_loss: number[]
   url_logo?: string
   subRows: any
}

export let loadPortfolioOnRedux: any
export let handleOnExportInvestments: any

export const AlpacaMyInvest = () => {
   const visibility = process.env.REACT_APP_ALPACA_VISIBILITY

   const brokers = useAppSelector((state) => state.brokers)

   const [dataTable, setDataTable] = useState<MyInvestments[]>([])

   const navigate = useAppNavigate()
   const dispatch = useDispatch()

   const { handleSelectBenckmark } = useSelectUniverse()

   const dataInvest = async () => {
      const positions = await PositionAlpaca(brokers.accountTypeSelect)

      const stocks = getStockForValidation(positions)
      const assetType = await getAssetType(stocks)
      const response = buildDataInvest(positions, assetType)
      setDataTable(response)
   }

   useEffect(() => {
      dataInvest()
   }, [brokers.accountTypeSelect])

   loadPortfolioOnRedux = (row: any, flow: string) => {

      if (flow === 'rebalance') {
         dispatch(setWorkflow('rebalance'))
      } else {
         dispatch(setWorkflow('load'))
      }

      const ticker = []
      const outstanding_balance = []
      const unrealized_capital_gains = []
      for (let i = 0; i < row.length; i++) {
         ticker.push(row[i].values.asset_class)
         outstanding_balance.push(Number(row[i].values.investment))
         unrealized_capital_gains.push(Number(row[i].values.total_gain_loss[0]))
      }
      dispatch(
         setPortfolio({
            ticker,
            outstanding_balance,
            unrealized_capital_gains,
         })
      )

      handleSelectBenckmark('SPY')

      if (flow === 'load') {
         navigate('/portfolio-loader')
      } else if (flow === 'analysis') {
         navigate('/portfolio-analysis')
      } else if (flow === 'rebalance') {
         navigate('/investment')
      }
   }

   handleOnExportInvestments = (row: any) => {
      try {
         const data_investment = []
         data_investment.push(formatInvestmentData(row.values))

         for (const i of row.subRows) {
            data_investment.push(formatInvestmentData(i.values))
         }

         const wordBook = XLSX.utils.book_new()
         const wordSheet = XLSX.utils.json_to_sheet(data_investment)

         XLSX.utils.book_append_sheet(wordBook, wordSheet)
         XLSX.writeFile(wordBook, 'my_investments.xlsx')

         return 1
      } catch (error) {
         return error
      }
   }

   return (
      <>
         {visibility == 'true' && (
            <div className="mx-10 mt-8 bg-white p-4 rounded-2xl relative balance">
               <div className="flex buying-power">
                  <h3 className="font-semibold text-[26px] text-[#2d405a]">
                     My Investments
                  </h3>
               </div>
               <InvestTable columns={columns} data={dataTable} messageNoData="" />
            </div>
         )}
      </>
   )
}
