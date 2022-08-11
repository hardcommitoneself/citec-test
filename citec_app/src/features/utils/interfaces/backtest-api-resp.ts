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

export interface BacktestRes {
   fundamentals: Fundamentals
   risk: Risk
   returns: Returns
   tracking: Tracking
   capital_gains: CapitalGains
   sectors: Sectors
   factors: Factors
   segment_matrix: SegmentMatrix
   tracking_expected: Tracking_expected
   ts_backtest: Ts
   ts_drawdowns: Ts
}

export interface CapitalGains {
   outstanding_balance: number
   unrealized_cap_losses: number
   unrealized_cap_gains: number
   realized_cap_losses: number
   realized_cap_gains: number
   taxes_cost: number
   taxes_rate: number
}

export interface Factors {
   factor: string[]
   percentage: number[]
}

export interface Fundamentals {
   total_assets: number
   total_positions: number
   pe: number
   pb: number
   dividend_yield: number
}

export interface Returns {
   returns_1M: number
   returns_3M: number
   returns_6M: number
   CAGR: number
}

export interface Risk {
   sharpe: number
   volatility: number
   beta: number
   alpha: number
}

export interface Sectors {
   sector: string[]
   percentage: number[]
}

export interface SegmentMatrix {
   style: string[]
   size: string[]
   weight: number[]
}

export interface Tracking_expected {
   expected_tracking_kpis: Tracking
   observation: number[]
   tracking_error: number[]
   probability: number[]
}

export interface Tracking {
   tracking_error: number
   tracking_difference: number
   information_ratio: number
   r_square: number
   alpha: number
   beta: number
}

export interface Ts {
   date: string[]
   benchmark: number[]
   portfolio: number[]
}
