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

import { useMutation } from "@apollo/client"



const initialMarkerState = {
    markerName: '',
    markerType: '',
    markerPattern: '',
    markerUrl: '',
    markerNo: 0,
}


const URL_UPLOAD_MARKER = process.env.REACT_APP_UPLOAD_MARKER
// const URL_UPLOAD_PATTERN = process.env.REACT_APP_UPLOAD_PATTERN


const MarkerDialogCreate = ({ status, onCloseDialog, refetch }) => {


    const [contentMarkerState, setContentMarkerState] = useState(initialMarkerState)

    const [createMarkerMutation] = useMutation(CreateMarkerMutaion)

    const [markerImage, setMarkerImage] = useState([])
    const onDeleteMarker = (id) => {
        setMarkerImage(markerImage.filter((x) => x.id !== id))
    }


    // const [markerPattern, setMarkerPattern] = useState([])
    // const onDeleteMarkerPattern = (id) => {
    //     setMarkerPattern(markerPattern.filter((x) => x.id !== id))
    // }


    const updateMarkerImage = (incommingFiles, e) => {
        setMarkerImage(incommingFiles)
        if (incommingFiles.length !== 0) {
            new Promise((resolve, reject) => {
                const regex = /[^.]+$/g;
                const typeFile = incommingFiles[0]?.file.name.match(regex)
                if (incommingFiles[0]?.file !== []) {
                    const reader = new FileReader()
                    reader.readAsDataURL(incommingFiles[0]?.file)
                    reader.onprogress = (data) => {
                        if (data.lengthComputable) {
                            var progress = parseInt(((data.loaded / data.total) * 100), 10);
                        }
                    }
                    reader.onload = () => {
                        resolve(reader.result)
                        handleUploadMarker(reader.result, typeFile, incommingFiles[0].file.name)
                    }
                    reader.onerror = (error) => reject(error)
                }
            })
        }
    }


    const handleUploadMarker = async (base64Marker, typeFile, fileName) => {
        try {
            const config = {
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    // console.log("CONFIG", percentCompleted)
                }
            }
            const responseUploadMaker = await axios.post(URL_UPLOAD_MARKER, {
                marker: base64Marker,
                type: typeFile
            }, config)
            if (responseUploadMaker?.status == process.env.REACT_APP_API_STATUS_200) {
                setContentMarkerState({ ...contentMarkerState, markerUrl: responseUploadMaker?.data?.url, markerPattern: "success", })
            }
        } catch (error) {
            console.error(error)
        }
    }


    // const updateMarkerPattern = (incommingFiles, e) => {
    //     setMarkerPattern(incommingFiles)
    //     if (incommingFiles.length !== 0) {
    //         new Promise((resolve, reject) => {
    //             const regex = /[^.]+$/g;
    //             const typeFile = incommingFiles[0]?.file.name.match(regex)
    //             if (incommingFiles[0]?.file !== []) {
    //                 const reader = new FileReader()
    //                 reader.readAsDataURL(incommingFiles[0]?.file)
    //                 reader.onprogress = (data) => {
    //                     if (data.lengthComputable) {
    //                         var progress = parseInt(((data.loaded / data.total) * 100), 10);
    //                         // console.log("PP", progress);
    //                     }
    //                 }
    //                 reader.onload = () => {
    //                     resolve(reader.result)
    //                     handleUploadMarkerPattern(reader.result, typeFile, incommingFiles[0].file.name)
    //                 }
    //                 reader.onerror = (error) => reject(error)
    //             }
    //         })
    //     }
    // }

    // const handleUploadMarkerPattern = async (base64Pattern, typeFile, fileName) => {
    //     try {
    //         const responseUploadPatternFile = await axios.post(URL_UPLOAD_PATTERN, {
    //             pattern: base64Pattern,
    //             type: typeFile
    //         })
    //         if (responseUploadPatternFile?.status == process.env.REACT_APP_API_STATUS_200) {
    //             setContentMarkerState({ ...contentMarkerState, markerPattern: responseUploadPatternFile?.data?.url })
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const handleChangeStateValue = (e) => {
        setContentMarkerState({ ...contentMarkerState, [e.target.name]: e.target.value })
    }


    const handleSubmitCreateContent = async (e) => {
        e.preventDefault()
        console.log("PATTEN", contentMarkerState)
        try {
            const { data: responseMarkerContent } = await createMarkerMutation({
                variables: {
                    name: contentMarkerState?.markerName,
                    markerUrl: contentMarkerState?.markerUrl,
                    markerPattern: contentMarkerState?.markerPattern,
                    markerNo: contentMarkerState?.markerNo,
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
        setContentMarkerState(initialMarkerState)
        refetch()
        setMarkerImage([])
        // setMarkerPattern([])
        onCloseDialog()
    }


    return (
        <Dialog
            PaperProps={{
                sx: {
                    p: 2
                }
            }}
            open={status}
            scroll='paper'
            keepMounted
            maxWidth={'md'}
        >
            <form onSubmit={handleSubmitCreateContent}>

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
                    <Grid container>
                        <Grid xs={12} sx={{ p: 1 }}>
                            <NimitrTextField
                                margin="normal"
                                required
                                placeholder="กรุณาใส่ชื่อ Marker"
                                id='markerName'
                                name='markerName'
                                disableScroll
                                value={contentMarkerState?.markerName}
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

                        <Grid xs={12} sx={{ p: 1 }}>
                            <Box >
                                <Typography>{"Marker Image"}</Typography>
                                <Dropzone
                                    require
                                    onChange={updateMarkerImage}
                                    value={markerImage}
                                    accept='.png'
                                    style={{ minWidth: "250px" }}
                                    minHeight="195px"
                                    maxFiles="1"
                                    view="grid"
                                >
                                    {markerImage.map((file) => (
                                        <FileItem {...file} key={file.id} onDelete={onDeleteMarker} preview={true} />
                                    ))}
                                </Dropzone>
                            </Box>
                        </Grid>
                        <Grid xs={12} sx={{ p: 1 }}>
                            <NimitrTextField
                                margin="normal"
                                required
                                placeholder="กรุณาใส่ชื่อ Marker Number"
                                id='markerNo'
                                name='markerNo'
                                disableScroll
                                value={contentMarkerState?.markerNo}
                                onChange={handleChangeStateValue}
                                inputProps={{ maxLength: 62 }}
                                sx={{
                                    "&.MuiFormControl-root": {
                                        mt: 0,
                                        width: "100%",
                                        mt: 1
                                    },
                                }}
                            />
                        </Grid>
                        {/* <Grid xs={6} sx={{ p: 1 }}>
                            <Box>
                                <Typography>{"Pattern"}</Typography>
                                <Dropzone
                                    onChange={updateMarkerPattern}
                                    value={markerPattern}
                                    accept='.patt'
                                    style={{ minWidth: "250px" }}
                                    required
                                    minHeight="195px"
                                    maxFiles="1"
                                    disableScroll
                                    view="grid"
                                >
                                    {markerPattern?.map((file) => (
                                        <FileItem {...file} key={file.id} onDelete={onDeleteMarkerPattern} preview={true} />
                                    ))}
                                </Dropzone>
                            </Box>
                        </Grid> */}

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant="contained" sx={{ fontWeight: 700 }} disabled={!markerImage?.length && !!contentMarkerState?.markeName}>Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default MarkerDialogCreate
