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

import CryptoJS from 'crypto-js'

export const Security = {

    /**
     * Description: method for decryp a message
     * @param {*} input
     */
    decrypt (input:string) {
        const keyString = String(process.env.REACT_APP_API_KEY)
        const bytes  = CryptoJS.AES.decrypt(input, keyString)
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8)

        return decryptedText
    },

    /**
     * Description: method to encrypt a message
     * @param {*} input
     */
    encrypt (input:string) {
        const keyString = String(process.env.REACT_APP_API_KEY)
        const encryptedText = CryptoJS.AES.encrypt(input, keyString).toString()
             
        return encryptedText
    },

    
}