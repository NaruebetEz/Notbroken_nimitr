import { useMemo } from "react";

import { useParams } from 'react-router'

import contentbyUser from "../graphql/queries/contentbyUser"
import { useQuery } from "@apollo/client"



export const RenderPage = () => {
    const params = useParams()

    const { data: contentData } = useQuery(contentbyUser, {
        variables: {
            project: params?.projectId,
            status: "CONTENT_ALIVE"
        },
    })
    const page = useMemo(() => {
        return (

            <a-scene arjs='detectionMode: mono_and_matrix; matrixCodeType: 3x3;'
                renderer="logarithmicDepthBuffer: true;"
                vr-mode-ui="enabled: false"
                gesture-detector
            >
                {contentData?.contents?.map((content, index) => (
                    <>
                        {content?.marker?.markerPattern &&
                            <a-marker
                                emitevents="true"
                                cursor="fuse: false; rayOrigin: mouse;"
                                type='barcode'
                                value={`${content?.marker?.markerNo}`}>
                                <a-entity
                                    position='0 0 0'
                                    rotation={`${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}`}
                                    scale={`${content?.scale} ${content?.scale} ${content?.scale}`}
                                    gltf-model={`${content?.media?.mediaUrl}`}
                                ></a-entity>
                            </a-marker>
                        }
                    </>
                ))
                }
                <a-entity camera></a-entity>
            </a-scene>
        )
    }, [contentData])

    return (
        <div>
            <body style={{ margin: 0, overflow: 'hidden' }}>
                {page}
            </body>
        </div>
    );
};
