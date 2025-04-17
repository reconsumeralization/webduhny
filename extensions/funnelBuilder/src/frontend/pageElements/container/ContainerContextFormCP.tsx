import React, {useContext, useEffect, useMemo} from "react";
import { observer } from "mobx-react-lite";

export type GenericContainerData = {
    [key: string]: any;
};

const ContainerContext = React.createContext<any>({'DEFAULT':'VALUE'});

export interface ContainerProps<T extends GenericContainerData = GenericContainerData> {
    children(params: {}): React.ReactElement;
    "data-testid"?: string;
    ref?: React.MutableRefObject<any>;
}

function ContainerInner<T extends GenericContainerData = GenericContainerData>(
    props: ContainerProps<T>,
    ref: React.ForwardedRef<any>
) {
    const children = props.children;
    if (typeof children !== "function") {
        throw new Error("Container must have a function as its only child!");
    }

    const id = useMemo(() => {
        return (new Date()).getTime();
    }, [])

    const containerContext = useMemo(() => {
        return {};
    }, []);

    useEffect(() => {
        console.log('effect')

        return () => {
            console.log('cleanup')
        }
    }, [id]);

    const formContext = useMemo(() => {
        return {
            'ctxId': id,
            'memoized': 'value'
        };
    }, []);

    return (
        <ContainerContext.Provider value={formContext}>
            {React.createElement(
                "fub-container",
                {
                    "data-testid": props["data-testid"]
                },
                children({})
            )}
        </ContainerContext.Provider>
    );
}

export const ContainerProvider = observer(
    React.forwardRef(ContainerInner) as <T extends GenericContainerData = GenericContainerData>(
        props: ContainerProps<T> & { ref?: React.ForwardedRef<any> }
    ) => ReturnType<typeof ContainerInner<T>>
);

ContainerProvider.displayName = "ContainerProvider";

export const useContainer = () => {
    const context = useContext(ContainerContext);
    if (!context) {
        throw new Error("Missing Container component in the component hierarchy!");
    }
    return context;
};
