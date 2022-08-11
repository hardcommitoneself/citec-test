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

import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { Paths } from './routes'

type AppLinkProps = Omit<LinkProps, 'to'> & { to: Paths }

export const AppLink: FC<AppLinkProps> = ({ children, ...props }) => {
   return <Link {...props}>{children}</Link>
}
