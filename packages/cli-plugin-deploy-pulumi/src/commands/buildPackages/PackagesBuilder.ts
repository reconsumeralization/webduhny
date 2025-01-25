import { BasePackagesBuilder } from "./BasePackagesBuilder";

export class PackagesBuilder extends BasePackagesBuilder {
    public override async build(): Promise<void> {
        const BuilderClass = this.getBuilderClass();

        const builder = new BuilderClass({
            packages: this.packages,
            inputs: this.inputs,
            context: this.context
        });

        await builder.build();
    }

    private getBuilderClass() {
        const packagesCount = this.packages.length;
        if (packagesCount === 0) {
            const { ZeroPackagesBuilder } = require("./ZeroPackagesBuilder");
            return ZeroPackagesBuilder;
        }

        if (packagesCount === 1) {
            const { SinglePackageBuilder } = require("./SinglePackageBuilder");
            return SinglePackageBuilder;
        }

        const { MultiplePackagesBuilder } = require("./MultiplePackagesBuilder");
        return MultiplePackagesBuilder;
    }
}
