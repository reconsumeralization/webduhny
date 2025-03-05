import * as DzField from "~/admin/plugins/fieldRenderers/dynamicZone";
import { Components as ObjectField } from "~/admin/plugins/fieldRenderers/object";
import { ContentEntryForm as BaseContentEntryForm } from "./admin/components/ContentEntryForm/ContentEntryForm";
import { Header as ContentEntryFormHeader } from "./admin/components/ContentEntryForm/Header";
import { ContentEntryFormPreview } from "./admin/components/ContentEntryForm/ContentEntryFormPreview";
import { useContentEntryForm } from "./admin/components/ContentEntryForm/useContentEntryForm";
import { DefaultLayout } from "~/admin/components/ContentEntryForm/DefaultLayout";
import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import { ContentEntry } from "~/admin/views/contentEntries/ContentEntry";
import { ContentEntryEditorConfig as BaseContentEntryEditorConfig } from "./admin/config/contentEntries";
import { SingletonContentEntry } from "~/admin/views/contentEntries/ContentEntry/SingletonContentEntry";
import { useSingletonContentEntry } from "~/admin/views/contentEntries/hooks/useSingletonContentEntry";
import {
    ContentEntryFormMeta,
    ContentEntryFormTitle
} from "~/admin/views/contentEntries/ContentEntry/FullScreenContentEntry/FullScreenContentEntryHeaderLeft";

export const ContentEntryEditorConfig = Object.assign(BaseContentEntryEditorConfig, {
    ContentEntry: Object.assign(ContentEntry, {
        useContentEntry,
        DefaultLayout,
        ContentEntryForm: Object.assign(BaseContentEntryForm, {
            useContentEntryForm,
            Header: Object.assign(ContentEntryFormHeader, {
                Title: ContentEntryFormTitle,
                Meta: ContentEntryFormMeta
            })
        }),
        ContentEntryFormPreview
    }),
    SingletonContentEntry: Object.assign(SingletonContentEntry, {
        useSingletonContentEntry
    }),
    FieldRenderers: {
        Object: {
            MultiValue: {
                ItemContainer: ObjectField.MultiValueItemContainer
            }
        },
        DynamicZone: {
            Template: {
                useTemplate: DzField.useTemplate
            },
            Container: DzField.DynamicZoneContainer,
            // SingleValue: {
            //     Container: null,
            //     ItemContainer: null,
            //     Item: null
            // },
            MultiValue: {
                Container: DzField.MultiValueContainer,
                ItemContainer: DzField.MultiValueItemContainer,
                Item: DzField.MultiValueItem
            },
            TemplateGallery: DzField.TemplateGallery
        }
    }
});
