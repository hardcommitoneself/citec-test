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
   Button,
   FormControl,
   InputLabel,
   MenuItem,
   Modal,
   Select,
   SelectChangeEvent,
} from '@mui/material'
import { Icon } from 'assets/icons'
import { useSelectUniverse } from 'features/utils/hooks'
import { useState } from 'react'
import { useAppSelector } from 'store/hooks'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
}

export const ButtonChangeBenchmark = () => {
   const [open, setOpen] = useState(false)
   const { handleSelectBenckmark } = useSelectUniverse()

   const listBenchmarks = useAppSelector(
      (state) => state.static_data.rebalance.benchmarks
   )
   const activeBenchmark = useAppSelector((state) => state.rebalance.benchmark)

   const nameBenchmarkSelected = listBenchmarks.find(
      (benchmark) => benchmark.ticker === activeBenchmark
   )

   const [_benchmark, setLocalBenchmark] = useState(nameBenchmarkSelected?.key || '')

   const _handleSelectBenchmark = ({ target }: SelectChangeEvent) => {
      const benchmark = target.value
      setLocalBenchmark(benchmark)
   }

   const handleSaveBenchmark = () => {
      if (_benchmark) handleSelectBenckmark(_benchmark)

      setOpen(false)
   }

   return (
      <div className="flex">
         <h1 className="text-[#0baca9] font-bold text-[26px]">
            Benchmark: {nameBenchmarkSelected?.description || 'S&P500'}
         </h1>
         <button
            className="mx-4"
            onClick={() => setOpen(true)}
            data-testid="edit-benchmark"
         >
            <Icon.Edit />
         </button>

         <Modal
            open={open}
            onClose={(_, reason) => {
               if (reason !== 'backdropClick') setOpen(false)
            }}
         >
            <div className="absolute left-1/2 top-1/2 -translate-y-2/4 -translate-x-2/4 bg-[#F4F6FA] rounded-md p-4 w-[350px]">
               <h3 className="text-[#2d405a] font-semibold text-2xl">
                  Select benchmark
               </h3>

               <FormControl
                  variant="filled"
                  sx={{ width: '100%', marginY: 3, borderBottom: 0 }}
                  className="shadow-xl"
               >
                  <InputLabel id="demo-simple-select-filled-label">
                     Benchmark
                  </InputLabel>
                  <Select
                     value={_benchmark}
                     onChange={_handleSelectBenchmark}
                     className="border-r-4"
                     disableUnderline
                     MenuProps={MenuProps}
                  >
                     {listBenchmarks.map(({ description, key }) => (
                        <MenuItem key={key} value={key}>
                           {description}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>

               <div className="flex justify-end">
                  <div className="grid grid-cols-2 gap-3">
                     <Button
                        color="secondary"
                        className="p-2 !min-w-[80px]"
                        onClick={() => setOpen(false)}
                     >
                        Cancel
                     </Button>
                     <Button
                        variant="save"
                        className="p-2 !min-w-[80px]"
                        onClick={handleSaveBenchmark}
                        disabled={!_benchmark}
                     >
                        Save
                     </Button>
                  </div>
               </div>
            </div>
         </Modal>
      </div>
   )
}
