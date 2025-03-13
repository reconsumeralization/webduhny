import React from "react";
import { ValidationIndicators } from "~/admin/views/contentEntries/ValidationIndicators";

export interface ValidationIndicatorsProps {
    className?: string;
}

export const ValidationIndicatorsConfig = ({ className }: ValidationIndicatorsProps) => {
    const Decorator = ValidationIndicators.createDecorator(Original => {
        return function ValidationIndicators(props) {
            return <Original {...props} className={className ?? props.className} />;
        };
    });

    return <Decorator />;
};
