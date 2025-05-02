import { FunnelModel } from "../FunnelModel";
import { FunnelSubmissionModel } from "../FunnelSubmissionModel";

describe("Funnel Submissions", () => {
    test("test", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" }
            ],
            fields: [
                {
                    id: "firstName",
                    fieldId: "firstName",
                    stepId: "step1",
                    type: "text",
                    label: "First Name",
                    helpText: "Enter your first name",
                    validators: [
                        {
                            type: "required",
                            params: { extra: {}, errorMessage: "Value is required." }
                        },
                        {
                            type: "minLength",
                            params: {
                                extra: { threshold: 2 },
                                errorMessage: "This field must be at least 2 characters long."
                            }
                        }
                    ],
                    value: {
                        value: "",
                        type: "string"
                    },
                    extra: {}
                },
                {
                    id: "lastName",
                    fieldId: "lastName",
                    stepId: "step1",
                    type: "text",
                    label: "Last Name",
                    helpText: "Enter your last name",
                    validators: [
                        { type: "required" },
                        {
                            type: "minLength",
                            params: {
                                extra: { threshold: 2 },
                                errorMessage: "This field must be at least 2 characters long."
                            }
                        }
                    ],
                    value: {
                        value: "",
                        type: "string"
                    },
                    extra: {}
                },
                {
                    id: "email",
                    fieldId: "email",
                    stepId: "step2",
                    type: "text",
                    label: "Email",
                    helpText: "Enter your email address",
                    validators: [
                        { type: "required" },
                        {
                            type: "pattern",
                            params: {
                                errorMessage: "Value must be a valid email address.",
                                extra: {
                                    preset: "email"
                                }
                            }
                        }
                    ],
                    value: {
                        value: "",
                        type: "string"
                    },
                    extra: {}
                },
                {
                    id: "location",
                    fieldId: "location",
                    stepId: "step2",
                    type: "text",
                    label: "Location",
                    helpText: "Location",
                    validators: [
                        {
                            type: "required",
                            params: { extra: {}, errorMessage: "Value is required." }
                        },
                        {
                            type: "minLength",
                            params: {
                                extra: { threshold: 2 },
                                errorMessage: "This field must be at least 2 characters long."
                            }
                        }
                    ],
                    value: {
                        value: "Earth",
                        type: "string"
                    },
                    extra: {}
                },
                {
                    id: "colors",
                    fieldId: "colors",
                    stepId: "step2",
                    type: "text",
                    label: "Colors",
                    helpText: "Colors",
                    validators: [
                        {
                            type: "required",
                            params: { extra: {}, errorMessage: "Please choose at least one color." }
                        }
                    ],
                    value: {
                        value: [],
                        array: true,
                        type: "string"
                    },
                    extra: {
                        options: [
                            { value: "red", label: "Red" },
                            { value: "green", label: "Green" },
                            { value: "blue", label: "Blue" }
                        ]
                    }
                }
            ],
            conditionRules: [
                {
                    id: "rule1",
                    conditionGroup: {
                        id: "conditionGroup1",
                        operator: "and",
                        items: [
                            {
                                id: "condition1",
                                sourceFieldId: "firstName",
                                operator: "eq",
                                value: ""
                            }
                        ]
                    },
                    actions: [
                        {
                            id: "action1",
                            type: "disableField",
                            target: {
                                type: "field",
                                id: "lastName"
                            },
                            params: {
                                fieldId: "lastName"
                            }
                        }
                    ]
                }
            ]
        });

        const funnelSubmission = new FunnelSubmissionModel(funnel);

        funnelSubmission.setData({
            firstName: "",
            lastName: "D"
        });

        let submissionResult = funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            data: { firstName: "", lastName: "D" },
            errors: {
                firstName: "Value is required.",
                lastName: "This field must be at least 2 characters long."
            },
            success: false
        });

        let validationResult = funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: false,
            errors: {
                firstName: "Value is required.",
                lastName: "This field must be at least 2 characters long."
            }
        });

        expect(funnelSubmission.getField("lastName").disabled).toBe(true);

        // Pass a short value for `firstName` field.
        funnelSubmission.setData({
            firstName: "J",
            lastName: "D"
        });

        submissionResult = funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            data: { firstName: "J", lastName: "D" },
            errors: {
                firstName: "This field must be at least 2 characters long.",
                lastName: "This field must be at least 2 characters long."
            },
            success: false
        });

        validationResult = funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: false,
            errors: {
                lastName: "This field must be at least 2 characters long.",
                firstName: "This field must be at least 2 characters long."
            }
        });

        expect(funnelSubmission.getField("lastName").disabled).toBe(false);

        // Pass valid values for both `firstName` and `lastName`.
        funnelSubmission.setData({ firstName: "John", lastName: "Doe" });

        submissionResult = funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            data: { firstName: "John", lastName: "Doe" },
            errors: null,
            success: true
        });

        funnelSubmission.submitActiveStep();

        expect(funnelSubmission.getActiveStepIndex()).toEqual(1);

        submissionResult = funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            data: {
                colors: [],
                email: "",
                location: "Earth"
            },
            errors: { email: "Value is required." },
            success: false
        });

        validationResult = funnelSubmission.validateActiveStep();

        expect(validationResult).toEqual({
            isValid: false,
            errors: { email: "Value is required." }
        });

        funnelSubmission.setData({ email: "john@example" });

        validationResult = funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            errors: { email: "Value must be a valid email address." },
            isValid: false
        });

        funnelSubmission.setData({
            email: "john@example.com"
        });

        validationResult = funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: true,
            errors: {}
        });

        funnelSubmission.submitActiveStep();

        const dto = funnelSubmission.toDto();
        expect(dto).toEqual({
            activeStep: "step2",
            fields: {
                email: {
                    value: {
                        array: false,
                        type: "string",
                        value: "john@example.com"
                    }
                },
                firstName: {
                    value: {
                        array: false,
                        type: "string",
                        value: "John"
                    }
                },
                lastName: {
                    value: {
                        array: false,
                        type: "string",
                        value: "Doe"
                    }
                },
                location: {
                    value: {
                        array: false,
                        type: "string",
                        value: "Earth"
                    }
                },
                "colors": {
                    "value": {
                        "array": true,
                        "type": "string",
                        "value": []
                    }
                },
            }
        });
    });
});
