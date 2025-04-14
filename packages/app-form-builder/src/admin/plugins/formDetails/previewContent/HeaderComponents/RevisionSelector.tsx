import React from "react";
import { ReactComponent as ArrowDownIcon } from "@webiny/icons/expand_more.svg";
import { Button, DropdownMenu, Text } from "@webiny/admin-ui";
import { FbRevisionModel } from "~/types";

interface RevisionSelectorProps {
    revisions: FbRevisionModel[];
    revision: FbRevisionModel;
    selectRevision: (form: FbRevisionModel) => void;
}
const RevisionSelector = ({ revisions, revision, selectRevision }: RevisionSelectorProps) => {
    return (
        <DropdownMenu
            data-testid={"fb.form-preview.header.revision-selector"}
            trigger={
                <Button
                    text={`v${revision.version}`}
                    icon={<ArrowDownIcon />}
                    variant={"tertiary"}
                    size={"sm"}
                    iconPosition={"end"}
                />
            }
        >
            {(revisions || []).map(rev => (
                <DropdownMenu.Item
                    key={rev.id}
                    data-testid={`fb.form-preview.header.revision-v${rev.version}`}
                    text={
                        <div>
                            <Text as={"div"}>v{rev.version}</Text>
                            <Text size={"sm"} as={"div"}>
                                ({rev.status})
                            </Text>
                        </div>
                    }
                    onClick={() => selectRevision(rev)}
                />
            ))}
        </DropdownMenu>
    );
};

export default RevisionSelector;
