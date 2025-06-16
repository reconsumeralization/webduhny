import React, { useCallback, useState, useEffect, useMemo } from "react";
import { ReactComponent as TableIcon } from "@webiny/icons/table_chart.svg";
import { OverlayLayout } from "@webiny/app-admin/components/OverlayLayout";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin/components/SplitView";
import { ReactComponent as SearchIcon } from "~/editor/assets/icons/search.svg";
import { useKeyHandler } from "~/editor/hooks/useKeyHandler";
import { PbPageTemplate, PbPageTemplateWithContent } from "~/types";
import { useListPageTemplates } from "~/features";
import { PageTemplateContentPreview } from "~/admin/views/PageTemplates/PageTemplateContentPreview";
import { Button, DelayedOnChange, Heading, Icon, Input, List, Separator } from "@webiny/admin-ui";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormFooter,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import EmptyView from "@webiny/app-admin/components/EmptyView";

const ModalTitle = () => {
    return (
        <Heading level={5} className={"wby-truncate"}>
            Pick a template for your new page
        </Heading>
    );
};

const EmptyTemplateDetails = () => {
    return (
        <EmptyView
            icon={<TableIcon />}
            title={"Click on the left side list to display template details"}
        />
    );
};

type PageTemplatesDialogProps = {
    onClose: () => void;
    onSelect: (template?: PbPageTemplate) => Promise<void>;
    isLoading: boolean;
};

const PageTemplatesDialog = ({ onClose, onSelect, isLoading }: PageTemplatesDialogProps) => {
    const [search, setSearch] = useState<string>("");
    const [activeTemplate, setActiveTemplate] = useState<PbPageTemplateWithContent | null>();
    const { pageTemplates } = useListPageTemplates();

    const handleCreatePageFromTemplate = useCallback((template: PbPageTemplate) => {
        onSelect(template);
    }, []);

    const { addKeyHandler, removeKeyHandler } = useKeyHandler();

    useEffect(() => {
        addKeyHandler("escape", e => {
            e.preventDefault();
            onClose();
        });

        return () => removeKeyHandler("escape");
    }, []);

    const filteredPageTemplates = useMemo(() => {
        if (search) {
            return pageTemplates.filter(item => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
        }

        return pageTemplates;
    }, [search, pageTemplates]);

    return (
        <OverlayLayout barLeft={<ModalTitle />} onExited={onClose}>
            <SplitView>
                <LeftPanel span={3}>
                    <div className={"wby-flex wby-flex-col wby-justify-between wby-h-full"}>
                        <div>
                            <div>
                                <div className={"wby-py-sm wby-px-md"}>
                                    <DelayedOnChange value={search} onChange={setSearch}>
                                        {({ value, onChange }) => (
                                            <Input
                                                value={value}
                                                placeholder="Search templates..."
                                                onChange={e => onChange(e.target.value)}
                                                forwardEventOnChange={true}
                                                startIcon={
                                                    <Icon icon={<SearchIcon />} label="Search" />
                                                }
                                                variant={"ghost"}
                                            />
                                        )}
                                    </DelayedOnChange>
                                </div>
                                <Separator />
                            </div>
                            <List data-testid={"pb-new-page-dialog-templates-list"}>
                                {filteredPageTemplates.map(template => (
                                    <List.Item
                                        key={template.id}
                                        title={template.title}
                                        description={template.description}
                                        activated={activeTemplate?.id === template.id}
                                        onClick={() => {
                                            setActiveTemplate(template);
                                        }}
                                    />
                                ))}
                            </List>
                        </div>
                        <div>
                            <Separator />
                            <div className={"wby-py-md wby-px-lg wby-flex"}>
                                <Button
                                    variant={"primary"}
                                    size={"lg"}
                                    text={"Use a blank page template"}
                                    disabled={isLoading}
                                    onClick={() => onSelect()}
                                    data-testid={"pb-new-page-dialog-use-blank-template-btn"}
                                    className={"wby-w-full"}
                                    containerClassName={"wby-w-full"}
                                />
                            </div>
                        </div>
                    </div>
                </LeftPanel>
                <RightPanel span={9} data-testid={"pb-new-page-dialog-template-preview"}>
                    {activeTemplate ? (
                        <SimpleForm size={"lg"}>
                            <SimpleFormHeader title={activeTemplate.title}>
                                <div className={"wby-flex wby-justify-end"}>
                                    <Button
                                        text={"Use Template"}
                                        disabled={isLoading}
                                        data-testid={"pb-new-page-dialog-use-template-btn"}
                                        onClick={() => handleCreatePageFromTemplate(activeTemplate)}
                                    />
                                </div>
                            </SimpleFormHeader>
                            <SimpleFormContent>
                                <PageTemplateContentPreview template={activeTemplate} />
                            </SimpleFormContent>
                            <SimpleFormFooter>{""}</SimpleFormFooter>
                        </SimpleForm>
                    ) : (
                        <EmptyTemplateDetails />
                    )}
                </RightPanel>
            </SplitView>
        </OverlayLayout>
    );
};

export default PageTemplatesDialog;
