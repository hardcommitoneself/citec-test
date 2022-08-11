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

import Swal from 'sweetalert2'
import { commonsConfig } from './commons-config'

const liquidityText = `<div class="align-left">
<p><b>Liquidity</b> measures companys ability to meet its
short-term liabilities with its short-term assets. A current ratio
greater than or equal to one indicates that current assets should be
able to satisfy near-term obligations. A current ratio of less than
one may mean the firm has liquidity issues.</p>
</div>`

const momemtumText = `<div class="align-left">
<p><b>Momentum</b> measures the rate of change in price over a
period of time to help investors determine the strength of a trend.
Stocks that tend to move with the strength of momentum are called
momentum stocks.</p>
<p>Momentum is used by investors to trade stocks in an uptrend by going
long (or buying shares) and going short (or selling shares) in a
downtrend</p>
</div>`

const volatilityText = `<div class="align-left">
<b> Volatility</b> is a proxy for risk that measures 
the standard deviation or variance between daily returns of a stock. 
The more volatility the higher the risk. Stable companies with predictible 
returns tend to have less volitile prices.
</div>`

const yieldText = `<div class="align-left">
<b> Dividend Yield Ratio </b> is company’s dividends
payed to investors over the market capitalization. Investors are
expected to receive that percentage of the value of their investment 
in dividends. Companies with high dividend yields can be a good option 
for investors who need cash (i.e. people retired), while stocks with lower
dividend investors are a good option for investors still in an accumulation 
phase since they will avoid paying taxes on those dividends.
</div>`

const sizeText = `<div class="align-left">
<b> Size: </b> Investing in companies based on their 
market capitalization, which refers to the total dollar market value of
a company’s outstanding stock shares. This number is calculated by
multiplying the total number of a company’s outstanding shares by
the current market price of one share.
</div>`

const qualityText = `<div class="align-left">
<b>Quality: </b> Investing in companies based on their 
financial health, which can be measured by combining different leverage ratios. 
</div>`

const style = `<div class="align-left">
<b>Style (value vs. growth): </b> Investing in companies
mainly based on the price per earnings. It is important to know that earnings 
can be measured in different ways, such as expected future earnings vs. current earnings.
</div>`

export const customizePopups = (name: string) => {
   let html

   switch (name) {
      case 'liquidity':
         html = liquidityText
         break
      case 'momentum':
         html = momemtumText
         break
      case 'volatility':
         html = volatilityText
         break
      case 'yield':
         html = yieldText
         break
      case 'size':
         html = sizeText
         break

      case 'quality':
         html = qualityText
         break
      case 'style':
         html = style
         break

      default:
         break
   }

   Swal.fire({
      html,
      ...commonsConfig,
      showConfirmButton: true,
   })
}
