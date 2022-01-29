import React, {useState} from 'react';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from "@mui/material";
import moment from "moment";
import {Delete, Edit, PersonAdd} from "@mui/icons-material";
import {useAppDispatch} from 'services/hooks';

import {useRouter} from "next/router";
import {NextPage} from "next";
import {useDeleteUserMutation, useGetUsersQuery} from "../../services/UserService";
import Footer from "../../components/Footer/Footer";
import UserDetail from "./components/UserDetail";
import {UserType} from "../../services/types/UserType";
import {setUser} from "../../services/slices/UserSlice";

const EMPTY_DIALOG = {
  open: false,
  text: '',
  title: '',
  onConfirm: () => {
  },
  onCancel: () => {
  }
}

const EMPTY_ALERT = {
  open: false,
  text: '',
};

const Users: NextPage = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [dialog, setDialog] = useState(EMPTY_DIALOG);
  const [alert, setAlert] = useState(EMPTY_ALERT);

  const {
    data,
    error,
    isLoading: isUsersLoading,
    isSuccess: isUsersQueried,
    isFetching: isUsersFetching,
    isError: isUsersError
  } = useGetUsersQuery();

  const [deleteUser, {
    data: deletedUser,
    isLoading: isUserDeleting,
    isSuccess: isUserDeleted
  }] = useDeleteUserMutation();

  const drawerBleeding = 56;
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDeleteUser = (userId: number) => async () => {
    try {
      await deleteUser(userId).unwrap();
      setAlert({
        open: true,
        text: `Successfully deleted user: ${userId}`,
      });
      resetDeleteDialog();

    } catch (error) {
      console.log(`Error: Failed deleting user with id ${userId}`);
    }
  };

  const resetDeleteDialog = () => {
    setDialog(EMPTY_DIALOG);
  }

  const openDeleteDialog = (userId: number) => () => {
    setDialog({
      open: true,
      title: 'Delete user',
      text: `Delete user: ${userId}?`,
      onConfirm: handleDeleteUser(userId),
      onCancel: () => resetDeleteDialog()
    });
  }

  const resetAlert = () => {
    setAlert(EMPTY_ALERT);
  }

  const editUser = (user: UserType) => () => {

    setOpenDrawer(true);
    dispatch(setUser(user));
  };

  const toggleEditDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const renderTable = (users: UserType[], count: number) => {
    const hasUsers = count > 0;

    return (
        <React.Fragment>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} align="right">
                    <Button variant="outlined" color="primary" onClick={toggleEditDrawer(true)}>
                      <PersonAdd/>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Birth date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hasUsers ? (
                    users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {moment.utc(user.birthDate).format('MM-DD-YYYY')}
                          </TableCell>
                          <TableCell sx={{textAlign: "right"}}>
                            <ButtonGroup>
                              <Button onClick={editUser(user)}>
                                <Edit/>
                              </Button>
                              <Button onClick={openDeleteDialog(user.id)}>
                                {<Delete/>}
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                      <TableCell colSpan={6}>No users found.</TableCell>
                    </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {/*<TablePagination*/}
                  {/*    component={TableCell}*/}
                  {/*    count={count}*/}
                  {/*    page={offset}*/}
                  {/*    rowsPerPage={limit}*/}
                  {/*    onChangePage={handleChangePage}*/}
                  {/*    onChangeRowsPerPage={handleChangeRowsPerPage}*/}
                  {/*/>*/}
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <SwipeableDrawer
              anchor="bottom"
              open={openDrawer}
              onClose={toggleEditDrawer(false)}
              onOpen={toggleEditDrawer(true)}
              swipeAreaWidth={drawerBleeding}
              disableSwipeToOpen={false}
              ModalProps={{
                keepMounted: true,
              }}
          >
            <UserDetail toggleEditDrawer={toggleEditDrawer}></UserDetail>
          </SwipeableDrawer>
        </React.Fragment>
    );
  }

  const renderBody = () => {
    if (isUsersQueried) {
      const {users, count} = data;

      return (isUsersFetching || isUsersLoading) ?
          <Box sx={{display: 'flex'}}>
            <CircularProgress/>
          </Box> :
          renderTable(users, count)
    }
  }

  const renderError = () => {
    return isUsersError && <Alert severity="error">{error}</Alert>;
  }

  return (
      <Container maxWidth={"md"} fixed>
        {renderError()}
        {renderBody()}
        <Footer></Footer>
        <Dialog
            open={dialog.open}
            onClose={dialog.onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialog.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialog.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={dialog.onCancel}>Disagree</Button>
            <Button onClick={dialog.onConfirm} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={resetAlert}
            message={alert.text}
        />
      </Container>
  );
}

export default Users;