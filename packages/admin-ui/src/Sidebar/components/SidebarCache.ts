import { SIDEBAR_LS_KEY } from "./constants";

type CachedSidebarState = {
    pinned: boolean;
};

const DEFAULT_CACHED_STATE: CachedSidebarState = {
    pinned: false
};

export class SidebarCache {
    static get(): CachedSidebarState {
        const item = window.localStorage.getItem(SIDEBAR_LS_KEY);
        if (!item) {
            return DEFAULT_CACHED_STATE;
        }

        try {
            return JSON.parse(item);
        } catch {
            return DEFAULT_CACHED_STATE;
        }
    }

    static set(state: CachedSidebarState) {
        window.localStorage.setItem(SIDEBAR_LS_KEY, JSON.stringify(state));
    }
}
