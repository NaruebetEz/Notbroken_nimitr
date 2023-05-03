import { useState, useContext } from "react"
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material"
import { useQuery } from "@apollo/client"
import { ProjectList } from "../component/main-page/project-list"

import AuthContext from "../contexts/AuthContext"
import projectbyUser from "../graphql/queries/projectbyUser"
import { ProjectDialogCreate } from "../component/main-page/project-dialog-create"
import { SkeletonMainPage } from "../component/main-page/skeleton-main-page"

const initialProjectState = {
  id: '',
  name: '',
}


export const ModelMain = () => {
  const { user } = useContext(AuthContext)

  // const waitBeforeShow = 1000
  // const [isShownSkeleton, setIsShownSkeleton] = useState(false);
  const [dialogCreateProjectStatus, setDialogCreateProjectStatus] = useState(false);


  const [projectState, setProjectState] = useState(initialProjectState)
  const handleOpenCreateDialog = () => {
    setDialogCreateProjectStatus(true)
  };

  const handleCloseCreateDialog = () => {
    setDialogCreateProjectStatus(false)

  };


  const { data: projectData, loading, refetch } = useQuery(projectbyUser, {
    variables: {
      user: user?._id,
      status: "PROJECT_ALIVE"
    },
  })


  const refetchData = () => {
    refetch({
      user: user?._id,
      status: "PROJECT_ALIVE"
    })
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 3, }}>
      {loading ? <SkeletonMainPage /> : <>
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
            <Typography variant="body1" fontWeight={700}>newmodel</Typography>
          </Button>
        </Grid>
        <ProjectList project={projectData} refetch={refetchData} />
        <ProjectDialogCreate status={dialogCreateProjectStatus} onCloseDialog={handleCloseCreateDialog} refetch={refetchData} user={user} projectState={projectState} setProjectState={setProjectState} />
      </>
      }
    </Container>
  );
};
