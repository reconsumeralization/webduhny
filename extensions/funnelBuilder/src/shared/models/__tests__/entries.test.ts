import { FunnelModel } from "../FunnelModel";
import { FunnelSubmissionModel } from "../FunnelSubmissionModel";

describe("Funnel Entries", () => {
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
                        { type: "required" },
                        { type: "minLength", params: { threshold: 2 } }
                    ],
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
                        { type: "minLength", params: { threshold: 2 } }
                    ],
                    extra: {}
                },
                {
                    id: "email",
                    fieldId: "email",
                    stepId: "step2",
                    type: "text",
                    label: "Email",
                    helpText: "Enter your email address",
                    validators: [{ type: "required" }, { type: "email" }],
                    extra: {}
                }
            ]
        });

        const funnelSubmission = new FunnelSubmissionModel(funnel);

        funnelSubmission.setData({
            firstName: "J",
            lastName: "D"
        });

        let submissionResult = funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            data: { firstName: "J", lastName: "D" },
            errors: {
                firstName: "This field must be at least 2 characters long.",
                lastName: "This field must be at least 2 characters long."
            },
            success: false
        });

        let validationResult = funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: false,
            errors: {
                firstName: "This field must be at least 2 characters long.",
                lastName: "This field must be at least 2 characters long."
            }
        });

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
            data: {},
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
                    value: "john@example.com"
                },
                firstName: {
                    value: "John"
                },
                lastName: {
                    value: "Doe"
                }
            }
        });
    });
});
