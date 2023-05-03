import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Stack,
    IconButton,
    Box,
    useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const PreviewMarker = ({ onClosePrviewMarkerDialog, url, name, status }) => {

    const theme = useTheme();
    return (
        <Dialog
            PaperProps={{
                sx: {
                    p: 2,
                }
            }}
            open={status}
            keepMounted
            maxWidth={'md'}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center'
            }}>
                <Typography sx={{ justifyItems: "center", alignSelf: 'center' }}>{"Marker"}</Typography>
                <IconButton onClick={onClosePrviewMarkerDialog}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <Stack spacing={1} direction={'column'} sx={{ alignItems: 'center' }}>
                    <Box component={'img'} src={url} sx={{ p: 1, width: '400px', height: '400px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '10px' }} />
                    <Typography>{name}</Typography>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
export default PreviewMarker
