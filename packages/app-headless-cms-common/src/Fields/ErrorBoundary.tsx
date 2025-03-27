import React, { ErrorInfo } from "react";
import type { CmsModelField } from "~/types";
import { FieldElementError } from "./FieldElementError";

type State =
    | {
          hasError: true;
          error: Error;
      }
    | { hasError: false; error: undefined };

interface Props {
    field: CmsModelField;
    [key: string]: any;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: undefined
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error
        };
    }

    public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { field } = this.props;
        if (!field) {
            return;
        }
        console.groupCollapsed(
            `%cFIELD ERROR%c: An error occurred while rendering model field "${field.fieldId}" (${field.id}) of type "${field.type}".`,
            "color:red",
            "color:default"
        );
        console.log("Field definition", field);
        console.error(error, errorInfo);
        console.groupEnd();
    }

    public override render() {
        if (this.state.hasError) {
            return (
                <FieldElementError
                    title={`Error: ${this.state.error.message}`}
                    description={"See developer console for more details."}
                />
            );
        }

        return this.props.children;
    }
}
