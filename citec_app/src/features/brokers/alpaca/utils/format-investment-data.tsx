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

export const formatInvestmentData = (data: any) => {
    return {'Asset class': data.asset_class,
    'quantity': Number(data.quantity),
    'price': Number(data.price), 
    'Investment': Number(data.investment),  
    'Day gain/loss ($)': Number(data.day_gain_loss[0]),
    'Day gain/loss (%)': Number(data.day_gain_loss[1]),
    'Total gain/loss ($)': Number(data.total_gain_loss[0]),
    'Total gain/loss (%)': Number(data.total_gain_loss[1]),
    }
}
