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
import '@testing-library/jest-dom'
import converterArrays from '../../../features/utils/converterArrays'

test('renders Home page', () => {
   const objData = {
      series: [1, 2, 3, 5],
      progression: [1, 2, 1, 4],
      variable: [2, 1, 2, 3],
      name: ['a', 'b', 'c', 'd'],
   }
   const result = converterArrays(objData)
   expect(result).toEqual(
      expect.arrayContaining([
         expect.objectContaining({
            series: 1,
            progression: 1,
            variable: 2,
            name: 'a',
         }),
         expect.objectContaining({
            series: 5,
            progression: 4,
            variable: 3,
            name: 'd',
         }),
      ])
   )
})
