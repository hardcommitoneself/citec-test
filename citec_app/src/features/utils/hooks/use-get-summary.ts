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
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchDataFromCitecApi } from '../api/citec-api'
import { setError } from 'store/slices/errors'
import { useAppSelector } from 'store/hooks'
import { BacktestRes } from '../interfaces/backtest-api-resp'
import { PortfolioOptimizationRes } from '../interfaces/portfolio-optimization-res'
import {
   resetPortfolioOptimized,
   setPortfolioOptimized,
} from 'store/slices/portfolio-optimized'
import { resetTrades, setTrades } from 'store/slices/trades'
import { generatePaylaodBacktest } from '../generate-payload-backtest'
import { generatePayloadTrades } from '../generate-payload-trades'
import { generatePayloadOptimization } from '../generate-payload-optimization'
import { PortfolioAnalisysResp } from '../interfaces/portfolio-analysis-resp'
import { Trades } from '../interfaces/trades'
import { setPortfolioAnalysis } from 'store/slices/portfolio'
import { fillTradesGenerated } from 'features/brokers/utils/fill-trades-generate'
import { getPortfolioPositions } from 'features/brokers/utils/get-portfolio-positions'
import { getTickers } from 'features/brokers/alpaca/ui/components/alpaca-link-execute-trades/execute-trades-utils'

type Backtest = Pick<
   BacktestRes,
   'risk' | 'tracking' | 'ts_backtest' | 'tracking_expected'
>

interface SummaryResp {
   backtest: Backtest | null
   analysis: PortfolioAnalisysResp | null
}

export const useGetSummary = () => {
   const [isLoading, setIsLoading] = useState(true)
   const [resps, setResps] = useState<SummaryResp>({
      backtest: null,
      analysis: null,
   })
   const { payloadOptimization, hist_w } = generatePayloadOptimization()
   const error = useAppSelector((state) => state.errors)
   const benchmark = useAppSelector((state) => state.rebalance.benchmark)

   const dispatch = useDispatch()

   const getAllDataSummary = async () => {
      try {

         const optimizationResp = await fetchDataFromCitecApi<PortfolioOptimizationRes>({
               endpoint: '/ai/portfolio/optimization/',
               method: 'POST',
               params: {
                  hist_w,
               },
               payload: payloadOptimization,
         })
         
         const optimization = optimizationResp.data

         dispatch(resetPortfolioOptimized())
         dispatch(setPortfolioOptimized({ ...optimization }))

         const payloadTrades= await generatePayloadTrades()

         const tradesToOrdersPromise = fetchDataFromCitecApi<Trades[]>({
            endpoint: '/ai/portfolio/trades_to_orders',
            method: 'POST',
            params: {
               hist_w: 182,
            },
            payload: payloadTrades,
         })

         const backtestPayload = generatePaylaodBacktest()

         const backtestPromise = fetchDataFromCitecApi<BacktestRes>({
            endpoint: '/ai/portfolio/backtest',
            method: 'POST',
            params: {
               hist_w: 182,
            },
            payload: backtestPayload,
         })

         const analisysPromise = fetchDataFromCitecApi<PortfolioAnalisysResp>({
            endpoint: '/ai/portfolio/analysis',
            method: 'POST',
            params: {
               hist_w: 50000,
            },

            payload: {
               portfolio: 'optimized_portfolio',
               benchmark,
               ticker: optimization.ticker,
               outstanding_balance: optimization.outstanding_balance,
               unrealized_capital_gains: optimization.unrealized_capital_gains,
            },
         })

         const tickers = getTickers(payloadTrades.trades)

         const positionsPromise = getPortfolioPositions(tickers)

         const [backtestResp, analysisResp, tradesToOrdersResp, positionsResp] = await Promise.all([
            backtestPromise,
            analisysPromise,
            tradesToOrdersPromise,
            positionsPromise
         ])

         const { risk, tracking, ts_backtest, tracking_expected } = backtestResp.data
         setResps({
            backtest: {
               risk,
               tracking,
               ts_backtest,
               tracking_expected,
            },
            analysis: analysisResp.data,
         })
         
         const fillTrades = await fillTradesGenerated(tradesToOrdersResp.data, positionsResp, payloadTrades.latest_prices)

         dispatch(setPortfolioAnalysis({ ...analysisResp.data }))
         dispatch(resetTrades())
         dispatch(setTrades(fillTrades))

      } catch (e: any) {
         if (e.code === 'ECONNABORTED') {
            dispatch(
               setError('This process is taking too long, please refresh the page')
            )
         }

         if (e.response) {
            dispatch(setError(`An error ${e.response.status} has occurred `))
         } else {
            dispatch(
               setError(
                  'Please go back and verify the configuration selected previously.'
               )
            )
         }
      }

      setIsLoading(false)
   }

   useEffect(() => {
      getAllDataSummary()
   }, [])

   useEffect(() => {
      if (error) {
         setIsLoading(false)
      }
   }, [error])

   return { isLoading, ...resps }
}
