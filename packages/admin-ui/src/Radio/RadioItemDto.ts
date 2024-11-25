import React from "react";

export interface RadioItemDto {
    id?: string;
    label: string | React.ReactNode;
    value: string;
    disabled?: boolean;
}
