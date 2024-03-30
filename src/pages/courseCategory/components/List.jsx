import React from 'react'

import { DataGrid } from '@mui/x-data-grid'

const List = (props) => {
  return (
    <>
      <DataGrid
        checkboxSelection
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode="server"
        rowCount={props.pageData.total}
        columns={props.columns}
        rows={props.pageData.items}
        getRowId={(row) => row.categoryid}
        onPaginationModelChange={props.setPaginationModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          props.setRowSelectionModel(newRowSelectionModel)
        }}
      />
    </>
  )
}

export default List
