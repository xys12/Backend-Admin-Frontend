import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { columns } from './columns'
import { style } from './style'
import List from './List'
import ListAction from './ListAction'
import { mockData } from './data'

const ListContainer = () => {
  const [pageSearch, setPageSearch] = useState({
    pageSize: 100,
    page: 1,
  })

  const [rowSelectionModel, setRowSelectionModel] = React.useState([])
  const [pageData, setPageData] = useState({ items: [], total: 0 })

  const handlePaginationModel = (e) => {
    setPageSearch((preState) => ({
      ...preState,
      page: e.page + 1,
      pageSize: e.pageSize,
    }))
  }

  useEffect(() => {
    const getCourseCategory = async () => {
      setPageData(mockData)
    }
    getCourseCategory()
  }, [pageSearch])

  return (
    <>
      <Box m="40px 0 0 0" height="75vh" sx={style}>
        <ListAction
          rowSelectionModel={rowSelectionModel}
          pageSearch={pageSearch}
          setPageSearch={setPageSearch}
        />
        <List
          columns={columns}
          pageData={pageData}
          setPaginationModel={handlePaginationModel}
          setRowSelectionModel={setRowSelectionModel}
        />
      </Box>
    </>
  )
}
export default ListContainer
