import React, { useCallback } from "react";
import {
    CmsReferenceContentEntry,
    CmsReferenceValue
} from "~/admin/plugins/fieldRenderers/ref/components/types";
import { Image } from "./entry/Image";
import { Title } from "./entry/Title";
import { View } from "./entry/View";
import { Select } from "./entry/Select";
import { Remove } from "./entry/Remove";
import { MoveUp } from "./entry/MoveUp";
import { MoveDown } from "./entry/MoveDown";
import { Excerpt } from "./entry/Excerpt";
import { CmsModel } from "~/types";

interface EntryProps {
    model: CmsModel;
    entry: CmsReferenceContentEntry;
    onChange: (value: CmsReferenceValue) => void;
    index?: never;
    selected: boolean;
    onMoveUp?: never;
    onMoveDown?: never;
    onRemove?: never;
    placement?: string;
}

interface EntryPropsWithRemove {
    onRemove: (entryId: string) => void;
    model: CmsModel;
    entry: CmsReferenceContentEntry;
    index: number;
    onMoveUp?: (index: number, toTop: boolean) => void;
    onMoveDown?: (index: number, toBottom: boolean) => void;
    onChange?: never;
    selected?: never;
    placement?: string;
}

export const Entry = ({
    model,
    entry,
    onChange,
    onRemove,
    selected,
    index,
    onMoveUp: onMoveUpClick,
    onMoveDown: onMoveDownClick,
    placement
}: EntryPropsWithRemove | EntryProps) => {
    const onMoveUp = useCallback(
        (ev: React.MouseEvent) => {
            if (!onMoveUpClick) {
                return;
            }
            onMoveUpClick(index, ev.shiftKey);
        },
        [onMoveUpClick, index]
    );
    const onMoveDown = useCallback(
        (ev: React.MouseEvent) => {
            if (!onMoveDownClick) {
                return;
            }
            onMoveDownClick(index, ev.shiftKey);
        },
        [onMoveDownClick, index]
    );

    const icon = model.icon;

    return (
        <div className={"wby-w-full wby-rounded-md wby-bg-neutral-dimmed"}>
            <div className="wby-flex wby-items-center wby-justify-between wby-gap-sm-extra wby-min-w-0">
                <Image title={entry.title} src={entry.image} icon={icon} />
                <div
                    className={
                        "wby-flex wby-flex-col wby-gap-xxs wby-overflow-hidden wby-flex-1 wby-min-w-0"
                    }
                >
                    <Title title={entry.title} />
                    <Excerpt
                        modelName={entry.model.name}
                        createdBy={entry.createdBy}
                        createdOn={entry.createdOn}
                        status={entry.status}
                    />
                </div>
                <div className={"wby-flex wby-items-center wby-gap-sm wby-pr-sm-extra wby-h-lg"}>
                    {placement == "multiRef" && (
                        <>
                            <MoveUp
                                className={onMoveUpClick ? "active" : "disabled"}
                                onClick={onMoveUp}
                            />
                            <MoveDown
                                className={onMoveDownClick ? "active" : "disabled"}
                                onClick={onMoveDown}
                            />
                        </>
                    )}
                    <View entry={entry} />
                    {onChange && <Select entry={entry} onChange={onChange} selected={selected} />}
                    {onRemove && <Remove entry={entry} onRemove={onRemove} />}
                </div>
            </div>
        </div>
    );
};
