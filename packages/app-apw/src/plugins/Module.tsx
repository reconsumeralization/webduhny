import React, { lazy, Suspense } from "react";
import { SecureRoute } from "@webiny/app-security";
import Helmet from "react-helmet";
import { PublishingWorkflowsView } from "~/views/publishingWorkflows";
import { ContentReviewDashboard } from "~/views/contentReviewDashboard";
import { CircularProgress } from "@webiny/ui/Progress";
import { usePermission } from "~/hooks/usePermission";
import { AdminConfig, Layout, Plugins } from "@webiny/app-admin";
import { ReactComponent as ApwIcon } from "@material-design-icons/svg/outlined/account_tree.svg";

const { Menu, Route } = AdminConfig;

const ContentReviewEditor = lazy(
    () =>
        import(
            /* webpackChunkName: "ApwViewsContentReviewDashboardContentReviewEditor" */
            "~/views/contentReviewDashboard/ContentReviewEditor"
        )
);

interface LoaderProps {
    children: React.ReactElement;
}

const Loader = ({ children, ...props }: LoaderProps) => (
    <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

export const ApwMenusRoutes = () => {
    const { canManageWorkflows } = usePermission();

    const manageWorkflows = canManageWorkflows();

    return (
        <AdminConfig>
            {manageWorkflows && (
                <Route
                    name={"apw.publishingWorkflows"}
                    exact
                    path={"/apw/publishing-workflows"}
                    element={
                        <SecureRoute permission={"apw.publishingWorkflows"}>
                            <Layout>
                                <Helmet title={"APW - Publishing workflows"} />
                                <PublishingWorkflowsView />
                            </Layout>
                        </SecureRoute>
                    }
                />
            )}
            <Route
                exact
                name={"apw.contentReviews"}
                path={"/apw/content-reviews"}
                element={
                    <Layout>
                        <Helmet title={"APW - Content Reviews"} />
                        <ContentReviewDashboard />
                    </Layout>
                }
            />
            <Route
                name={"apw.contentReviewEditor"}
                path={"/apw/content-reviews/:contentReviewId"}
                element={
                    <>
                        <Helmet title={"APW - Content review editor"} />
                        <Loader>
                            <ContentReviewEditor />
                        </Loader>
                    </>
                }
            />

            <Menu
                name={"apw"}
                element={
                    <Menu.Link
                        icon={
                            <Menu.Link.Icon element={<ApwIcon />} label={"Publishing Workflows"} />
                        }
                        text={"Publishing Workflows"}
                        to={"/apw/content-reviews"}
                    />
                }
            />

            <Menu
                name={"apw.contentReviews"}
                parent={"apw"}
                element={<Menu.Link text={"Content Reviews"} to={"/apw/content-reviews"} />}
            />
            {manageWorkflows && (
                <Menu
                    name={"apw.publishingWorkflows"}
                    parent={"apw"}
                    element={<Menu.Link text={"Workflows"} to={"/apw/publishing-workflows"} />}
                />
            )}
        </AdminConfig>
    );
};

export const Module = () => {
    return (
        <Plugins>
            <ApwMenusRoutes />
        </Plugins>
    );
};
