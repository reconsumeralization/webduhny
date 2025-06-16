import React, { useMemo } from "react";
import classNames from "classnames";
import { IconButton } from "@webiny/ui/Button";
import { Heading, Tooltip, Icon } from "@webiny/admin-ui";
import { DisplayMode } from "~/types";
import { useDisplayMode } from "~/editor";

export const DisplayModeSelector = () => {
    const { displayMode, displayModes, setDisplayMode } = useDisplayMode();

    const responsiveBarContent = useMemo(() => {
        return displayModes.map(({ displayMode: mode, icon, tooltip }) => {
            return (
                <Tooltip
                    key={mode}
                    trigger={
                        <IconButton
                            icon={icon}
                            onClick={() => setDisplayMode(mode as DisplayMode)}
                        />
                    }
                    content={
                        <div className={'wby-flex wby-flex-col wby-gap-xs'}>
                            <Heading level={6}>{tooltip.title}</Heading>
                            <div className={"wby-font-semibold wby-flex wby-items-center"}>
                                {tooltip.subTitleIcon && (
                                    <Icon
                                        icon={tooltip.subTitleIcon}
                                        size={'xs'}
                                        label={tooltip.subTitle}
                                        color={"neutral-light"}
                                    />
                                )}

                                {tooltip.subTitle}
                            </div>
                            {tooltip.body}
                        </div>
                    }
                    side={"bottom"}
                    className={classNames("action-wrapper", {
                        active: mode === displayMode
                    })}
                />
            );
        });
    }, [setDisplayMode, displayMode]);

    return <div>{responsiveBarContent}</div>;
};
