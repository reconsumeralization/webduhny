import * as React from "react";
import { cn, Heading, Text } from "@webiny/admin-ui";
import { SimpleFormContent, SimpleFormHeader } from "@webiny/app-admin/components/SimpleForm";
import { FbFormModel } from "~/types";

interface FormSubmissionsOverviewProps {
    form: FbFormModel;
}

const ContentWrapper = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("wby-flex wby-items-center wby-justify-center", className)} {...props}>
            {children}
        </div>
    );
};

const StatBox = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "wby-flex wby-items-center wby-justify-center wby-flex-col wby-w-1/3",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const FormSubmissionsOverview = ({ form }: FormSubmissionsOverviewProps) => {
    return (
        <>
            <SimpleFormHeader title={"Overview"} />
            <SimpleFormContent>
                <ContentWrapper>
                    <StatBox>
                        <Heading level={2}>{form.overallStats.submissions}</Heading>
                        <Text>Submissions</Text>
                    </StatBox>
                    <StatBox>
                        <Heading level={2}>{form.overallStats.views}</Heading>
                        <Text>Views</Text>
                    </StatBox>
                    <StatBox>
                        <Heading level={2}>{form.overallStats.conversionRate}%</Heading>
                        <Text>Conversion Rate</Text>
                    </StatBox>
                </ContentWrapper>
            </SimpleFormContent>
        </>
    );
};
