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
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { setWorkflow } from 'store/slices/workflow'
import { useAppSelector } from 'store/hooks'
import { useAppNavigate } from 'features/utils/hooks'

const create_portfoilio_color = require('assets/img/create_portfolio_color.png')
const download_blue = require('assets/img/download_blue.png')
const download_white = require('assets/img/download_white.png')
const create_portfolio_white = require('assets/img/create_portfolio_white.png')

export const Workflow = () => {
   const navigate = useAppNavigate()
   const dispatch = useDispatch()
   const workflow = useAppSelector((state) => state.workflow.type)

   const routeChange = () => {
      if (workflow === 'load') {
         navigate('/portfolio-loader')
      } else {
         navigate('/investment')
      }
   }

   const handleChangeCard = (type: string) => {
      dispatch(setWorkflow(type))
   }

   return (
      <div className="PortfolioCreate">
         <section className="body_area">
            <div className="content_area">
               <h1>How do you want to get started?</h1>
               <div className="boxes_wrapper">
                  <input type="radio" name="portfolio" id="create-radio" />
                  <label
                     className="box"
                     htmlFor="create-radio"
                     onClick={() => handleChangeCard('new')}
                     data-testid="label-create-new-portfolio"
                  >
                     <div className="checkbox_custom_circle">
                        <span className="ball"></span>
                     </div>
                     <img
                        src={create_portfoilio_color}
                        alt=""
                        className="de_select"
                     />
                     <img src={create_portfolio_white} alt="" className="select" />
                     <h1>Create a new portfolio</h1>
                     <p>Start with a cash position and create a new portfolio</p>
                  </label>
                  <input type="radio" name="portfolio" id="upload-radio" />
                  <label
                     className="box"
                     htmlFor="upload-radio"
                     onClick={() => handleChangeCard('load')}
                     data-testid="label-upload-portfolio"
                  >
                     <div className="checkbox_custom_circle">
                        <span className="ball"></span>
                     </div>
                     <img src={download_blue} alt="" className="de_select" />
                     <img src={download_white} alt="" className="select" />
                     <h1>Upload existing portfolio</h1>
                     <p>
                        Upload your existing portfolio manualy or using an excel file
                     </p>
                  </label>
               </div>
            </div>
         </section>

         <footer>
            <div className="common_width">
               <div className="buttons_wrapper">
                  <Button color="secondary" onClick={() => navigate('/')}>
                     Back
                  </Button>
                  <Button onClick={routeChange} disabled={!workflow}>
                     Next
                  </Button>
               </div>
            </div>
         </footer>
      </div>
   )
}
