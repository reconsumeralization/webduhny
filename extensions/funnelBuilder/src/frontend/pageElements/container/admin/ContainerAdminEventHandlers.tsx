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
import { useActiveElement } from "@webiny/app-page-builder/editor";
import { isFieldElementType } from "../../../../shared/constants";
import { useContainer } from "../ContainerProvider";
import { FunnelFieldDefinitionModelDto } from "../../../../shared/models/FunnelFieldDefinitionModel";
import { FunnelModelDto } from "../../../../shared/models/FunnelModel";

const DO_NOTHING = { actions: [] };

export const ContainerAdminEventHandlers = () => {
    const eventHandler = useEventActionHandler();
    const container = useContainer();

    const [activeElement] = useActiveElement();
    const { funnelVm } = container;
    const { getElement } = useRenderer();

    const containerElement = getElement<FunnelModelDto>();

    const onElementCreate: EventActionCallable<CreateElementEventActionArgsType> = (
        _,
        __,
        args
    ) => {
        if (!args || !funnelVm) {
            return DO_NOTHING;
        }

        const { element: createdElement } = args;
        if (!isFieldElementType(createdElement.type)) {
            return DO_NOTHING;
        }

        funnelVm.addField({
            ...createdElement.data,
            stepId: funnelVm.getActiveStepId()
        } as FunnelFieldDefinitionModelDto);

        return DO_NOTHING;
    };

    const onElementDelete: EventActionCallable<DeleteElementActionArgsType> = async (
        _,
        __,
        args
    ) => {
        if (!args || !funnelVm) {
            return DO_NOTHING;
        }

        const { element: deletedElement } = args;

        if (isFieldElementType(deletedElement.type)) {
            funnelVm.removeField(deletedElement.data.id);
        }

        // TODO: Find deleted child inputs and update container.
        return DO_NOTHING;
    };

    const onElementUpdate: EventActionCallable<UpdateElementActionArgsType> = async (
        _,
        __,
        args
    ) => {
        if (!args || !funnelVm) {
            return DO_NOTHING;
        }

        const { element: updatedField } = args;

        if (!isFieldElementType(updatedField.type)) {
            return DO_NOTHING;
        }

        funnelVm.updateField(updatedField.data.id, updatedField.data);

        return DO_NOTHING;
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
