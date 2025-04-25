import React, { useEffect } from "react";
import {
    useActiveElementId,
    useElementById,
    useEventActionHandler
} from "@webiny/app-page-builder/editor";
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
import {isContainerElementType, isFieldElementType} from "../../../../shared/constants";
import { useContainer } from "../ContainerProvider";
import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../../../../shared/models/FunnelFieldDefinitionModel";
import { FunnelModelDto } from "../../../../shared/models/FunnelModel";
import { useDisclosure } from "../../../admin/useDisclosure";
import FieldSettingsDialog from "../../../admin/FieldSettingsDialog";

export const ContainerAdminEventHandlers = () => {
    const eventHandler = useEventActionHandler();
    const { getElement } = useRenderer();

    const {
        open: showFieldSettingsDialog,
        close: hideFieldSettingsDialog,
        isOpen: isFieldSettingsDialogShown,
        data: createdField
    } = useDisclosure<FunnelFieldDefinitionModel>();

    const container = useContainer();
    const { funnelVm } = container;

    const containerElement = getElement<FunnelModelDto>();

    const [activeElementId] = useActiveElementId();
    const [createdEditorElement] = useElementById(activeElementId);

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

        const fieldClone = funnelVm.getField(createdElement.data.id)!.clone();
        showFieldSettingsDialog(fieldClone);
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
        if (isFieldElementType(updatedField.type)) {
            funnelVm.updateField(updatedField.data.id, updatedField.data);
            return;
        }

        if (isContainerElementType(updatedField.type)) {
            console.log('CONTAINER UDATED', updatedField.data)
            funnelVm.funnel.populate(updatedField.data)
            return;
        }
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
            open={isFieldSettingsDialogShown}
            field={createdField!}
            onClose={hideFieldSettingsDialog}
            onSubmit={data => {
                eventHandler.trigger(
                    new UpdateElementActionEvent({
                        element: { ...createdEditorElement!, data },
                        history: false
                    })
                );
            }}
        />
    );
};
