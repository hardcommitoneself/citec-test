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
import '@testing-library/jest-dom'
import { formatHistoryData } from 'features/brokers/alpaca/utils/format-history-data'



describe('test in Format-Hitory-data', () => {

    test('formatHistoryData',  () => {
        const timestamp= [
            1651881600,
            1652140800,
            1652227200,
            1652313600,
            1652400000,
            1652486400,
            1652745600,
            1652832000,
            1652918400,
            1653004800,
            1653091200,
            1653350400,
            1653436800,
            1653523200,
            1653609600,
            1653696000,
            1654041600,
            1654128000,
            1654214400,
            1654300800,
            1654546954
        ]
        const equity = [
            0,
            0,
            0,
            0,
            0,
            0,
            100000,
            100000,
            99550.84,
            99401.48,
            99086.99,
            99564.47,
            99347.01,
            99388.45,
            99099.85,
            99574.87,
            103009.78,
            100823.01,
            102279.83,
            100419.38,
            102660.35
        ]
       const data = formatHistoryData(timestamp, equity)     
       expect(data).toEqual(
        [
            [1651881600000, 0],
            [1652140800000, 0],
            [1652227200000, 0],
            [1652313600000, 0],
            [1652400000000, 0],
            [1652486400000, 0],
            [1652745600000, 100000],
            [1652832000000, 100000],
            [1652918400000, 99550.84],
            [1653004800000, 99401.48],
            [1653091200000, 99086.99],
            [1653350400000, 99564.47],
            [1653436800000, 99347.01],
            [1653523200000, 99388.45],
            [1653609600000, 99099.85],
            [1653696000000, 99574.87],
            [1654041600000, 103009.78],
            [1654128000000, 100823.01],
            [1654214400000, 102279.83],
            [1654300800000, 100419.38],
            [1654546954000, 102660.35]
        ]
       )
    })
  
       
})
   