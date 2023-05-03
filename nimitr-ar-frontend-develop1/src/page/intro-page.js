import * as React from "react";
import {
  Box,
  Link,
  Divider,
  Typography,
  useTheme,
  Stack,
}
  from "@mui/material";

import { Container, Grid } from "@mui/material";
import { pink } from "@mui/material/colors";
import { maxHeight } from "@mui/system";
// import MenuIcon from "@mui/icons-material/Menu";
import { LooksOne, LooksTwo, Looks3, DoubleArrow } from '@mui/icons-material';
export const IntroPage = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container sx={{
        backgroundImage: `url("/NIMITR.gif")`,
        height: { xl: '800px', lg: '700px', xs: '300px', sm: '500px' },
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        backgroundSize: { lg: 'cover', xs: 'contain', sm: 'contain' },
        backgroundRepeat: 'no-repeat'
      }} />
      <Container maxWidth="lg">
        <Grid sx={{ textAlign: "center", mt: { lg: 2, xs: 4 } }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: "left", }}
          >
            <Grid item xs={12} lg={6}>
              <Box component="img" src="/title.gif" sx={{ width: { lg: "600px", xs: '100%' }, height: { lg: "400px", xs: 'px' }, margin: "5px" }} />
            </Grid>
            <Grid item xs={12} lg={6} sx={{ p: 4 }} >
              <Typography variant="h5" fontWeight={700} sx={{ textAlign: { lg: "start", xs: 'center' } }}>สร้างผลงาน AR ของคุณบนเว็บไซต์ของเรา</Typography>
              <Typography variant="body1" sx={{ textAlign: { lg: "start", xs: 'center' } }}>คุณสามารถเพิ่มความน่าสนใจด้วยการจัดแสดงชิ้นงาน AR เราช่วยทำให้คุณ<br />
                ใช้งานได้ง่ายขึ้น เพียงไม่กี่ขั้นตอนก็สามารถนำเสนอชิ้นงานได้ทันที<br />
                ใช้งานฟรี!! ไม่ต้องใช้บัตรเครดิต!!</Typography>
              {/* <Button variant="contained" sx={{ margin: "20px" }} >ลองเลย!!</Button> */}
              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, mb: 2, textAlign: { lg: "start", xs: 'center' } }}>ทดลองใช้ได้แล้วที่</Typography>
              <Stack direction={{ lg: 'row', xs: 'column' }} sx={{ alignItems: { xs: 'center', lg: 'flex-start' } }}>
                <Box component="img" src="/qr_new.png" sx={{ width: '150px', height: '150px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '10px', mr: { xs: 0, lg: 2 }, mb: { xs: 2, lg: 0 } }} />
                <Box component="img" src="/marker.png" sx={{ width: '150px', height: '150px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '10px' }} />
              </Stack>
            </Grid>

          </Grid>
          <Grid >
            <Divider variant="middle" sx={{ borderTop: '1px solid #bbb', borderRadius: '5px' }} />
            <Stack direction='row' sx={{ justifyContent: 'center' }}>
              <Typography variant="h4" fontWeight={700} sx={{ mt: 5, p: 2, color: '#FFE374' }}>3 Step</Typography>
              <Typography variant="h4" fontWeight={700} sx={{ mt: 5, p: 2 }}>ง่ายๆ เพื่อสร้างสรรค์ผลงานของคุณ</Typography>
            </Stack>
            <Typography variant="body">แล้วการสร้าง AR ของคุณ จะไม่ใช่เรื่องยากอีกต่อไปด้วย NIMITR จะทำให้ไอเดียของคุณเป็นจริง</Typography>
            <Grid container direction="row" sx={{ mt: 5 }}>
              {/* step1 */}
              <Grid item sm={6}>
                <Box component="img" src="/step1.png" />
              </Grid>
              <Grid item sm={6}
                sx={{ p: { lg: 6, xs: 2, sm: 4 }, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '1px', bgcolor: theme.palette.primary.main }}
                container
                direction="row"
              >
                <Typography variant="h5">01 Upload Marker</Typography>
                <Typography variant="body" sx={{ mt: 2 }}>อัปโหลดภาพที่ต้องการใช้เป็นเป้าหมายในการแสดงโมเดล AR</Typography>
              </Grid>
              {/* step2 */}
              <Grid item sm={6}
                sx={{ p: { lg: 6, xs: 2, sm: 4 }, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '1px', bgcolor: theme.palette.primary.main }}
                container
                direction="row"
              >
                <Typography variant="h5">02 Upload Content</Typography>
                <Typography variant="body" sx={{ mt: 2 }}>อัปโหลดตัวโมเดล AR ที่จะนำไปแสดงในสิ่งที่ผู้ใช้ได้ทำการเลือกไว้ จากนั้นระบบจะทำการ Generate link ออกมา</Typography>
              </Grid>
              <Grid item sm={6}>
                <Box component="img" src="/step2.png" />
              </Grid>
              {/* step3 */}
              <Grid item sm={6}>
                <Box component="img" src="/step3.png" margin="10px" />
              </Grid>
              <Grid item sm={6}
                sx={{ p: { lg: 6, xs: 2, sm: 4 }, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '1px', bgcolor: theme.palette.primary.main }}
                container
                direction="row"
              >
                <Typography variant="h5">03 Enjoy!</Typography>
                <Typography variant="body" sx={{ mt: 2 }}>เปิด link ที่ได้มา จากนั้นใช้กล้องสำหรับอ่านภาพ ก็จะแสดงโมเดลขึ้นมาตามที่ผู้ใช้ได้ตั้งค่าไว้</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Grid container sx={{ mt: 10, bgcolor: '#2A2B2A' }} >
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            sx={{ textAlign: "left", mt: 5, alignItems: 'top', justifyContent: "center" }}
            paddingBottom="50px"

          >
            <Grid item xs={12} lg={12} sm={12} sx={{ alignItems: 'center', justifyContent: "center" }}>
              <Stack direction='row' sx={{ justifyContent: 'center' }}>
                <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }} fontWeight={700}>ทำไมต้อง  </Typography>
                <Typography variant="h4" sx={{ color: '#FFE374', textAlign: 'center' }} fontWeight={700}> NIMITR</Typography>
              </Stack>
            </Grid>
            <Grid container item xs={12} lg={3} sm={12} sx={{ mt: 10, bgcolor: '#FFE374', justifyContent: 'center', textAlign: 'center' }} paddingRight="30px" >
              <Grid item margin="20px">
                <img src="why1.png" height="auto" />
              </Grid>
              <Grid item padding="10px" >
                <Divider variant="middle" sx={{ borderTop: '8px solid #2A2B2A', borderRadius: '5px' }} />
                <Typography variant="h5" sx={{ mt: 5 }} fontWeight={700}>ปรับแก้เองได้</Typography>
                <Typography variant="body">คอนเท้นไม่จำเจเพราะคุณสามารถจัดการมันได้เองอย่างอิสระ</Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} lg={3} sm={12} sx={{ mt: 10, bgcolor: '#FFF', justifyContent: 'center', textAlign: 'center' }} paddingRight="30px" >
              <Grid item margin="20px">
                <img src="why2.png" height="auto" />
              </Grid>
              <Grid item padding="10px" >
                <Divider variant="middle" sx={{ borderTop: '8px solid #2A2B2A', borderRadius: '5px' }} />
                <Typography variant="h5" sx={{ mt: 5 }} fontWeight={700}>Free </Typography>
                <Typography variant="body">ใช้งานฟรีไม่มีค่าใช้จ่าย</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={3} sm={12} sx={{ mt: 10, bgcolor: '#FFE374', justifyContent: 'center', textAlign: 'center' }} paddingRight="30px">
              <Grid item margin="20px">
                <img src="why3.png" height="auto" />
              </Grid>
              <Grid item padding="10px" >
                <Divider variant="middle" sx={{ borderTop: '8px solid #2A2B2A', borderRadius: '5px' }} />
                <Typography variant="h5" sx={{ mt: 5 }} fontWeight={700}>ง่ายและเร็ว</Typography>
                <Typography variant="body">เราได้พัฒนาระบบมาอย่างดี เพื่อให้คุณใช้งานด้วยขั้นตอนน้อยที่สุด</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>


      <Grid container padding="5px">
        <Grid item xs={12}
          container
          direction="row"
          sx={{ textAlign: "center", mt: 5, alignItems: 'center', justifyContent: "center" }}
          paddingBottom="50px"
        >
          <Stack container direction='row' sx={{ justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ mt: 5 }}>วีดีโอ</Typography>
            <Typography variant="h5" sx={{ mt: 5, color: '#FFE374' }}>ตัวอย่างของแอพพลิเคชั่น</Typography>
          </Stack>
          <Box component={'iframe'}
            src="https://www.youtube.com/embed/N9khtFKSrlc"
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullscreen
            sx={{ mt: 5, width: { lg: "560px", xs: '90%' }, height: "315px" }} />
        </Grid>
      </Grid>
      <Grid container lg={12} sm={12} xs={12} sx={{ padding: '20px', bgcolor: '#2A2B2A', color: 'white', display: 'flex' }}  >
        <Grid item sm={4}>
          <Typography variant="body" sx={{ mr: 2 }}>บริษัท สตรีมเซาท์เทคโนโลยี จำกัด</Typography>
          <Typography variant="body" sx={{ mr: 2 }}><br />หาดใหญ่ สงขลา</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="body" sx={{ mr: 2 }}>สนใจติดต่องาน  </Typography>
          <Link href="https://page.line.me/?accountId=862ecmvb&openerPlatform=native&openerKey=talkroom%3Amessage" target="_blank" underline='none' sx={{ color: 'white', display: 'flex', alignItems: 'center', }}>
            <Box component="img" src="/line.png" sx={{ width: '50px', height: '50px', backgroundSize: 'cover', mr: 2 }} />
            <Typography variant="body" sx={{ mr: 2 }}>AS-SCIPSU </Typography>
          </Link>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="body" sx={{ mt: 5 }}>สนับสนุนโดย</Typography>
          <Grid item lg={4} sm={4} xs={6} sx={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: "center" }} >
            <Box component="img" src="/Logo_Sci.png" sx={{ height: { lg: "50px", xs: '25px' }, backgroundSize: 'cover' }} />
          </Grid>
          <Grid item lg={4} sm={4} xs={6} sx={{ padding: '20px' }} >
            <Box component="img" src="/Logo_SS.png" sx={{ height: { lg: "120px", xs: '60px' }, backgroundSize: 'cover', borderRadius: '10px' }} />
          </Grid>
        </Grid>
        <Stack >
          <Typography>© Copyright 2019. All Right Reserved. Stream South Technology Co., Ltd.</Typography>
        </Stack>
      </Grid>
    </Box >
  );
};
