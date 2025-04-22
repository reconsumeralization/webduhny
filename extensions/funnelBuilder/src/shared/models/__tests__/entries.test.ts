import { FunnelModel } from "../FunnelModel";
import { FunnelEntryModel } from "../FunnelEntryModel";

describe("Funnel Entries", () => {
    test("test", async () => {
        const funnel = new FunnelModel({
            steps: [
                {
                    id: "step1",
                    title: "Step 1"
                },
                {
                    id: "step2",
                    title: "Step 2"
                }
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
                    validators: [
                        { type: "required" },
                        { type: "email" }
                    ],
                    extra: {}
                }
            ]
        });

        const funnelEntry = new FunnelEntryModel(funnel);

        funnelEntry.setData({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
        })


        const kobaja = 123;

    });
});
