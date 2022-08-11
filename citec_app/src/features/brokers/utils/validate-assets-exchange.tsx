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

import { assetsAlpaca } from "../alpaca/utils/assets-alpaca"
import { getAssetType } from "./get-asset-type"

export const validateAssetsExchange = async (type: string, tickers: string[]) => {
    
    let isValid = true
    let idx = 0

    const citecAssetsPromise = getAssetType(tickers)
    const brokerAssetsPromise =  assetsAlpaca(type, tickers)

    const [ citecAssets, brokerAssets ] = await Promise.all([
        citecAssetsPromise,
        brokerAssetsPromise
    ])

    if ( !citecAssets || !brokerAssets || citecAssets.length != brokerAssets.length ) {
        isValid = false
    } else {
        if ( citecAssets.length == 0 || brokerAssets.length == 0 ) isValid = false
    
        if (citecAssets.length == brokerAssets.length) {
            while (idx < citecAssets.length && isValid) {
                isValid = citecAssets[idx].ticker === brokerAssets[idx].symbol
                idx += 1
            }
        } 
    }
    
    return isValid
}