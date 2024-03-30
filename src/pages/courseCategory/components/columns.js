import { Box, Button } from "@mui/material"

export const columns = [
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
        <Box>
          <Button variant="text">Update</Button>
        </Box>
      )
    },
  },
]
