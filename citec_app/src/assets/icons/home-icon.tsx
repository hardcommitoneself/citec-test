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

interface HomeProps {
   color: 'white' | 'green'
}
export const Home = ({ color }: HomeProps) => {
   return (
      <svg
         width="23"
         height="23"
         viewBox="0 0 23 23"
         fill={color === 'green' ? 'currentColor' : '#79828D'}
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M12.7835 0.819572C12.6812 0.716454 12.5595 0.634607 12.4254 0.578752C12.2914 0.522897 12.1476 0.494141 12.0023 0.494141C11.8571 0.494141 11.7133 0.522897 11.5792 0.578752C11.4452 0.634607 11.3235 0.716454 11.2212 0.819572L1.31957 10.7212C1.21645 10.8235 1.13461 10.9452 1.07875 11.0792C1.0229 11.2133 0.994141 11.3571 0.994141 11.5023C0.994141 11.6476 1.0229 11.7914 1.07875 11.9254C1.13461 12.0595 1.21645 12.1812 1.31957 12.2835C1.42237 12.3854 1.54429 12.4661 1.67833 12.5208C1.81238 12.5756 1.95591 12.6033 2.1007 12.6025H3.20088V20.3038C3.20088 20.8874 3.4327 21.447 3.84535 21.8597C4.258 22.2723 4.81767 22.5041 5.40124 22.5041H18.6034C19.187 22.5041 19.7467 22.2723 20.1593 21.8597C20.5719 21.447 20.8038 20.8874 20.8038 20.3038V12.6025H21.904C22.1957 12.6025 22.4756 12.4866 22.6819 12.2803C22.8882 12.074 23.0041 11.7941 23.0041 11.5023C23.005 11.3575 22.9772 11.214 22.9225 11.08C22.8677 10.9459 22.787 10.824 22.6851 10.7212L12.7835 0.819572ZM5.40124 20.3038V9.75304L12.0023 3.15196L18.6034 9.75304V20.3038H5.40124Z" />
      </svg>
   )
}
