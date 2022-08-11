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

import { Button, Modal } from '@mui/material'
import { Icon } from 'assets/icons'
import { PageContainer } from 'features/ui/page-container'
import { Customize } from 'pages'
import { useState } from 'react'

export const ButtonAndModalCustomize = () => {
   const [openModal, setOpenModal] = useState(false)
   const handleOpen = () => setOpenModal(true)
   const handleClose = () => setOpenModal(false)

   return (
      <>
         <Button id="criteria_customize_button" variant="home" onClick={handleOpen}>
            Customize
         </Button>

         <Modal open={openModal} sx={{ overflowY: 'scroll' }}>
            <div className="absolute top-4 inset-x-[7.5%] bg-[#F4F6FA] rounded-xl py-3 w-[85%]">
               <PageContainer
                  titlePage="Universe summary"
                  actionBtn={
                     <button onClick={handleClose}>
                        <Icon.Xicon />
                     </button>
                  }
               >
                  <Customize />
               </PageContainer>
            </div>
         </Modal>
      </>
   )
}
