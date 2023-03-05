import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ModuleRegistry,
} from '@ag-grid-community/core'
import '@ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import '@ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model'
import { useCallback, useEffect, useState } from 'react'
import { Card } from 'scryfall-sdk'
import { CardService } from '../services/card.service'

import { AgGridReact } from '@ag-grid-community/react' // the AG Grid React Component

ModuleRegistry.registerModules([ServerSideRowModelModule])

const scryfallDatasource: IServerSideDatasource = {
  getRows(params: IServerSideGetRowsParams<any>): void {
    CardService.getCards(
      params.request.startRow,
      params.request.endRow
    ).subscribe((response) => {
      params.success({ rowData: response })
    })
  },
  destroy(): void {},
}

const colDefs: ColDef[] = [
  { field: 'name', filter: true },
  { field: 'set', filter: true },
  { field: 'type_line', headerName: 'Type' },
]

const gridOptions: GridOptions = {
  // Scryfall API requests debouce of 50-100 ms
  blockLoadDebounceMillis: 100,
  // Scryfall API requests max 75 per request
  cacheBlockSize: 50,
  columnDefs: colDefs,
  defaultColDef: {
    sortable: true,
  },
  animateRows: true,
  rowModelType: 'serverSide',
  rowSelection: 'multiple',
  serverSideDatasource: scryfallDatasource,
}

export const CardManager = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [rowData, setRowData] = useState([] as Card[]) // Set rowData to Array of Objects, one Object per Row

  // Example load data from sever
  useEffect(() => {
    CardService.getCards().subscribe((cards) => {
      console.log(cards)
      setRowData(cards)
    })
  }, [])

  const onGridReady = useCallback((gridReadyEvent: GridReadyEvent) => {
    setGridApi(gridReadyEvent.api)
  }, [])

  return (
    <div
      className="ag-theme-alpine full-page-table"
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        // rowData={rowData} // Row Data for Rows
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      />
    </div>
  )
}
