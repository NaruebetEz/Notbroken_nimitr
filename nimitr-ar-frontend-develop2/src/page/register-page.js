import { useState, useContext, useEffect } from "react";
import {
    Box,
    Grid,
    Alert,
    Stack,
    Button,
    Typography,
    useTheme,
    InputAdornment,
    IconButton,
    Paper,
    Container,
    Divider,
    Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import AuthContext from "../contexts/AuthContext";
import RegisterMember from "../graphql/mutations/register"
import SetPassword from "../graphql/mutations/setPassword"


import { NimitrTextField } from "../component/ui/text-field";
import loginMutation from "../graphql/mutations/login";

import { VisibilityOff, Visibility } from "@mui/icons-material";
export const RegisterPage = () => {
    const theme = useTheme();

    const [registerMember] = useMutation(RegisterMember)
    const [setPasswordMember] = useMutation(SetPassword)

    const navigate = useNavigate();
    const { user, setToken } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errorMessage, setErrorMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);

    useEffect(
        () => {
            if (user) {
                setTimeout(() => {
                    navigate('/project')
                }, 100)
            }
        },
        [navigate, user],
    )

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
                    navigate('/login')
                }
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error?.message)
            handleAlertErrorOpen(true)
        }
    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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

    return (
        <Grid container sx={{
            height: '100%',
            width: '100%',
        }} >

            <Grid item xs={0} md={0} lg={8} sx={{
                background: `url("/sampleAR1.gif")`,
                zIndex: -1,
                width: { xs: '0px' },
                position: 'relative',
                backgroundSize: { lg: 'cover', xs: 'contain', sm: 'contain' },
                backgroundRepeat: 'no-repeat',
                visibility: { xs: 'hidden', sm: 'visible' }
            }} >
                <Box sx={{
                    background: 'rgba(255, 218, 83, 0.8)',
                    height: { lg: '100%', xs: '300px', sm: '500px' },
                    width: '100%',
                    backgroundSize: { lg: 'cover', xs: 'contain', sm: 'contain' },
                    backgroundRepeat: 'no-repeat',
                    padding: '80px',
                    zIndex: -1,
                    textAlign: '-webkit-center',

                }} >
                    <Box
                        sx={{
                            display: 'flex',
                            height: { lg: '214px', xs: '100px', sm: '150px' },
                            width: '425px',
                            bgcolor: '#FFFFE8',
                            zIndex: -1,

                            alignItems: 'center',
                            justifyContent: "center",
                            padding: '15px',
                            borderRadius: '15px',
                        }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box component='img' src="/NimitrIcon.png" sx={{ p: 1, width: '162px', height: '162px', borderRadius: '20px', }} />
                        </Box>
                        <Typography variant="h3" sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                            fontSize: '50px'
                        }}>NIMITR</Typography>
                    </Box>

                </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4} sx={{
                zIndex: 1,
            }}>
                <Box component="form" onSubmit={handleSubmit} sx={{
                    bgcolor: '#FFFFFF',
                    width: { xs: '100%', lg: '466px' },
                    height: '100%',
                    zIndex: 2,
                    paddingTop: '20px',
                    paddingRight: '60px',
                    paddingLeft: '60px',
                }}>
                    <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ padding: '20px' }}>
                        <Box component='img' src="/NimitrIcon.png" sx={{ p: 1, width: '80px', height: '80px', borderRadius: '20px' }} />
                        <Typography variant="h3" sx={{
                            fontWeight: 700,
                            fontSize: '32px'
                        }}>NIMITR</Typography>
                    </Stack>
                    <Typography variant="h5" sx={{
                        fontWeight: 700,
                        fontSize: '24px'
                    }}>สมัครสมาชิก</Typography>
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
                    <Button fullWidth variant="contained" type="submit" sx={{ borderRadius: '15px', fontWeight: 700, height: '46.2px', bgcolor: theme.palette.primary.main, color: 'black', mt: 5, my: 3, }}>
                        สมัครสมาชิก
                    </Button>
                    <Divider sx={{ mt: 5 }} />

                    <Typography variant="body1" sx={{
                        mt: '40px',
                        textAlign: 'center',
                        fontWeight: 400,
                        my: 5,

                    }}>เป็นสมาชิกอยู่แล้ว
                        <Button
                            variant="text"
                            sx={{ p: 0, ml: 1 }}
                        >
                            ลงชื่อเข้าใช้
                        </Button>
                    </Typography>
                </Box>
            </Grid>
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
        </Grid>
    );
};
