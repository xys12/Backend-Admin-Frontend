import React, { useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../../request/postRequest";
import Header from "../../../components/header";

import MoocDropzone from "../../../components/moocDropzone";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';

export const AddCourse = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
        name: "",
        level: "",
        parentId: "",
        remark: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            level: Yup.string().required('Required'),
            parentId: Yup.string().required('Required'),
            remark: Yup.string().required('Required'),
        }),

        onSubmit: async (values) => {
        let result = await postRequest("/users", {
            name: values.name,
            level: values.level,
            parentId: values.parentId,
            remark: values.remark,
            avatar: avatarData,
        });

        if (result.status == 1) {
            toast.success("add success!");
            formik.resetForm();
            //navigate("/", { replace: true });
        } else {
            toast.error("add failed!");
        }
        },
    });

    const [avatarData, setAvatarData] = useState("");
    const handleAvatarResult = (result) => {
        setAvatarData(result);
    };

    return (
        <Box m="20px">
        <Header
            title="CREATE COURSE"
            // subtitle="Create a New Course Profile"
            // url="/component"
            // urltitle={"CourseList"}
        />
        <form onSubmit={formik.handleSubmit}>
            <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                name="name"
                autoComplete="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="level"
                name="level"
                onChange={formik.handleChange}
                value={formik.values.level}
                error={formik.touched.level && Boolean(formik.errors.level)}
                helperText={formik.touched.password && formik.errors.level}
                autoComplete="text"
                autoFocus
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Parent Id"
                name="parentId"
                onChange={formik.handleChange}
                value={formik.values.parentId}
                error={
                formik.touched.parentId &&
                Boolean(formik.errors.parentId)
                }
                helperText={
                formik.touched.parentId && formik.errors.parentId
                }
                autoComplete="text"
                autoFocus
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Remark"
                name="remark"
                autoComplete="text"
                onChange={formik.handleChange}
                value={formik.values.remark}
                error={formik.touched.remark && Boolean(formik.errors.remark)}
                helperText={formik.touched.remark && formik.errors.remark}
                autoFocus
                sx={{ gridColumn: "span 4" }}
            />

            {/* <MoocDropzone  avatarResult={handleAvatarResult} /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Stack direction="row" spacing={2}>
                <Button type="submit" color="secondary" variant="contained">
                Create New Course
                </Button>
                <Button type="cancle" color="secondary" variant="contained">
                Cancel
                </Button>
            </Stack>
            </Box>
        </form>
        </Box>
    );
    }
    export default AddCourse;