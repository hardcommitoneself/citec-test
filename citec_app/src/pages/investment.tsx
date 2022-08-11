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
import { useDispatch } from 'react-redux'
import { Button, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { PageContainer } from 'features/ui/page-container'
import { setCash, setUpdatedCash } from 'store/slices/portfolio'
import { renderPopup } from 'features/popups/investment'
import { useAppSelector } from 'store/hooks'
import {
   calculateProgressionSavingFeesAndTaxes,
   ChartSimulation,
   FormPercentageRebalance,
   PotentialsSavings,
} from 'features/investment'
import {
   useAppNavigate,
   useHandlerTaxHarvesting,
   useValidateNumberStocks,
   useValidateSoldPosition,
   useValidationPorfolioLoaded,
} from 'features/utils/hooks'

const Group = require('assets/img/group.png')

export const Investment = () => {
   const dispatch = useDispatch()
   const navigate = useAppNavigate()
   const { soldCashOnTaxharvesting } = useValidateSoldPosition()
   const { checkValidStocks } = useValidateNumberStocks()
   useHandlerTaxHarvesting()

   const [investmentAcumulative, setInvestmentAcumulative] = useState(1000000)
   const [serieInvestmentPerYearWithSavings, setSerieInvestmentPerYearWithSavings] =
      useState([])
   const [
      serieInvestmentPerYearWithoutSavings,
      setSerieInvestmentPerYearWithoutSavings,
   ] = useState([])
   const [savings, setSavings] = useState({
      fees: 200000,
      taxes: 400000,
   })
   const [investment, setInvestment] = useState(1000000)
   const [years, setYears] = useState(10)
   const workflow = useAppSelector((state) => state.workflow.type)
   const MAX_VAL = 10000000

   const { isPortfolioLoaded } = useValidationPorfolioLoaded()

   const portfolioTickers = useAppSelector((state) => state.portfolio.ticker)

   const indexCash = portfolioTickers.indexOf('$CASH')
   const isCashOnPortfolio = indexCash >= 0

   const setPortfolioCash = () => {
      const cash = {
         outstanding_balance: investment,
         unrealized_capital_gains: 0,
      }

      dispatch(setUpdatedCash(cash))

      soldCashOnTaxharvesting(investment)
   }

   const investmentCash = useAppSelector(
      (state) => state.portfolio.outstanding_balance[indexCash]
   )

   const handleInvestmentChange = (value: number) => {
      setSavings({
         fees: calculateProgressionSavingFeesAndTaxes(
            years,
            'fees',
            investment,
            setInvestmentAcumulative,
            setSerieInvestmentPerYearWithSavings,
            setSerieInvestmentPerYearWithoutSavings
         ),
         taxes: calculateProgressionSavingFeesAndTaxes(
            years,
            'taxes',
            investment,
            setInvestmentAcumulative,
            setSerieInvestmentPerYearWithSavings,
            setSerieInvestmentPerYearWithoutSavings
         ),
      })
      setInvestment(value)
   }

   useEffect(() => {
      if (workflow === 'new') {
         handleInvestmentChange(investment)
      }
   }, [years])

   useEffect(() => {
      if (isCashOnPortfolio) {
         setInvestment(investmentCash)
      } else {
         dispatch(
            setCash({
               outstanding_balance: investment,
               unrealized_capital_gains: 0,
            })
         )
      }
      if (!isPortfolioLoaded) setPortfolioCash()

      soldCashOnTaxharvesting(isCashOnPortfolio ? investmentCash : investment)
   }, [])

   useEffect(() => {
      checkValidStocks()
   }, [investmentCash])

   return (
      <PageContainer>
         <div className="dashboard_wrapper">
            <div className="InvestmentBody dashboard_body">
               <div className="top_boxes_area_investment">
                  <div className={workflow == 'new' ? 'box' : 'box100'}>
                     {workflow == 'new' ? (
                        <h2>How much money you want to invest? </h2>
                     ) : (
                        <h2>Do you want to add more cash? </h2>
                     )}
                     <div className="inner_box">
                        <div className="top_area text-[#0BACA9]">
                           <h1>Investment in cash</h1>
                           <img
                              className="moreinfo"
                              src={Group}
                              alt=""
                              onClick={() => {
                                 renderPopup('investment')
                              }}
                              style={{ marginLeft: '3px' }}
                           />
                        </div>
                        <NumberFormat
                           value={investment}
                           thousandSeparator={true}
                           min={0}
                           maxLength={11}
                           isAllowed={({ value }) => {
                              if (Number(value) <= MAX_VAL) return true
                              return false
                           }}
                           onValueChange={({ value }) => {
                              handleInvestmentChange(Number(value))
                           }}
                           onBlur={setPortfolioCash}
                           prefix="$"
                           className="price_area w-full"
                           id="investment-input"
                        />

                        <Slider
                           valueLabelDisplay="auto"
                           onChange={(_, newValue) => {
                              setInvestment(newValue as number)
                           }}
                           onChangeCommitted={setPortfolioCash}
                           value={investment}
                           min={0}
                           max={10000000}
                        />
                     </div>
                  </div>
                  {workflow === 'new' && (
                     <PotentialsSavings
                        {...savings}
                        years={years}
                        serieInvestmentPerYearWithSavings={
                           serieInvestmentPerYearWithSavings
                        }
                        serieInvestmentPerYearWithoutSavings={
                           serieInvestmentPerYearWithoutSavings
                        }
                     />
                  )}
               </div>

               {workflow === 'new' ? (
                  <ChartSimulation
                     years={years}
                     setYears={setYears}
                     acumulative={investmentAcumulative}
                     serieInvestmentPerYearWithSavings={
                        serieInvestmentPerYearWithSavings
                     }
                     serieInvestmentPerYearWithoutSavings={
                        serieInvestmentPerYearWithoutSavings
                     }
                  />
               ) : (
                  <div className="box chart_box">
                     <h2 className="mb-[10px]">
                        How do you want to rebalance the portfolio?
                     </h2>
                     <FormPercentageRebalance />
                  </div>
               )}

               <div className="buttons_wrapper">
                  <Button
                     color="secondary"
                     onClick={() =>
                        navigate(
                           workflow === 'new' ? '/workflow' : '/portfolio-analysis'
                        )
                     }
                  >
                     Back
                  </Button>
                  <Button
                     onClick={() =>
                        navigate(
                           workflow === 'new' ? '/criteria' : '/tax-harvesting'
                        )
                     }
                  >
                     Next
                  </Button>
               </div>
            </div>
         </div>
      </PageContainer>
   )
}
