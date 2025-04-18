import { useEffect } from "react";
import { useEventActionHandler } from "@webiny/app-page-builder/editor";
import {
    CreateElementActionEvent,
    DeleteElementActionEvent,
    UpdateElementActionEvent
} from "@webiny/app-page-builder/editor/recoil/actions";
import type { EventActionCallable } from "@webiny/app-page-builder/types";
import type { CreateElementEventActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/createElement/types";
import type { DeleteElementActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/deleteElement/types";
import type { UpdateElementActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/updateElement/types";
import { useRenderer } from "@webiny/app-page-builder-elements";
import type { IContainerElementData } from "../types";
import { isFieldElementType } from "../../../../shared/constants";

const doNothing = {
    actions: []
};

export const ContainerAdminEventHandlers = () => {
    const eventHandler = useEventActionHandler();

    const { getElement } = useRenderer();
    const containerElement = getElement<IContainerElementData>();

    const onElementCreate: EventActionCallable<CreateElementEventActionArgsType> = (
        _,
        __,
        args
    ) => {
        if (!args) {
            return doNothing;
        }

        const { element: createdElement } = args;
        console.log('createdElement', createdElement);
        if (!isFieldElementType(createdElement.type)) {
            return doNothing;
        }

        const containerElementClone = structuredClone(containerElement);

        const updatedFields = [...containerElementClone.data.fields, createdElement.data.field];

        containerElementClone.data = {
            ...containerElementClone.data,
            fields: updatedFields
        };

        console.log('jee', containerElementClone)
        eventHandler.trigger(
            new UpdateElementActionEvent({
                element: containerElementClone,
                history: false
            })
        );

        return doNothing;
    };

    const onElementDelete: EventActionCallable<DeleteElementActionArgsType> = async (
        _,
        __,
        args
    ) => {
        if (!args) {
            return doNothing;
        }

        const { element: deletedElement } = args;

        if (isFieldElementType(deletedElement.type)) {
            const containerElementClone = structuredClone(containerElement);

            const updatedFields = containerElementClone.data.fields.filter(
                field => field.id !== deletedElement.data.field.id
            );

            containerElementClone.data = {
                ...containerElementClone.data,
                fields: updatedFields
            };

            eventHandler.trigger(
                new UpdateElementActionEvent({
                    element: containerElementClone,
                    history: false
                })
            );
        }

        // TODO: Find deleted child inputs and update container.
        return doNothing;
    };

    const onElementUpdate: EventActionCallable<UpdateElementActionArgsType> = async (
        _,
        __,
        args
    ) => {
        if (!args) {
            return doNothing;
        }

        const { element: updatedField } = args;

        if (!isFieldElementType(updatedField.type)) {
            return doNothing;
        }

        const containerElementClone = structuredClone(containerElement);

        const updatedFields = containerElementClone.data.fields.map(field => {
            if (field.id === updatedField.data.field.id) {
                return updatedField.data.field;
            }
            return field;
        });

        containerElementClone.data = {
            ...containerElementClone.data,
            fields: updatedFields
        };

        eventHandler.trigger(
            new UpdateElementActionEvent({
                element: containerElementClone,
                history: false
            })
        );

        return doNothing;
    };

    useEffect(() => {
        const offCreateElement = eventHandler.on(CreateElementActionEvent, onElementCreate);
        const offUpdateElement = eventHandler.on(UpdateElementActionEvent, onElementUpdate);
        const offDeleteElement = eventHandler.on(DeleteElementActionEvent, onElementDelete);

        return () => {
            offCreateElement();
            offUpdateElement();
            offDeleteElement();
        };
    }, [containerElement]);
    return null;
};
