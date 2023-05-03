//รอ database model!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



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
import RemoveContentMutaion from "../../graphql/mutations/removeContent"
import { DeleteOutline, Edit } from "@mui/icons-material";
import { useMutation } from "@apollo/client"

const headerTable = ["media", "name", "status", "manager"];

const ModelList = ({ contentData, refetch, handleOpenPreviewModel, toggleEditDialog, modelContent, setModelContent }) => {
    const theme = useTheme();
    const [removeContentMutation] = useMutation(RemoveContentMutaion)

    const handleEditModel = (contents) => {
        setModelContent({ ...modelContent, id: contents?._id, name: contents?.name, media: contents?.media.mediaUrl,status: contents?.contentStatus })
        toggleEditDialog()
    }

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
                    {contentData?.contents?.map((contents, index) => (
                        <TableRow
                            key={contents?._id}
                            sx={{
                                "&.MuiTableRow-root": {
                                    my: 2,
                                    overflow: 'scroll'
                                },
                            }}
                        >
                            <TableCell align="center">{contents?.name}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleOpenPreviewModel(contents?.media.mediaUrl, contents?.name)}>
                                    <Box component={'img'} src={contents?.media.mediaUrl} sx={{ width: '100px', height: '100px', p: 1, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '5px' }} />
                                </Button>
                            </TableCell> 

                            <TableCell align="center">{contents?.contentStatus}</TableCell>
                            <TableCell align="center"> 
                                 <Grid> 
                                    <Tooltip title="Edit Media">

                                        <IconButton
                                            sx={{
                                                backgroundColor: theme.palette.primary.lightGray,
                                                boxShadow: 5,
                                                m: 1,
                                            }}
                                            onClick={() => { handleEditModel(contents) }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove Content">

                                        <IconButton
                                            sx={{
                                                backgroundColor: theme.palette.primary.lightGray,
                                                boxShadow: 5,
                                                m: 1,
                                            }}
                                            onClick={handleRemoveContent(contents?._id)}
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
            {!contentData?.contents?.length &&
                <Paper elevation={3} sx={{ mt: 0, bgcolor: theme?.palette?.primary?.main, color: 'white', width: '100%', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <Typography variant='h3' fontWeight={700} >
                        เริ่มต้นสร้าง AR ของคุณ
                    </Typography>
                </Paper>
            } 
        </TableContainer>
    );
};

export default ModelList
