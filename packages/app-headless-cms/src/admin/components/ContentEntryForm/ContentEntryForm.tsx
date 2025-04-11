import React, { useEffect, useRef } from "react";
import { FormOnSubmit, FormValidation } from "@webiny/form";
import { makeDecoratable } from "@webiny/app-admin";
import { CmsContentEntry } from "~/types";
import { ModelProvider, useModel } from "~/admin/components/ModelProvider";
import { useFormRenderer } from "~/admin/components/ContentEntryForm/useFormRenderer";
import {
    ContentEntryFormContext,
    ContentEntryFormProvider,
    PersistEntry
} from "./ContentEntryFormProvider";
import { CustomLayout } from "./CustomLayout";
import { DefaultLayout } from "./DefaultLayout";
import { useGoToRevision } from "~/admin/components/ContentEntryForm/useGoToRevision";

export interface ContentEntryFormProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    entry: Partial<CmsContentEntry>;
    /**
     * This callback is executed when an entry, or a revision, are created.
     * @param entry
     */
    onAfterCreate?: (entry: CmsContentEntry) => void;
    /**
     * This callback is executed when the form is valid, and it needs to persist the content entry.
     */
    persistEntry: PersistEntry;
    onChange?: FormOnSubmit<Partial<CmsContentEntry>>;
    onInvalidFields?: (invalidFields: FormValidation) => void;
    header?: React.ReactNode;
    /**
     * This prop is used to get a reference to `saveEntry` callback, so it can be triggered by components
     * outside the ContentEntryForm context.
     * TODO: introduce a `layout` prop to be able to mount arbitrary components around the entry form, within the context.
     */
    setSaveEntry?: (cb: ContentEntryFormContext["saveEntry"]) => void;
}

export const ContentEntryForm = makeDecoratable(
    "ContentEntryForm",
    ({
        entry,
        persistEntry,
        onChange,
        onInvalidFields,
        onAfterCreate,
        setSaveEntry,
        header = true,
        ...props
    }: ContentEntryFormProps) => {
        const formElementRef = useRef<HTMLDivElement>(null);
        const { model } = useModel();
        const { goToRevision } = useGoToRevision();
        const formRenderer = useFormRenderer(model);

        const defaultOnAfterCreate = (entry: CmsContentEntry) => {
            goToRevision(entry.id);
        };

        // When entry changes, scroll to the top of the form.
        useEffect(() => {
            if (!formElementRef.current) {
                return;
            }

            setTimeout(() => {
                formElementRef.current?.scrollTo(0, 0);
            }, 20);
        }, [entry.id, formElementRef.current]);

        if (model.isBeingDeleted) {
            return <>Model is being deleted.</>;
        }

        return (
            <ContentEntryFormProvider
                model={model}
                entry={entry}
                onChange={onChange}
                onInvalidFields={onInvalidFields}
                onAfterCreate={onAfterCreate || defaultOnAfterCreate}
                setSaveEntry={setSaveEntry}
                confirmNavigationIfDirty={true}
                persistEntry={persistEntry}
            >
                <ModelProvider model={model}>
                    {header ? header : null}
                    <div
                        {...props}
                        id={"cms-content-form"}
                        data-element={"cms-content-form"}
                        data-testid={"cms-content-form"}
                        ref={formElementRef}
                    >
                        {formRenderer ? (
                            <CustomLayout model={model} formRenderer={formRenderer} />
                        ) : (
                            <DefaultLayout model={model} />
                        )}
                    </div>
                </ModelProvider>
            </ContentEntryFormProvider>
        );
    }
);
