import React from "react";
import get from "lodash/get";
import { useRouter } from "@webiny/react-router";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as ListViewIcon } from "@webiny/icons/list.svg";
import {
    GET_CONTENT_MODEL,
    GetCmsModelQueryResponse,
    GetCmsModelQueryVariables
} from "~/admin/graphql/contentModels";
import { useModelEditor } from "~/admin/hooks";
import { IconButton, Tooltip } from "@webiny/admin-ui";

const t = i18n.namespace("app-headless-cms/admin/editor/top-bar/save-button");

const CreateContentButton = () => {
    const router = useRouter();
    const { data, apolloClient } = useModelEditor();

    const getQuery = apolloClient.readQuery<GetCmsModelQueryResponse, GetCmsModelQueryVariables>({
        query: GET_CONTENT_MODEL,
        variables: {
            modelId: data.modelId
        }
    });
    const fields = get(getQuery, "getContentModel.data.fields", []);
    const disableViewContent = fields.length === 0;
    const message = disableViewContent
        ? "To view the entries, you first need to add a field and save the form"
        : "View entries";

    return (
        <Tooltip
            content={t`{message}`({ message })}
            side={"bottom"}
            trigger={
                <IconButton
                    icon={<ListViewIcon />}
                    onClick={() => router.history.push(`/cms/content-entries/${data.modelId}`)}
                    disabled={disableViewContent}
                    variant={"ghost"}
                />
            }
        />
    );
};

export default CreateContentButton;
