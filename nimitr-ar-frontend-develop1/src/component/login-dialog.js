import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Alert,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./register-form";
import { NimitrTextField } from "./ui/text-field";

import loginMutation from "../graphql/mutations/login";

export const LoginDialog = ({ open, handleClose, user, setToken }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const { user, setToken } = useContext(AuthContext);
  const [errorState, setErrorState] = useState(false)

  const [registerPart, setRegisterPart] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleAlertErrorOpen = () => {
    setOpenErrorAlert(true);
  };
  // console.log("LOG", open)
  const handleAlertErrorClose = () => {
    setOpenErrorAlert(false);
  };

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };
  // console.log("LOG", open)
  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const [login] = useMutation(loginMutation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { username, password },
      });
      if (data?.login) {
        // const decoded = await jwtDecode(data?.login)
        // const { data: dataProject } = await projectData.refetch({ _id: decoded?.project })
        setToken(data.login);
        // setProject(dataProject)
        handleClose();
        navigate("/project");
      }
    } catch (err) {
      console.error(err);
      setErrorState(true)
      setErrorMessage(err?.message)
      handleAlertErrorOpen()
    }
  };

  const handleChangeRegisterPart = async () => {
    setRegisterPart(true);
  };
  const handleCloseDialog = () => {
    setErrorState(false)
    handleClose();
    setRegisterPart(false);
  };

  return (<>
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        sx: { borderRadius: "16px", width: "500px" },
      }}
    >
      {!registerPart ? (
        <Grid>
          <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
            เข้าสู่ระบบ
          </DialogTitle>{" "}
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid>
                <Typography variant="caption">ชื่อผู้ใช้</Typography>
                <NimitrTextField
                  error={errorState}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  placeholder="ชื่อผู้ใช้"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setErrorState(false)
                  }}
                  autoFocus
                  sx={{
                    "&.MuiFormControl-root": {
                      mt: 0,
                    },
                  }}
                />
              </Grid>
              <Grid sx={{ mt: 2 }}>
                <Typography variant="caption">รหัสผ่าน</Typography>
                <NimitrTextField
                  error={errorState}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="รหัสผ่าน"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrorState(false)
                  }}
                  autoComplete="current-password"
                  sx={{
                    "&.MuiFormControl-root": {
                      mt: 0,
                    },
                  }}
                />
              </Grid>{" "}
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ my: 3 }}
              >
                เข้าสู่ระบบ
              </Button>
            </Box>
          </DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignContent="center"
            sx={{ py: 2 }}
          >
            <Typography>ยังไม่เป็นสมาชิก</Typography>
            <Button
              variant="text"
              sx={{ p: 0, ml: 1 }}
              onClick={handleChangeRegisterPart}
            >
              สมัครสมาชิก
            </Button>
          </Grid>
        </Grid>
      ) : (
        <RegisterForm handleOnCloseDialog={handleCloseDialog} handleStatusOpen={handleAlertOpen} setErrorMessage={setErrorMessage} handleAlertErrorOpen={handleAlertErrorOpen} />
      )}
    </Dialog>
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}
      sx={{
        width: {
          lg: '60%', xs: '80%', sm: '60%'
        },
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <Alert variant="filled" severity="success" sx={{ width: '100%', }}>
        Create Account Success
      </Alert>
    </Snackbar>
    <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={handleAlertErrorClose}
      sx={{
        width: {
          lg: '60%', xs: '80%', sm: '60%'
        },
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <Alert variant="filled" severity="error" sx={{ width: '100%', }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  </>

  );
};
