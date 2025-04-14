import React from "react";
import { useRouter } from "@webiny/react-router";
import { ReactComponent as DownButton } from "@webiny/icons/keyboard_arrow_down.svg";
import { i18n } from "@webiny/app/i18n";
import { useQuery } from "@apollo/react-hooks";
import {
    GET_FORM_REVISIONS,
    GetFormRevisionsQueryResponse,
    GetFormRevisionsQueryVariables
} from "~/admin/graphql";
import { useFormEditor } from "~/admin/components/FormEditor";
import { Button, DropdownMenu, Text } from "@webiny/admin-ui";

const t = i18n.namespace("FormEditor.RevisionsMenu");

const Revisions = () => {
    const {
        state: { data }
    } = useFormEditor();

    const { history } = useRouter();

    const getRevisions = useQuery<GetFormRevisionsQueryResponse, GetFormRevisionsQueryVariables>(
        GET_FORM_REVISIONS,
        {
            variables: {
                id: data.id.split("#")[0]
            }
        }
    );

    const revisions =
        getRevisions.loading || !getRevisions.data?.formBuilder?.revisions?.data
            ? []
            : getRevisions.data.formBuilder.revisions.data;

    return (
        <DropdownMenu
            trigger={
                <Button
                    variant={"secondary"}
                    text={t`Revisions`}
                    icon={<DownButton />}
                    iconPosition={"end"}
                />
            }
        >
            {revisions.map(rev => (
                <DropdownMenu.Item
                    key={rev.id}
                    disabled={rev.status !== "draft"}
                    onClick={() => {
                        history.push(`/form-builder/forms/${encodeURIComponent(rev.id)}`);
                    }}
                    text={
                        <>
                            <Text as={"div"} size={"md"}>
                                v{rev.version}
                            </Text>
                            <Text size={"sm"}>({rev.status})</Text>
                        </>
                    }
                />
            ))}
        </DropdownMenu>
    );
};

export default React.memo(Revisions);
