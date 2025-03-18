import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiFilePicker } from "~/MultiFilePicker";

const meta: Meta<typeof MultiFilePicker> = {
    title: "Components/Form/Multi FilePicker",
    component: MultiFilePicker,
    argTypes: {
        onSelectItem: { action: "onSelectItem" },
        onEditItem: { action: "onEditItem" },
        onRemoveItem: { action: "onRemoveItem" },
        disabled: {
            control: "boolean",
            defaultValue: false
        }
    },
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof MultiFilePicker>;

export const Default: Story = {};

export const AreaType: Story = {
    args: {
        ...Default.args,
        type: "area"
    }
};

export const AreaWithLabel: Story = {
    args: {
        ...AreaType.args,
        label: "Any field label"
    }
};

export const AreaWithLabelRequired: Story = {
    args: {
        ...AreaType.args,
        label: "Any field label",
        required: true
    }
};

export const AreaWithDescription: Story = {
    args: {
        ...AreaType.args,
        description: "Provide the required information for processing your request."
    }
};

export const AreaWithNotes: Story = {
    args: {
        ...AreaType.args,
        note: "Note: Ensure your selection or input is accurate before proceeding."
    }
};

export const AreaWithErrors: Story = {
    args: {
        ...AreaType.args,
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const AreaDisabled: Story = {
    args: {
        ...AreaType.args,
        label: "Any field label",
        disabled: true
    }
};

export const AreaWithValidateFunction: Story = {
    args: {
        ...AreaType.args
    },
    render: args => {
        const [validation, setValidation] = useState<any>({ isValid: true, message: undefined });

        const validate = async () => {
            setValidation({ isValid: false, message: "Any custom error message." });
        };

        return <MultiFilePicker {...args} validate={validate} validation={validation} />;
    }
};

export const AreaFullExample: Story = {
    args: {
        ...AreaType.args,
        label: "Any field label",
        required: true,
        description: "Provide the required information for processing your request.",
        note: "Note: Ensure your selection or input is accurate before proceeding.",
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const Compact: Story = {
    args: {
        ...Default.args,
        type: "compact"
    }
};

export const CompactWithLabel: Story = {
    args: {
        ...Compact.args,
        label: "Any field label"
    }
};

export const CompactWithLabelRequired: Story = {
    args: {
        ...Compact.args,
        label: "Any field label",
        required: true
    }
};

export const CompactWithDescription: Story = {
    args: {
        ...Compact.args,
        description: "Provide the required information for processing your request."
    }
};

export const CompactWithNotes: Story = {
    args: {
        ...Compact.args,
        note: "Note: Ensure your selection or input is accurate before proceeding."
    }
};

export const CompactWithErrors: Story = {
    args: {
        ...Compact.args,
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const CompactDisabled: Story = {
    args: {
        ...Compact.args,
        label: "Any field label",
        disabled: true
    }
};

export const CompactWithValidateFunction: Story = {
    args: {
        ...Compact.args
    },
    render: args => {
        const [validation, setValidation] = useState<any>({ isValid: true, message: undefined });

        const validate = async () => {
            setValidation({ isValid: false, message: "Any custom error message." });
        };

        return <MultiFilePicker {...args} validate={validate} validation={validation} />;
    }
};

export const CompactFullExample: Story = {
    args: {
        ...Compact.args,
        label: "Any field label",
        required: true,
        description: "Provide the required information for processing your request.",
        note: "Note: Ensure your selection or input is accurate before proceeding.",
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};
