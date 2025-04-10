import React, { Fragment, useMemo } from "react";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { validation } from "@webiny/validation";
import { Bind, useBind } from "@webiny/form";
import { Button, cn, DynamicFieldset, IconButton, Input, Label, Text } from "@webiny/admin-ui";

const Header = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("wby-flex wby-justify-between", className)} {...props}>
            {children}
        </div>
    );
};

const PATHNAME_REGEX = /^\/[/.a-zA-Z0-9-_]+$/;

export const Aliases = () => {
    const { value, onChange } = useBind({ name: "aliases" });

    const addAlias = () => {
        const newValue = Array.isArray(value) ? [...value] : [];
        newValue.push("");
        if (!onChange) {
            return;
        }
        onChange(newValue);
    };

    const aliasValidator = useMemo(() => {
        return [
            validation.create("required"),
            (value: string) => {
                if (!PATHNAME_REGEX.test(value)) {
                    throw new Error("Value must be a valid pathname.");
                }
            }
        ];
    }, []);

    return (
        <DynamicFieldset value={value || [""]} onChange={onChange}>
            {({ actions, header, row, empty }) => (
                <>
                    {row(({ index }) => (
                        <div className={"wby-mt-md"}>
                            <Text size={"sm"} as={"div"} className={"wby-mb-sm"}>
                                {"Enter a file path, e.g., /my/custom/file/path.png"}
                            </Text>
                            <div className={"wby-flex wby-items-start wby-gap-sm"}>
                                <Bind validators={aliasValidator} name={`aliases.${index}`}>
                                    <Input placeholder={"Alias"} size={"lg"} />
                                </Bind>
                                <IconButton
                                    variant={"ghost"}
                                    size={"lg"}
                                    icon={<DeleteIcon />}
                                    onClick={actions.remove(index)}
                                />
                            </div>
                        </div>
                    ))}
                    {empty(() => (
                        <Fragment>
                            <Header>
                                <Label text={"File Aliases"} />
                                <Button
                                    onClick={addAlias}
                                    text="Add alias"
                                    variant={"secondary"}
                                    size={"sm"}
                                />
                            </Header>
                            <Text size={"sm"} as={"div"} className={"wby-mt-sm"}>
                                To make your file accessible via custom paths, add one or more
                                aliases.
                            </Text>
                        </Fragment>
                    ))}
                    {header(() => (
                        <Header>
                            <Label text={"File Aliases"} />
                            <Button
                                onClick={addAlias}
                                text="Add alias"
                                variant={"secondary"}
                                size={"sm"}
                            />
                        </Header>
                    ))}
                </>
            )}
        </DynamicFieldset>
    );
};
