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

import { AlpacaApi } from "./hooks/api/alpaca-api"

export const assetsAlpaca = async (type: string, tickers: string[]) => {
    
    const getAlpacaAsset = async (type: string, ticker: string) => {
        try {
            const asset = await AlpacaApi({
                type: type,
                url: 'assets/' + ticker,
                method: 'GET',
             })
      
             return asset.data
        } catch (error: any) {
            return error
        }  
    }

    const getAllAssets = async (type: string, tickers: string[]) => {
        
        const assetsPromises: any = []
        tickers.map((ticker) => {
            assetsPromises.push(getAlpacaAsset(type, ticker))
        })

        return await Promise.all(assetsPromises)
    }
    
    return getAllAssets(type, tickers)    
}