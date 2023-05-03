
import {
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";
import UpdateProjectMutaion from "../../graphql/mutations/updateProject"

import { NimitrTextField } from "../ui/text-field";
import { useMutation } from "@apollo/client"
import { Close } from "@mui/icons-material";




const ProjectDialogEdit = ({ status, onCloseDialog, refetch, projectState, setProjectState }) => {

    const [updateProjectMutaion] = useMutation(UpdateProjectMutaion)

    const handleUpdateProject = async (e) => {
        e.preventDefault()
        // console.log("NAME", projectCreateState)

        try {
            const { data: responseUpdateProject } = await updateProjectMutaion({
                variables: {
                    id: projectState?.id,
                    name: projectState?.name,
                }
            })
            if (responseUpdateProject) {
            }
        } catch (error) {
            console.error(error)
        }
        handleRefresh()
    }

    const handleRefresh = () => {
        refetch()
        onCloseDialog()
    }

    const handleChangeStateValue = (e) => {
        setProjectState({ ...projectState, [e.target.name]: e.target.value })
    }

    return (
        <Dialog
            PaperProps={{
                sx: {
                    p: 1
                }
            }}
            open={status}
            keepMounted
            maxWidth={'md'}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItem: 'center'
                }}>
                <Typography sx={{ justifyItems: "center", alignSelf: 'center', fontWeight: 900 }}>{"Project"}</Typography>
                <IconButton onClick={handleRefresh}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleUpdateProject}>
                <DialogContent sx={{ pt: 0, pb: 0 }}>
                    <NimitrTextField
                        margin="normal"
                        required
                        id="name"
                        name="name"
                        fullWidth
                        placeholder="กรุณาใส่ชื่อ Project"
                        value={projectState?.name}
                        onChange={handleChangeStateValue}
                        sx={{
                            "&.MuiFormControl-root": {
                                mt: 0,
                                width: "400px"
                            },
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant='contained' sx={{ fontWeight: 700, }} disabled={!projectState?.name} >Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default ProjectDialogEdit