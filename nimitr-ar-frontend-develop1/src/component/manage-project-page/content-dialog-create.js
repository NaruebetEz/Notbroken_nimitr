import { useState } from "react";
import {
    Button,
    Grid,
    Box,
    Link,
    Slider,
    Stack,
    useTheme,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    InputAdornment,
    Divider
} from "@mui/material";
import { Dropzone, FileItem } from '@dropzone-ui/react'
import { NimitrTextField } from "../ui/text-field";
import { Close, Publish } from "@mui/icons-material";
import { LinearProgressWithLabel } from "../progress"
import { useMutation } from "@apollo/client"


import axios from 'axios'
import CreateContentMutaion from "../../graphql/mutations/createContent"
import CreateMediaMutaion from "../../graphql/mutations/createMedia"

const initialContentState = {
    name: '',
    scale: 0.1,
    rotationX: 0,
    rotationY: 90,
    rotationZ: 0,
}

const initialContentMediaState = {
    mediaName: '',
    mediaType: '',
    mediaUrl: '',
}

const URL_UPLOAD_MEDIA = process.env.REACT_APP_UPLOAD_MEDIA

const ContentDialogCreate = ({ status, onCloseDialog, refetch, projectId, markerSelect }) => {
    const theme = useTheme();


    const [contentState, setContentState] = useState(initialContentState)
    const [progress, setProgress] = useState(0)
    const [contentMediaState, setContentMediaState] = useState(initialContentMediaState)
    const [createContentMutaion] = useMutation(CreateContentMutaion)
    const [createMediaMutation] = useMutation(CreateMediaMutaion)


    const [mediaFile, setMediaFile] = useState([])

    const onDeleteMediaFile = (id) => {
        setMediaFile(mediaFile.filter((x) => { return x.id !== id }))
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
                        }
                    }
                    reader.onload = () => {
                        resolve(reader.result)
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

    const handleChangeStateValue = (e) => {
        setContentState({ ...contentState, [e.target.name]: e.target.value })
    }

    const handleSubmitCreateContent = async (e) => {
        e.preventDefault()
        try {
            const { data: responseCreateContent } = await createContentMutaion({
                variables: {
                    project: projectId,
                    name: contentState?.name,
                    scale: contentState?.scale,
                    rotationX: contentState?.rotationX,
                    rotationY: contentState?.rotationY,
                    rotationZ: contentState?.rotationZ,
                    marker: markerSelect?.markerId,
                }
            })
            if (responseCreateContent) {
                const { data: responseMediaContent } = await createMediaMutation({
                    variables: {
                        project: projectId,
                        content: responseCreateContent?.createContent?.recordId,
                        name: contentMediaState?.mediaName,
                        type: contentMediaState?.mediaType,
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
        onDeleteMediaFile()
        setMediaFile([])
        setContentState(initialContentState)
        setContentMediaState(initialContentMediaState)
        setProgress(0)
        refetch()
        onCloseDialog()
    }
    console.log()
    return (
        <Dialog
            open={status}
            keepMounted
            maxWidth={'md'}
        >
            <Box component={'form'} onSubmit={handleSubmitCreateContent}>
                <DialogTitle id="alert-dialog-title"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItem: 'center'
                    }}>

                    <Typography sx={{ justifyItems: "center", alignSelf: 'center', fontWeight: 700 }}>{"Content"}</Typography>
                    <IconButton onClick={handleRefresh}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>

                    <Grid container sx={{ minWidth: { lg: '800px', xs: '400px' } }}>
                        <Grid xs={12} lg={12} >
                            <Divider />
                        </Grid>
                        {/* <Grid xs={12} sx={{ p: 1 }}>
                            <NimitrTextField
                                margin="normal"
                                required
                                id="name"
                                name="name"
                                placeholder="กรุณาใส่ชื่อ Content"
                                value={contentState?.name}
                                onChange={handleChangeStateValue}
                                sx={{
                                    "&.MuiFormControl-root": {
                                        mt: 0,
                                        width: "450px",
                                    },
                                }}
                            />
                        </Grid> */}
                        <Grid xs={12} lg={6} sx={{ p: 1, }}>
                            <Stack>
                                <Typography fontWeight={700}>{"Marker"}</Typography>
                                <Stack spacing={1} direction={'column'} sx={{ alignItems: 'center' }}>
                                    <Box component={'img'} src={markerSelect?.markerUrl} sx={{ p: 1, width: '100%', height: '250px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '10px' }} />
                                    <Typography>{markerSelect?.markerName}</Typography>
                                </Stack>
                                <NimitrTextField
                                    margin="normal"
                                    required
                                    id="name"
                                    name="name"
                                    placeholder="กรุณาใส่ชื่อ Content"
                                    value={contentState?.name}
                                    onChange={handleChangeStateValue}
                                    sx={{
                                        "&.MuiFormControl-root": {
                                            mt: { lg: 6, xs: 4 },
                                            width: "100%",
                                        },
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid xs={12} lg={6} sx={{ p: 1, mt: { lg: 0, xs: 3 }, }}>
                            <Stack>
                                <Typography fontWeight={700}>{"Media"}</Typography>
                                <Dropzone
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
                                {mediaFile?.length != 0 && progress == 100 &&
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
                                    />}

                                <Box component="span" sx={{ p: 2, }}>
                                    <Typography>Scale</Typography>
                                    <Slider
                                        disabled={mediaFile?.length == 0 && progress !== 100}
                                        value={contentState?.scale}
                                        id="scale"
                                        name="scale"
                                        onChange={handleChangeStateValue}
                                        step={0.1}
                                        min={0.1}
                                        max={3}
                                        valueLabelDisplay="auto"
                                    />

                                    <Typography>Rotation</Typography>
                                    <Stack direction={'row'} >
                                        <Typography sx={{ mr: 2 }}>X</Typography>
                                        <Slider
                                            disabled={mediaFile?.length == 0 && progress !== 100}
                                            value={contentState?.rotationX}
                                            id="rotationX"
                                            name="rotationX"
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
                                            disabled={mediaFile?.length == 0 && progress !== 100}
                                            value={contentState?.rotationY}
                                            // defaultValue={90}
                                            id="rotationY"
                                            name="rotationY"
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
                                            disabled={mediaFile?.length == 0 && progress !== 100}
                                            value={contentState?.rotationZ}
                                            id="rotationZ"
                                            name="rotationZ"
                                            onChange={handleChangeStateValue}
                                            step={1}
                                            min={0}
                                            max={360}
                                            valueLabelDisplay="auto"
                                        />
                                    </Stack>
                                </Box>
                                <Typography>* สามารถดาวโหลดไฟล์ glb ได้ที่ <Link href={`https://sketchfab.com`} target='_blank' >sketchfab.com</Link></Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button type='submit' variant="contained" endIcon={<Publish />} sx={{ fontWeight: 700 }} 
                    //disabled={contentState?.name && mediaFile?.length != 0 ? false : true}
                    >Submit</Button>
                </DialogActions>
            </Box>
        </Dialog >
    );
};
export default ContentDialogCreate

