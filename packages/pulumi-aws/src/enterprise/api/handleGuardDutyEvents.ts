import * as aws from "@pulumi/aws";
import { ApiPulumiApp, CoreOutput } from "~/index";

export const handleGuardDutyEvents = (app: ApiPulumiApp) => {
    const core = app.getModule(CoreOutput);
    const graphqlLambda = app.resources.graphql.functions.graphql;

    const eventRule = app.addResource(aws.cloudwatch.EventRule, {
        name: `fm-bucket-malware-protection-event-rule`,
        config: {
            eventBusName: core.eventBusName,
            eventPattern: JSON.stringify({
                "source": ["aws.guardduty"],
                "detail-type": ["GuardDuty Malware Protection Object Scan Result"]
            })
        }
    });

    app.addResource(aws.lambda.Permission, {
        name: "fm-bucket-malware-protection-event-permission",
        config: {
            action: "lambda:InvokeFunction",
            function: graphqlLambda.output.arn,
            principal: "events.amazonaws.com",
            sourceArn: eventRule.output.arn
        }
    });

    app.addResource(aws.cloudwatch.EventTarget, {
        name: `fm-bucket-malware-protection-event-target`,
        config: {
            rule: eventRule.output.name,
            arn: graphqlLambda.output.arn,
            eventBusName: core.eventBusName
        }
    });
};
