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
import { Alert, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { PageContainer } from 'features/ui/page-container'
import { setPortfolio } from 'store/slices/portfolio'
import {
   useAppNavigate,
   useSelectUniverse,
   useValidateTickers,
   useValidationPorfolioLoaded,
} from 'features/utils/hooks'
import {
   BtnUploadExcel,
   ButtonChangeBenchmark,
   TablePositions,
} from 'features/portfolio-loader'
import { PortfolioLoaded } from 'features/utils/interfaces/portfolio-loaded'
import { useAppSelector } from 'store/hooks'
import converterArrays from 'features/utils/converterArrays'

type PositionsTable = PortfolioLoaded[] | []

export const PortfolioLoader = () => {
   const navigate = useAppNavigate()
   const dispatch = useDispatch()

   const [positionsTableData, setPositionTableData] = useState<PositionsTable>([])
   const { handleSelectBenckmark } = useSelectUniverse()

   const { outstanding_balance, ticker, unrealized_capital_gains } = useAppSelector(
      (state) => state.portfolio
   )

   const benchmark = useAppSelector((state) => state.rebalance.benchmark)

   const convertedPositions = converterArrays({
      outstanding_balance,
      ticker,
      unrealized_capital_gains,
   })

   const { isPortfolioLoaded } = useValidationPorfolioLoaded()

   const { isSomeInvalidTicker, invalidTickers } = useValidateTickers(ticker)

   useEffect(() => {
      //if there are tickers, there is a loaded portfolio. Therefore, the portfolio will be loaded into the table
      if (ticker.length > 0) {
         setPositionTableData(convertedPositions)
      }
   }, [])

   useEffect(() => {
      //update redux state with portfolio data
      if (positionsTableData.length > 0) {
         const unrealized_capital_gains = positionsTableData.map(
            (i) => i.unrealized_capital_gains
         )
         const outstanding_balance = positionsTableData.map(
            (i) => i.outstanding_balance
         )
         const ticker = positionsTableData.map((i) => i.ticker)

         dispatch(
            setPortfolio({
               ticker,
               outstanding_balance,
               unrealized_capital_gains,
            })
         )
      }
   }, [positionsTableData])

   useEffect(() => {
      if (!benchmark) handleSelectBenckmark('SPY')
   }, [])

   return (
      <PageContainer>
         <div className="PortfolioCreate PortfolioEditor">
            <div className="grid_body_area">
               <BtnUploadExcel
                  setExcelData={setPositionTableData}
                  className="my-4"
               />

               <div className="right_side_editor">
                  <div className="relative top_area ">
                     <div className="buttons_wrapper absolute top-3 right-0">
                        <Button
                           className="w-32 h-10"
                           variant="optimize"
                           disabled={!isPortfolioLoaded || isSomeInvalidTicker}
                           onClick={() => navigate('/portfolio-analysis')}
                        >
                           <img
                              src={require('assets/img/chartWhite.png')}
                              style={{ marginRight: '20px' }}
                           />
                           <span className="text-base font-normal">Analyze</span>
                        </Button>
                     </div>

                     <ButtonChangeBenchmark />

                     <h1 className="text-[#2D405A]">Add positions manually</h1>
                  </div>
                  {isSomeInvalidTicker && (
                     <Alert severity="error" className="mt-3 !bg-red-200">
                        The following positions are incorrect:{' '}
                        {invalidTickers.map(
                           (ticker, i, arr) =>
                              `${ticker}${arr.length - 1 === i ? '' : ','} `
                        )}
                     </Alert>
                  )}

                  <TablePositions
                     excelData={positionsTableData}
                     setExcelData={setPositionTableData}
                     invalidPositions={invalidTickers}
                  />
               </div>
            </div>
         </div>
      </PageContainer>
   )
}
