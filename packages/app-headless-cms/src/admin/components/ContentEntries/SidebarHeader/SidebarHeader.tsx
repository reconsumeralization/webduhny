import React from "react";
import { Heading, Link, Separator, Text, Tooltip } from "@webiny/admin-ui";
import { useModel } from "@webiny/app-headless-cms-common";

export const SidebarHeader = () => {
    const { model } = useModel();

    return (
        <div>
            <div className={"wby-p-md wby-pl-lg"}>
                <Heading level={5}>{model.name}</Heading>
                <Text size={"sm"} className={"wby-text-neutral-muted"}>
                    Model ID:{" "}
                    {model.plugin ? (
                        <Tooltip
                            side={"top"}
                            content={"Content model is registered via a plugin."}
                            trigger={model.modelId}
                        />
                    ) : (
                        <Tooltip
                            content={"Edit content model"}
                            side={"top"}
                            trigger={
                                <Link
                                    to={`/cms/content-models/${model.modelId}`}
                                    variant={"secondary"}
                                    className={
                                        "wby-text-neutral-muted hover:wby-text-neutral-strong"
                                    }
                                >
                                    {model.modelId}
                                </Link>
                            }
                        />
                    )}
                </Text>
            </div>
            <Separator />
        </div>
    );
};
