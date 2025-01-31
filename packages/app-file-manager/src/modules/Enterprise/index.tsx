import React from "react";
import { FileManagerViewConfig } from "~/index";
import { THREAT_SCAN } from "~/modules/Enterprise/constants";
import { ThreatScanInProgress } from "./components/ThreatScanInProgress";
import { HandleWebsocketMessages } from "./HandleWebsocketMessages";

const { Grid } = FileManagerViewConfig.Browser;

const DisableFileWhileThreatScanInProgress = Grid.Item.createDecorator(Original => {
    return function Item(props) {
        if (props.file.tags.includes(THREAT_SCAN.IN_PROGRESS)) {
            return <Original {...props} fileBody={<ThreatScanInProgress />} />;
        }
        return <Original {...props} />;
    };
});

// TODO: check WCP license
export const EnterpriseModule = () => {
    return (
        <>
            <DisableFileWhileThreatScanInProgress />
            <FileManagerViewConfig>
                <HandleWebsocketMessages />
            </FileManagerViewConfig>
        </>
    );
};
