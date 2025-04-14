import React, { useMemo } from "react";

import { AdvancedSearch as AdvancedSearchComponent, AdvancedSearchProps } from "./AdvancedSearch";
import { AdvancedSearchConfigs } from "./AdvancedSearchConfigs";
import { AcoWithConfig, useAcoConfig } from "~/config";

export * from "./GraphQLInputMapper";
export * from "./gateways";
import { Field, FieldMapper, FieldRaw } from "./domain";
import { AdvancedSearchDebounceRenderer } from "./AdvancedSearchDebounceRender";
export * from "./useFilterRepository";
export * from "./useInputField";

interface AdvancedSearchWithFieldRenderersProps extends Omit<AdvancedSearchProps, "fields"> {
    fields: FieldRaw[];
}

const AdvancedSearchWithFieldRenderers = ({
    fields,
    ...props
}: AdvancedSearchWithFieldRenderersProps) => {
    const { advancedSearch } = useAcoConfig();

    const fieldsWithRenderer = useMemo(() => {
        const fieldDTOs = FieldMapper.toDTO(fields.map(field => Field.createFromRaw(field)));

        return fieldDTOs.map(field => {
            const config = advancedSearch.fieldRenderers.find(config => config.type === field.type);
            const element = config?.element ?? null;
            return { ...field, element };
        });
    }, [fields]);

    return <AdvancedSearchComponent {...props} fields={fieldsWithRenderer} />;
};

export const AdvancedSearch = (props: AdvancedSearchWithFieldRenderersProps) => {
    return (
        <>
            <AcoWithConfig>
                <AdvancedSearchDebounceRenderer>
                    <AdvancedSearchWithFieldRenderers {...props} />
                </AdvancedSearchDebounceRenderer>
            </AcoWithConfig>
            <AdvancedSearchConfigs />
        </>
    );
};
