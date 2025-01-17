import React from "react";
import { useDrag } from "react-dnd";
import { DraggableItem } from "~/editor/components/Draggable";
import { ReactComponent as DragIndicatorIcon } from "./assets/drag_indicator_24px.svg";

const BLOCK = "block";

type MoverProps = {
    type: string;
};
const DragBlockIndicator = ({ type }: MoverProps) => {
    return <DragIndicatorIcon className={"drag-indicator"} />
};

export default DragBlockIndicator;
