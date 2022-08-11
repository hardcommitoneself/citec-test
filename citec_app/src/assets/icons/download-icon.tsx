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

export const Download = ({ white = false }: { white?: boolean }) => {
   return (
      <svg
         width="19"
         height="21"
         viewBox="0 0 18 18"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.954915 2.06107C0 3.3754 0 5.25027 0 9C0 12.7497 0 14.6246 0.954915 15.9389C1.26331 16.3634 1.6366 16.7367 2.06107 17.0451C3.3754 18 5.25027 18 9 18C12.7497 18 14.6246 18 15.9389 17.0451C16.3634 16.7367 16.7367 16.3634 17.0451 15.9389C18 14.6246 18 12.7497 18 9C18 5.25027 18 3.3754 17.0451 2.06107C16.7367 1.6366 16.3634 1.26331 15.9389 0.954915C14.6246 0 12.7497 0 9 0C5.25027 0 3.3754 0 2.06107 0.954915C1.6366 1.26331 1.26331 1.6366 0.954915 2.06107ZM9.75 5C9.75 4.58579 9.41421 4.25 9 4.25C8.58579 4.25 8.25 4.58579 8.25 5V11.9362C8.23578 11.9251 8.22128 11.9137 8.20649 11.9018C7.88386 11.6427 7.50033 11.2573 6.93054 10.6824L5.53269 9.27204C5.24111 8.97784 4.76624 8.97573 4.47204 9.26731C4.17784 9.55889 4.17573 10.0338 4.46731 10.328L5.89565 11.7691C6.42703 12.3053 6.87022 12.7525 7.26724 13.0713C7.68366 13.4057 8.12131 13.6601 8.6545 13.7281C8.76921 13.7427 8.8846 13.75 9 13.75C9.1154 13.75 9.23079 13.7427 9.34549 13.7281C9.87869 13.6601 10.3163 13.4057 10.7328 13.0713C11.1298 12.7525 11.573 12.3053 12.1043 11.7691L13.5327 10.328C13.8243 10.0338 13.8222 9.55889 13.528 9.26731C13.2338 8.97573 12.7589 8.97784 12.4673 9.27204L11.0695 10.6824C10.4997 11.2573 10.1161 11.6427 9.79351 11.9018C9.77872 11.9137 9.76422 11.9251 9.75 11.9362V5Z"
            fill={white ? '#fff' : '#0BACA9'}
         />
      </svg>
   )
}
