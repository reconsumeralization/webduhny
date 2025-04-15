import React, { useEffect, useState } from "react";
import { useDragLayer, DragSourceMonitor } from "react-dnd";

let subscribedToOffsetChange = false;

let dragPreviewRef: HTMLDivElement | null = null;

const onOffsetChange = (monitor: DragSourceMonitor) => () => {
    if (!dragPreviewRef) {
        return;
    }

    const offset = monitor.getClientOffset();
    if (!offset) {
        return;
    }

    const transform = `translate(${offset.x - 15}px, ${offset.y - 15}px)`;
    dragPreviewRef.style["transform"] = transform;
    /**
     * TS is complaining about webkit keyword
     */
    // @ts-expect-error
    dragPreviewRef.style["-webkit-transform"] = transform;
};

const DragPreview = () => {
    const [dragHelperOpacity, setDragHelperOpacity] = useState<number>(0);
    const { isDragging } = useDragLayer(monitor => {
        if (!subscribedToOffsetChange) {
            // @ts-expect-error
            monitor.subscribeToOffsetChange(onOffsetChange(monitor));
            subscribedToOffsetChange = true;
        }

        return {
            isDragging: monitor.isDragging()
        };
    });

    useEffect(() => {
        return () => {
            subscribedToOffsetChange = false;
            dragPreviewRef = null;
        };
    }, []);

    // We track the value of "isDragging" and apply opacity=1 (after 100ms), when it switches to true.
    // Without this, the drag cursor would be shown in the top-left corner for a short amount of time, and then it
    // would be repositioned correctly. Definitely looks like a glitch. This also adds a nice little fade-in effect.
    useEffect(() => {
        if (isDragging) {
            setTimeout(() => {
                setDragHelperOpacity(isDragging ? 1 : 0);
            }, 100);
        } else {
            setDragHelperOpacity(0);
        }
    }, [isDragging]);

    if (!isDragging) {
        return null;
    }

    if (!isDragging) {
        return null;
    }

    return (
        <div
            style={{ zIndex: 1001 }}
            className="wby-fixed wby-pointer-events-none wby-left-0 wby-top-0 wby-w-full wby-h-full"
        >
            <div
                ref={el => (dragPreviewRef = el)}
                className="wby-transition-opacity wby-duration-250 wby-ease-in-out wby-block"
                style={{ opacity: dragHelperOpacity }}
            >
                <div className="wby-size-lg wby-rounded-full wby-bg-primary-default" />
            </div>
        </div>
    );
};

export default DragPreview;
