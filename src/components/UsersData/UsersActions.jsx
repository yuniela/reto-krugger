import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RegisterAPI from "../../helpers/RegisterAPI";


const columns = [
    { field: 'name', headerName: 'Nombres', width: '180'},
    { field: 'lastName', headerName: 'Apellidos', width: '180'},
    { field: 'vaccineState', headerName: 'Vacunado', width: '140'},
    { field: 'covidVaccine', headerName: 'Tipo de Vacuna', width: '240'},
    { field: 'vaccineDate', headerName: 'Fecha de Vacunación', width: '220'}
]
const UserList = () => {
    
    const api = new RegisterAPI();

    function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
        
    }

    
    const [tableData, setTableData] = useState([])
    const [rows, setRows] = useState(tableData);

    useEffect(() => {
        api.getUsers()
        .then((data) => setTableData(data))
    
    }, [])
    const [deletedRows, setDeletedRows] = useState([]);


  return (
    <div style={{ height: '50vh', width: '80%', margin:'4rem auto' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) =>  generateRandom()}
        autoHeight
        pageSize={5}
        onSelectionModelChange={({ selectionModel }) => {
            const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
            const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
            setDeletedRows(rowsToDelete);
            console.log(deletedRows);
          }}
      />
      
    </div>
  );
}

export default UserList
