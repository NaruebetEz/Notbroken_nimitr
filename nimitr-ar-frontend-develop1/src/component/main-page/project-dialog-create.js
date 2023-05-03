import { useState } from "react";

import {
  Button,
  Typography,
  IconButton,
  Dialog,
  Box,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import CreateProjectMutaion from "../../graphql/mutations/createProject"
import CreateQrProjectMutaion from "../../graphql/mutations/createQrProject";
import { NimitrTextField } from "../ui/text-field";
import { useMutation } from "@apollo/client"
import { Close } from "@mui/icons-material";

import axios from 'axios'


const initialProjectState = {
  id: '',
  name: '',
}

const URL_GENERAT_QR = process.env.REACT_APP_GENERAT_QR
const DOMAIN = process.env.REACT_APP_DOMAIN

export const ProjectDialogCreate = ({ status, onCloseDialog, refetch, user, setProjectState, projectState }) => {

  const [createProjectMutaion] = useMutation(CreateProjectMutaion)
  const [createQrProjectMutaion] = useMutation(CreateQrProjectMutaion)

  const handleCreateProject = async (e) => {
    e.preventDefault()
    // console.log("NAME", projectState)

    try {
      const { data: responseCreateProject } = await createProjectMutaion({
        variables: {
          user: user?._id,
          name: projectState?.name,
        }
      })
      if (responseCreateProject) {
        const responseQr = await axios.post(URL_GENERAT_QR, {
          url: `${DOMAIN}/api/v1/render/${responseCreateProject?.createProject?.recordId}`,
        })
        // const responseQr = await axios.post(URL_GENERAT_QR, {
        //   url: `http://localhost:3000/render/${responseCreateProject?.createProject?.recordId}`,
        // })
        // console.log("ASDASDASD", responseQr)
        const { data: responseUpdateProject } = await createQrProjectMutaion({
          variables: {
            id: responseCreateProject?.createProject?.recordId,
            url: `${DOMAIN}/api/v1/render/${responseCreateProject?.createProject?.recordId}`,
            imageurl: responseQr?.data?.url,
          }
        })
        // const { data: responseUpdateProject } = await createQrProjectMutaion({
        //   variables: {
        //     id: responseCreateProject?.createProject?.recordId,
        //     url: `http://localhost:3000/render/${responseCreateProject?.createProject?.recordId}`,
        //     imageurl: responseQr?.data?.url,
        //   }
        // })
        // console.log("RES", responseUpdateProject)
      }
    } catch (error) {
      console.error(error)
    }
    handleRefresh()
  }

  const handleRefresh = () => {
    setProjectState(initialProjectState)
    refetch()
    onCloseDialog()
  }
  return (
    <Dialog
      PaperProps={{
        sx: {
          p: 1
        }
      }}
      open={status}
      keepMounted
      maxWidth={'md'}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItem: 'center'
        }}>
        <Typography sx={{ justifyItems: "center", alignSelf: 'center', fontWeight: 900 }}>{"Project"}</Typography>
        <IconButton onClick={handleRefresh}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Box component={'form'} onSubmit={handleCreateProject}>
        <DialogContent sx={{ pt: 0, pb: 0 }}>
          <NimitrTextField
            margin="normal"
            required
            fullWidth
            placeholder="กรุณาใส่ชื่อ Project"
            value={projectState?.name}
            onChange={(e) => {
              setProjectState({ ...projectState, name: e.target.value });
            }}
            sx={{
              "&.MuiFormControl-root": {
                mt: 0,
                width: "400px",
                p: 1
              },
            }}
          />

        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' sx={{ fontWeight: 700, }} disabled={!projectState?.name} >Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
