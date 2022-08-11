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

import { render, fireEvent } from '@testing-library/react'
import { BtnUploadExcel } from 'features/portfolio-loader'

import { act } from 'react-dom/test-utils'

describe('test at button file submit', () => {
   const setExcelData = jest.fn()

   const MyPortfolioTemplate = require('../../../../public/assets/MyPortfolioTemplate.xlsx')

   test('Snapshot', () => {
      const { container } = render(<BtnUploadExcel setExcelData={setExcelData} />)
      expect(container).toMatchSnapshot()
   })

   let container

   test('Button click in load excel file', () => {
      container = render(<BtnUploadExcel setExcelData={setExcelData} />)

      const file = new File([], MyPortfolioTemplate, {
         type: 'application/vnd.ms-excel',
      })
      const { getByTestId } = container

      act(() => {
         fireEvent.change(getByTestId('upInput'), {
            target: { files: [file] },
         })
         /* fire events that update state */
      })

      fireEvent.click(getByTestId('btn-submit'))

      expect(setExcelData).toBeCalledTimes(1)
   })
})
