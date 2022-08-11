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

import {
   UseColumnOrderInstanceProps,
   UseColumnOrderState,
   UseExpandedHooks,
   UseExpandedInstanceProps,
   UseExpandedOptions,
   UseExpandedRowProps,
   UseExpandedState,
   UseFiltersColumnOptions,
   UseFiltersColumnProps,
   UseFiltersInstanceProps,
   UseFiltersOptions,
   UseFiltersState,
   UseGlobalFiltersColumnOptions,
   UseGlobalFiltersInstanceProps,
   UseGlobalFiltersOptions,
   UseGlobalFiltersState,
   UseGroupByCellProps,
   UseGroupByColumnOptions,
   UseGroupByColumnProps,
   UseGroupByHooks,
   UseGroupByInstanceProps,
   UseGroupByOptions,
   UseGroupByRowProps,
   UseGroupByState,
   UsePaginationInstanceProps,
   UsePaginationOptions,
   UsePaginationState,
   UseResizeColumnsColumnOptions,
   UseResizeColumnsColumnProps,
   UseResizeColumnsOptions,
   UseResizeColumnsState,
   UseRowSelectHooks,
   UseRowSelectInstanceProps,
   UseRowSelectOptions,
   UseRowSelectRowProps,
   UseRowSelectState,
   UseRowStateCellProps,
   UseRowStateInstanceProps,
   UseRowStateOptions,
   UseRowStateRowProps,
   UseRowStateState,
   UseSortByColumnOptions,
   UseSortByColumnProps,
   UseSortByHooks,
   UseSortByInstanceProps,
   UseSortByOptions,
   UseSortByState,
} from 'react-table'

declare module 'react-table' {
   // take this file as-is, or comment out the sections that don't apply to your plugin configuration

   export interface TableOptions<
      D extends Record<string, unknown>
   > extends UseExpandedOptions<D>,
         UseFiltersOptions<D>,
         UseGlobalFiltersOptions<D>,
         UseGroupByOptions<D>,
         UsePaginationOptions<D>,
         UseResizeColumnsOptions<D>,
         UseRowSelectOptions<D>,
         UseRowStateOptions<D>,
         UseSortByOptions<D>,
         // note that having Record here allows you to add anything to the options, this matches the spirit of the
         // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
         // feature set, this is a safe default.
         Record<string, any> {}

   export interface Hooks<
      D extends Record<string, unknown> = Record<string, unknown>
   > extends UseExpandedHooks<D>,
         UseGroupByHooks<D>,
         UseRowSelectHooks<D>,
         UseSortByHooks<D> {}

   export interface TableInstance<
      D extends Record<string, unknown> = Record<string, unknown>
   > extends UseColumnOrderInstanceProps<D>,
         UseExpandedInstanceProps<D>,
         UseFiltersInstanceProps<D>,
         UseGlobalFiltersInstanceProps<D>,
         UseGroupByInstanceProps<D>,
         UsePaginationInstanceProps<D>,
         UseRowSelectInstanceProps<D>,
         UseRowStateInstanceProps<D>,
         UseSortByInstanceProps<D> {}

   export interface TableState<
      D extends Record<string, unknown> = Record<string, unknown>
   > extends UseColumnOrderState<D>,
         UseExpandedState<D>,
         UseFiltersState<D>,
         UseGlobalFiltersState<D>,
         UseGroupByState<D>,
         UsePaginationState<D>,
         UseResizeColumnsState<D>,
         UseRowSelectState<D>,
         UseRowStateState<D>,
         UseSortByState<D> {}

   export interface ColumnInterface<
      D extends Record<string, unknown> = Record<string, unknown>
   > extends UseFiltersColumnOptions<D>,
         UseGlobalFiltersColumnOptions<D>,
         UseGroupByColumnOptions<D>,
         UseResizeColumnsColumnOptions<D>,
         UseSortByColumnOptions<D> {}

   export interface ColumnInstance<
      D extends Record<string, unknown> = Record<string, unknown>
   > extends UseFiltersColumnProps<D>,
         UseGroupByColumnProps<D>,
         UseResizeColumnsColumnProps<D>,
         UseSortByColumnProps<D> {}

   export interface Cell<
      D extends Record<string, unknown> = Record<string, unknown>,
      V = any
   > extends UseGroupByCellProps<D>,
         UseRowStateCellProps<D> {}

   export interface Row<D extends Record<string, unknown> = Record<string, unknown>>
      extends UseExpandedRowProps<D>,
         UseGroupByRowProps<D>,
         UseRowSelectRowProps<D>,
         UseRowStateRowProps<D> {}
}
