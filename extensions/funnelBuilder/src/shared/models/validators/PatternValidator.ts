import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";
import { patternPresets } from "./PatternValidator/patternPresets";

interface PatternValidatorExtraParams {
    preset?: string;
    regex?: string;
    flags?: string;
}

export class PatternValidator extends AbstractValidator<PatternValidatorExtraParams> {
    constructor(params: FieldValidatorParamsDto<PatternValidatorExtraParams> = {}) {
        super({
            type: "pattern",
            params: {
                errorMessage: params.errorMessage || "Invalid value.",
                extra: params.extra || {
                    preset: "custom",
                    regex: "",
                    flags: ""
                }
            }
        });
    }

    isValid(value: any) {
        if (!value) {
            return true;
        }

        const params = this.params;

        let pattern: Pick<PatternValidatorExtraParams, "regex" | "flags"> | undefined = undefined;
        if (params.extra.preset === "custom") {
            pattern = params.extra;
        } else {
            const patternPreset = patternPresets.find(item => item.type === params.extra.preset);
            if (patternPreset) {
                pattern = patternPreset;
            }
        }

        if (!pattern || !pattern.regex) {
            return true;
        }

        return new RegExp(pattern.regex, pattern.flags).test(value);
    }
}
