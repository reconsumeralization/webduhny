import { GuardDutyEvent, ThreatDetectionContext } from "./types";

export const processThreatScanResult = async (
    context: ThreatDetectionContext,
    eventDetail: GuardDutyEvent
) => {
    await context.security.withoutAuthorization(async () => {
        try {
            const scanStatus = eventDetail.scanResultDetails.scanResultStatus;
            const s3Object = eventDetail.s3ObjectDetails;

            const [[file]] = await context.fileManager.listFiles({
                limit: 1,
                where: {
                    key: s3Object.objectKey
                }
            });

            if (!file) {
                return;
            }

            const allConnections = await context.websockets.listConnections();

            if (scanStatus === "NO_THREATS_FOUND") {
                const newTags = file.tags.filter(tag => tag !== "threatScanInProgress");
                await context.fileManager.updateFile(file.id, {
                    tags: newTags,
                    savedBy: file.savedBy
                });

                await context.websockets.sendToConnections(allConnections, {
                    action: "fm.threatScan.noThreatFound",
                    data: {
                        id: file.id,
                        tags: newTags
                    }
                });

                return;
            }

            if (scanStatus === "THREATS_FOUND") {
                // Delete infected file.
                await context.fileManager.deleteFile(file.id);

                await context.websockets.sendToConnections(allConnections, {
                    action: "fm.threatScan.threatDetected",
                    data: {
                        id: file.id,
                        name: file.name
                    }
                });

                return;
            }

            // For all other outcomes, we delete the file, until better logic is implemented.
            await context.fileManager.deleteFile(file.id);

            await context.websockets.sendToConnections(allConnections, {
                action: "fm.threatScan.unsupported",
                data: {
                    id: file.id,
                    name: file.name
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    });
};
