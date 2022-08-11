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

import { fireEvent, render } from '@testing-library/react'
import { shallow } from 'enzyme'
import { ChartSimulation } from 'features/investment'

jest.mock('react-apexcharts', () => {
   return {
      __esModule: true,
      default: () => {
         return <div />
      },
   }
})

const setYears = jest.fn()
const investmentAcumulative = jest.fn() as any
const serieInvestmentPerYearWithSavings = jest.fn() as any
const serieInvestmentPerYearWithoutSavings = jest.fn() as any

describe('Test at ChartSimulation component', () => {
   test('snapshot and click change year', () => {
      const { container, getByTestId } = render(
         <ChartSimulation
            years={10}
            setYears={setYears}
            acumulative={investmentAcumulative}
            serieInvestmentPerYearWithSavings={serieInvestmentPerYearWithSavings}
            serieInvestmentPerYearWithoutSavings={
               serieInvestmentPerYearWithoutSavings
            }
         />
      )

      fireEvent.click(getByTestId('10Y'))

      expect(container).toMatchSnapshot()
      expect(setYears).toBeCalledTimes(1)
   })

   test('click change year to 5', () => {
      const { getByTestId } = render(
         <ChartSimulation
            years={5}
            setYears={setYears}
            acumulative={investmentAcumulative}
            serieInvestmentPerYearWithSavings={serieInvestmentPerYearWithSavings}
            serieInvestmentPerYearWithoutSavings={
               serieInvestmentPerYearWithoutSavings
            }
         />
      )

      fireEvent.click(getByTestId('5Y'))

      expect(setYears).toBeCalledTimes(1)
   })

   test('click change year to 20', () => {
      const { getByTestId } = render(
         <ChartSimulation
            years={10}
            setYears={setYears}
            acumulative={investmentAcumulative}
            serieInvestmentPerYearWithSavings={serieInvestmentPerYearWithSavings}
            serieInvestmentPerYearWithoutSavings={
               serieInvestmentPerYearWithoutSavings
            }
         />
      )

      fireEvent.click(getByTestId('20Y'))

      expect(setYears).toBeCalledTimes(1)
   })

   test('active class in button 20Y', async () => {
      const wrapper = shallow(
         <ChartSimulation
            years={20}
            setYears={setYears}
            acumulative={investmentAcumulative}
            serieInvestmentPerYearWithSavings={serieInvestmentPerYearWithSavings}
            serieInvestmentPerYearWithoutSavings={
               serieInvestmentPerYearWithoutSavings
            }
         />
      )
      expect(wrapper.find({ 'data-testid': '20Y' }).hasClass('active')).toBeTruthy()
   })
})
