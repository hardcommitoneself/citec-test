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
import reducer, {
   setManagePositions,
   setCriteria,
   setObjective,
   setNumberStocks,
   setBenchmark,
   resetRebalance,
   setHold,
} from 'store/slices/rebalance'

const initialReduxState = {
   ticker: [],
   hold: [],
   objective: { name: '', key: '' },
   benchmark: '',
   min_weight: 0.000001,
   number_stocks: [100, 120],
}

const intermediateReduxState = {
   ticker: ['APPL'],
   hold: ['0'],
   objective: '',
   benchmark: '',
   min_weight: '',
   number_stocks: [],
}

describe('Rebalance redux state tests', () => {
   test('should return the initial state', () => {
      expect(reducer(initialReduxState as never, {} as never)).toEqual(
         initialReduxState
      )
   })

   test('Manage positions. select APPL', () => {
      const data_list_state = {
         ticker: ['$CASH', 'AAPL'],
         hold: [0, 1],
      }

      const { ticker, hold, ...rest } = initialReduxState

      expect(
         reducer(initialReduxState as never, setManagePositions(data_list_state))
      ).toEqual({
         ticker: ['$CASH', 'AAPL'],
         hold: [0, 1],
         ...rest,
      })
   })

   test('Test method setCriteria', () => {
      const initialState = {
         ticker: ['$CASH', 'AAPL'],
         hold: [0, 1],
         objective: '',
         benchmark: '',
         min_weight: '',
         number_stocks: [],
      }
      const data_state = {
         objective: 'minimize_tracking_error',
         benchmark: 'nasdaq_100',
         min_weight: '0.01',
         number_stocks: [45, 214],
      }

      expect(reducer(initialState as any, setCriteria(data_state))).toEqual({
         ticker: ['$CASH', 'AAPL'],
         hold: [0, 1],
         objective: 'minimize_tracking_error',
         benchmark: 'nasdaq_100',
         min_weight: '0.01',
         number_stocks: [45, 214],
      })
   })

   test('Test method setObjective', () => {
      const data_state = {
         name: 'Minimize tracking error',
         key: 'minimize_tracking_error',
      }

      expect(reducer(initialReduxState as any, setObjective(data_state))).toEqual({
         ticker: [],
         hold: [],
         objective: {
            name: 'Minimize tracking error',
            key: 'minimize_tracking_error',
         },
         benchmark: '',
         min_weight: 0.000001,
         number_stocks: [100, 120],
      })
   })

   test('Test method setBenchmark', () => {
      const data_state = ''

      expect(reducer(initialReduxState as any, setBenchmark(data_state))).toEqual({
         ticker: [],
         hold: [],
         objective: { name: '', key: '' },
         benchmark: '',
         min_weight: 0.000001,
         number_stocks: [100, 120],
      })
   })

   test('Test method setNumberStocks', () => {
      const data_state = [105, 180]

      expect(reducer(initialReduxState as any, setNumberStocks(data_state))).toEqual(
         {
            ticker: [],
            hold: [],
            objective: { name: '', key: '' },
            benchmark: '',
            min_weight: 0.000001,
            number_stocks: [105, 180],
         }
      )
   })

   test('set holds in rebalance', () => {
      expect(reducer(initialReduxState, setHold([0, 0]))).toEqual({
         ...initialReduxState,
         hold: [0, 0],
      })
   })
   test('Reset Rebalance in Redux', () => {
      expect(reducer(intermediateReduxState as any, resetRebalance())).toEqual(
         initialReduxState
      )
   })
})
