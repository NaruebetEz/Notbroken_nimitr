import { useState } from "react";
import {
  ButtonBase,
  Tooltip,
  Box,
  Stack,
  IconButton,
  List,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import RemoveProjectMutaion from "../../graphql/mutations/removeProject"
import ProjectDialogEdit from "./project-dialog-edit";
import { useNavigate } from "react-router-dom";
import { ModeEditOutline } from "@mui/icons-material";
import { DeleteOutline } from "@mui/icons-material";
import { useMutation } from "@apollo/client"

const initialProjectState = {
  id: '',
  name: '',
}


export const ProjectList = ({ project, refetch, }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [projectState, setProjectState] = useState(initialProjectState)
  const [dialogEditProjectStatus, setDialogEditProjectStatus] = useState(false);
  const [removeProjectMutation] = useMutation(RemoveProjectMutaion)

  const handleRemoveProject = (projectId) => async (e) => {
    e.preventDefault()
    try {
      const { data: responseRemoveProject } = await removeProjectMutation({
        variables: {
          _id: projectId,
          status: "PROJECT_DELETE"
        }
      })
      if (responseRemoveProject) {
        refetch()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenEditDialog = (project) => {
    setProjectState({ ...projectState, name: project?.name, id: project?._id })
    setDialogEditProjectStatus(true);
  };

  const handleCloseEditDialog = () => {
    setDialogEditProjectStatus(false);
  };


  return (<>
    {!project?.projects?.length ?
      <Paper elevation={3} sx={{ mt: 5, bgcolor: theme?.palette?.primary?.main, width: '100%', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }} >
        <Typography variant='h3' fontWeight={700} >
          เริ่มต้น Project ของคุณ
        </Typography>

      </Paper> : <List>
        {project?.projects?.map((project, index) => (
          <Paper
            key={project?._id}
            sx={{
              my: 2,
              backgroundColor: theme?.palette?.primary?.lightGray,
              width: "100%",
              borderRadius: "16px",
              height: "100%",
            }}
          >
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}
            >
              <ButtonBase
                sx={{ ml: 6, width: '100%', justifyContent: 'start' }}
                onClick={() => { navigate(`/project/${project?._id}`) }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {index + 1}.{project?.name}
                </Typography>
              </ButtonBase>
              <Box sx={{ p: 2, }}>
                <Tooltip title="Edit Project" >

                  <IconButton
                    sx={{
                      backgroundColor: theme.palette.primary.lightGray,
                      boxShadow: 5,
                      m: 1,
                    }}
                    onClick={() => { handleOpenEditDialog(project) }}
                  >
                    <ModeEditOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove Project" >
                  <IconButton
                    sx={{
                      backgroundColor: theme.palette.primary.lightGray,
                      boxShadow: 5,
                      m: 1,
                    }}
                    onClick={handleRemoveProject(project?._id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>

              </Box>
            </Stack>
          </Paper>
        ))}
        <ProjectDialogEdit status={dialogEditProjectStatus} onCloseDialog={handleCloseEditDialog} refetch={refetch} projectState={projectState} setProjectState={setProjectState} />
      </List>
    }
  </>
  );
};
