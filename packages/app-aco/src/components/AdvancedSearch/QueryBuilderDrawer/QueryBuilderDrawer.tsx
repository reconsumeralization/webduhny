import React, { useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { FormAPI } from "@webiny/form";
import { DrawerRight } from "@webiny/ui/Drawer";
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { QueryBuilder } from "./QueryBuilder";

import { FieldDTOWithElement, FilterDTO } from "~/components/AdvancedSearch/domain";

import { QueryBuilderDrawerPresenter, QueryBuilderFormData } from "./QueryBuilderDrawerPresenter";
import { ButtonDefault, ButtonPrimary } from "@webiny/ui/Button";

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
        <DrawerRight
            open={props.vm.isOpen}
            onClose={props.onClose}
            modal={true}
            width={1000}
            title={"Advanced search filter"}
            description={"Create a filter to search for specific content."}
            info={<ButtonDefault onClick={onSave}>Save filter</ButtonDefault>}
            actions={
                <>
                    <ButtonDefault onClick={props.onClose}>Cancel</ButtonDefault>
                    <ButtonPrimary onClick={() => ref.current?.submit()}>
                        Apply filter
                    </ButtonPrimary>
                </>
            }
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
        </DrawerRight>
    );
});
