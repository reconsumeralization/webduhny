import React, { useState, useCallback, SyntheticEvent } from "react";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { usePage } from "~/pageEditor/hooks/usePage";
import { PageAtomType } from "~/pageEditor/state";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions";
import { Heading, Input, Tooltip } from "@webiny/admin-ui";

declare global {
    interface Window {
        Cypress: any;
    }
}

interface PageInfo {
    pageTitle: string;
    pageVersion: number;
    pageLocked: boolean;
}

const extractPageInfo = (page: PageAtomType): PageInfo => {
    const { title, version, locked } = page;
    return {
        pageTitle: title as string,
        pageVersion: version,
        pageLocked: locked
    };
};

export const Title = () => {
    const handler = useEventActionHandler();
    const [page] = usePage();
    const { showSnackbar } = useSnackbar();
    const { pageTitle, pageVersion } = extractPageInfo(page);
    const [editTitle, setEdit] = useState<boolean>(false);
    const [stateTitle, setTitle] = useState<string | null>(null);
    let title = stateTitle === null ? pageTitle : stateTitle;

    const updatePage = (data: Partial<PageAtomType>) => {
        handler.trigger(
            new UpdateDocumentActionEvent({
                history: false,
                document: data,
                onFinish: () => {
                    showSnackbar(`Page title updated successfully!`);
                }
            })
        );
    };

    const enableEdit = useCallback(() => setEdit(true), []);

    const onBlur = useCallback(() => {
        if (title === "") {
            title = "Untitled";
            setTitle(title);
        }
        setEdit(false);
        updatePage({ title });
    }, [title]);

    const onKeyDown = useCallback(
        (e: SyntheticEvent<HTMLInputElement>) => {
            // @ts-expect-error
            switch (e.key) {
                case "Escape":
                    e.preventDefault();
                    setEdit(false);
                    setTitle(pageTitle);
                    break;
                case "Enter":
                    let title = e.currentTarget.value;
                    if (!title) {
                        title = "Untitled";
                        setTitle(title);
                    }

                    e.preventDefault();
                    setEdit(false);

                    updatePage({ title: title });
                    break;
                default:
                    return;
            }
        },
        [title, pageTitle]
    );

    // Disable autoFocus because for some reason, blur event would automatically be triggered when clicking
    // on the page title when doing Cypress testing. Not sure if this is RMWC or Cypress related issue.
    const autoFocus = !window.Cypress;

    return editTitle ? (
        <div data-testid="pb-editor-page-title">
            <Input
                size={"md"}
                autoFocus={autoFocus}
                value={title}
                onChange={setTitle}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
            />
        </div>
    ) : (
        <div className={"wby-flex wby-items-center wby-gap-xs wby-w-full"}>
            <Tooltip
                side={"bottom"}
                content={"Rename"}
                trigger={
                    <Heading
                        level={5}
                        className={
                            "wby-border-sm wby-border-transparent hover:wby-border-neutral-muted"
                        }
                        data-testid="pb-editor-page-title"
                        onClick={enableEdit}
                    >
                        {title}
                    </Heading>
                }
            />
            <div className={"wby-text-neutral-muted"}>(v{pageVersion})</div>
        </div>
    );
};
