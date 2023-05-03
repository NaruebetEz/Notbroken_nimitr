import { Suspense, useEffect, useState } from "react";
import {
    Box,
    Grid,
    Link,
    Stack,
    Button,
    Slider,
    useTheme,
    IconButton,
    InputAdornment,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { Dropzone, FileItem } from '@dropzone-ui/react'

import { Visibility, Close, Publish } from "@mui/icons-material";
import { NimitrTextField } from "../ui/text-field";
import { LinearProgressWithLabel } from "../../component/progress"
import { useMutation } from "@apollo/client"


import axios from 'axios'
import UpdateContentMutaion from "../../graphql/mutations/updateContent"
import UpdateMediaMutaion from "../../graphql/mutations/updateMedia"


const initialContentMediaState = {
    mediaName: '',
    mediaType: '',
    mediaUrl: '',
}

const URL_UPLOAD_MEDIA = process.env.REACT_APP_UPLOAD_MEDIA


const MediaDialogEdit = ({ status, onCloseDialog, refetch, contentUpdateState, setContentUpdateState, handleOpenPreviewMedia }) => {
    const theme = useTheme();

    const [contentMediaState, setContentMediaState] = useState(initialContentMediaState)
    const [progress, setProgress] = useState(0)
    const [onProgressStatus, setOnProgressStatus] = useState(false)

    const [updateContentMutaion] = useMutation(UpdateContentMutaion)
    const [updateMediaMutation] = useMutation(UpdateMediaMutaion)

    const [mediaFile, setMediaFile] = useState([])
    const onDeleteMediaFile = (id) => {
        setProgress()
        setOnProgressStatus(false)
        setMediaFile(mediaFile.filter((x) => x.id !== id))
    }

    const updateMediaFile = (incommingFiles, e) => {
        setMediaFile(incommingFiles)
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
                            setProgress(progress)
                            setOnProgressStatus(true)
                        }
                    }
                    reader.onload = () => {
                        resolve(reader.result)
                        setOnProgressStatus(false)
                        handleUploadMediaFile(reader.result, typeFile, incommingFiles[0].file.name)
                    }
                    reader.onerror = (error) => reject(error)
                }
            })
        }
    }

    const handleUploadMediaFile = async (base64Media, typeFile, fileName) => {
        try {
            const responseUploadMediaFile = await axios.post(URL_UPLOAD_MEDIA, {
                media: base64Media,
                type: typeFile
            })
            if (responseUploadMediaFile?.status == process.env.REACT_APP_API_STATUS_200) {
                setContentMediaState({ ...contentMediaState, mediaUrl: responseUploadMediaFile?.data?.url, mediaName: fileName, mediaType: "modal" })
            }
        } catch (error) {
            console.error(error)
        }
    }


    const handleSubmitUpdateContent = async (e) => {
        e.preventDefault()
        console.log("1111", contentUpdateState)
        try {
            const { data: responseUpdateContent } = await updateContentMutaion({
                variables: {
                    id: contentUpdateState?.contentId,
                    name: contentUpdateState?.name,
                    scale: contentUpdateState?.scale,
                    rotationX: contentUpdateState?.rotationX,
                    rotationY: contentUpdateState?.rotationY,
                    rotationZ: contentUpdateState?.rotationZ,
                }
            })
            if (responseUpdateContent && contentMediaState?.mediaUrl) {
                const { data: responseUpdateMedia } = await updateMediaMutation({
                    variables: {
                        id: contentUpdateState?.media?._id,
                        name: contentMediaState?.mediaName,
                        mediaUrl: contentMediaState?.mediaUrl,
                    }
                })
            }

        } catch (error) {
            console.error(error)
        }
        handleRefresh()
    }

    const handleRefresh = () => {
        setMediaFile([])
        setContentMediaState(initialContentMediaState)
        setProgress(0)
        setOnProgressStatus(false)
        refetch()
        onCloseDialog()
    }

    const handleChangeStateValue = (e) => {
        setContentUpdateState({ ...contentUpdateState, [e.target.name]: e.target.value })
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
            <form onSubmit={handleSubmitUpdateContent}>
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItem: 'center'
                }}>

                    <Typography sx={{ justifyItems: "center", alignSelf: 'center' }}>{"Content"}</Typography>
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
                                placeholder="กรุณาใส่ชื่อ Content"
                                id="name"
                                name="name"
                                value={contentUpdateState?.name}
                                onChange={handleChangeStateValue}
                                sx={{
                                    "&.MuiFormControl-root": {
                                        mt: 0,
                                        width: "450px",
                                    },
                                }}
                            />
                        </Grid>
                        {/* <Grid xs={6} sx={{ p: 1 }}>
                            <Typography>{"Marker"}</Typography>
                            <Stack spacing={1} direction={'column'} sx={{ alignItems: 'center', mt: 2 }}>
                                <Box component={'img'} src={contentUpdateState?.markerUrl} sx={{ p: 1, width: '400px', height: '400px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '10px' }} />
                                <Typography>{contentUpdateState?.markerName}</Typography>
                            </Stack>
                        </Grid> */}
                        <Grid xs={12} sx={{ p: 1 }}>
                            <Box>
                                <Stack direction={'row'} sx={{ placeContent: "space-between" }}>
                                    <Typography>{"Media"}</Typography>
                                    <IconButton onClick={() => { handleOpenPreviewMedia(contentUpdateState?.media?.mediaUrl, contentUpdateState?.media?.name) }}><Visibility /></IconButton>
                                </Stack>
                                <Dropzone
                                    onDelete={onDeleteMediaFile}
                                    onChange={updateMediaFile}
                                    value={mediaFile}
                                    style={{ minWidth: "250px" }}
                                    required
                                    accept='.glb'
                                    minHeight="195px"
                                    maxFiles="1"
                                    disableScroll
                                    view="grid"
                                >
                                    {mediaFile.map((file) => (
                                        <FileItem {...file} key={file.id} onDelete={onDeleteMediaFile} preview={true} />
                                    ))}
                                </Dropzone>
                                {!progress ? null : <LinearProgressWithLabel value={progress} />}
                                {!mediaFile?.length ? null :
                                    <NimitrTextField
                                        margin="normal"
                                        placeholder="กรุณาใส่ชื่อ Media"
                                        value={contentMediaState?.mediaName}
                                        onChange={(e) => {
                                            setContentMediaState({ ...contentMediaState, mediaName: e.target.value });
                                        }}
                                        sx={{
                                            "&.MuiFormControl-root": {
                                                mt: 0,
                                                width: "100%",
                                                mt: 1
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">File:</InputAdornment>
                                            ),
                                        }}
                                    />
                                }

                                <Box>
                                    <Typography>Scale</Typography>
                                    <Slider
                                        value={contentUpdateState?.scale ? contentUpdateState?.scale : 0.1}
                                        id='scale'
                                        name='scale'
                                        onChange={handleChangeStateValue}
                                        step={0.1}
                                        min={0.1}
                                        max={3}
                                        valueLabelDisplay="auto"
                                    />
                                </Box>
                                <Box>
                                    <Typography>Rotation</Typography>
                                    <Stack direction={'row'} >
                                        <Typography sx={{ mr: 2 }}>X</Typography>
                                        <Slider
                                            value={contentUpdateState?.rotationX ? contentUpdateState?.rotationX : 0}
                                            id='rotationX'
                                            name='rotationX'
                                            onChange={handleChangeStateValue}
                                            step={1}
                                            min={0}
                                            max={360}
                                            valueLabelDisplay="auto"
                                        />
                                    </Stack>
                                    <Stack direction={'row'} >
                                        <Typography sx={{ mr: 2 }}>Y</Typography>
                                        <Slider
                                            value={contentUpdateState?.rotationY ? contentUpdateState?.rotationY : 0}
                                            id='rotationY'
                                            name='rotationY'
                                            onChange={handleChangeStateValue}
                                            step={1}
                                            min={0}
                                            max={360}
                                            valueLabelDisplay="auto"
                                        />
                                    </Stack>
                                    <Stack direction={'row'} >
                                        <Typography sx={{ mr: 2 }}>Z</Typography>
                                        <Slider
                                            value={contentUpdateState?.rotationZ ? contentUpdateState?.rotationZ : 0}
                                            id='rotationZ'
                                            name='rotationZ'
                                            onChange={handleChangeStateValue}
                                            step={1}
                                            min={0}
                                            max={360}
                                            valueLabelDisplay="auto"
                                        />
                                    </Stack>
                                </Box>
                                <Typography>* สามารถดาวโหลดไฟล์ glb ได้ที่ <Link href={`https://sketchfab.com`} target='_blank' >sketchfab.com</Link></Typography>

                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant="contained" disabled={onProgressStatus} endIcon={<Publish />} sx={{ fontWeight: 700 }}>Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default MediaDialogEdit
