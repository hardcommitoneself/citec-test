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

import * as XLSX from 'xlsx'
import { FileUploader } from 'react-drag-drop-files'
import { FC, useEffect, useState } from 'react'
import { Icon } from 'assets/icons'
import { PortfolioLoaded } from 'features/utils/interfaces/portfolio-loaded'

interface BtnUploadExcelProps {
   setExcelData: React.Dispatch<React.SetStateAction<[] | PortfolioLoaded[]>>
   className?: string
}

const notes = require('assets/img/notes.png')

export const BtnUploadExcel: FC<BtnUploadExcelProps> = ({ setExcelData }) => {
   const [excelFile, setExcelFile] = useState<unknown>(null)
   const [excelFileError, setExcelFileError] = useState<string | null>(null)

   const handleFileChange = (file: File) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
         setExcelFileError(null)
         setExcelFile(e?.target?.result)
      }
   }

   const handleAddNewsPositions = () => {
      if (excelFile) {
         const workbook = XLSX.read(excelFile, { type: 'buffer' })
         const worksheetName = workbook.SheetNames[0]
         const worksheet = workbook.Sheets[worksheetName]
         const data = XLSX.utils.sheet_to_json(worksheet) as PortfolioLoaded[]
         const purgedData = data.map((position) => {
            const outstanding_balance = isNaN(position.outstanding_balance as number)
               ? 0
               : position.outstanding_balance
            const unrealized_capital_gains = isNaN(
               position.unrealized_capital_gains as number
            )
               ? 0
               : position.unrealized_capital_gains
            return {
               ...position,
               outstanding_balance,
               unrealized_capital_gains,
            }
         })

         setExcelData((prevState) => [...prevState, ...purgedData])
      } else {
         setExcelData([])
      }
   }

   useEffect(() => {
      handleAddNewsPositions()
   }, [excelFile])

   return (
      <aside>
         <h1>Add positions from an excel</h1>
         <img src={notes} alt="" />

         <div className="drop_area cursor-pointer" data-testid="btn-submit">
            <FileUploader
               handleChange={handleFileChange}
               name="file"
               types={['XLSX']}
               onTypeError={setExcelFileError}
            >
               <h1>
                  Drag and drop a file
                  <span>Limit 200MB per file</span>
               </h1>
               <button data-testid="upInput">Browse files</button>
            </FileUploader>
         </div>

         <a href="./assets/MyPortfolioTemplate.xlsx" className="mr-2">
            <span className="mr-2">Download template</span> <Icon.Download />
         </a>
         {!!excelFileError && (
            <button className="error_button_edit"> {excelFileError}</button>
         )}
      </aside>
   )
}
