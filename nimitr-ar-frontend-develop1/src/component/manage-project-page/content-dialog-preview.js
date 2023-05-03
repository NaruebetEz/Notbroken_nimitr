import { useRef, } from 'react';
import * as htmlToImage from 'html-to-image';

import {
    Box,
    Button,
    Dialog,
    useTheme,
    IconButton,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Close, Download } from "@mui/icons-material";


const ContentDialogPreview = ({ status, onCloseDialog, refetch, qr, marker, content }) => {
    const theme = useTheme();
    const domEl = useRef(null);

    const handleDowloadImage = async () => {
        const dataUrl = await htmlToImage.toJpeg(domEl.current);

        // download image
        const link = document.createElement('a');
        link.download = `${content?.contentName}.png`
        link.href = dataUrl;
        link.click();
    }

    // const html = `<!doctype html>
    //     <html lang="en-US">
    //     <head>
    //         <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    //         <title>Ceart</title>
    //         <link href="https://fonts.googleapis.com/css?family=Satisfy" rel="stylesheet">
    //         <meta name="description" content="Reset Password Email Template.">
    //         <style type="text/css">
    //             @media print {
    //                 html,
    //                 body {
    //                     margin: 0;
    //                 }
    //             }

    //             .marker_img img {
    //                 float: left;
    //                 width: 50%;
    //                 height: auto;
    //                 margin: auto;
    //                 padding: 5px;
    //             }
    //             .qr_img img {
    //                 float: right;
    //                 border: 2px solid ${theme.palette.primary.main};
    //                 border-radius: 25px;
    //                 width: 50%;
    //                 height: auto;
    //             }
    //             .text_title{
    //                 margin-top: 55px;

    //             }
    //             html,
    //             body {
    //                 margin: 0;
    //             }
    //         </style>
    //     </head>
    //     <body>

    //         <div align="center" class="marker_img">
    //             <img src="${marker?.markerUrl}" alt="logo">
    //         </div>
    //         <div align="center" class="qr_img">
    //             <img src="${qr}" alt="logo">
    //         </div>
    //         <div align="center"  class="text_title">
    //             Nimitr.art by Faculty of Science, PSU & Stream South Technology Co.ltd
    //         </div>
    //     </body>
    //     </html>`


    return (
        <Dialog
            PaperProps={{
                sx: {
                    p: 2
                }
            }}
            open={status}
            keepMounted
            maxWidth={'xl'}
        >

            <DialogTitle id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItem: 'center'
                }}>

                <Typography sx={{ justifyItems: "center", alignSelf: 'center' }}>{`${content?.contentName}`}</Typography>
                <IconButton onClick={onCloseDialog}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box align='center' mt={'20'} minHeight={'50vh'}>
                    {/* {renderHTML(html)} */}
                    <div id="domEl" ref={domEl}
                        style={{
                            backgroundColor: 'white',
                            width: '1000px',
                            height: '400px',
                        }}
                    >
                        <div style={{
                            display: 'flex', flexWrap: 'nowrap',
                            flexDirection: 'row',
                            width: '1000px',
                            height: '350px',
                            padding: '10px',
                            placeContent: 'center'
                        }}>

                            <div className="qr_img" style={{
                                width: '300px',
                                height: '300px',
                                marginRight: '15px',
                                textAlign: 'start'

                            }}>
                                <a style={{ padding: '5px' }}>{`(1) Scan Me`}</a>
                                <img src={`${qr}`} alt="logo" style={{
                                    width: '300px',
                                    height: '300px',
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    borderRadius: '5px',
                                }} />
                            </div>

                            <div style={{
                                width: '300px',
                                height: '300px',
                                marginRight: '15px',
                                textAlign: 'start'
                            }}>
                                <a style={{ padding: '5px' }}>{`(2) Look at me through your phone`}</a>
                                <img src={`${marker?.markerUrl}`} alt="logo" style={{
                                    width: '300px',
                                    height: '300px',
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    borderRadius: '5px',
                                }} />
                            </div>
                        </div>

                        <div align="center" className="text_title"
                            style={{
                                textAlign: 'center',
                                gridColumn: '1 / span 4',
                                gridRow: '4',
                            }}>
                            Nimitr.art by Faculty of Science, PSU & Stream South Technology Co.ltd
                        </div>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDowloadImage} variant='contained' sx={{ fontWeight: 700 }} endIcon={<Download />}>Download</Button>

            </DialogActions>
        </Dialog>
    );
};

export default ContentDialogPreview;