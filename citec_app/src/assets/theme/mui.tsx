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

import { createTheme } from '@mui/material'
import { Icon } from 'assets/icons'

declare module '@mui/material/Button' {
   interface ButtonPropsVariantOverrides {
      home: true
      optimize: true
      save: true
      actionButtonCitec: true
      download: true
   }
}

export const theme = createTheme({
   palette: {
      primary: {
         main: '#0BACA9',
         contrastText: 'rgba(255,255,255,0.87)',
      },
      secondary: {
         main: '#E8EFF6',
         contrastText: '#79828D',
         dark: '#d2d2d2',
      },
   },
   typography: {
      allVariants: {
         fontFamily: 'Poppins',
      },
   },
   components: {
      MuiAccordionSummary: {
         defaultProps: {
            expandIcon: <Icon.Chevron />,
         },
      },
      MuiAccordion: {
         defaultProps: {
            square: true,
         },
         styleOverrides: {
            root: {
               marginBottom: '10px',
               boxShadow: 'none',
               borderRadius: '10px',
               border: 'none',
               '&.MuiAccordion-root:before': {
                  backgroundColor: 'transparent',
               },
               '&.Mui-disabled': {
                  backgroundColor: 'white',
               },
            },
         },
      },
      MuiCheckbox: {
         defaultProps: {
            checkedIcon: <Icon.CheckboxSelected />,
            icon: <Icon.CheckboxUnselect />,
         },
      },
      MuiSlider: {
         styleOverrides: {
            rail: {
               backgroundColor: '#EBEDF0',
               height: '6px',
            },
            track: {
               backgroundColor: '#0BACA9',
               height: '6px',
            },
            valueLabel: {
               backgroundColor: 'white',
               color: '#79828D',
               height: '15px',
               width: '40px',
               padding: '10px',
            },
            thumb: {
               backgroundColor: 'white',
               border: '4px solid #0BACA9',
               width: '16px',
               height: '16px',
            },
         },
      },

      MuiButton: {
         variants: [
            {
               props: { variant: 'home' },
               style: {
                  width: '93px',
                  height: '35px',
                  borderRadius: '4px',
                  backgroundColor: '#4677f4',
                  color: 'white',
                  padding: '9px 16px',
                  '&:hover': {
                     background: '#6e92f3',
                  },
               },
            },
            {
               props: { variant: 'optimize' },
               style: {
                  borderRadius: '4px',
                  backgroundColor: '#9C2B85',

                  color: 'white',
                  '&:hover': {
                     background: '#8E547F',
                  },
               },
            },
            {
               props: { variant: 'download' },
               style: {
                  minWidth: '35px',
                  minHeight: '35px',
                  backgroundColor: '#21BAB7',
                  color: 'white',
                  borderRadius: '4px',
                  padding: '9px',
                  '&:hover': {
                     background: '#82e0de',
                  },
               },
            },
            {
               props: { variant: 'save' },
               style: {
                  backgroundColor: '#3CB4EE',
                  color: 'white',
                  '&:hover': {
                     background: '#7FC9EA',
                  },
               },
            },
            {
               props: { variant: 'actionButtonCitec' },
               style: {
                  width: '130px',
                  height: '35px',
                  borderRadius: '4px',
                  backgroundColor: '#9c2b85',
                  color: 'white',
                  padding: '9px',
                  border: '1px solid #9c2b85',
                  '&:hover': {
                     background: '#FFFFFF',
                     color: '#9c2b85',
                  },
               },
            },
         ],
         defaultProps: {
            disableElevation: true,
            variant: 'contained',
         },
         styleOverrides: {
            root: {
               textTransform: 'none',
               borderRadius: '10px',
               padding: '16px 35px',
               fontWeight: '400',
               '&:disabled': {
                  backgroundColor: '#d4d4d4',
                  color: '#fafafa',
                  cursor: 'not-allowed',
                  pointerEvents: 'all !important',
                  '&:hover': {
                     backgroundColor: '#a3a3a3',
                  },
               },
            },
         },
      },
   },
})
