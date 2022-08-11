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
import { Table } from 'features/ui/table'
import { columns } from 'features/ui/table/columns/analysis-positions'
import { useAppNavigate } from 'features/utils/hooks'
import { useAppSelector } from 'store/hooks'
import { TotalPositions } from '../totals'

export const Positions = ({ backtest }: any) => {
   const navigate = useAppNavigate()

   const positions = useAppSelector((state) => state.portfolio.positions)

   return (
      <div className="summary_content_wrapper">
         <div className="action_portfolio_analysis">
            <h1>Positions</h1>
            <div className="button_rebalance_positions">
               <Button
                  className="w-36 h-10"
                  variant="optimize"
                  onClick={() => navigate('/investment')}
               >
                  <img
                     src={require('assets/img/investment_white.png')}
                     style={{ marginRight: '15px' }}
                  />
                  <span className="text-base">Rebalance</span>
               </Button>
            </div>
         </div>

         <TotalPositions backtest={backtest} />

         <Table columns={columns} data={positions as never} />
      </div>
   )
}
