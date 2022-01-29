import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import * as yup from 'yup';
import {useFormik} from "formik";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import {NextPage} from "next";
import Footer from "../../../components/Footer/Footer";
import {useCreateUserMutation, useUpdateUserMutation} from "../../../services/UserService";
import {UserType} from "../../../services/types/UserType";
import {AppProps} from "next/app";
import {selectUser} from "../../../services/slices/UserSlice";
import moment from "moment";

const validationSchema = yup.object({
  email: yup
  .string()
  .trim()
  .email('Please enter a valid email address')
  .required('Email is required.'),
  firstName: yup
  .string()
  .required('Please specify your first name'),
  lastName: yup
  .string()
  .required('Please specify your first name'),
  birthDate: yup
  .date()
});

const INITIAL_USER = {
  firstName: '',
  lastName: '',
  email: ''
}

const UserDetail: NextPage = ({toggleEditDrawer}: AppProps) => {

  const [birthDate, setBirthDate] = useState(null);
  const [pageError, setPageError] = useState(null);
  const user = useSelector(selectUser);

  const [createUser, {
    isLoading: isUserCreating,
    isSuccess: isUserCreated
  }] = useCreateUserMutation();

  // you can get the detailed user if really needed
  // const {
  //   data: user,
  //   isLoading: isUserLoading
  // } = useGetUserQuery(user.id);

  const [updateUser, {isLoading: isUserUpdating}] = useUpdateUserMutation();

  const onSubmit = (values: UserType) => {

    let newValues = {
      ...values,
      birthDate: birthDate.toISOString()
    }

    try {
      if (user && user.id) {
        newValues.id = user.id;
        updateUser(newValues).unwrap();

      } else {
        createUser(newValues).unwrap();
      }

    } catch (error) {
      setPageError(error);

    } finally {
      toggleEditDrawer(false)();
    }
  }

  const formik = useFormik({
    initialValues: INITIAL_USER,
    validationSchema: validationSchema,
    onSubmit
  });

  useEffect(() => {
    if (user && user !== null) {
      setBirthDate(moment(user.birthDate));

      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });

    } else {
      setBirthDate(null);
      formik.resetForm(INITIAL_USER);
    }
  }, [user]);

  const renderForm = () => {

    return (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                Enter your email
              </Typography>
              <TextField
                  label="Email *"
                  variant="outlined"
                  name={'email'}
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                Enter your firstname
              </Typography>
              <TextField
                  label="Firstname *"
                  variant="outlined"
                  name={'firstName'}
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                Enter your lastName
              </Typography>
              <TextField
                  label="Lastname *"
                  variant="outlined"
                  name={'lastName'}
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                Enter your birthdate
              </Typography>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Birthdate"
                    value={birthDate}
                    onChange={(newValue) => {
                      setBirthDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} variant={"outlined"} fullWidth required/>}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Fields that are marked with * sign are required.
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      type={"submit"}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="large" variant="contained" color="secondary" onClick={toggleEditDrawer(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
    );
  }

  return (
      <Container maxWidth={"md"}>
        <Box sx={{margin: 2}}>
          {pageError && <Alert severity="error">{pageError}</Alert>}

          <Box marginBottom={4}>
            <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                }}
                gutterBottom
                color={'text.secondary'}
            >
              Create User
            </Typography>
            <Typography color="text.secondary">
              Enter the details
            </Typography>
          </Box>
        </Box>
        {renderForm()}
        <Footer></Footer>
      </Container>
  );
}

export default UserDetail;