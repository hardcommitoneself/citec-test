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

/* Definition of terms
From portfolio in Redux arrive 2 terms per positioin
- Outstanding_balance: Balance of that position
- Unrealized_capital_gains: Amount earned if we sell the position now
- Tax rate: 40%
- Tax Alpha: Unrealized_capital_gains * 0.4

Init state of table:
   Order:
      - Unrealized_capital_gains ASCending
   Selected cells:
      - Negative Unrealized_capital_gains

Sketch: https://api.media.atlassian.com/file/957bdc83-5b81-49a1-8516-23823fad63bb/binary?token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1YTU4MjVkMC1kMGEwLTRhNGMtOWEwZi1kMGRlMzVhZTVhOWQiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpmaWxlOjk1N2JkYzgzLTViODEtNDlhMS04NTE2LTIzODIzZmFkNjNiYiI6WyJyZWFkIl19LCJleHAiOjE2NTA2OTU2ODQsIm5iZiI6MTY1MDYxMjcwNH0.v-PiP2Q8V8ncPu0CBOXgmx8bv7Vl0um8J-S3BhrpNAs&client=5a5825d0-d0a0-4a4c-9a0f-d0de35ae5a9d&name=skecth_manage_positions.png
*/

import { PageContainer } from 'features/ui/page-container'
import { Button } from '@mui/material'
import { AppLink } from 'routes/AppLink'
import { TableTaxHarvesting, TotalsTaxHarvesting } from 'features/tax-harvesting'

export const TaxHarvesting = () => {
   return (
      <PageContainer titlePage="Tax loss harvesting">
         <TotalsTaxHarvesting />

         <div className="bg-white my-5 p-4 rounded-lg">
            <span className="text-[20px] leading-[30px] text-[#0BACA9] font-[500]">
               Select the positions you want to sell
            </span>

            <TableTaxHarvesting />
         </div>

         <div className="buttons_wrapper">
            <AppLink to="/investment">
               <Button color="secondary">Back</Button>
            </AppLink>
            <AppLink to="/criteria">
               <Button>Next</Button>
            </AppLink>
         </div>
      </PageContainer>
   )
}
