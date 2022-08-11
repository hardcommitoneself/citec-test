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

import { buildDataIdeas } from 'features/ideas/positions'
import { fetchDataFromCitecApi } from '../api/citec-api'
import { MyIdeas } from '../interfaces/my-ideas'
import { PositionsResp } from '../interfaces/positions-resp'
import { removeIdea } from 'store/slices/ideas'
import { setManagePositions } from 'store/slices/rebalance'
import { setPortfolio } from 'store/slices/portfolio'
import { setWorkflow } from 'store/slices/workflow'
import { useAppNavigate } from './use-app-navigate'
import { useAppSelector } from 'store/hooks'
import { useFetchApi } from './use-fetch-api'
import { useSelectUniverse } from './use-select-universe'

export interface LoadIdeaOnReduxProps {
   row: any
   flow: 'load' | 'analysis' | 'rebalance'
   benchmark: string
}

export const useHandlerMyIdeasTable = () => {
   const [dataIdeasTable, setDataIdeasTable] = useState<MyIdeas[] | null>(null)

   const ideas = useAppSelector((state) => state.ideas)

   const { handleSelectBenckmark } = useSelectUniverse()

   const dispatch = useDispatch()
   const navigate = useAppNavigate()

   const deleteIdeaApi = (portfolio_id: number) => {
      fetchDataFromCitecApi({
         endpoint: '/citec/portfolio',
         method: 'DELETE',
         params: {
            portfolio_id,
         },
      })
   }

   const loadIdeaOnRedux = ({ row, benchmark, flow }: LoadIdeaOnReduxProps) => {
      if (flow === 'rebalance') {
         dispatch(setWorkflow('rebalance'))
      } else {
         dispatch(setWorkflow('load'))
      }

      const ticker = []
      const outstanding_balance = []
      const unrealized_capital_gains = []
      for (let i = 0; i < row.length; i++) {
         ticker.push(row[i].original.columnName.ticker)
         outstanding_balance.push(Number(row[i].original.investment))
         unrealized_capital_gains.push(
            Number(row[i].original.unrealized_capital_gains)
         )
      }

      dispatch(
         setPortfolio({
            ticker,
            outstanding_balance,
            unrealized_capital_gains,
         })
      )

      dispatch(
         setManagePositions({
            ticker,
            hold: new Array(ticker.length).fill(1),
         })
      )

      handleSelectBenckmark(benchmark)

      if (flow === 'load') {
         navigate('/portfolio-loader')
      } else if (flow === 'analysis') {
         navigate('/portfolio-analysis')
      } else if (flow === 'rebalance') {
         navigate('/investment')
      }
   }

   const removeIdeaFromRedux = (portfolio_id: number) => {
      deleteIdeaApi(portfolio_id)

      if (dataIdeasTable) {
         setDataIdeasTable(
            dataIdeasTable.filter((item) => item.portfolio_id !== portfolio_id)
         )
      }
      dispatch(removeIdea(portfolio_id))
   }

   const tickers_of_ideas = ideas.map((x: { ticker: any }) => x.ticker)

   const unique_tickers_of_ideas = [...new Set(tickers_of_ideas.flat(1))]
   const unique_ob = Array(unique_tickers_of_ideas.length).fill(0)
   const unique_ucg = Array(unique_tickers_of_ideas.length).fill(0)

   const { resp: positions } = useFetchApi<PositionsResp>({
      endpoint: '/ai/portfolio/positions',
      method: 'POST',
      payload: {
         portfolio: 'myportfolio',
         benchmark: 'SPY',
         ticker: unique_tickers_of_ideas,
         outstanding_balance: unique_ob,
         unrealized_capital_gains: unique_ucg,
      },
      startCallInmediatly: ideas.length > 0,
   })

   useEffect(() => {
      const getDataIdeas = () => {
         const response = buildDataIdeas(ideas, positions)

         setDataIdeasTable(response)
      }

      if (positions) {
         getDataIdeas()
      }
   }, [positions])

   return { dataIdeasTable, loadIdeaOnRedux, removeIdeaFromRedux }
}
