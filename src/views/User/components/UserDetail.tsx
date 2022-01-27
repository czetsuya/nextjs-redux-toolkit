import React, {useState} from 'react';
import {Alert, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import * as yup from 'yup';
import {useFormik} from "formik";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import {NextPage} from "next";
import Footer from "../../../components/Footer/Footer";
import {useCreateUserMutation, useGetUserQuery, useUpdateUserMutation} from "../../../services/UserService";
import {UserPayload} from "../../../services/types/UserPayload";
import moment from "moment";
import {AppProps} from "next/app";

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

type UserDetailProps = {
  toggleEditDrawer: () => void
}

const UserDetail: NextPage = (props: AppProps<UserDetailProps>) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [birthDate, setBirthDate] = useState(null);
  const [pageError, setPageError] = useState(null);
  const {id}: { id: string } = router.query;
  const {toggleEditDrawer} = props;

  const {
    data: user,
    isLoading: isUserFetching
  } = useGetUserQuery(id, {skip: !id || isNaN(id)});

  const [createUser, {
    isLoading: isUserCreating,
    isSuccess: isUserCreated
  }] = useCreateUserMutation();
  const [updateUser, {isLoading: isUserUpdating}] = useUpdateUserMutation();


  const onSubmit = async (values: UserPayload) => {

    console.log('submit')
    let newValues = {
      ...values,
      birthDate: birthDate.toISOString()
    }

    try {
      if (user && user.id) {
        newValues.id = user.id;
        await updateUser(newValues).unwrap();

      } else {
        await createUser(newValues).unwrap();
      }
      console.log('fin')
    } catch (error) {
      setPageError(error);

    } finally {
      console.log("finally");
      toggleEditDrawer(false);
    }
  }

  const renderForm = () => {

    if (user && user !== null) {
      console.log('setFormValues=', user);
      setBirthDate(moment(user.birthDate));

      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
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
            <Box>
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
            </Box>
            <Footer></Footer>
          </Box>
        </Container>
    );
  }

  const formik = useFormik({
    initialValues: INITIAL_USER,
    validationSchema: validationSchema,
    onSubmit
  });

  console.log('isUserCreated', isUserCreated);
  if (isUserCreated) {
    toggleEditDrawer(false);
  }

  return renderForm();
}

export default UserDetail;