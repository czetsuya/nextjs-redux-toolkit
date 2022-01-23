import React, {useState} from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Snackbar,
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
import Footer from "../../components/Footer/Footer";
import {useGetUsersQuery} from "../../services/UserService";


const EMPTY_DIALOG = {
  open: false,
  text: '',
  title: '',
  onConfirm: () => null,
  onCancel: () => null
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
  const {data, error, isLoading} = useGetUsersQuery();
  const {users, count} = data;
  const hasUsers = count > 0;

  // useEffect(() => {
  //   dispatch(retrieveList({offset: offset * limit, limit}));
  // }, [dispatch, offset, limit]);

  // useEffect(() => {
  //   if (status.deleted) {
  //     resetDialog();
  //     dispatch(retrieveList({offset: offset * limit, limit}));
  //     setAlert({
  //       open: true,
  //       text: `Successfully deleted user: ${storeUser.id}`,
  //     });
  //   }
  // }, [status, offset, limit, dispatch]);

  const handleDeleteUser = ({id}) => () => {
    // dispatch(deleteUser({userId: id}));
  };

  const resetDialog = () => {
    setDialog(EMPTY_DIALOG);
  }

  const resetAlert = () => {
    // setAlert(EMPTY_ALERT);
    // dispatch(clearUserStatus());
    // dispatch(clearUser());
  };

  const openDialog = (user) => () => {
    // setDialog({
    //   open: true,
    //   title: 'Delete user',
    //   text: `Delete user: ${user.id}?`,
    //   onConfirm: handleDeleteUser(user),
    //   onCancel: () => resetDialog()
    // });
  };

  const editUser = ({id}) => () => {
    router.push(`/users/${id}`);
  }

  return (
      <React.Fragment>
        {
          isLoading ?
              <div>Loading</div> :
              <Container maxWidth={"md"} fixed>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={6} align="right">
                          <Link href="/users/new">
                            <Button variant="outlined" color="primary">
                              <PersonAdd/>
                            </Button>
                          </Link>
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
                                    <Button onClick={openDialog(user)}>
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
        }
      </React.Fragment>
  );
}

export default Users;