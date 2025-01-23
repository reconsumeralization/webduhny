import * as aws from "@pulumi/aws";
import GetStagedDeploymentsSettings from "./rest/getStagedDeploymentsSettings";
import GetProjectLicense from "./rest/getProjectLicense";
import StripeWebhooks from "./rest/stripeWebhooks";
import UpdateProjectEnvironmentSeats from "./rest/updateProjectEnvironmentSeats";
import UpdateProjectEnvironmentTenants from "./rest/updateProjectEnvironmentTenants";

interface RestParams {
    env: Record<string, any>;
    dbTable: aws.dynamodb.Table;
}

class Rest {
    functions: {
        getProjectLicense: GetProjectLicense;
        getStagedDeploymentsSettings: GetStagedDeploymentsSettings;
        stripeWebhooks: StripeWebhooks;
        updateProjectEnvironmentSeats: UpdateProjectEnvironmentSeats;
        updateProjectEnvironmentTenants: UpdateProjectEnvironmentTenants;
    };

    constructor(params: RestParams) {
        this.functions = {
            getProjectLicense: new GetProjectLicense(params),
            getStagedDeploymentsSettings: new GetStagedDeploymentsSettings(params),
            stripeWebhooks: new StripeWebhooks(params),
            updateProjectEnvironmentSeats: new UpdateProjectEnvironmentSeats(params),
            updateProjectEnvironmentTenants: new UpdateProjectEnvironmentTenants(params)
        };
    }
}

export default Rest;
