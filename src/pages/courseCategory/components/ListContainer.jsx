import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import { style } from "./style"
import List from "./List"
import ListAction from "./ListAction"
import { mockData } from "./data"
import getRequest from "../../../request/getRequest";
import toast from "react-hot-toast";

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

  const columns = [
    { field: "categoryid", headerName: "ID" },
    {
      field: "categoryname",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "categorylevel",
      headerName: "Level",
      flex: 1,
    },
    {
      field: "categoryparentid",
      headerName: "Parent ID",
      flex: 1,
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: 1,
    },
    {
      field: "operation",
      headerName: "Operation",
      flex: 1,
      renderCell: () => {
        return (
          <>
            <Box>
              <Button variant="text">Update</Button>
            </Box>
            <Box>
              <Button variant="text" onClick={(e) => {
                const categoryId = e.target.parentNode.parentNode.parentNode.getAttribute("data-id")
                const getCourseCategory = async () => {
                  let result = await getRequest(
                    `/courseCategories/parent/${categoryId}/${pageSearch.page}/${pageSearch.pageSize}`
                  );
                  if (result.status === 1) {
                    setPageData(result.data);
                  }else{
                    toast.error("This category doesn't have subcategory");
                  }
                  
                }
                getCourseCategory()
              }}>Subcategory</Button>
            </Box>
          </>
        )
      },
    },
  ]

  useEffect(() => {
    const getCourseCategory = async () => {
      let result = await getRequest(
        `/courseCategories/parent/0/${pageSearch.page}/${pageSearch.pageSize}`
      );
      if (result.status === 1) {
        setPageData(result.data);
      } else {
        setPageData(mockData)
      }
      
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
