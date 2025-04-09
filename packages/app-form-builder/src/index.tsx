import React, { lazy, Suspense } from "react";
import { Layout } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { CircularProgress } from "@webiny/ui/Progress";
import FormsSettings from "./admin/views/Settings/FormsSettings";
import { ReactComponent as FormsIcon } from "@webiny/icons/check_box.svg";
import { AdminConfig } from "@webiny/app-admin";

const { Menu, Route } = AdminConfig;

const FormEditor = lazy(
    () =>
        import(
            /* webpackChunkName: "FormBuilderAdminViewsEditor" */
            "./admin/views/Editor"
        )
);
const Forms = lazy(
    () =>
        import(
            /* webpackChunkName: "FormBuilderAdminViewsForms" */
            "./admin/views/Forms/Forms"
        )
);

interface LoaderProps {
    label: string;
    children: React.ReactNode;
}

const Loader = ({ children, label, ...props }: LoaderProps) => (
    <Suspense fallback={<CircularProgress label={label} />}>
        {React.cloneElement(children as unknown as React.ReactElement, props)}
    </Suspense>
);

export const FormBuilder = () => {
    return (
        <AdminConfig>
            <HasPermission name={"fb.form"}>
                <Menu
                    name="fb"
                    element={
                        <Menu.Link
                            text={"Form Builder"}
                            icon={<Menu.Link.Icon element={<FormsIcon />} label={"Form Builder"} />}
                            to={"/form-builder/forms"}
                        />
                    }
                />
                <Route
                    name={"fb.forms.editor"}
                    exact
                    path={"/form-builder/forms/:id"}
                    element={
                        <Loader label={"Loading editor..."}>
                            <FormEditor />
                        </Loader>
                    }
                />
                <Route
                    name={"fb.forms.list"}
                    exact
                    path={"/form-builder/forms"}
                    element={
                        <Layout title={"Form Builder - Forms"}>
                            <Loader label={"Loading view..."}>
                                <Forms />
                            </Loader>
                        </Layout>
                    }
                />
            </HasPermission>
            <HasPermission name={"fb.settings"}>
                <Route
                    name={"fb.settings.recaptcha"}
                    path="/settings/form-builder/recaptcha"
                    element={
                        <Layout title={"Form Builder - reCAPTCHA Settings"}>
                            <FormsSettings />
                        </Layout>
                    }
                />
                <Menu
                    name="fb.settings"
                    parent={"settings"}
                    element={<Menu.Group text={"Form Builder"} />}
                />
                <Menu
                    name="fb.settings.recaptcha"
                    parent={"settings"}
                    element={
                        <Menu.Link text={"reCAPTCHA"} to={"/settings/form-builder/recaptcha"} />
                    }
                />
            </HasPermission>
        </AdminConfig>
    );
};

export * from "./plugins";
