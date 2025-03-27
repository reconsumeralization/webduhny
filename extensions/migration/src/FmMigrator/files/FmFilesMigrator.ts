import { CREATE_FILE, GET_PRESIGNED_POST_PAYLOAD, LIST_FILES } from "./graphql";
import { GqlClient } from "../../utils";

export class FmFilesMigrator {
    private readonly sourceGqlClient: GqlClient;
    private readonly targetGqlClient: GqlClient;

    constructor(sourceGqlClient: GqlClient, targetGqlClient: GqlClient) {
        this.sourceGqlClient = sourceGqlClient;
        this.targetGqlClient = targetGqlClient;
    }

    async run() {
        // Migrate files.
        const sourceFilesList = await this.sourceGqlClient.run(LIST_FILES).then(res => {
            return res.fileManager.listFiles;
        });

        if (sourceFilesList.error) {
        }

        if (sourceFilesList.data.length === 0) {
            console.log("No files to migrate.");
            return;
        }

        for (const sourceFile of [sourceFilesList.data[0]]) {
            // 1. Get presigned post payload
            const downloadedFile = await downloadFile(sourceFile);

            const s3PresignedPostPayload = await this.targetGqlClient
                .run(GET_PRESIGNED_POST_PAYLOAD, {
                    data: {
                        id: sourceFile.id,
                        size: sourceFile.size,
                        name: sourceFile.name,
                        type: sourceFile.type
                    }
                })
                .then(res => res.fileManager.getPreSignedPostPayload);

            // 2. Upload file to S3
            const uploadFileToS3Res = await uploadFileToS3(
                s3PresignedPostPayload.data.data,
                downloadedFile
            );

            const createFileRes = await this.targetGqlClient.run(CREATE_FILE, {
                data: {
                    id: sourceFile.id,
                    key: sourceFile.key,
                    name: sourceFile.name,
                    size: sourceFile.size,
                    type: sourceFile.type,
                    tags: sourceFile.tags,
                    aliases: sourceFile.aliases,
                    createdOn: sourceFile.createdOn,
                    createdBy: sourceFile.createdBy,
                    meta: sourceFile.meta,
                    location: sourceFile.location
                }
            });

            const { error } = createFileRes.fileManager.createFile;
            if (error) {
                console.log(`Failed to migrate file "${sourceFile.name}". Error:`, error);
            }
        }
    }
}

async function downloadFile(sourceFile: Record<string, any>) {
    const response = await fetch(sourceFile.src);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch ${sourceFile.src}: ${response.status} ${response.statusText}`
        );
    }

    const blob = await response.blob();
    return new File([blob], sourceFile.name);
}

const uploadFileToS3 = async (presignedPostData: Record<string, any>, file: any) => {
    try {
        const formData = new FormData();
        Object.keys(presignedPostData.fields).forEach(key => {
            formData.append(key, presignedPostData.fields[key]);
        });

        // Append the actual file last
        formData.append("file", file);

        const response = await fetch(presignedPostData.url, {
            method: "POST",
            body: formData
            // headers: formData.getHeaders(),
        });

        if (response.status === 204) {
            console.log("File uploaded successfully");
        } else {
            throw new Error(`Upload failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw error;
    }
};
