import React from "react"
import { Box } from "@mui/material"
import Header from "../../components/header"
import ListContainer from "./components/ListContainer"

const CourseCategory = () => {
  return (
    <>
      <Box m="20px">
        <Header title="Course category" />
        <ListContainer />
      </Box>
    </>
  )
}
export default CourseCategory
