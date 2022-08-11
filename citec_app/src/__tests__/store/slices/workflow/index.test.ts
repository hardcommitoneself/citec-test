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
  setWorkflow,
  resetWorkflow,
} from 'store/slices/workflow'

const initialReduxState = {
  type: '',
}


describe('Workflow redux state tests', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {} as never)).toEqual({
      type: '',
    })
  })

  test('Reset Workflow in Redux', () => {
    const previusState = {
      type: 'load_34',
    }

    expect(reducer(previusState as any, resetWorkflow())).toEqual({
      type: '',
    })
  })

  test('Test method setWorkflow', () => {

    const data_state = 'anything'

    expect(
      reducer(initialReduxState as any, setWorkflow(data_state))
    ).toEqual({
      type: 'anything',
    })
  })

})
