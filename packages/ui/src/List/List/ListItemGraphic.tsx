import React from "react";

export type ListItemGraphicProps = { children: React.ReactNode; className?: string };

/**
 * Can be used to show an icon or any other custom element. Rendered on the left side.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListItemGraphic = (props: ListItemGraphicProps) => {
    return <div {...props}>{props.children}</div>;
};

export type ListSelectBoxProps = {
    children: React.ReactNode;
};

/**
 * Used to hold the Checkbox element for multi-select options.
 * @param {*} props
 */
export const ListSelectBox = (props: ListSelectBoxProps) => {
    return <ListItemGraphic>{props.children}</ListItemGraphic>;
};
