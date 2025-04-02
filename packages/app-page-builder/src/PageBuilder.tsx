import React, { Fragment, useMemo } from "react";
import { HasPermission } from "@webiny/app-security";
import { Plugins, createProviderPlugin } from "@webiny/app-admin";
import { Global, css } from "@emotion/react";
import { PageBuilderProvider as ContextProvider } from "./contexts/PageBuilder";
import { ReactComponent as PagesIcon } from "./admin/assets/table_chart-24px.svg";
import { WebsiteSettings } from "./modules/WebsiteSettings/WebsiteSettings";
import { AdminPageBuilderContextProvider } from "~/admin/contexts/AdminPageBuilder";
import { DefaultOnPagePublish } from "~/admin/plugins/pageDetails/pageRevisions/DefaultOnPagePublish";
import { DefaultOnPageUnpublish } from "~/admin/plugins/pageDetails/pageRevisions/DefaultOnPageUnpublish";
import { DefaultOnPageDelete } from "~/admin/plugins/pageDetails/pageRevisions/DefaultOnPageDelete";
import { EditorProps, EditorRenderer } from "./admin/components/Editor";
import { PagesModule } from "~/admin/views/Pages/PagesModule";
import { AddButtonLinkComponent } from "~/elementDecorators/AddButtonLinkComponent";
import { AddButtonClickHandlers } from "~/elementDecorators/AddButtonClickHandlers";
import { InjectElementVariables } from "~/render/variables/InjectElementVariables";
import { LexicalParagraphRenderer } from "~/render/plugins/elements/paragraph/LexicalParagraph";
import { LexicalHeadingRenderer } from "~/render/plugins/elements/heading/LexicalHeading";
import { NullLoaderCache } from "@webiny/app-page-builder-elements/hooks/useLoader/NullLoaderCache";
import { ConvertIconSettings as EditorConvertIconSettings } from "~/editor/prepareEditorContent/ConvertIconSettings";
import { ConvertIconSettings as RendererConvertIconSettings } from "~/render/plugins/elementSettings/icon";
import { AddImageLinkComponent } from "~/elementDecorators/AddImageLinkComponent";
import { PageTemplatesPreview } from "./dataInjection/preview/PageTemplatesPreview";
import { PagesPreview } from "~/dataInjection/preview/PagesPreview";
import { IfDynamicPagesEnabled } from "~/IfDynamicPagesEnabled";
import { AdminConfig } from "@webiny/app-admin";

const { Menu } = AdminConfig;

export type { EditorProps };
export { EditorRenderer };
export * from "~/admin/config/pages";
export * from "~/admin/views/Pages/hooks";

const PageBuilderProviderPlugin = createProviderPlugin(Component => {
    return function PageBuilderProvider({ children }) {
        const noLoaderCache = useMemo(() => {
            return new NullLoaderCache();
        }, []);

        return (
            <ContextProvider loaderCache={noLoaderCache}>
                <AdminPageBuilderContextProvider>
                    <Component>{children}</Component>
                </AdminPageBuilderContextProvider>
            </ContextProvider>
        );
    };
});

const PageBuilderMenu = () => {
    return (
        <AdminConfig>
            <HasPermission any={["pb.menu", "pb.category", "pb.page", "pb.template", "pb.block"]}>
                <Menu
                    name="pb"
                    element={
                        <Menu.Item
                            text={"Page Builder"}
                            icon={<Menu.Link.Icon label={"Page Builder"} element={<PagesIcon />} />}
                        />
                    }
                />
            </HasPermission>

            <HasPermission any={["pb.menu", "pb.category", "pb.page", "pb.template", "pb.block"]}>
                <Menu name="pb.pagesLabel" parent="pb" element={<Menu.Group text={"Pages"} />} />
            </HasPermission>
            <HasPermission name={"pb.category"}>
                <Menu
                    name="pb.categories"
                    parent={"pb"}
                    element={<Menu.Link text={"Categories"} to={"/page-builder/categories"} />}
                />
            </HasPermission>
            <HasPermission name={"pb.page"}>
                <Menu
                    name="pb.pages"
                    parent={"pb"}
                    element={<Menu.Link text={"Pages"} to={"/page-builder/pages"} />}
                />
            </HasPermission>
            <HasPermission name={"pb.template"}>
                <Menu
                    name="pb.templates"
                    parent={"pb"}
                    element={<Menu.Link text={"Templates"} to={"/page-builder/page-templates"} />}
                />
            </HasPermission>
            <HasPermission name={"pb.menu"}>
                <Menu
                    name="pb.menus"
                    parent={"pb"}
                    element={<Menu.Link text={"Menus"} to={"/page-builder/menus"} />}
                />
            </HasPermission>
            <HasPermission any={["pb.block"]}>
                <Menu name="pb.blocksLabel" parent="pb" element={<Menu.Group text={"Blocks"} />} />
                <Menu
                    name="pb.blocks.categories"
                    parent={"pb"}
                    element={
                        <Menu.Link text={"Categories"} to={"/page-builder/block-categories"} />
                    }
                />
                <Menu
                    name="pb.blocks.pageBlocks"
                    parent={"pb"}
                    element={<Menu.Link text={"Blocks"} to={"/page-builder/page-blocks"} />}
                />
            </HasPermission>
            <HasPermission name={"pb.settings"}>
                <Menu
                    name="pb.settings"
                    parent="settings"
                    element={<Menu.Group text={"Page Builder"} />}
                />
                <Menu
                    name="pb.settings.website"
                    parent={"settings"}
                    element={<Menu.Link text={"Website"} to={"/settings/page-builder/website"} />}
                />
            </HasPermission>
        </AdminConfig>
    );
};

const EditorLoader = React.lazy(() =>
    import(
        /* webpackChunkName: "PageBuilderEditor" */
        "./editor/Editor"
    ).then(m => ({
        default: m.Editor
    }))
);

const EditorRendererPlugin = EditorRenderer.createDecorator(() => {
    return function Editor(props) {
        return <EditorLoader {...props} />;
    };
});

const displayContents = css`
    pb-editor-ui-elements,
    pb-editor-ui-element {
        display: contents;
    }
`;

export const PageBuilder = () => {
    return (
        <Fragment>
            <Global styles={displayContents} />
            <PagesModule />
            <PageBuilderProviderPlugin />
            <EditorRendererPlugin />
            <PageBuilderMenu />
            <Plugins>
                <WebsiteSettings />
                <DefaultOnPagePublish />
                <DefaultOnPageUnpublish />
                <DefaultOnPageDelete />
            </Plugins>
            {/* Element renderer plugins. */}
            <LexicalParagraphRenderer />
            <LexicalHeadingRenderer />
            <AddButtonLinkComponent />
            <AddButtonClickHandlers />
            <AddImageLinkComponent />
            <InjectElementVariables />
            {/* Ensure data is in the correct shape when editor is mounting. */}
            {/* This works only within the block/template/page editor. */}
            <EditorConvertIconSettings />
            {/* Ensure each element renderer is receiving data in the correct shape.  */}
            {/* This works for page previews, block previews, etc. */}
            <RendererConvertIconSettings />
            <IfDynamicPagesEnabled>
                {/* Decorate page template content preview. */}
                <PageTemplatesPreview />
                {/* Decorate page content preview. */}
                <PagesPreview />
            </IfDynamicPagesEnabled>
        </Fragment>
    );
};
