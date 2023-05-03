import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
  Link,
  Hidden,
  Zoom,
} from "@mui/material";
import { useState, useContext } from "react"
import { LogoutSharp, Panorama, Article, ExpandMore, MenuOutlined } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { LoginDialog } from "./login-dialog";

export const HeaderBar = () => {
  const { user, setToken, removeToken } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();


  const [openLoginDialog, setOpenLoginDialog] = useState(false);


  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };
  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    // setProject(null)
    // await setLogout({ variables: { _id: user?._id } })
    removeToken()
    // history.push('/:projectCode/login')
    navigate('/')
  }
  // console.log(user);
  return (
    <AppBar position="static" sx={{
      background: theme.palette.primary.white, paddingLeft: { lg: 10, xs: 5 }, paddingRight: { lg: 0, xs: 5 },
    }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          variant="text"
          onClick={() => {
            navigate("/");
          }}
        >
          <Box
            component="img"
            src="/NimitrIcon.png"
            sx={{ width: "45px", height: "45px", borderRadius: '10px' }}
          />
        </IconButton>

        <Typography component="span" variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
          NIMITR
        </Typography>
        {!user ? (
          <Box sx={{ display: 'flex' }}>
            <Button variant='text' sx={{
              flexGrow: 1, mr: 2, borderRadius: '10px', color: theme.palette.primary.black,
            }} onClick={handleOpenLoginDialog}>
              ลงชื่อเข้าใช้
            </Button>
            <Button variant='outlined' sx={{ flexGrow: 1, fontWeight: 400, borderRadius: '10px', bgcolor: '#FFDA53', color: theme.palette.primary.black, }} onClick={() => { navigate("/register") }}>
              สมัครสมาชิก
            </Button>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Stack direction={'row'}>
              <Typography sx={{ p: 0, alignSelf: 'center', fontWeight: 400, width: { xs: '0px', sm: '100%' }, visibility: { xs: 'hidden', sm: 'visible' } }} >{`${user.firstname}  ${user.lastname}`}</Typography>
              <Tooltip title="Open settings" >
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleOpenUserMenu} sx={{ p: 0, width: '50px', height: '40px', ml: 2, border: `1px solid`, borderRadius: '5px' }}>

                  {!!anchorElUser ? <Zoom in={true}><ExpandMore /></Zoom> : <MenuOutlined />}
                </IconButton>
              </Tooltip>
            </Stack>
            <Menu
              sx={{ mt: '39px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user?.role == "ADMIN" &&
                <MenuItem onClick={() => {
                  navigate("/control/marker")
                  handleCloseUserMenu()
                }} sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} >
                    <Panorama />
                    <Typography textAlign="center">markers</Typography>
                  </Stack>
                </MenuItem>}
              <MenuItem onClick={() => {
                navigate("/project")
                handleCloseUserMenu()
              }} sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} >
                  <Article />
                  <Typography textAlign="center">my project</Typography>
                </Stack>
              </MenuItem>
              <MenuItem onClick={() => {
                logout()
                handleCloseUserMenu()
              }} sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} >
                  <LogoutSharp />
                  <Typography textAlign="center">logout</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
      <LoginDialog
        open={openLoginDialog}
        handleClose={handleCloseLoginDialog}
        user={user}
        setToken={setToken}
      />
    </AppBar >
  );
};
