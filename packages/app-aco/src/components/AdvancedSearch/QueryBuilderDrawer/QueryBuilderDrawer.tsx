import React, { useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Button, Drawer } from "@webiny/admin-ui";
import { FormAPI } from "@webiny/form";
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { QueryBuilder } from "./QueryBuilder";

import { FieldDTOWithElement, FilterDTO } from "~/components/AdvancedSearch/domain";

import { QueryBuilderDrawerPresenter, QueryBuilderFormData } from "./QueryBuilderDrawerPresenter";

interface QueryBuilderDrawerProps {
    fields: FieldDTOWithElement[];
    onClose: () => void;
    onSave: (data: FilterDTO) => void;
    onApply: (data: FilterDTO) => void;
    onValidationError: (message: string) => void;
    filter: FilterDTO;
    vm: {
        isOpen: boolean;
    };
}

export const QueryBuilderDrawer = observer(({ filter, ...props }: QueryBuilderDrawerProps) => {
    const presenter = useMemo<QueryBuilderDrawerPresenter>(() => {
        return new QueryBuilderDrawerPresenter();
    }, []);

    useEffect(() => {
        presenter.load(filter);
    }, [filter]);

    const onChange = (data: QueryBuilderFormData) => {
        presenter.setFilter(data);
    };

    const onApply = () => {
        presenter.onApply(
            filter => {
                props.onApply(filter);
            },
            () => {
                props.onValidationError(presenter.vm.invalidMessage);
            }
        );
    };

    const onSave = () => {
        presenter.onSave(
            filter => {
                props.onSave(filter);
            },
            () => {
                props.onValidationError(presenter.vm.invalidMessage);
            }
        );
    };

    useHotkeys({
        zIndex: 55,
        disabled: !props.vm.isOpen,
        keys: {
            esc: props.onClose
        }
    });

    const ref = useRef<FormAPI | null>(null);

    return (
        <Drawer
            open={props.vm.isOpen}
            onOpenChange={open => {
                if (!open) {
                    props.onClose();
                }
            }}
            modal={true}
            width={1000}
            title={"Advanced search filter"}
            description={"Create a filter to search for specific content."}
            info={<Button onClick={onSave} text={"Save filter"} variant={"secondary"} />}
            actions={
                <>
                    <Drawer.CancelButton text={"Cancel"} />
                    <Drawer.ConfirmButton
                        onClick={() => ref.current?.submit()}
                        text={"Apply filter"}
                    />
                </>
            }
            headerSeparator={true}
            footerSeparator={true}
        >
            <QueryBuilder
                onForm={form => (ref.current = form)}
                onSubmit={onApply}
                onChange={data => onChange(data)}
                onDeleteGroup={groupIndex => presenter.deleteGroup(groupIndex)}
                onSetFilterFieldData={(groupIndex, filterIndex, data) =>
                    presenter.setFilterFieldData(groupIndex, filterIndex, data)
                }
                onDeleteFilterFromGroup={(groupIndex, filterIndex) =>
                    presenter.deleteFilterFromGroup(groupIndex, filterIndex)
                }
                onAddNewFilterToGroup={groupIndex => presenter.addNewFilterToGroup(groupIndex)}
                onAddGroup={() => presenter.addGroup()}
                fields={props.fields}
                vm={presenter.vm}
            />
        </Drawer>
    );
});
