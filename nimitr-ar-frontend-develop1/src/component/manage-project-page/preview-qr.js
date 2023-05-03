import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Stack,
    Box,
    useTheme,
} from "@mui/material";

import QRCode from "react-qr-code";


const PreviewQR = ({ onClosePrviewQrDialog, url, status }) => {

    const theme = useTheme();
    // console.log("LOGGG", onClosePrviewMarkerDialog)
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
            onClose={onClosePrviewQrDialog}
        >
            <DialogTitle id="alert-dialog-title">
                <Typography>{"QR"}</Typography>
            </DialogTitle>
            <DialogContent >
                <Stack spacing={1} direction={'column'} sx={{ alignItems: 'center', p: 4, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '5px' }}>
                    <Box component={'img'} src={url} sx={{ p: 1, width: '400px', height: '400px' }} />

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClosePrviewQrDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
export default PreviewQR
