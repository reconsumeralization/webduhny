import React from "react";
import { Button } from "@webiny/admin-ui";
import { useNavigate } from "@webiny/react-router";
import { HigherOrderComponent } from "@webiny/app-admin";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as AddTaskIcon } from "@webiny/icons/add_task.svg";
import { useContentReviewId } from "./useContentReviewId";
import { routePaths } from "~/utils";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms/";

const t = i18n.ns("app-apw/cms/publish-entry");

const { Actions, ContentEntry } = ContentEntryEditorConfig;

export const DecoratePublishEntryAction = Actions.ButtonAction.createDecorator(OriginalAction => {
    const EntryReviewButton = ({ children }: { children: JSX.Element }) => {
        const { entry, contentModel: model } = ContentEntry.useContentEntry();
        const contentReviewId = useContentReviewId(entry.id, model);
        const navigate = useNavigate();

        if (!contentReviewId) {
            return children;
        }

        return (
            <Button
                variant={"primary"}
                icon={<AddTaskIcon />}
                text={t`Entry Review`}
                onClick={() =>
                    navigate(`${routePaths.CONTENT_REVIEWS}/${encodeURIComponent(contentReviewId)}`)
                }
            />
        );
    };

    return function PublishEntryButton(props) {
        if (props.name === "publish" && props.element) {
            return (
                <OriginalAction
                    {...props}
                    element={<EntryReviewButton>{props.element}</EntryReviewButton>}
                />
            );
        }

        return <OriginalAction {...props} />;
    };
});

export const EntryRevisionListItem: HigherOrderComponent = OriginalRenderer => {
    return function EntryRevisionListItemGraphic(props) {
        const { entry, contentModel: model } = ContentEntry.useContentEntry();

        const contentReviewId = useContentReviewId(entry.id, model);

        if (contentReviewId && entry.meta.status === "draft") {
            return <OriginalRenderer {...props} icon={<AddTaskIcon />} text={t`Entry Review`} />;
        }

        return <OriginalRenderer {...props} />;
    };
};
