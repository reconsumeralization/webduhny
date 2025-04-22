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
import type { ContainerElementData } from "../types";
import { isFieldElementType } from "../../../../shared/constants";
import { useContainer } from "../ContainerProvider";
import { FunnelFieldModelDto } from "../../models/FunnelFieldModel";

const doNothing = {
    actions: []
};

export const ContainerAdminEventHandlers = () => {
    const eventHandler = useEventActionHandler();
    const container = useContainer();

    const { funnelVm } = container;
    const { getElement } = useRenderer();

    const containerElement = getElement<ContainerElementData>();

    const onElementCreate: EventActionCallable<CreateElementEventActionArgsType> = (
        _,
        __,
        args
    ) => {
        if (!args || !funnelVm) {
            return doNothing;
        }

        const { element: createdElement } = args;
        if (!isFieldElementType(createdElement.type)) {
            return doNothing;
        }

        funnelVm.addField(createdElement.data as FunnelFieldModelDto);

        return doNothing;
    };

    const onElementDelete: EventActionCallable<DeleteElementActionArgsType> = async (
        _,
        __,
        args
    ) => {
        if (!args || !funnelVm) {
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
        if (!args || !funnelVm) {
            return doNothing;
        }

        const { element: updatedField } = args;

        if (!isFieldElementType(updatedField.type)) {
            return doNothing;
        }

        console.log("upuj to", updatedField.data.id, updatedField.data);
        funnelVm.updateField(updatedField.data.id, updatedField.data);

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
