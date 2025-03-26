import React from "react";

import { i18n } from "@webiny/app/i18n";
import { Text } from "@webiny/admin-ui";

import { Container } from "./styled";

const t = i18n.ns("app-aco/components/folder-tree/empty");

export const Empty = () => {
    return (
        <Container>
            <Text size={"sm"}>{t`No folders found...`}</Text>
        </Container>
    );
};
