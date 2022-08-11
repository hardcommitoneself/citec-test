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
export const PlansInfo = [
   {
      plan: 'Basic',
      price: '19',
      button: 'Start free trial',
      list: [
         'Portfolio Analysis',
         'Portfolio Optimization',
         'Portfolio Rebalance',
         'Basic Stock Screener',
         'Reports',
         'Save upto 10 portfolios',
         'Integration with Broker',
         'One Click batch Trading',
         'Up to $100,000 in Assets',
      ],
      price_id: process.env.REACT_APP_id_BASIC_SUBSCRIPTION
   },
   {
      plan: 'Professional',
      price: '49',
      button: 'Coming Soon',
      list: [
         'Functionality in Basic',
         'Advanced Stock Screener',
         'ESG Analytics',
         'Portfolio Ideas',
         'Up to $1,000,000 in Assets',
         'Save upto 10 portfolios',
      ],
      price_id: 'Coming-soon'
   },
   {
      plan: 'Institutional',
      price: 'Custom',
      button: 'Contact us',
      list: [
         'Functionality in Professional',
         'Manage Multiple Accounts',
         'Customized Reporting',
         'Assigned Specialist',
         'Unlimited Assets ',
      ],
      price_id: 'Custom'
   },
]
