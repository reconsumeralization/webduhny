import React, { useCallback, useState } from "react";
import { useFormEditor } from "~/admin/components/FormEditor";
/**
 * Package react-hotkeyz does not have types.
 */
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { i18n } from "@webiny/app/i18n";
import { Input, Tag, Text, Tooltip } from "@webiny/admin-ui";
const t = i18n.namespace("FormEditor.Name");

declare global {
    interface Window {
        Cypress: any;
    }
}

export const Name = () => {
    const { state, setData } = useFormEditor();
    const [localName, setLocalName] = useState("");
    const [editingEnabled, setEditing] = useState<boolean>(false);

    const cancelChanges = useCallback(() => {
        setEditing(false);
    }, []);

    const startEditing = useCallback(() => {
        setLocalName(state.data.name);
        setEditing(true);
    }, [state.data]);

    const saveTitle = useCallback(
        (event: React.SyntheticEvent) => {
            event.preventDefault();
            setData(data => {
                data.name = localName || "";
                return data;
            });
            setEditing(false);
        },
        [localName]
    );

    useHotkeys({
        zIndex: 100,
        keys: {
            "alt+cmd+enter": startEditing
        }
    });

    useHotkeys({
        zIndex: 101,
        disabled: !editingEnabled,
        keys: {
            esc: (event: React.KeyboardEvent) => {
                event.preventDefault();
                cancelChanges();
            },
            enter: saveTitle
        }
    });

    // Disable autoFocus because for some reason, blur event would automatically be triggered when clicking
    // on the page title when doing Cypress testing. Not sure if this is RMWC or Cypress related issue.
    const autoFocus = !window.Cypress;

    if (editingEnabled) {
        return (
            <Input
                autoFocus={autoFocus}
                value={localName}
                onChange={setLocalName}
                onBlur={saveTitle}
                variant={"ghost"}
                size={"md"}
            />
        );
    }

    return (
        <div className={"wby-flex wby-items-center wby-gap-sm"}>
            <Tooltip
                side={"bottom"}
                content={<span>{t`Rename`}</span>}
                trigger={
                    <Text
                        size={"lg"}
                        className={
                            "wby-p-xs wby-border-sm wby-border-neutral-base wby-rounded-md hover:wby-border-neutral-muted"
                        }
                        data-testid="fb-editor-form-title"
                        onClick={startEditing}
                    >
                        {state.data.name}
                    </Text>
                }
            />
            <Tag
                content={`${state.data.published ? t`Published` : t`Draft`} (v${
                    state.data.version
                })`}
                variant={state.data.published ? "success" : "neutral-base"}
            />
        </div>
    );
};
