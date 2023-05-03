import { useState } from "react";

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Stack,
    Chip,
    IconButton,
    Paper,
    Button,
    useTheme,
    Tooltip,
    Typography,
} from "@mui/material";
import _ from 'lodash';
import RemoveContentMutaion from "../../graphql/mutations/removeContent"
import contentbyUser from "../../graphql/queries/contentbyUser";


import { useMutation, useQuery } from "@apollo/client"
import { DeleteOutline, Add, ModeEditOutline, GetApp } from "@mui/icons-material";
import ContentDialogCreate from "./content-dialog-create";
import ContentDialogEdit from "./content-dialog-edit";
import ContentDialogPreview from "./content-dialog-preview";




const headerTable = ["marker", "name", "media", "status", "manager"];

const initialMarkerState = {
    markerId: '',
    markerName: '',
    markerUrl: '',
}

const initialContentState = {
    contentId: '',
    name: '',
    scale: '',
    rotationX: '',
    rotationY: '',
    rotationZ: '',
    media: '',
    markerId: '',
    markerName: '',
    markerUrl: '',
}



const ContentList = ({ content, markerData, refetch, handleOpenPreviewMarker, handleOpenPreviewMedia, projectId, qr }) => {
    const theme = useTheme();
    const [removeContentMutation] = useMutation(RemoveContentMutaion)
    const [dialogCreateContentStatus, setDialogCreateContentStatus] = useState(false);
    const [dialogPreviewContentStatus, setDialogPreviewContentStatus] = useState(false);

    const [dialogEditContentStatus, setDialogEditContentStatus] = useState(false);

    const [markerSelect, setMarkerSelect] = useState(initialMarkerState);

    const [contentUpdateState, setContentUpdateState] = useState(initialContentState);

    // const { data: contentData, loading, refetch: refetchContent } = useQuery(contentbyUser, {
    //     variables: {
    //         project: projectId,
    //         status: "CONTENT_ALIVE"
    //     },
    // })

    console.log("CONTENT2", content)
    console.log("MARKER2", content)

    const arr = []
    markerData?.map((marker) => {
        if (content?.find(o => o?.marker?._id === marker?._id)) {
            var data = content?.find(o => o?.marker?._id === marker?._id)
            console.log("CONTENTxx", data)
            var merged = _.assign(marker, data);
            arr.push(merged)
        } else {
            arr.push(marker)
        }
    })

    console.log("MERGE_ARRAY:", arr)


    const handleOpenCreateDialog = (marker) => {
        setMarkerSelect({
            ...markerSelect, markerId: marker?._id,
            markerName: marker?.name,
            markerUrl: marker?.markerUrl,
        })
        setDialogCreateContentStatus(true);
    };

    const handleCloseCreateDialog = () => {
        setDialogCreateContentStatus(false);
    };

    const handleOpenPreviewDialog = async (marker, content) => {
        setMarkerSelect({
            ...markerSelect, markerId: marker?._id,
            markerName: marker?.name,
            markerUrl: marker?.markerUrl,
        })
        setContentUpdateState({
            ...contentUpdateState,
            contentId: content?._id,
            contentName: content?.name,
            scale: content?.scale,
            rotationX: content?.rotationX,
            rotationY: content?.rotationY,
            rotationZ: content?.rotationZ,
            media: content?.media,
            markerId: content?.marker?._id,
            markerName: content?.marker?.name,
            markerUrl: content?.marker?.markerUrl,
        })
        setDialogPreviewContentStatus(true);
    };

    const handleClosePreviewDialog = () => {
        setDialogPreviewContentStatus(false);
    };

    const handleOpenEditDialog = async (content) => {
        await setContentUpdateState({
            ...contentUpdateState,
            contentId: content?._id,
            name: content?.name,
            scale: content?.scale,
            rotationX: content?.rotationX,
            rotationY: content?.rotationY,
            rotationZ: content?.rotationZ,
            media: content?.media,
            markerId: content?.marker?._id,
            markerName: content?.marker?.name,
            markerUrl: content?.marker?.markerUrl,
        })
        setDialogEditContentStatus(true);
    };

    const handleCloseEditDialog = () => {
        setDialogEditContentStatus(false);
    };

    const handleRemoveContent = (ContentId) => async (e) => {
        e.preventDefault()
        try {
            const { data: responseRemoveContent } = await removeContentMutation({
                variables: {
                    _id: ContentId,
                    status: "CONTENT_DELETE"
                }
            })
            if (responseRemoveContent) {
                refetch()
            }
        } catch (error) {
            console.error(error)
        }
    }

    console.log("5555555");
    return (
        <TableContainer component={Paper} sx={{ mt: 2, maxHeight: '550px', boxShadow: 2 }}>
            <Table stickyHeader>
                <TableHead sx={{
                    '& .MuiTableCell-head': {
                        backgroundColor: theme.palette.primary.main,
                    }
                }}>
                    <TableRow>
                        {headerTable?.map((header) => (
                            <TableCell align="center" sx={{ fontWeight: 700 }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {markerData?.map((marker, index) => (
                        <TableRow
                            key={marker?._id}
                            sx={{
                                "&.MuiTableRow-root": {
                                    my: 2,
                                },
                            }}
                        >
                            {/* <TableCell align="center">{marker?.name}</TableCell> */}
                            <TableCell align="center">
                                <Tooltip title="Preview Marker">

                                    <Button onClick={() => handleOpenPreviewMarker(marker?.markerUrl, marker?.name)}>
                                        <Box component={'img'} src={marker?.markerUrl} sx={{ width: '100px', height: '100px', p: 1, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '5px' }} />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="center">
                                {arr[index]?.contentStatus ? <Typography variant="h5" >{arr[index]?.name}</Typography> : null}
                            </TableCell>
                            <TableCell align="center">
                                {arr[index]?.media?.name ?
                                    <Tooltip title="Preview Media">
                                        <Button onClick={() => handleOpenPreviewMedia(arr[index]?.media?.mediaUrl, arr[index]?.media?.name)}>
                                            {arr[index]?.media?.name}
                                        </Button>
                                    </Tooltip> : null}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>
                                {arr[index]?.contentStatus ? <Chip label="Active" color="success" sx={{ width: '100px' }} /> : <Chip label="Empty" color="primary" sx={{ width: '100px' }} />}
                            </TableCell>
                            <TableCell align="center">
                                <Grid>
                                    {arr[index]?.contentStatus ? <Stack direction={'row'} sx={{ justifyContent: 'center' }}>
                                        <Tooltip title="Download Content" >
                                            <IconButton
                                                sx={{
                                                    backgroundColor: theme.palette.primary.lightGray,
                                                    boxShadow: 5,
                                                    mr: 1,
                                                }}
                                                onClick={() => { handleOpenPreviewDialog(marker, arr[index]) }}
                                            >
                                                <GetApp />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Update Content" >
                                            <IconButton
                                                sx={{
                                                    backgroundColor: theme.palette.primary.lightGray,
                                                    boxShadow: 5,
                                                    mr: 1,
                                                }}
                                                onClick={() => { handleOpenEditDialog(arr[index]) }}
                                            >
                                                <ModeEditOutline />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Remove Content" >
                                            <IconButton
                                                sx={{
                                                    backgroundColor: theme.palette.primary.lightGray,
                                                    boxShadow: 5,
                                                    mr: 1,
                                                }}
                                                onClick={handleRemoveContent(arr[index]?._id)}
                                            >
                                                <DeleteOutline />
                                            </IconButton>
                                        </Tooltip>

                                    </Stack> :
                                        <Tooltip title="Create Content" >
                                            <IconButton
                                                sx={{
                                                    backgroundColor: theme.palette.primary.lightGray,
                                                    boxShadow: 5,
                                                    mr: 1,
                                                }}
                                                onClick={() => { handleOpenCreateDialog(marker) }}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Tooltip>}
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ContentDialogPreview status={dialogPreviewContentStatus} onCloseDialog={handleClosePreviewDialog} refetch={refetch} qr={qr} marker={markerSelect} content={contentUpdateState} />
            <ContentDialogCreate status={dialogCreateContentStatus} onCloseDialog={handleCloseCreateDialog} refetch={refetch} projectId={projectId} markerSelect={markerSelect} />
            <ContentDialogEdit status={dialogEditContentStatus} onCloseDialog={handleCloseEditDialog} refetch={refetch} projectId={projectId} markerSelect={markerSelect} contentUpdateState={contentUpdateState} setContentUpdateState={setContentUpdateState} handleOpenPreviewMedia={handleOpenPreviewMedia} />
            {!markerData?.length &&
                <Paper elevation={3} sx={{ mt: 0, bgcolor: theme?.palette?.primary?.main, color: 'white', width: '100%', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <Typography variant='h3' fontWeight={700} >
                        ไม่มี Marker พร้อมใช้งาน
                    </Typography>
                </Paper>
            }
        </TableContainer>
    );
};

export default ContentList
