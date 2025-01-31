import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { IncomingGenericData, useWebsockets } from "@webiny/app-websockets";
import { useSnackbar } from "@webiny/app-admin";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";

const Bold = styled.span`
    font-weight: bold;
`;

interface UpdateFile extends IncomingGenericData {
    action: "fm.updateFile";
    data: {
        id: string;
        tags: string[];
    };
}

interface DeleteFile extends IncomingGenericData {
    action: "fm.threatDetected";
    data: {
        id: string;
        name: string;
    };
}

export const HandleWebsocketMessages = () => {
    const { showErrorSnackbar } = useSnackbar();
    const websockets = useWebsockets();
    const fmView = useFileManagerView();
    const fmViewRef = useRef(fmView);
    fmViewRef.current = fmView;

    useEffect(() => {
        const updateFile = websockets.onMessage<UpdateFile>("fm.updateFile", async message => {
            const { id, ...data } = message.data;

            await fmViewRef.current.updateFile(id, data, {
                localUpdate: true
            });
        });

        const deleteFile = websockets.onMessage<DeleteFile>("fm.threatDetected", async message => {
            const { id, name } = message.data;

            await fmViewRef.current.deleteFile(id, {
                localDelete: true
            });

            showErrorSnackbar(
                <span>
                    A threat was detected in file <Bold>{name}</Bold>, and it was automatically
                    deleted!
                </span>
            );
        });

        return () => {
            updateFile.off();
            deleteFile.off();
        };
    }, []);

    return null;
};
