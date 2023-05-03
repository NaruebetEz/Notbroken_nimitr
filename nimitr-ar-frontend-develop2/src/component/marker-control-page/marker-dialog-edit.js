import { useState } from "react";
import {
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Box,
} from "@mui/material";
import { Dropzone, FileItem } from '@dropzone-ui/react'
import { NimitrTextField } from "../ui/text-field";
import { Close } from "@mui/icons-material";

import axios from 'axios'
import CreateMarkerMutaion from "../../graphql/mutations/createMarker"
import UpdateMarkerMutaion from "../../graphql/mutations/updateMarker"

import { useMutation } from "@apollo/client"

const MarkerDialogEdit = ({ status, toggleDialog, refetch, markerContent, setMarkerContent }) => {

    const [updateMarkerMutation] = useMutation(UpdateMarkerMutaion)

    const handleChangeStateValue = (e) => {
        setMarkerContent({ ...markerContent, [e.target.name]: e.target.value })
    }


    const handleSubmitUpdateMarker = async (e) => {
        e.preventDefault()
        // console.log("PATTEN", contentMarkerState)
        try {
            const { data: responseMarkerContent } = await updateMarkerMutation({
                variables: {
                    id: markerContent?.id,
                    name: markerContent?.name,
                }
            })
            if (responseMarkerContent)
                handleRefresh()
        } catch (error) {
            console.error(error)
        }
        handleRefresh()
    }

    const handleRefresh = () => {
        refetch()
        toggleDialog()
    }

    return (
        <Dialog
            PaperProps={{
                sx: {
                    p: 2
                }
            }}
            open={status}
            keepMounted
            maxWidth={'md'}
        >
            <form onSubmit={handleSubmitUpdateMarker}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItem: 'center'
                    }}>
                    <Typography sx={{ justifyItems: "center", alignSelf: 'center', fontWeight: 900 }}>{"Marker"}</Typography>
                    <IconButton onClick={handleRefresh}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container sx={{ width: '400px' }}>
                        <NimitrTextField
                            margin="normal"
                            required
                            placeholder="กรุณาใส่ชื่อ Marker "
                            disableScroll
                            id='name'
                            name='name'
                            value={markerContent?.name}
                            onChange={handleChangeStateValue}
                            sx={{
                                "&.MuiFormControl-root": {
                                    mt: 0,
                                    width: "100%",
                                    mt: 1
                                },
                            }}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant="contained" sx={{ fontWeight: 700 }} disabled={!markerContent?.name}>Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default MarkerDialogEdit
