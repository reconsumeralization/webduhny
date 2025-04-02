export const SIDEBAR_STATE_LS_KEY = `webiny_sidebar_state`;

interface SidebarState {
    pinned: boolean;
}

const getDefaultSidebarState = () => {
    return {
        pinned: false
    } as SidebarState;
};

export const setSidebarState = (state: SidebarState) => {
    window.localStorage.setItem(SIDEBAR_STATE_LS_KEY, JSON.stringify(state));
};

export const getSidebarState = (): SidebarState => {
    const item = window.localStorage.getItem(SIDEBAR_STATE_LS_KEY);
    if (!item) {
        return getDefaultSidebarState();
    }

    try {
        return JSON.parse(item);
    } catch {
        return getDefaultSidebarState();
    }
};
