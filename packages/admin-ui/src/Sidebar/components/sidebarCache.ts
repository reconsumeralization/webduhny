import { SIDEBAR_LS_KEY } from "./constants";

type CachedSidebarState = Partial<{
    pinned: boolean;
}>;

export const getCachedSidebarState = (): CachedSidebarState => {
    const item = window.localStorage.getItem(SIDEBAR_LS_KEY);
    if (!item) {
        return {};
    }

    try {
        return JSON.parse(item);
    } catch {
        return {};
    }
};

export const setCachedSidebarState = (state: CachedSidebarState) => {
    window.localStorage.setItem(SIDEBAR_LS_KEY, JSON.stringify(state));
};
