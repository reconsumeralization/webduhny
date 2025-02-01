import { IconDto } from "./IconDto";

export class Icon {
    private readonly _prefix: string;
    private readonly _name: string;

    protected constructor(data: { prefix: string; name: string }) {
        this._prefix = data.prefix;
        this._name = data.name;
    }

    static create(data: IconDto) {
        return new Icon({
            prefix: data.prefix,
            name: data.name
        });
    }

    static createFromString(value?: string) {
        if (typeof value === "string" && value.includes("/")) {
            const values = value.split("/");
            return new Icon({
                prefix: values[1],
                name: values[1]
            });
        } else {
            console.warn("Error while instantiating icon from string value:", value);
            return new Icon({
                prefix: "fas",
                name: "star"
            });
        }
    }

    get prefix() {
        return this._prefix;
    }

    get name() {
        return this._name;
    }
}
