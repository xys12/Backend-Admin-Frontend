import React, { useState } from "react"
import { Box, Button, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AlterDialog from "../../../components/alterDialog"
import deleteRequest from "../../../request/delRequest"

import toast from "react-hot-toast"
const ListAction = (rowSelectionModel, pageSearch, setPageSearch) => {
  const [alertMessage, setAlertMessage] = useState("")
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  function handleAddCategory() {
    navigate()
  }

  function handleDelete() {
    if (rowSelectionModel.length === 0) {
      setAlertMessage("Please select items")
      setOpen(true)
      return
    }
    setAlertMessage("Are you sure to delete these items?")
    setOpen(true)
  }

  const handleDialogClose = async (data) => {
    setOpen(false)
    if (!data.isOk || rowSelectionModel.length === 0) {
      return
    }

    let ids = rowSelectionModel.join(",")
    let result = await deleteRequest(`/courseCategory/${ids}`)
    if (result.status === 1) {
      toast.success("delete success!")
    } else {
      toast.success("delete fail!")
    }

    setPageSearch({ page: 1, pageSize: pageSearch.pageSize })
  }
  return (
    <>
      <Box sx={{ mb: "15px" }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleAddCategory}>
            Add Category
          </Button>
          <Button color="secondary" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Box>
      <AlterDialog
        title="Warning"
        alertType="warning"
        open={open}
        onClose={handleDialogClose}
      >
        {alertMessage}
      </AlterDialog>
    </>
  )
}
export default ListAction
