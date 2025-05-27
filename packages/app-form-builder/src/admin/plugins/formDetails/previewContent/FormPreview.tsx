import * as React from "react";
import { cn, OverlayLoader } from "@webiny/admin-ui";
import { Form } from "../../../../components/Form";
import { DATA_FIELDS } from "~/components/Form/graphql";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FbErrorResponse, FbFormModel, FbRevisionModel } from "~/types";

interface GetFormQueryResponse {
    formBuilder: {
        getForm: {
            data: FbFormModel;
            error?: FbErrorResponse;
        };
    };
}
interface GetFormQueryVariables {
    revision: string;
}
const GET_FORM = gql`
    query FbGetFullForm($revision: ID!) {
        formBuilder {
            getForm(revision: $revision) {
                data {
                    ${DATA_FIELDS}
                }
                error {
                    message
                }
            }
        }
    }
`;

const PageInnerWrapper = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "wby-relative wby-overflow-x-hidden wby-overflow-y-scroll wby-max-h-full wby-p-lg",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

interface FormPreviewProps {
    revision: FbRevisionModel;
    form: FbFormModel;
}

const FormPreview = ({ revision }: FormPreviewProps) => {
    const { data, error, loading } = useQuery<GetFormQueryResponse, GetFormQueryVariables>(
        GET_FORM,
        {
            variables: {
                revision: revision.id
            }
        }
    );

    if (loading) {
        return (
            <div style={{ height: "500px" }} className={"wby-relative wby-w-full"}>
                <OverlayLoader text={"Loading preview..."} />
            </div>
        );
    }

    if (error) {
        console.error(error.message, error);
        return (
            <PageInnerWrapper>
                {"Form data could not be loaded. Check browser console for errors."}
            </PageInnerWrapper>
        );
    }

    return (
        <PageInnerWrapper>
            {revision && <Form preview data={data?.formBuilder?.getForm?.data} />}
        </PageInnerWrapper>
    );
};

export default FormPreview;
