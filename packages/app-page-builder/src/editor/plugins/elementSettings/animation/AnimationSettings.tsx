import React, { useEffect } from "react";
import { css } from "emotion";
import get from "lodash/get";
import { Cell, Grid } from "@webiny/ui/Grid";
import { PbEditorElement, PbEditorPageElementSettingsRenderComponentProps } from "~/types";
import useUpdateHandlers from "../useUpdateHandlers";

// Components
import DurationInput from "../components/SliderWithInput";
import SelectField from "../components/SelectField";
import { ContentWrapper } from "../components/StyledComponents";
import Accordion from "../components/Accordion";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

// Icon
import { ReactComponent as TimerIcon } from "./icons/round-av_timer-24px.svg";
import { useActiveElement } from "~/editor/hooks/useActiveElement";

const classes = {
    grid: css({
        "&.mdc-layout-grid": {
            padding: 0,
            marginBottom: 24
        }
    }),
    animationTypeSelectWrapper: css({}),
    inputWrapper: css({
        "& .mdc-text-field": {
            width: "100% !important",
            margin: "0px !important"
        }
    })
};

/**
 * Duration and delay accept values from 50 to 3000, with step 50ms.
 * https://github.com/michalsnik/aos#setting-duration-delay
 */
const STEP = 50;
const MAX_VALUE = 3000;
const DATA_NAMESPACE = "data.settings.animation";

const Settings = ({ defaultAccordionValue }: PbEditorPageElementSettingsRenderComponentProps) => {
    const [element] = useActiveElement<PbEditorElement>();

    const { getUpdateValue, getUpdatePreview } = useUpdateHandlers({
        element,
        dataNamespace: DATA_NAMESPACE
    });

    const animationName = get(element, DATA_NAMESPACE + ".name", "");
    const animationDuration = get(element, DATA_NAMESPACE + ".duration", 0);

    // Trigger animation manually on "animation" type change.
    useEffect(() => {
        if (animationName) {
            const animationElement = document.getElementById(element.id);
            if (animationElement) {
                animationElement.classList.remove("aos-animate");
                setTimeout(
                    () => animationElement.classList.add("aos-animate"),
                    animationDuration || 250
                );
            }
        }
    }, [animationName, animationDuration]);

    return (
        <Accordion title={"Animation"} defaultValue={defaultAccordionValue}>
            <ContentWrapper direction={"column"}>
                <Grid className={classes.grid}>
                    <Cell span={12}>
                        <Wrapper label={"Animation"}>
                            <SelectField
                                value={get(element, DATA_NAMESPACE + ".name", "")}
                                onChange={getUpdateValue("name")}
                                options={[
                                    {
                                        label: "No animation",
                                        value: ""
                                    },
                                    {
                                        label: "Fade",
                                        options: [
                                            { label: "Fade", value: "fade" },
                                            { label: "Fade Up", value: "fade-up" },
                                            { label: "Fade Down", value: "fade-down" },
                                            { label: "Fade Left", value: "fade-left" },
                                            { label: "Fade Right", value: "fade-right" },
                                            { label: "Fade Up Right", value: "fade-up-right" },
                                            { label: "Fade Up Left", value: "fade-up-left" },
                                            { label: "Fade Down Right", value: "fade-down-right" },
                                            { label: "Fade Down Left", value: "fade-down-left" }
                                        ]
                                    },
                                    {
                                        label: "Flip",
                                        options: [
                                            { label: "Flip Up", value: "flip-up" },
                                            { label: "Flip Down", value: "flip-down" },
                                            { label: "Flip Left", value: "flip-left" },
                                            { label: "Flip Right", value: "flip-right" }
                                        ]
                                    },
                                    {
                                        label: "Slide",
                                        options: [
                                            { label: "Slide Up", value: "slide-up" },
                                            { label: "Slide Down", value: "slide-down" },
                                            { label: "Slide Left", value: "slide-left" },
                                            { label: "Slide Right", value: "slide-right" }
                                        ]
                                    }
                                ]}
                            />
                        </Wrapper>
                    </Cell>
                    <Cell span={12}>
                        <DurationInput
                            className={"no-bottom-padding"}
                            label={"Duration"}
                            icon={<TimerIcon />}
                            valueKey={DATA_NAMESPACE + ".duration"}
                            updateValue={getUpdateValue("duration")}
                            updatePreview={getUpdatePreview("duration")}
                            max={MAX_VALUE}
                            step={STEP}
                        />
                    </Cell>
                    <Cell span={12}>
                        <Wrapper label={"Delay"}>
                            <InputField
                                placeholder={"ms"}
                                value={get(element, DATA_NAMESPACE + ".delay", 0)}
                                onChange={getUpdateValue("delay")}
                                min={0}
                                max={MAX_VALUE}
                                step={STEP}
                            />
                        </Wrapper>
                    </Cell>
                    <Cell span={12}>
                        <Wrapper label={"Offset"}>
                            <InputField
                                placeholder={"px"}
                                value={get(element, DATA_NAMESPACE + ".offset", 0)}
                                onChange={getUpdateValue("offset")}
                            />
                        </Wrapper>
                    </Cell>
                    <Cell span={12}>
                        <Wrapper label={"Easing"}>
                            <SelectField
                                value={get(element, DATA_NAMESPACE + ".easing", "")}
                                onChange={getUpdateValue("easing")}
                                options={[
                                    { label: "Default", value: "" },
                                    { label: "Linear", value: "linear" },
                                    { label: "Ase", value: "ease" },
                                    { label: "Ase in", value: "ease-in" },
                                    { label: "Out", value: "ease-out" },
                                    { label: "In out", value: "ease-in-out" },
                                    { label: "In back", value: "ease-in-back" },
                                    { label: "Out back", value: "ease-out-back" },
                                    { label: "In out-back", value: "ease-in-out-back" },
                                    { label: "In sine", value: "ease-in-sine" },
                                    { label: "Out sine", value: "ease-out-sine" },
                                    { label: "In out-sine", value: "ease-in-out-sine" },
                                    { label: "In quad", value: "ease-in-quad" },
                                    { label: "Out quad", value: "ease-out-quad" },
                                    { label: "In out-quad", value: "ease-in-out-quad" },
                                    { label: "In cubic", value: "ease-in-cubic" },
                                    { label: "Out cubic", value: "ease-out-cubic" },
                                    { label: "In out-cubic", value: "ease-in-out-cubic" },
                                    { label: "In quart", value: "ease-in-quart" },
                                    { label: "Out quart", value: "ease-out-quart" },
                                    {
                                        label: "In out-quart",
                                        value: "ease-in-out-quart"
                                    }
                                ]}
                            />
                        </Wrapper>
                    </Cell>
                </Grid>
            </ContentWrapper>
        </Accordion>
    );
};
type AnimationSettingsPropsType = {
    title?: string;
    styleAttribute?: string;
};
type AnimationSettingsProps = AnimationSettingsPropsType &
    PbEditorPageElementSettingsRenderComponentProps;
const AnimationSettings = (props: AnimationSettingsProps) => {
    return <Settings {...props} />;
};
export default AnimationSettings;
