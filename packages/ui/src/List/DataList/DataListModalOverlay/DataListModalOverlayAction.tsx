import React, { useContext } from "react";
import { DataListModalOverlayContext } from "./DataListModalOverlayContext";

export interface DataListModalOverlayActionProps {
    icon: React.ReactElement;
    "data-testid"?: string;
}

export const DataListModalOverlayAction = ({ icon, ...rest }: DataListModalOverlayActionProps) => {
    const { isOpen, setIsOpen } = useContext(DataListModalOverlayContext);

    return icon
        ? React.cloneElement(icon, {
              "data-testid": rest["data-testid"],
              onClick: () => setIsOpen(!isOpen),
              size: "lg"
          })
        : null;
};
