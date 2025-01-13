import React, { ReactElement } from "react";
import styled from "@emotion/styled";

import { Skeleton } from "~/Skeleton";

const LoaderUl = styled("ul")`
    list-style: none;
    padding: 24px 20px;
`;

const LoaderWrapper = styled("div")`
    margin-bottom: 16px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    gap: 24px;
`;

const Graphic = styled("div")`
    width: 36px;
    height: 36px;
`;

const Data = styled("div")`
    flex: 1;
    height: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ActionsContainer = styled("div")`
    justify-self: end;
`;

const Actions = styled("div")`
    text-align: right;
    height: 24px;
    display: flex;
    justify-content: end;
    gap: 8px;

    .actions-skeleton {
        width: 24px;
        height: 24px;
    }
`;

const Loader = (): ReactElement => {
    const lines = Array.from(Array(5).keys());

    return (
        <LoaderUl data-testid={"default-data-list.loading"}>
            {lines.map(line => (
                <li key={"list-" + line}>
                    <LoaderWrapper>
                        <Graphic>
                            <Skeleton />
                        </Graphic>
                        <Data>
                            <Skeleton className={"h-md"} />
                            <Skeleton className={"h-md"} />
                        </Data>
                        <ActionsContainer>
                            {" "}
                            <Actions>
                                <Skeleton className={"actions-skeleton"} />
                                <Skeleton className={"actions-skeleton"} />
                            </Actions>
                        </ActionsContainer>
                    </LoaderWrapper>
                </li>
            ))}
        </LoaderUl>
    );
};

export default Loader;
