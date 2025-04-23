import React, { useEffect, useState } from "react";
import { useEventActionHandler } from "@webiny/app-page-builder/editor";
import {
    CreateElementActionEvent,
    DeleteElementActionEvent,
    UpdateElementActionEvent
} from "@webiny/app-page-builder/editor/recoil/actions";
import type {
    EventActionCallable,
    EventActionHandlerCallableArgs
} from "@webiny/app-page-builder/types";
import type { CreateElementEventActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/createElement/types";
import type { DeleteElementActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/deleteElement/types";
import type { UpdateElementActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/updateElement/types";
import { useRenderer } from "@webiny/app-page-builder-elements";
import { isFieldElementType } from "../../../../shared/constants";
import { useContainer } from "../ContainerProvider";
import { FunnelFieldDefinitionModelDto } from "../../../../shared/models/FunnelFieldDefinitionModel";
import { FunnelModelDto } from "../../../../shared/models/FunnelModel";
import FieldSettingsDialog from "../../../admin/FieldSettingsDialog";
import { FieldElement } from "../../fields/types";

export const ContainerAdminEventHandlers = () => {
    const eventHandler = useEventActionHandler();
    const [createdFieldElement, setCreatedFieldElement] = useState<FieldElement | null>(null);
    const { getElement } = useRenderer();

    const container = useContainer();
    const { funnelVm } = container;

    const containerElement = getElement<FunnelModelDto>();

    const createOnElementEventHandler = function <
        TArgs extends EventActionHandlerCallableArgs = any
    >(handler: (args: TArgs) => void): EventActionCallable<TArgs> {
        return (_, __, args) => {
            if (!args || !funnelVm) {
                return { actions: [] };
            }

            handler(args);

            return { actions: [] };
        };
    };

    const onElementCreate = createOnElementEventHandler<CreateElementEventActionArgsType>(args => {
        const { element: createdElement } = args;
        if (!isFieldElementType(createdElement.type)) {
            return;
        }

        funnelVm.addField({
            ...createdElement.data,
            stepId: funnelVm.getActiveStepId()
        } as FunnelFieldDefinitionModelDto);

        setCreatedFieldElement(createdElement as FieldElement);
    });

    const onElementDelete = createOnElementEventHandler<DeleteElementActionArgsType>(args => {
        const { element: deletedElement } = args;
        if (isFieldElementType(deletedElement.type)) {
            funnelVm.removeField(deletedElement.data.id);
        }

        // TODO: Find deleted child inputs and update container.
    });

    const onElementUpdate = createOnElementEventHandler<UpdateElementActionArgsType>(args => {
        const { element: updatedField } = args;
        if (!isFieldElementType(updatedField.type)) {
            return;
        }

        funnelVm.updateField(updatedField.data.id, updatedField.data);
    });

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

    return (
        <FieldSettingsDialog
            field={createdFieldElement?.data}
            onClose={() => setCreatedFieldElement(null)}
            onSubmit={data => {
                eventHandler.trigger(
                    new UpdateElementActionEvent({
                        element: { ...createdFieldElement!, data },
                        history: false
                    })
                );
            }}
        />
    );
};
