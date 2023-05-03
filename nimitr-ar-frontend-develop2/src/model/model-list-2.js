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
    IconButton,
    Paper,
    Button,
    useTheme,
    Typography,
    Tooltip,
} from "@mui/material";
import RemoveMarkerMutaion from "../graphql/mutations/removeMarker"
import RemoveContentMutaion from "../graphql/mutations/removeContent"
import { DeleteOutline, Edit } from "@mui/icons-material";
import { useMutation } from "@apollo/client"

const headerTable = ["name", "marker", "no", "status", "manager"];

const MarkerList = ({ markerData, refetch, handleOpenPreviewMarker, toggleEditDialog, markerContent, setMarkerContent }) => {
    const theme = useTheme();
    const [removeContentMutaion] = useMutation(RemoveContentMutaion)

    const handleEditMarker = (marker) => {
        setMarkerContent({ ...markerContent, id: marker?._id, name: marker?.name, markerNo: marker?.markerNo, markerUrl: marker?.markerUrl, markerPattern: marker?.markerPattern, status: marker?.markerStatus })
        toggleEditDialog()
    }

    const handleRemoveMarker = (MarkerId) => async (e) => {
        e.preventDefault()
        try {
            const { data: responseRemoveMarker } = await removeContentMutaion({
                variables: {
                    _id: MarkerId,
                    status: "MARKER_DELETE"
                }
            })
            if (responseRemoveMarker) {
                refetch()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TableContainer component={Paper}
            sx={{
                mt: 2,
                maxHeight: '550px',
                boxShadow: 2
            }}>
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
                    {markerData?.markers?.map((marker, index) => (
                        <TableRow
                            key={marker?._id}
                            sx={{
                                "&.MuiTableRow-root": {
                                    my: 2,
                                    overflow: 'scroll'
                                },
                            }}
                        >
                            <TableCell align="center">{marker?.name}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleOpenPreviewMarker(marker?.markerUrl, marker?.name)}>
                                    <Box component={'img'} src={marker?.markerUrl} sx={{ width: '100px', height: '100px', p: 1, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '5px' }} />
                                </Button>
                            </TableCell>
                            {/* <TableCell align="center">{marker?.markerPattern}</TableCell> */}
                            <TableCell align="center">{marker?.markerNo}</TableCell>
                            <TableCell align="center">{marker?.markerStatus}</TableCell>
                            <TableCell align="center">
                                <Grid>
                                    <Tooltip title="Edit Marker">

                                        <IconButton
                                            sx={{
                                                backgroundColor: theme.palette.primary.lightGray,
                                                boxShadow: 5,
                                                m: 1,
                                            }}
                                            onClick={() => { handleEditMarker(marker) }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove Marker">

                                        <IconButton
                                            sx={{
                                                backgroundColor: theme.palette.primary.lightGray,
                                                boxShadow: 5,
                                                m: 1,
                                            }}
                                            onClick={handleRemoveMarker(marker?._id)}
                                        >
                                            <DeleteOutline />
                                        </IconButton>
                                    </Tooltip>

                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {!markerData?.markers?.length &&
                <Paper elevation={3} sx={{ mt: 0, bgcolor: theme?.palette?.primary?.main, color: 'white', width: '100%', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <Typography variant='h3' fontWeight={700} >
                        เริ่มต้นสร้าง AR ของคุณ
                    </Typography>
                </Paper>
            }
        </TableContainer>
    );
};

export default MarkerList
