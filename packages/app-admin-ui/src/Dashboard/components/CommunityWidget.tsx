import React from "react";
import { Heading, Icon, Text } from "@webiny/admin-ui";
import { Link } from "@webiny/react-router";
// Icons
import { ReactComponent as YouTubeIcon } from "./icons/youtube.svg";
import { ReactComponent as GithubIcon } from "./icons/github.svg";
import { ReactComponent as SlackIcon } from "./icons/slack.svg";
import { ReactComponent as TwitterIcon } from "./icons/x-twitter.svg";

interface SocialLinkProps {
    link: string;
    label: string;
    icon: React.ReactElement;
}

const SocialLink = ({ link, label, icon }: SocialLinkProps) => {
    return (
        <div
            className={
                "wby-w-[64px] wby-bg-neutral-base wby-rounded-md hover:wby-opacity-80 wby-transition-opacity"
            }
        >
            <Link
                to={link}
                className={"!wby-no-underline"}
                target={"_blank"}
                rel={"noopener noreferrer"}
            >
                <div className={"wby-px-xs wby-pt-sm-extra wby-pb-sm wby-text-center"}>
                    <Icon
                        label={`${label} icon`}
                        icon={icon}
                        size={"lg"}
                        color={"inherit"}
                        className={"wby-mx-auto wby-mb-sm"}
                    />
                    <Text size={"sm"} className={"wby-text-neutral-strong"}>
                        {label}
                    </Text>
                </div>
            </Link>
        </div>
    );
};

export const CommunityWidget = () => {
    return (
        <div className={"wby-bg-neutral-light wby-rounded-xl wby-p-lg"}>
            <div className={"wby-mb-md"}>
                <Heading level={6}>{"Join our community:"}</Heading>
                <Text size={"sm"} className={"wby-text-neutral-strong"}>
                    {"Get to know Webiny team members, discuss new ideas and get help:"}
                </Text>
            </div>
            <div className={"wby-flex wby-justify-start wby-items-stretch wby-gap-md"}>
                <SocialLink
                    link={"https://github.com/webiny/webiny-js"}
                    label={"GitHub"}
                    icon={<GithubIcon />}
                />
                <SocialLink
                    link={"https://www.webiny.com/slack"}
                    label={"Slack"}
                    icon={<SlackIcon />}
                />
                <SocialLink
                    link={"https://youtube.com/webiny"}
                    label={"YouTube"}
                    icon={<YouTubeIcon />}
                />
                <SocialLink
                    link={"https://x.com/WebinyCMS"}
                    label={"X.com"}
                    icon={<TwitterIcon />}
                />
            </div>
        </div>
    );
};
