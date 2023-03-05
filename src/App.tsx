import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from '@ag-grid-community/react'; // the AG Grid React Component

import '@ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import '@ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './App.css';
import { CellClickedEvent, ModuleRegistry, ColDef } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CardService } from './services/card.service';
import { Card } from 'scryfall-sdk'

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const App = () => {

//  const gridRef = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState([] as Card[]); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs] = useState([
   {field: 'name', filter: true},
   {field: 'set', filter: true},
   {field: 'type_line', headerName: "Type"}
 ] as ColDef[]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true
   }), []);

 // Example of consuming Grid Event
 const cellClickedListener = useCallback( (event: CellClickedEvent) => {
   console.log('cellClicked', event);
 }, []);

 // Example load data from sever
 useEffect(() => {
    CardService.getCards().subscribe(cards => {
      console.log(cards)
      setRowData(cards)
    })
 }, []);

 // Example using Grid's API
//  const buttonListener = useCallback( () => {
//    gridRef.current?.api?.deselectAll();
//  }, []);

 return (
   <div className="app">

     {/* Example using Grid's API */}
     {/* <button onClick={buttonListener}>Push Me</button> */}

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine full-page-table" style={{width: '100%', height: '100%'}}>

       <AgGridReact

           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
   </div>
 );
};

export default App;