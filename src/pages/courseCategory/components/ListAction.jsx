import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlterDialog from "../../../components/alterDialog";
import deleteRequest from "../../../request/delRequest";
import toast from "react-hot-toast";

const ListAction = ({ rowSelectionModel, pageSearch, setPageSearch }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleAddCategory = () => {
    navigate("/courseCategory/AddCourse");
  };

  const handleDelete = async () => {
    if (rowSelectionModel.length === 0) {
      setAlertMessage("Please select items");
      setOpen(true);
      return;
    }
    setAlertMessage("Are you sure to delete these items?");
    setOpen(true);

    if (open) {
      let ids = rowSelectionModel.join(",");
      let result = await deleteRequest(`/courseCategory/${ids}`);
      if (result.status === 1) {
        toast.success("Delete success!");
      } else {
        toast.error("Delete failed!");
      }
      setPageSearch({ page: 1, pageSize: pageSearch.pageSize });
    }
  };

  const handleDialogClose = (data) => {
    setOpen(false);
  };

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
        onConfirm={handleDelete}
      >
        {alertMessage}
      </AlterDialog>
    </>
  );
};

export default ListAction;
