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

import { useDispatch } from 'react-redux'
import { LinkAccount } from 'features/brokers/link-account'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { setAccountTypeSelect } from 'store/slices/brokers'
import { useAppSelector } from 'store/hooks'
import { HistoryPortfolio } from './alpaca-history-portfolio'

export const AlpacaBalance = () => {
   const visibility = process.env.REACT_APP_ALPACA_VISIBILITY

   const dispatch = useDispatch()

   const brokers = useAppSelector((state) => state.brokers)
   const typesAccount = brokers.accountType

   const handleChange = (event: SelectChangeEvent) => {
      const typeSelected = event.target.value as string
      dispatch(setAccountTypeSelect({ accountTypeSelect: typeSelected }))
   }

   return (
      <>
         {visibility == 'true' && (
            <div className="mx-10 mt-2 bg-white p-4 rounded-2xl relative balance">
               <div className="brokerTitle">
                  <div className="actionBroker">
                     <div className="selectAccount">
                        <span className="text-sm">Account</span>
                        <FormControl
                           variant="standard"
                           sx={{ m: 1, width: 200, pt: 0 }}
                           size="small"
                        >
                           <Select
                              value={brokers.accountTypeSelect}
                              label="type-acount"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'Without label' }}
                              className="selectAccountType"
                           >
                              {typesAccount.map((typeAc) => (
                                 <MenuItem value={typeAc} key={typeAc}>
                                    {typeAc == 'PAPER'
                                       ? 'Paper Trading'
                                       : 'Live Trading'}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </div>

                     <LinkAccount />
                  </div>
               </div>
               <HistoryPortfolio />
            </div>
         )}
      </>
   )
}
