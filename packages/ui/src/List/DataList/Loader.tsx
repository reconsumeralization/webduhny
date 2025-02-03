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

const Data = styled("div")`
    flex: 1;
    height: 40px;
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
`;

const Loader = (): ReactElement => {
    const lines = Array.from(Array(5).keys());

    return (
        <LoaderUl data-testid={"default-data-list.loading"}>
            {lines.map(line => (
                <li key={"list-" + line}>
                    <LoaderWrapper>
                        <Skeleton type={"thumbnail"} size={"xxl"} />
                        <Data>
                            <Skeleton type={"text"} size={"md"} />
                            <Skeleton type={"text"} size={"md"} />
                        </Data>
                        <ActionsContainer>
                            <Actions>
                                <Skeleton type={"thumbnail"} size={"lg"} />
                                <Skeleton type={"thumbnail"} size={"lg"} />
                            </Actions>
                        </ActionsContainer>
                    </LoaderWrapper>
                </li>
            ))}
        </LoaderUl>
    );
};

export default Loader;
