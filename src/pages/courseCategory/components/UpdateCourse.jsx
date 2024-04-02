import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        // 确保使用正确的 API 端点和移除或添加认证头部
        const response = await axios.get(`http://localhost:9000/api/courses/${id}`);
        if (response.status === 200) {
          formik.setValues(response.data);
        } else {
          throw new Error('Course data fetching failed');
        }
      } catch (error) {
        console.error('Failed to fetch course data:', error);
        toast.error('Failed to fetch course data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Must be 3 characters or more')
      .max(30, 'Must be 30 characters or less'),
    level: Yup.string(),
    parentId: Yup.string(),
    remark: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      level: '',
      parentId: '',
      remark: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {/* TextFields for form */}
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="level"
            label="Level"
            name="level"
            autoComplete="level"
            autoFocus
            {...formik.getFieldProps('level')}
            error={formik.touched.level && Boolean(formik.errors.level)}
            helperText={formik.touched.level && formik.errors.level}
          />
          <TextField
              margin="normal"
              fullWidth
              id="parentId"
              label="ParentId"
              name="parentId"
              autoFocus
              {...formik.getFieldProps('parentId')}
              error={formik.touched.parentId && Boolean(formik.errors.parentId)}
              helperText={formik.touched.parentId && formik.errors.parentId}
            />

          <TextField
              margin="normal"
              fullWidth
              id="remark"
              label="remark"
              name="remark"
              autoComplete="remark"
              autoFocus
              {...formik.getFieldProps('remark')}
              error={formik.touched.remark && Boolean(formik.errors.remark)}
              helperText={formik.touched.remark && formik.errors.remark}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Update Course
          </Button>
        </>
      )}
    </Box>
  );
};

export default UpdateCourse;
