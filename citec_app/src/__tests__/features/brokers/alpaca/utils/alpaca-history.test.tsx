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
import '@testing-library/jest-dom'
import {
   AlpacaHistory,
   getFinalEquityWhitouthZero,
   getFinalTimestampMiliseconds,
   getActualEquity,
   getFirstEquityValid,
} from 'features/brokers/alpaca/utils/alpaca-history'
import { alpacaApiConnect } from 'features/brokers/alpaca/utils/hooks/api/alpaca-api'
import MockAdapter from 'axios-mock-adapter'

const mockAlpaca = new MockAdapter(alpacaApiConnect)

describe('test in Alpaca History', () => {
   test('AlpacaHistory with 1D', () => {
      const resp = {
         data: {
            timestamp: [1654300800, 1654560000, 1654646400, 1654732800, 1654819200],
            equity: [99943.6, 99947.4, 99960.25, 99956.5, 99956.5],
            profit_loss: [-29.15, 3.8, 12.85, -3.75, 0],
            profit_loss_pct: [
               0, 0.0000380214440945, 0.00016659395899292607, 0.00012907279705758512,
               0.00012907279705758512,
            ],
            base_value: 0,
            timeframe: '1D',
         },
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '305',
            'content-type': 'application/json; charset=UTF-8',
         },
         config: {
            transitional: {
               silentJSONParsing: true,
               forcedJSONParsing: true,
               clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: {
               Accept: 'application/json',
               Authorization: 'Bearer 88352ca3-b340-43df-8ab0-daeb76b5f443',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account/portfolio/history',
            params: {
               timeframe: '1D',
               date_end: '2022-06-09',
               extended_hours: true,
               period: '1W',
               date_start: '',
            },
         },
         request: {},
      }

      const callback = async (
         dataHistory: number[][],
         actualEquity: number,
         profitLoss: number,
         profitLossPer: number
      ) => {
         expect(dataHistory).toEqual([
            [1654214400000, 99943.6],
            [1654473600000, 99947.4],
            [1654560000000, 99960.25],
            [1654646400000, 99956.5],
            [1654819200000, 99956.5],
         ])
      }

      mockAlpaca.onGet('account/portfolio/history').reply(200, resp)

      AlpacaHistory('PAPER', '1D', callback, () => {
         console.log('Failure')
      })
   })

   test('AlpacaHistory with 1W', () => {
      const resp = {
         data: {
            timestamp: [1654300800, 1654560000, 1654646400, 1654732800, 1654819200],
            equity: [99943.6, 99947.4, 99960.25, 99956.5, 99956.5],
            profit_loss: [-29.15, 3.8, 12.85, -3.75, 0],
            profit_loss_pct: [
               0, 0.0000380214440945, 0.00016659395899292607, 0.00012907279705758512,
               0.00012907279705758512,
            ],
            base_value: 0,
            timeframe: '1D',
         },
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '305',
            'content-type': 'application/json; charset=UTF-8',
         },
         config: {
            transitional: {
               silentJSONParsing: true,
               forcedJSONParsing: true,
               clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: {
               Accept: 'application/json',
               Authorization: 'Bearer 88352ca3-b340-43df-8ab0-daeb76b5f443',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account/portfolio/history',
            params: {
               timeframe: '1D',
               date_end: '2022-06-09',
               extended_hours: true,
               period: '1W',
               date_start: '',
            },
         },
         request: {},
      }

      const callback = async (
         dataHistory: number[][],
         actualEquity: number,
         profitLoss: number,
         profitLossPer: number
      ) => {
         expect(dataHistory).toEqual([
            [1654214400000, 99943.6],
            [1654473600000, 99947.4],
            [1654560000000, 99960.25],
            [1654646400000, 99956.5],
            [1654819200000, 99956.5],
         ])
      }

      mockAlpaca.onGet('account/portfolio/history').reply(200, resp)

      AlpacaHistory('PAPER', '1W', callback, () => {
         console.log('Failure')
      })
   })

   test('AlpacaHistory with 1M', () => {
      const resp = {
         data: {
            timestamp: [1654300800, 1654560000, 1654646400, 1654732800, 1654819200],
            equity: [99943.6, 99947.4, 99960.25, 99956.5, 99956.5],
            profit_loss: [-29.15, 3.8, 12.85, -3.75, 0],
            profit_loss_pct: [
               0, 0.0000380214440945, 0.00016659395899292607, 0.00012907279705758512,
               0.00012907279705758512,
            ],
            base_value: 0,
            timeframe: '1D',
         },
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '305',
            'content-type': 'application/json; charset=UTF-8',
         },
         config: {
            transitional: {
               silentJSONParsing: true,
               forcedJSONParsing: true,
               clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: {
               Accept: 'application/json',
               Authorization: 'Bearer 88352ca3-b340-43df-8ab0-daeb76b5f443',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account/portfolio/history',
            params: {
               timeframe: '1D',
               date_end: '2022-06-09',
               extended_hours: true,
               period: '1W',
               date_start: '',
            },
         },
         request: {},
      }

      const callback = async (
         dataHistory: number[][],
         actualEquity: number,
         profitLoss: number,
         profitLossPer: number
      ) => {
         expect(dataHistory).toEqual([
            [1654214400000, 99943.6],
            [1654473600000, 99947.4],
            [1654560000000, 99960.25],
            [1654646400000, 99956.5],
            [1654819200000, 99956.5],
         ])
      }

      mockAlpaca.onGet('account/portfolio/history').reply(200, resp)

      AlpacaHistory('PAPER', '1M', callback, () => {
         console.log('Failure')
      })
   })

   test('AlpacaHistory with 3M', () => {
      const resp = {
         data: {
            timestamp: [1654300800, 1654560000, 1654646400, 1654732800, 1654819200],
            equity: [99943.6, 99947.4, 99960.25, 99956.5, 99956.5],
            profit_loss: [-29.15, 3.8, 12.85, -3.75, 0],
            profit_loss_pct: [
               0, 0.0000380214440945, 0.00016659395899292607, 0.00012907279705758512,
               0.00012907279705758512,
            ],
            base_value: 0,
            timeframe: '1D',
         },
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '305',
            'content-type': 'application/json; charset=UTF-8',
         },
         config: {
            transitional: {
               silentJSONParsing: true,
               forcedJSONParsing: true,
               clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: {
               Accept: 'application/json',
               Authorization: 'Bearer 88352ca3-b340-43df-8ab0-daeb76b5f443',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account/portfolio/history',
            params: {
               timeframe: '1D',
               date_end: '2022-06-09',
               extended_hours: true,
               period: '1W',
               date_start: '',
            },
         },
         request: {},
      }

      const callback = async (
         dataHistory: number[][],
         actualEquity: number,
         profitLoss: number,
         profitLossPer: number
      ) => {
         expect(dataHistory).toEqual([
            [1654214400000, 99943.6],
            [1654473600000, 99947.4],
            [1654560000000, 99960.25],
            [1654646400000, 99956.5],
            [1654819200000, 99956.5],
         ])
      }

      mockAlpaca.onGet('account/portfolio/history').reply(200, resp)

      AlpacaHistory('PAPER', '3M', callback, () => {
         console.log('Failure')
      })
   })

   test('AlpacaHistory with 1Y', () => {
      const resp = {
         data: {
            timestamp: [1654300800, 1654560000, 1654646400, 1654732800, 1654819200],
            equity: [99943.6, 99947.4, 99960.25, 99956.5, 99956.5],
            profit_loss: [-29.15, 3.8, 12.85, -3.75, 0],
            profit_loss_pct: [
               0, 0.0000380214440945, 0.00016659395899292607, 0.00012907279705758512,
               0.00012907279705758512,
            ],
            base_value: 0,
            timeframe: '1D',
         },
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '305',
            'content-type': 'application/json; charset=UTF-8',
         },
         config: {
            transitional: {
               silentJSONParsing: true,
               forcedJSONParsing: true,
               clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: {
               Accept: 'application/json',
               Authorization: 'Bearer 88352ca3-b340-43df-8ab0-daeb76b5f443',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account/portfolio/history',
            params: {
               timeframe: '1D',
               date_end: '2022-06-09',
               extended_hours: true,
               period: '1W',
               date_start: '',
            },
         },
         request: {},
      }

      const callback = async (
         dataHistory: number[][],
         actualEquity: number,
         profitLoss: number,
         profitLossPer: number
      ) => {
         expect(dataHistory).toEqual([
            [1654214400000, 99943.6],
            [1654473600000, 99947.4],
            [1654560000000, 99960.25],
            [1654646400000, 99956.5],
            [1654819200000, 99956.5],
         ])
      }

      mockAlpaca.onGet('account/portfolio/history').reply(200, resp)

      AlpacaHistory('PAPER', '1Y', callback, () => {
         console.log('Failure')
      })
   })

   test('AlpacaHistory with YDT', () => {
      const resp = {
         data: {
            timestamp: [1654300800, 1654560000, 1654646400, 1654732800, 1654819200],
            equity: [99943.6, 99947.4, 99960.25, 99956.5, 99956.5],
            profit_loss: [-29.15, 3.8, 12.85, -3.75, 0],
            profit_loss_pct: [
               0, 0.0000380214440945, 0.00016659395899292607, 0.00012907279705758512,
               0.00012907279705758512,
            ],
            base_value: 0,
            timeframe: '1D',
         },
         status: 200,
         statusText: 'OK',
         headers: {
            'content-length': '305',
            'content-type': 'application/json; charset=UTF-8',
         },
         config: {
            transitional: {
               silentJSONParsing: true,
               forcedJSONParsing: true,
               clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: {
               Accept: 'application/json',
               Authorization: 'Bearer 88352ca3-b340-43df-8ab0-daeb76b5f443',
            },
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account/portfolio/history',
            params: {
               timeframe: '1D',
               date_end: '2022-06-09',
               extended_hours: true,
               period: '1W',
               date_start: '',
            },
         },
         request: {},
      }

      const callback = async (
         dataHistory: number[][],
         actualEquity: number,
         profitLoss: number,
         profitLossPer: number
      ) => {
         expect(dataHistory).toEqual([
            [1654214400000, 99943.6],
            [1654473600000, 99947.4],
            [1654560000000, 99960.25],
            [1654646400000, 99956.5],
            [1654819200000, 99956.5],
         ])
      }

      mockAlpaca.onGet('account/portfolio/history').reply(200, resp)

      AlpacaHistory('PAPER', 'YDT', callback, () => {
         console.log('Failure')
      })
   })

   test('getFinalEquityWhitouthZero', () => {
      const resp = getFinalEquityWhitouthZero(
         [99947.4, 99960.25, 99956.5, 99956.5],
         99947.4
      )
      expect(resp).toEqual([99947.4, 99960.25, 99956.5, 99956.5])
   })

   test('getFinalTimestampMiliseconds', () => {
      const resp = getFinalTimestampMiliseconds(
         [1654560000, 1654646400, 1654732800, 1654819200],
         '1W'
      )
      expect(resp).toEqual([1654473600, 1654560000, 1654646400, 1654819200])
   })

   test('getActualEquity', () => {
      const resp = getActualEquity([99947.4, 99960.25, 99956.5, 99956.5])
      expect(resp).toEqual(99956.5)
   })

   test('getFirstEquityValid', () => {
      const resp = getFirstEquityValid([99947.4, 99960.25, 99956.5, 99956.5])
      expect(resp).toEqual(99947.4)
   })
})
