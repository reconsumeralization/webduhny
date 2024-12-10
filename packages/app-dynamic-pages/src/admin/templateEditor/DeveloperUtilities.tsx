import { useEffect } from "react";
import { useTemplate } from "@webiny/app-page-builder/templateEditor";
import { PbPageTemplateDataBinding } from "@webiny/app-page-builder/types";

export const DeveloperUtilities = () => {
    const [template, updateTemplate] = useTemplate();

    const resetBindings = () => {
        updateTemplate(template => {
            return { ...template, dataBindings: [] };
        });
    };

    useEffect(() => {
        // @ts-expect-error This is a developers-only utility.
        window["debug_resetAllBindings"] = resetBindings;

        // @ts-expect-error This is a developers-only utility.
        window["debug_printAllBindings"] = () => {
            console.log(template.dataBindings);
        };

        // @ts-expect-error This is a developers-only utility.
        window["debug_refreshBindings"] = () => {
            updateTemplate(template => {
                const uniqueBindings: PbPageTemplateDataBinding[] = [];

                template.dataBindings.forEach(db => {
                    if (
                        !uniqueBindings.some(
                            b => b.dataSource === db.dataSource && b.bindTo === db.bindTo
                        )
                    ) {
                        uniqueBindings.push(db);
                    }
                });
                return { ...template, dataBindings: uniqueBindings };
            });
        };
    }, [template.dataBindings]);

    return null;
};
