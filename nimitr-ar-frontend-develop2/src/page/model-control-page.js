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

import MediaDialogEdit from "../component/model-control-page/media-dialog-edit";
import ModelList from "../component/model-control-page/model-list";
import MediaDialogCreate from "../component/model-control-page/media-dialog-create";
import PreviewMedia from "../component/manage-project-page/preview-media";


import AuthContext from "../contexts/AuthContext"
import contentbyUser from "../graphql/queries/contentbyUser"
import { useQuery } from "@apollo/client"

const initialPreviewContentState = {
    mediaName: '',
    mediarUrl: '',
    status: false,
}

const initialContentState = {
    contentId: '',
    name: '',
    scale: '',
    rotationX: '',
    rotationY: '',
    rotationZ: '',
    media: '',
    status: false,
}

const DOMAIN = process.env.REACT_APP_DOMAIN

export const ModelControlPage = () => {
    const { user } = useContext(AuthContext)

    const [dialogCreateContentStatus, setDialogCreateContentStatus] = useState(false);
    const [mediaContent, setMediaContent] = useState(initialContentState)
    const [previewContentStatus, setPreviewContentStatus] = useState(initialPreviewContentState);
    const [dialogEditContentStatus, setDialogEditContentStatus] = useState(false);


    const handleOpenPreviewContent = (url, name) => {
        setPreviewContentStatus({
            ...previewContentStatus,
            mediaName: name,
            mediaUrl: url,
            status: true,
        });
    };

    const handleClosePreviewContent = () => {
        setPreviewContentStatus(initialPreviewContentState);
    };

    const handleToggleEditDialog = () => {
        setDialogEditContentStatus(!dialogEditContentStatus);
    };

    const handleOpenCreateDialog = () => {
        setDialogCreateContentStatus(true);
    };

    const handleCloseCreateDialog = () => {
        setDialogCreateContentStatus(false);
    };


    const { data: contentData, loading, refetch } = useQuery(contentbyUser)

    const handleRefetchContent = () => {
        refetch()
        setMediaContent(initialContentState)
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 3, }}>
            {
            loading ? <SkeletonManageProjectPage /> : 
            <>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignContent="center"
                >
                    <Breadcrumbs
                        separator={<NavigateNext fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{ alignSelf: "center" }}
                    >
                        
                    </Breadcrumbs>
                    <Button variant="contained" sx={{ borderRadius: "16px" }}onClick={handleOpenCreateDialog} >
                        <Typography variant="body1" fontWeight={700}> New Media</Typography>
                    </Button>
                </Grid> 


                <ModelList
                    contentData={contentData}
                    refetch={handleRefetchContent}
                    handleOpenPreviewContent={handleOpenPreviewContent}
                    toggleEditDialog={handleToggleEditDialog}
                    mediaContent={mediaContent}
                    setMediaContent={setMediaContent} 
                    />




                <MediaDialogCreate
                    status={dialogCreateContentStatus}
                    onCloseDialog={handleCloseCreateDialog}
                    refetch={handleRefetchContent} 
                    />
                <MediaDialogEdit
                    status={dialogEditContentStatus}
                    toggleDialog={handleToggleEditDialog}
                    refetch={handleRefetchContent}
                    mediaContent={mediaContent}
                    setMediaContent={setMediaContent} /> 
                {previewContentStatus?.status && <PreviewMedia url={previewContentStatus?.mediarUrl} name={previewContentStatus?.mediaName} onClosePrviewContentDialog={handleClosePreviewContent} status={previewContentStatus?.status} />}
            </>}
        </Container>
    );
};
