import React from "react";

interface FunnelEmbedProps {
    children: React.ReactNode;
}

const Static = ({ children }: FunnelEmbedProps) => {
    return <>{children}</>;
};

export default Static;
