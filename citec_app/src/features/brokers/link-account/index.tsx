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
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState } from 'react'
import { AlpacaOauth } from 'features/brokers/alpaca/ui/'
import { Button } from '@mui/material'

export const LinkAccount = () => {
   const [isOpen, setIsOpen] = useState(false)
   const visibility = process.env.REACT_APP_ALPACA_VISIBILITY

   const openModal = () => {
      setIsOpen(!isOpen)
   }

   return (
      <>
         {visibility !== 'undefined' && visibility == 'true' && (
            <div className="linkAccount">
               <Button
                  data-testid="btn-link-account"
                  variant="actionButtonCitec"
                  onClick={openModal}
               >
                  <span className="font-semibold">+ Link account</span>
               </Button>
            </div>
         )}

         <Modal isOpen={isOpen}>
            <ModalHeader>ADD ACCOUNT</ModalHeader>
            <ModalBody>
               <ul>
                  <li className="account-item">
                     <AlpacaOauth />
                  </li>
               </ul>
            </ModalBody>
            <ModalFooter>
               <Button color="secondary" onClick={openModal}>
                  Close
               </Button>
            </ModalFooter>
         </Modal>
      </>
   )
}
