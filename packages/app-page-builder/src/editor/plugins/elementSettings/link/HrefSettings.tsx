import React from "react";
import { merge } from "dot-prop-immutable";
import { Switch } from "@webiny/ui/Switch";
import { Form } from "@webiny/form";
import { validation } from "@webiny/validation";
import { withActiveElement } from "~/editor/components";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { UpdateElementActionEvent } from "~/editor/recoil/actions";
import { PbEditorElement, PbEditorPageElementSettingsRenderComponentProps } from "~/types";
// Components
import Accordion from "../components/Accordion";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {ContentWrapper} from "~/editor/plugins/elementSettings/components/StyledComponents";

interface LinkSettingsFormData {
    newTab?: boolean;
    href?: string;
}

interface LinkSettingsPropsType {
    element: PbEditorElement;
}

type LinkSettingsComponentProps = LinkSettingsPropsType &
    PbEditorPageElementSettingsRenderComponentProps;

const LinkSettingsComponent = ({ element, defaultAccordionValue }: LinkSettingsComponentProps) => {
    const handler = useEventActionHandler();

    const { href, newTab } = element.data?.link || {};

    const updateElement = (element: PbEditorElement) => {
        handler.trigger(
            new UpdateElementActionEvent({
                element,
                history: true
            })
        );
    };

    const updateSettings = (data: LinkSettingsFormData) => {
        // Skip update if nothing is change.
        if (data.newTab === newTab && data.href === href) {
            return;
        }
        const attrKey = `data.link`;
        const newElement: PbEditorElement = merge(element, attrKey, data);
        updateElement(newElement);
    };

    return (
        <Accordion title={"Link"} defaultValue={defaultAccordionValue}>
            <Form data={{ href, newTab }} onChange={updateSettings}>
                {({ Bind }) => (
                    <ContentWrapper direction={"column"}>
                        <Wrapper label={"URL"}>
                            <Bind
                                name={"href"}
                                validators={validation.create("url:allowRelative:allowHref")}
                            >
                                <DelayedOnChange>
                                    {props => (
                                        <InputField
                                            {...props}
                                            value={props.value || ""}
                                            onChange={props.onChange}
                                            placeholder={"https://webiny.com/blog"}
                                        />
                                    )}
                                </DelayedOnChange>
                            </Bind>
                        </Wrapper>
                        <Wrapper label={"New tab"} rightCellClassName={"wby-justify-self-end"}>
                            <Bind name={"newTab"}>
                                <Switch />
                            </Bind>
                        </Wrapper>
                    </ContentWrapper>
                )}
            </Form>
        </Accordion>
    );
};

export default withActiveElement()(LinkSettingsComponent);
