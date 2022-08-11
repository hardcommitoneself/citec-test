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

import { renderPopup } from 'features/popups/backtest-popups'
import { TotalsBox } from 'features/ui/cards'
import { BacktestRes } from 'features/utils/interfaces/backtest-api-resp'
import { numberToFixed } from 'features/utils/to-fixed-number'

const _tracking = require('assets/img/tracking_grey.png')
const equal = require('assets/img/equal.png')
const not = require('assets/img/not.png')

interface TotalBacktestProps {
   backtest: BacktestRes
}

export const TotalBacktest = ({ backtest }: TotalBacktestProps) => {
   const { risk, tracking } = backtest

   return (
      <div className="grid grid-cols-3 gap-6 mt-2">
         <TotalsBox
            value={numberToFixed(tracking.tracking_difference * 100) + ' %'}
            text="Tracking Difference"
            img={_tracking}
            functInfo={() => renderPopup('trackDiffAlert')}
            info
         />
         <TotalsBox
            value={numberToFixed(risk.beta)}
            text="Beta"
            img={not}
            functInfo={() => renderPopup('betAlert')}
            info
         />
         <TotalsBox
            value={numberToFixed(tracking.r_square)}
            text="R-Square"
            img={equal}
            functInfo={() => renderPopup('rsqrAlert')}
            info
         />
      </div>
   )
}
