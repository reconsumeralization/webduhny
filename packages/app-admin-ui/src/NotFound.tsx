import * as React from "react";
import { Link } from "@webiny/react-router";
import { NotFound as NotFoundBase } from "@webiny/app-admin";
import notFoundImage from "./NotFound/notFound.svg";

export const NotFound = NotFoundBase.createDecorator(() => {
    return function NotFound() {
        return (
            <div
                className={
                    "wby-flex wby-flex-col wby-items-center wby-justify-center wby-text-center wby-gap-xs wby-pt-[128px]"
                }
            >
                <img
                    width={200}
                    height={200}
                    src={notFoundImage}
                    alt="Not Accessible"
                    className={"wby-mb-xl"}
                />
                <div>The route is either missing, or you&apos;re not authorized to view it.</div>
                <div>Please contact your administrator to report the issue.</div>
                <Link to="/">Take me back.</Link>
            </div>
        );
    };
});
