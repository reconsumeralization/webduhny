import React from "react";
import { Link } from "@webiny/react-router";
import { Alert, Grid, Heading, Icon, Text, Link as AdminLink } from "@webiny/admin-ui";
import { ReactComponent as WidgetIcon } from "@webiny/icons/table_chart.svg";
import { ReactComponent as HelpIcon } from "@webiny/icons/help_outline.svg";
import { useSecurity } from "@webiny/app-security/hooks/useSecurity";
import { plugins } from "@webiny/plugins";
// Icons
import { ReactComponent as YouTubeIcon } from "./icons/youtube.svg";
import { ReactComponent as GithubIcon } from "./icons/github.svg";
import { ReactComponent as SlackIcon } from "./icons/slack.svg";
import { ReactComponent as TwitterIcon } from "./icons/x-twitter.svg";
import { AdminWelcomeScreenWidgetPlugin } from "@webiny/app-plugin-admin-welcome-screen/types";

const Welcome = () => {
    const { identity, getPermission } = useSecurity();

    if (!identity) {
        return null;
    }

    const widgets = plugins
        .byType<AdminWelcomeScreenWidgetPlugin>("admin-welcome-screen-widget")
        .filter(pl => {
            if (pl.permission) {
                return getPermission(pl.permission);
            }
            return true;
        });

    const canSeeAnyWidget = widgets.length > 0;

    return (
        <div className={"wby-mt-xxl"}>
            <div className={"wby-mb-3xl"}>
                <Heading
                    level={3}
                >{`Hi ${identity.displayName}, what are we doing today?`}</Heading>
            </div>
            <div className={"wby-mb-xl"}>
                {!canSeeAnyWidget && (
                    <Alert title={"Missing permissions"} type={"warning"}>
                        {"Please contact the administrator for permissions to access Webiny apps."}
                    </Alert>
                )}
                <Grid gap={"spacious"}>
                    {widgets.map(pl => {
                        const { title, description, cta, icon = <WidgetIcon /> } = pl.widget;
                        return (
                            <Grid.Column span={4} key={pl.name}>
                                <div
                                    className={"wby-p-lg wby-bg-primary-subtle wby-rounded-xl"}
                                    data-testid={pl.name}
                                >
                                    <div
                                        className={"wby-flex wby-items-center wby-gap-sm wby-mb-sm"}
                                    >
                                        <Icon
                                            icon={icon}
                                            label={title}
                                            size={"lg"}
                                            color={"accent"}
                                        />
                                        <Heading level={4}>{title}</Heading>
                                    </div>
                                    <Text>{description}</Text>
                                    <div className={"wby-mt-xl"}>{cta}</div>
                                </div>
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </div>
            <div>
                <Grid gap={"spacious"}>
                    <Grid.Column span={6}>
                        <div className={"wby-bg-neutral-light wby-rounded-xl wby-p-lg"}>
                            <div className={"wby-flex wby-items-center wby-gap-sm wby-mb-md"}>
                                <Icon
                                    icon={<HelpIcon />}
                                    label={"Need some assistance?"}
                                    size={"md"}
                                    color={"accent"}
                                />
                                <Heading level={6}>{"Need some assistance?"}</Heading>
                            </div>
                            <div
                                className={
                                    "wby-bg-neutral-base wby-rounded-sm wby-px-md wby-py-sm-extra wby-mb-md"
                                }
                            >
                                <Link
                                    to="https://www.webiny.com/docs"
                                    target={"_blank"}
                                    rel={"noopener noreferrer"}
                                    className={"!wby-no-underline"}
                                >
                                    <Text
                                        as={"div"}
                                        className={"wby-font-semibold !wby-text-neutral-primary"}
                                    >
                                        {"Documentation"}
                                    </Text>
                                    <Text size={"sm"} className={"!wby-text-neutral-strong"}>
                                        {
                                            "Explore the Webiny documentation and check out code examples and guides."
                                        }
                                    </Text>
                                </Link>
                            </div>

                            <div
                                className={
                                    "wby-bg-neutral-base wby-rounded-sm wby-px-md wby-py-sm-extra"
                                }
                            >
                                <Text as={"div"} className={"wby-font-semibold"}>
                                    {"Contact us"}
                                </Text>
                                <Text size={"sm"} className={"wby-text-neutral-strong"}>
                                    <AdminLink
                                        to={"https://www.webiny.com/forms/product-demo"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                        variant={"secondary"}
                                        underline
                                    >
                                        Contact Sales
                                    </AdminLink>
                                    ,{" "}
                                    <AdminLink
                                        to={"https://www.webiny.com/partners"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                        variant={"secondary"}
                                        underline
                                    >
                                        Explore Partnerships
                                    </AdminLink>{" "}
                                    or{" "}
                                    <AdminLink
                                        to={"https://www.webiny.com/slack"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                        variant={"secondary"}
                                        underline
                                    >
                                        Slack us
                                    </AdminLink>
                                    .
                                </Text>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column span={6}>
                        <div className={"wby-bg-neutral-light wby-rounded-xl wby-p-lg"}>
                            <div className={"wby-mb-md"}>
                                <Heading level={6}>{"Join our community:"}</Heading>
                                <Text size={"sm"} className={"wby-text-neutral-strong"}>
                                    {
                                        "Get to know Webiny team members, discuss new ideas and get help:"
                                    }
                                </Text>
                            </div>
                            <Grid className={"wby-gap-md"}>
                                <Grid.Column span={2}>
                                    <Link
                                        to="https://github.com/webiny/webiny-js"
                                        className={"!wby-no-underline"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                    >
                                        <div
                                            className={
                                                "wby-bg-neutral-base wby-px-xs wby-pt-sm-extra wby-pb-sm wby-rounded-md wby-text-center hover:wby-opacity-80 wby-transition-opacity"
                                            }
                                        >
                                            <Icon
                                                label={"Github"}
                                                icon={<GithubIcon />}
                                                size={"lg"}
                                                color={"inherit"}
                                                className={"wby-mx-auto wby-mb-sm"}
                                            />
                                            <Text size={"sm"} className={"wby-text-neutral-strong"}>
                                                Github
                                            </Text>
                                        </div>
                                    </Link>
                                </Grid.Column>
                                <Grid.Column span={2}>
                                    <Link
                                        to="https://www.webiny.com/slack"
                                        className={"!wby-no-underline"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                    >
                                        <div
                                            className={
                                                "wby-bg-neutral-base wby-px-xs wby-pt-sm-extra wby-pb-sm wby-rounded-md wby-text-center hover:wby-opacity-80 wby-transition-opacity"
                                            }
                                        >
                                            <Icon
                                                label={"Slack"}
                                                icon={<SlackIcon />}
                                                size={"lg"}
                                                color={"inherit"}
                                                className={"wby-mx-auto wby-mb-sm"}
                                            />
                                            <Text size={"sm"} className={"wby-text-neutral-strong"}>
                                                Slack
                                            </Text>
                                        </div>
                                    </Link>
                                </Grid.Column>
                                <Grid.Column span={2}>
                                    <Link
                                        to="https://youtube.com/webiny"
                                        className={"!wby-no-underline"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                    >
                                        <div
                                            className={
                                                "wby-bg-neutral-base wby-px-xs wby-pt-sm-extra wby-pb-sm wby-rounded-md wby-text-center hover:wby-opacity-80 wby-transition-opacity"
                                            }
                                        >
                                            <Icon
                                                label={"YouTube"}
                                                icon={<YouTubeIcon />}
                                                size={"lg"}
                                                color={"inherit"}
                                                className={"wby-mx-auto wby-mb-sm"}
                                            />
                                            <Text size={"sm"} className={"wby-text-neutral-strong"}>
                                                YouTube
                                            </Text>
                                        </div>
                                    </Link>
                                </Grid.Column>
                                <Grid.Column span={2}>
                                    <Link
                                        to="https://twitter.com/WebinyCMS"
                                        className={"!wby-no-underline"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                    >
                                        <div
                                            className={
                                                "wby-bg-neutral-base wby-px-xs wby-pt-sm-extra wby-pb-sm wby-rounded-md wby-text-center hover:wby-opacity-80 wby-transition-opacity"
                                            }
                                        >
                                            <Icon
                                                label={"YouTube"}
                                                icon={<TwitterIcon />}
                                                size={"lg"}
                                                color={"inherit"}
                                                className={"wby-mx-auto wby-mb-sm"}
                                            />
                                            <Text size={"sm"} className={"wby-text-neutral-strong"}>
                                                X.com
                                            </Text>
                                        </div>
                                    </Link>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    );
};

export default Welcome;
