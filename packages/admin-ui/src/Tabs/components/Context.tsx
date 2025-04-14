import { createContext } from "react";
import { TabItem } from "./Tab";

interface ITabsContext {
    addTab(props: TabItem): void;
    removeTab(id: string): void;
}

const TabsContext = createContext<ITabsContext | undefined>(undefined);

export { TabsContext, type ITabsContext };
