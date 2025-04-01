import React from "react";
import { Heading, Icon, Link as AdminLink, Text } from "@webiny/admin-ui";
import { ReactComponent as HelpIcon } from "@webiny/icons/help_outline.svg";
import { Link } from "@webiny/react-router";

export const AssistanceWidget = () => {
    return (
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
                className={"wby-bg-neutral-base wby-rounded-sm wby-px-md wby-py-sm-extra wby-mb-md"}
            >
                <Link
                    to="https://www.webiny.com/docs"
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"!wby-no-underline"}
                >
                    <Text as={"div"} className={"wby-font-semibold !wby-text-neutral-primary"}>
                        {"Documentation"}
                    </Text>
                    <Text size={"sm"} className={"!wby-text-neutral-strong"}>
                        {"Explore the Webiny documentation and check out code examples and guides."}
                    </Text>
                </Link>
            </div>

            <div className={"wby-bg-neutral-base wby-rounded-sm wby-px-md wby-py-sm-extra"}>
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
    );
};
