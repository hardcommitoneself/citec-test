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
import { Security } from 'features/utils/security'

 describe('Security tests', () => {
    
    test('decrypt test', () => {
        const token = '%t&lo90=='
        const tokenEncryp = Security.encrypt(token)
        const tokenDecryp = Security.decrypt(tokenEncryp)

        expect(tokenDecryp).toEqual(token)
     })  
    
    test('Encrypt test', () => {
       Security.encrypt = jest.fn((input) => 'U2FsdGVkX18uq2NN/Hp3X1Niyp7zwZzQ4ltq1l3m1go=');
       //expect(Security.encrypt).toHaveBeenCalledWith('%t&lo90==');
       expect(Security.encrypt('%t&lo90==')).toEqual('U2FsdGVkX18uq2NN/Hp3X1Niyp7zwZzQ4ltq1l3m1go=')
    }) 
    
       
 })
 