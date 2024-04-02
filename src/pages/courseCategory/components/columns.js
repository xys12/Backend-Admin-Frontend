import { Box, Button } from "@mui/material"
import React from "react"
import { useNavigate } from 'react-router-dom';

export const useColumns = () => {
  const navigate = useNavigate();

  const handleUpdate=(id)=>()=>{
    navigate(`/courseCategory/UpdateCourse/${id}`);
   };


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
    renderCell: (params) => {
      return (
        <Box>
          <Button variant="text" onClick={() => navigate(`/courseCategory/UpdateCourse/${params.id}`)}>Update</Button>
        </Box>
      )
    },
  },
]
return columns;
}
