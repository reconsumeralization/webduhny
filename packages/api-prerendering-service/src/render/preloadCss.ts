import { RenderResult } from "./types";
import { TagPathLink } from "~/types";

export interface File {
    type: string;
    body: any;
    name: string;
    meta: {
        tags?: TagPathLink[];
        [key: string]: any;
    };
}

export const preloadCss = (render: RenderResult): void => {
    const regex = /<link href="\/static\/css\//gm;
    const subst = `<link data-link-preload data-link-preload-type="markup" href="/static/css/`;
    render.content = render.content.replace(regex, subst);
};
