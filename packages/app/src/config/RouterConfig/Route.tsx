import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { Property, useIdGenerator } from "@webiny/react-properties";

export interface RouteProps {
    name: string;
    path: string;
    exact?: boolean;
    element: React.ReactElement;
    remove?: boolean;
    before?: string;
    after?: string;
}

export type RouteConfig = Pick<RouteProps, "name" | "path" | "element">;

export const Route = makeDecoratable(
    "Route",
    ({ name, path, element, exact, remove, before, after }: RouteProps) => {
        const getId = useIdGenerator("Route");

        const placeAfter = after !== undefined ? getId(after) : undefined;
        const placeBefore = before !== undefined ? getId(before) : undefined;

        return (
            <Property
                id={getId(name)}
                name={"routes"}
                remove={remove}
                array={true}
                before={placeBefore}
                after={placeAfter}
            >
                <Property id={getId(name, "name")} name={"name"} value={name} />
                <Property id={getId(name, "path")} name={"path"} value={path} />
                <Property id={getId(name, "exact")} name={"exact"} value={exact} />
                <Property id={getId(name, "element")} name={"element"} value={element} />
            </Property>
        );
    }
);
