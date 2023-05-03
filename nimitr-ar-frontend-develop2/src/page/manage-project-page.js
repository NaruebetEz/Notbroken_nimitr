import { useState, useContext, useEffect } from "react";
import {
    Breadcrumbs,
    Container,
    Grid,
    IconButton,
    InputAdornment,
} from "@mui/material";


import axios from 'axios'


import { NavigateNext, ContentCopy, QrCodeScanner, OpenInNew } from "@mui/icons-material";
import { useParams } from 'react-router'
import { NimitrTextField } from "../component/ui/text-field";
import { SkeletonManageProjectPage } from "../component/manage-project-page/skeleton-manage-project-page";

import ContentList from "../component/manage-project-page/content-list";
import PreviewMarker from "../component/manage-project-page/preview-marker"
import PreviewMedia from "../component/manage-project-page/preview-media"
import PreviewQR from "../component/manage-project-page/preview-qr";

import AuthContext from "../contexts/AuthContext"

import contentAndMarker from "../graphql/queries/contentandmarker"
import contentbyUser from '../graphql/queries/contentbyUser'

import projectbyId from "../graphql/queries/projectbyId"

import { useQuery } from "@apollo/client"

const initialPreviewMarkerState = {
    markerName: '',
    markerUrl: '',
    status: false,
}

const initialPreviewMediaState = {
    mediaName: '',
    mediaUrl: '',
    status: false,
}


const URL_MARKERS = process.env.REACT_APP_GET_MARKER

export const ManageProjectPage = () => {
    const { user } = useContext(AuthContext)
    const params = useParams()

    const [previewQrCodeStatus, setPreviewQrCodeStatus] = useState(false);
    const [markerData, setMarkerData] = useState();

    const [previewMarkerStatus, setPreviewMarkerStatus] = useState(initialPreviewMarkerState);
    const [previewMediaStatus, setPreviewMediaStatus] = useState(initialPreviewMediaState);

    const { data: projectData, } = useQuery(projectbyId, {
        variables: {
            id: params?.projectId,
        },
    })



    // const { data: markerData, loading, refetch } = useQuery(markerbyAlive, {
    //     variables: {
    //         status: "MARKER_ALIVE"
    //     },
    //     fetchPolicy: 'network-only',
    // })

    const { data: contentData, loading, refetch } = useQuery(contentbyUser, {
        variables: {
            project: params?.projectId,
            status: "CONTENT_ALIVE"
        },
        fetchPolicy: 'cache-and-network',
    })

    console.log("CONTENT", contentData)

    useEffect(() => {
        fetchMarkers()
    }, [])

    const fetchMarkers = () => {
        axios.get(URL_MARKERS)
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                setMarkerData(res.data)
            })
    }

    console.log("MARKER", markerData)

    // console.log("CCC", contentData)
    const handleTogglePreviewQr = () => {
        setPreviewQrCodeStatus(!previewQrCodeStatus)
    }

    const handleOpenPreviewMedia = (url, name) => {
        setPreviewMediaStatus({
            ...previewMediaStatus,
            mediaName: name,
            mediaUrl: url,
            status: true,
        });
    };

    const handleClosePreviewMedia = () => {
        setPreviewMediaStatus(initialPreviewMediaState);
    };


    const handleOpenPreviewMarker = (url, name) => {
        setPreviewMarkerStatus({
            ...previewMarkerStatus,
            markerName: name,
            markerUrl: url,
            status: true,
        });
    };

    const handleClosePreviewMarker = () => {
        setPreviewMarkerStatus(initialPreviewMarkerState);
    };

    const handleCopyText = (url) => {
        navigator.clipboard.writeText(url);
    };


    // const { data: reponseContent, loading, refetch } = useQuery(contentAndMarker, {
    //     variables: {
    //         project: params?.projectId,
    //         statusmarker: "MARKER_ALIVE",
    //         statuscontent: "CONTENT_ALIVE"
    //     },
    //     fetchPolicy: 'cache-and-network'
    // })



    // const { data: reponseContent, loading, refetch } = useQuery(contentAndMarker, {
    //     variables: {
    //         project: params?.projectId,
    //         statusmarker: "MARKER_ALIVE",
    //         statuscontent: "CONTENT_ALIVE"
    //     },
    // })




    const handleRefetchContent = () => {
        fetchMarkers()
        refetch({
            project: params?.projectId,
            statusmarker: "MARKER_ALIVE",
            statuscontent: "CONTENT_ALIVE"
        })
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 3, }}>
            {loading ? <SkeletonManageProjectPage /> : <>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignContent="center"
                >
                    <NimitrTextField
                        type="url"
                        name="url"
                        id="url"
                        sx={{ width: "40%" }}
                        pattern="https://.*"
                        value={projectData?.projectId?.url}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">URL:</InputAdornment>
                            ),
                            endAdornment: (<>
                                <InputAdornment position="end">
                                    <IconButton onClick={handleCopyText(projectData?.projectId?.url)}>
                                        <ContentCopy />
                                    </IconButton>
                                </InputAdornment>
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePreviewQr}>
                                        <QrCodeScanner />
                                    </IconButton>
                                </InputAdornment>
                                <InputAdornment position="end">
                                    <IconButton as={'a'} target='_blank' href={projectData?.projectId?.url}>
                                        <OpenInNew />
                                    </IconButton>
                                </InputAdornment>
                            </>
                            ),
                        }}
                    />
                    {/* <QRCode value={`${DOMAIN}/render/${params?.projectId}`} size="250" /> */}


                    <Breadcrumbs
                        separator={<NavigateNext fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{ alignSelf: "center" }}
                    >
                        {/* {pathMainpage?.map((data) => (
                            <Link
                                color={theme.palette.primary.black}
                                underline="hover"
                                onClick={() => {
                                    handleChangePageState(data);
                                }}
                            >
                                {data}
                            </Link>
                        ))} */}
                    </Breadcrumbs>
                    {/* <Button variant="contained" sx={{ borderRadius: "16px" }} onClick={handleOpenCreateDialog}>
                        <Typography variant="body1" fontWeight={700}> New Content</Typography>
                    </Button> */}
                </Grid>
                <ContentList content={contentData?.contents} markerData={markerData} refetch={handleRefetchContent} handleOpenPreviewMedia={handleOpenPreviewMedia} handleOpenPreviewMarker={handleOpenPreviewMarker} projectId={params?.projectId} qr={projectData?.projectId?.imageurl} />
                {previewMarkerStatus?.status && <PreviewMarker url={previewMarkerStatus?.markerUrl} name={previewMarkerStatus?.markerName} onClosePrviewMarkerDialog={handleClosePreviewMarker} status={previewMarkerStatus?.status} />}
                {previewMediaStatus?.status && <PreviewMedia url={previewMediaStatus?.mediaUrl} name={previewMediaStatus?.mediaName} onClosePrviewMediaDialog={handleClosePreviewMedia} status={previewMediaStatus?.status} />}
                {previewQrCodeStatus && <PreviewQR onClosePrviewQrDialog={handleTogglePreviewQr} url={projectData?.projectId?.imageurl} status={previewQrCodeStatus} />}
            </>}
        </Container>
    );
};
