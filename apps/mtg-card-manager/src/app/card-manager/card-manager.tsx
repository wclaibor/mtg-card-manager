import styles from './card-manager.module.scss'

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
      params.request.endRow,
    ).subscribe(response => {
      params.success({ rowData: response })
    })
  },
  destroy(): void {
    console.log('should do some cleanup')
  },
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

/* eslint-disable-next-line */
export interface CardManagerProps {}

export function CardManager(props: CardManagerProps) {
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [rowData, setRowData] = useState([] as Card[]) // Set rowData to Array of Objects, one Object per Row

  // Example load data from sever
  useEffect(() => {
    CardService.testApi()

    CardService.getCards().subscribe(cards => {
      console.log(cards)
      setRowData(cards)
    })
  }, [])

  const onGridReady = useCallback((gridReadyEvent: GridReadyEvent) => {
    setGridApi(gridReadyEvent.api)
  }, [])

  return (
    <div className={`${styles['container']} ag-theme-alpine full-page-table`}>
      <AgGridReact
        // rowData={rowData} // Row Data for Rows
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      />
    </div>
  )
}

export default CardManager
