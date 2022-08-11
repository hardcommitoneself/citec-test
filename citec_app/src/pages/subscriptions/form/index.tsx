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
import { PlansInfo } from './plans'
import PlanBox from 'features/subscriptions/ui/plan-box'
import { PageContainer } from "features/ui/page-container";

export function StripeForm() {

   return (
      <PageContainer>
         <div className="PortfolioCreate Pricing">
            <section className="body_area  ">
               <div className="content common_width">
                  <h1>
                     Are you ready to start <span>Making Money</span>!
                  </h1>
                  <div className="boxes_wrapper">
                     {PlansInfo.map((Each) => (
                        <PlanBox
                           plan={Each.plan}
                           price={Each.price}
                           list={Each.list}
                           button={Each.button}
                           price_id={Each.price_id}
                        />
                     ))}
                  </div>
               </div>
            </section>
         </div>
      </PageContainer>

   );
}