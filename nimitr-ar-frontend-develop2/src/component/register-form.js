import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Divider,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { NimitrTextField } from "./ui/text-field";
import { useMutation } from "@apollo/client"
import RegisterMember from "../graphql/mutations/register"
import SetPassword from "../graphql/mutations/setPassword"
import { useNavigate } from "react-router-dom";


export const RegisterForm = ({ handleOnCloseDialog, handleStatusOpen, setErrorMessage, handleAlertErrorOpen }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const [registerMember] = useMutation(RegisterMember)
  const [setPasswordMember] = useMutation(SetPassword)




  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data: responseCreateMember } = await registerMember({
        variables: {
          username: username,
          firstname: firstname,
          lastname: lastname,
          role: "MEMBER",
          rank: "NOMAL",
          mobile: phoneNumber,
          email: email
        }
      })
      // console.log("MEMBER", responseCreateMember?.createMemberUser?.recordId)
      if (responseCreateMember) {
        const { data: responseSetPasswordMember } = await setPasswordMember({
          variables: {
            _id: responseCreateMember?.createMemberUser?.recordId,
            password: password,
          }
        })
        // console.log("MEMBER2", responseSetPasswordMember)
        if (responseSetPasswordMember) {
          handleStatusOpen()
          handleOnCloseDialog()
          // navigate('/')
        }
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error?.message)
      handleAlertErrorOpen(true)
    }

  };
  return (
    <Grid>
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
        สมัครสมาชิก
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid>
            <Typography variant="caption">ชื่อผู้ใช้</Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              placeholder="ชื่อผู้ใช้"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoFocus
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
            />
          </Grid>
          <Grid>
            <Typography variant="caption">รหัสผ่าน</Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="รหัสผ่าน"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
            />
          </Grid>
          <Divider sx={{ mt: 2 }} />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Grid>
              <Typography variant="caption">ชื่อ</Typography>
              <NimitrTextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                name="firstname"
                placeholder="ชื่อ"
                autoComplete="firstname"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                autoFocus
                sx={{
                  "&.MuiFormControl-root": {
                    mt: 0,
                  },
                }}
              />
            </Grid>
            <Grid>
              <Typography variant="caption">นามสกุล</Typography>
              <NimitrTextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                name="lastname"
                placeholder="นามสกุล"
                autoComplete="lastname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                autoFocus
                sx={{
                  "&.MuiFormControl-root": {
                    mt: 0,
                  },
                }}
              />
            </Grid>
          </Stack>

          <Grid>
            <Typography variant="caption">อีเมล</Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              placeholder="อีเมล"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoFocus
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
            />
          </Grid>
          <Grid>
            <Typography variant="caption">เบอร์โทร</Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              placeholder="เบอร์โทร"
              type="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              autoComplete="current-password"
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
            />
          </Grid>
          <Button fullWidth variant="contained" type="submit" sx={{ my: 3 }}>
            สมัครสมาชิก
          </Button>
        </Box>
      </DialogContent>
    </Grid>
  );
};
