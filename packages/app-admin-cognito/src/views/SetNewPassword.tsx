import React from "react";
import { Form } from "@webiny/form";
import { validation } from "@webiny/validation";
import { View } from "~/components/View";
import { useAuthenticator } from "@webiny/app-cognito-authenticator/hooks/useAuthenticator";
import {
    useSetNewPassword,
    UseSetNewPasswordCallableParams
} from "@webiny/app-cognito-authenticator/hooks/useSetNewPassword";
import { Button, Grid, Input, Link, OverlayLoader, Text } from "@webiny/admin-ui";

export const SetNewPassword = () => {
    const { changeState } = useAuthenticator();
    const { shouldRender, setPassword, error, loading } = useSetNewPassword();

    if (!shouldRender) {
        return null;
    }

    return (
        <View.Container>
            <Form<UseSetNewPasswordCallableParams>
                onSubmit={data => setPassword(data)}
                submitOnEnter
            >
                {({ Bind, submit, data }) => {
                    const retypePasswordValidator = (value: string) => {
                        if (value !== data.password) {
                            throw Error("Passwords do not match!");
                        }
                    };

                    return (
                        <View.Content>
                            {loading && <OverlayLoader />}
                            <View.Title title={"Set new password"} />
                            <View.Error description={error} />

                            <Grid>
                                <Grid.Column span={12} data-testid="password-reset-code">
                                    <Bind name="code" validators={validation.create("required")}>
                                        <Input
                                            size={"lg"}
                                            autoComplete="off"
                                            label={"Password reset code"}
                                            description={"Enter the code we sent to your email."}
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12} data-testid="new-password-input">
                                    <Bind
                                        name="password"
                                        validators={validation.create("required")}
                                    >
                                        <Input
                                            size={"lg"}
                                            autoComplete={"off"}
                                            type={"password"}
                                            label={"New password"}
                                            description={"Enter your new password."}
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12} data-testid="retype-password-input">
                                    <Bind
                                        name="retypePassword"
                                        validators={[
                                            validation.create("required"),
                                            retypePasswordValidator
                                        ]}
                                    >
                                        <Input
                                            size={"lg"}
                                            type={"password"}
                                            label={"Retype password"}
                                            description={"Enter your new password once more."}
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={6} className={"wby-flex wby-items-center"}>
                                    <Text as={"div"} size={"sm"}>
                                        Want to sign in?&nbsp;
                                        <Link to={"#"} onClick={() => changeState("signIn")}>
                                            Sign in
                                        </Link>
                                        .
                                    </Text>
                                </Grid.Column>
                                <Grid.Column span={6} className={"wby-text-right"}>
                                    <Button
                                        text={"Set new password"}
                                        data-testid="submit-btn-new-psw"
                                        onClick={ev => {
                                            submit(ev);
                                        }}
                                        size={"lg"}
                                    />
                                </Grid.Column>
                            </Grid>
                        </View.Content>
                    );
                }}
            </Form>
        </View.Container>
    );
};
