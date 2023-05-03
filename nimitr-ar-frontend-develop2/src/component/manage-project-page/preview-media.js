import {
    Button,
    CircularProgress,
    Dialog,
    IconButton,
    DialogContent,
    DialogTitle,
    Typography,
    useTheme,
    Box,
    Stack,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from "./gltf";


const PreviewMedia = ({ onClosePrviewMediaDialog, url, name, status, scale = 10, position = [0, 0, 0], waitBeforeShow = 5000 }) => {
    const theme = useTheme();
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShown(true);
        }, waitBeforeShow);
        return () => clearTimeout(timer);
    }, [waitBeforeShow]);

    return (
        <Dialog
            open={status}
            keepMounted
            maxWidth={'md'}
        >

            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center'
            }}>
                <Typography sx={{ justifyItems: "center", alignSelf: 'center' }}>{"Media"}</Typography>
                <IconButton onClick={onClosePrviewMediaDialog}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 5, width: '600px' }}>
                <Stack spacing={1} direction={'column'} sx={{ textAlign: 'center' }}>
                    {url &&
                        <Box sx={{ p: 1, width: '100%', height: '400px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '10px', alignItems: 'center', justifyContent: 'center', display: "flex" }}>

                            {isShown ? <Canvas>
                                <ambientLight intensity={0.3} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                                <pointLight position={[-10, -10, -10]} />
                                <Suspense fallback={null}>
                                    <GltfModel modelPath={url} scale={scale} position={position} />
                                    <OrbitControls />
                                </Suspense>
                            </Canvas> :
                                <CircularProgress size={'10rem'} />
                            }

                        </Box>
                    }
                    <Typography>{name}</Typography>
                </Stack>
            </DialogContent>

        </Dialog >
    );
};
export default PreviewMedia
