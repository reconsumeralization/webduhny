import React from "react";
import dayjs from "dayjs";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as CalendarIcon } from "@webiny/icons/today.svg";
import { useFile } from "~/hooks/useFile";

export const CreatedOn = () => {
    const { file } = useFile();

    return (
        <div className={"wby-flex wby-items-center wby-gap-xs"}>
            <div>
                <Icon icon={<CalendarIcon />} label={"Calendar icon"} color={"neutral-light"} />
            </div>
            <Text size={"sm"} as={"div"}>
                {dayjs(file.createdOn).format("DD MMM YYYY [at] HH:mm")}
            </Text>
        </div>
    );
};
