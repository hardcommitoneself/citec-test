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
import { Button } from '@mui/material'
import XLSX from 'xlsx'
import { columns } from 'features/ui/table/columns/trades'
import { Icon } from 'assets/icons'
import { Table } from 'features/ui/table'
import { useAppSelector } from 'store/hooks'
import { LinkExecuteTrades } from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades'
import { TotalTrades } from '../totals'
import { getMape } from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/execute-trades-utils'
import { sortTradesByDelta } from 'features/brokers/utils/sort-trades-by-delta'
import { savePortfolio } from 'features/utils/save-portfolio'
import { useAppNavigate } from 'features/utils/hooks'

export const Trades = () => {
   const trades = useAppSelector((state) => state.trades)

   const brokers = useAppSelector((state) => state.brokers)

   const { ticker, outstanding_balance, unrealized_capital_gains } = useAppSelector(
      (state) => state.portfolio_optimized
   )

   const navigate = useAppNavigate()

   const benchmark = useAppSelector((state) => state.rebalance.benchmark)

   const handleOnExportTrades = () => {
      const wordBook = XLSX.utils.book_new()
      const wordSheet = XLSX.utils.json_to_sheet(trades)

      XLSX.utils.book_append_sheet(wordBook, wordSheet)

      XLSX.writeFile(wordBook, 'trades.xlsx')
   }

   const mape = getMape(trades)
   let sortedTrades = trades

   if (mape > 5) {
      sortedTrades = sortTradesByDelta(trades)
   }

   const handleSavePortfolio = () => {
      savePortfolio({
         navigate,
         benchmark,
         outstanding_balance,
         ticker,
         unrealized_capital_gains,
      })
   }

   return (
      <>
         <div className="action_summary">
            <h1>Trades</h1>
            <div className="button_download_trades">
               {brokers.brokerConnected && <LinkExecuteTrades data={trades} mape={mape} />}
               <div className='space-x-3.5 inline'>
               <Button
                  className="h-[35px] min-w-0 rounded"
                  variant="save"
                  onClick={handleSavePortfolio}
               >
                  <span>Save</span>
               </Button>
               <Button
                  className="h-[35px] min-w-0"
                  variant="download"
                  onClick={handleOnExportTrades}
               >
                  <span
                     className="text-base"//
                     data-testid="info-summary-trades-download"
                  >
                     <Icon.Download white />
                  </span>
               </Button>
               </div>
            </div>
         </div>

         <TotalTrades />

         {trades && <Table columns={columns} data={sortedTrades} />}
      </>
   )
}
