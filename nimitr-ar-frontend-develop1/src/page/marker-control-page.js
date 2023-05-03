import { useState, useContext, } from "react";
import {
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Typography,
} from "@mui/material";


import { NavigateNext } from "@mui/icons-material";

import { SkeletonManageProjectPage } from "../component/manage-project-page/skeleton-manage-project-page";

import MarkerDialogCreate from "../component/marker-control-page/marker-dialog-create";
import MarkerDialogEdit from "../component/marker-control-page/marker-dialog-edit";
import MarkerList from "../component/marker-control-page/marker-list";
import PreviewMarker from "../component/manage-project-page/preview-marker"


import AuthContext from "../contexts/AuthContext"
import markers from "../graphql/queries/markers"
import { useQuery } from "@apollo/client"

const initialPreviewMarkerState = {
    markerName: '',
    markerUrl: '',
    status: false,
}

const initialMarkerState = {
    id: '',
    name: '',
    markerUrl: '',
    markerPattern: '',
    status: false,
}
const DOMAIN = process.env.REACT_APP_DOMAIN

export const MarkerControlPage = () => {
    const { user } = useContext(AuthContext)

    const [dialogCreateMarkerStatus, setDialogCreateMarkerStatus] = useState(false);
    const [markerContent, setMarkerContent] = useState(initialMarkerState)
    const [previewMarkerStatus, setPreviewMarkerStatus] = useState(initialPreviewMarkerState);
    const [dialogEditMarkerStatus, setDialogEditMarkerStatus] = useState(false);


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

    const handleToggleEditDialog = () => {
        setDialogEditMarkerStatus(!dialogEditMarkerStatus);
    };

    const handleOpenCreateDialog = () => {
        setDialogCreateMarkerStatus(true);
    };

    const handleCloseCreateDialog = () => {
        setDialogCreateMarkerStatus(false);
    };


    const { data: markerData, loading, refetch } = useQuery(markers)
    console.log("MMMMM", markerData)

    const handleRefetchContent = () => {
        refetch()
        setMarkerContent(initialMarkerState)
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
                    {/* <NimitrTextField
                        type="url"
                        name="url"
                        id="url"
                        sx={{ width: "40%" }}
                        pattern="https://.*"
                        value={`${DOMAIN}/render/${params?.projectId}`}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"> URL:</InputAdornment>
                            ),
                            endAdornment: (<>
                                <InputAdornment position="end">
                                    <IconButton onClick={handleCopyText(`${DOMAIN}/render/${params?.projectId}`)}>
                                        <ContentCopy />
                                    </IconButton>
                                </InputAdornment>
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePreviewQr}>
                                        <QrCodeScanner />
                                    </IconButton>
                                </InputAdornment>
                            </>
                            ),
                        }}
                    /> */}
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
                    <Button variant="contained" sx={{ borderRadius: "16px" }} onClick={handleOpenCreateDialog}>
                        <Typography variant="body1" fontWeight={700}> New Marker</Typography>
                    </Button>
                </Grid>
                <MarkerList
                    markerData={markerData}
                    refetch={handleRefetchContent}
                    handleOpenPreviewMarker={handleOpenPreviewMarker}
                    toggleEditDialog={handleToggleEditDialog}
                    markerContent={markerContent}
                    setMarkerContent={setMarkerContent} />
                <MarkerDialogCreate
                    status={dialogCreateMarkerStatus}
                    onCloseDialog={handleCloseCreateDialog}
                    refetch={handleRefetchContent} />
                <MarkerDialogEdit
                    status={dialogEditMarkerStatus}
                    toggleDialog={handleToggleEditDialog}
                    refetch={handleRefetchContent}
                    markerContent={markerContent}
                    setMarkerContent={setMarkerContent} />
                {previewMarkerStatus?.status && <PreviewMarker url={previewMarkerStatus?.markerUrl} name={previewMarkerStatus?.markerName} onClosePrviewMarkerDialog={handleClosePreviewMarker} status={previewMarkerStatus?.status} />}
            </>}
        </Container>
    );
};
