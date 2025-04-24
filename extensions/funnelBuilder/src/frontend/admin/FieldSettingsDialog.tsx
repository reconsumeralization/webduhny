import React, { useCallback, useEffect, useState } from "react";
import { css } from "emotion";
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from "@webiny/ui/Dialog";
import { Form, FormOnSubmit } from "@webiny/form";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { GeneralTab } from "./FieldSettingsDialog/GeneralTab";
// import { ValidatorsTab } from "./EditFieldDialog/ValidatorsTab";
import { FunnelFieldDefinitionModelDto } from "../../shared/models/FunnelFieldDefinitionModel";
import { FieldElementData } from "../pageElements/fields/types";

const dialogBody = css({
    "&.webiny-ui-dialog__content": {
        width: 875,
        height: 500
    }
});

interface EditFieldDialogProps {
    field?: FieldElementData ;
    onClose: () => void;
    onSubmit: FormOnSubmit;
}

const FieldSettingsDialog = ({ field, onSubmit, ...props }: EditFieldDialogProps) => {
    const [data, setData] = useState<FieldElementData | null>(null);

    useEffect(() => {
        if (!field) {
            setData(null);
            return;
        }
        setData(field);
    }, [field]);

    const onClose = useCallback(() => {
        setData(null);
        props.onClose();
    }, []);

    return (
        <Dialog open={!!data} onClose={onClose}>
            <DialogTitle>Field Settings - {field?.label}</DialogTitle>
            {data && (
                <Form<FunnelFieldDefinitionModelDto> data={data} onSubmit={onSubmit}>
                    {form => (
                        <>
                            <DialogContent className={dialogBody}>
                                <Tabs>
                                    <Tab label={"General"}>
                                        <GeneralTab field={data} />
                                    </Tab>
                                    {/*{field && field.supportedValidatorTypes.length > 0 && (*/}
                                    {/*    <Tab label={"Validators"}>*/}
                                    {/*        /!*<ValidatorsTab form={form} field={current} />*!/*/}
                                    {/*    </Tab>*/}
                                    {/*)}*/}
                                </Tabs>
                            </DialogContent>
                            <DialogActions style={{ justifyContent: "flex-end" }}>
                                <div>
                                    <DialogButton onClick={onClose}>{"Cancel"}</DialogButton>
                                    <DialogButton onClick={form.submit}>{"Save"}</DialogButton>
                                </div>
                            </DialogActions>
                        </>
                    )}
                </Form>
            )}
        </Dialog>
    );
};

export default FieldSettingsDialog;
