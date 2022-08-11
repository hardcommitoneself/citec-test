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

import { useState } from 'react'

interface HandleInputChangeConfig {
   toUpperCase?: boolean
}

export const useForm = <T>(initialFormState: T) => {
   const [formState, setFormState] = useState(initialFormState)

   const handleInputChange = (
      { target }: React.ChangeEvent<HTMLInputElement>,
      config?: HandleInputChangeConfig
   ) => {
      setFormState({
         ...formState,
         [target.name]: config?.toUpperCase
            ? target.value.toUpperCase()
            : target.value,
      })
   }
   const handleInputNumberChange = (name: string, value: string) => {
      setFormState({
         ...formState,
         [name]: value,
      })
   }

   const handleResetForm = () => {
      setFormState(initialFormState)
   }

   return {
      handleInputChange,
      handleInputNumberChange,
      handleResetForm,
      values: formState,
   }
}
