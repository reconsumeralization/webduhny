import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { builderSdk } from "@webiny/app-website-builder/sdk";

// This is only for debugging purposes, while editor mechanics are being established!
const PageRenderer = dynamic(
    () =>
        import(
            /* webpackChunkName: "PageRenderer" */ "@webiny/app-website-builder/components"
        ).then(m => m.PageRenderer),
    { ssr: false }
);

builderSdk.init({
    apiKey: "123"
});

export async function getStaticPaths() {
    const pages = await builderSdk.listPages();

    return {
        paths: pages.map(page => `${page.properties.path}`),
        fallback: true
    };
}

export async function getStaticProps(context: GetStaticPropsContext<{ slug: string[] }>) {
    const slug = context.params?.slug || [];
    const path = "/" + slug.join("/");
    const page = await builderSdk.getPage(path);

    console.log("getStaticProps.page", page);

    return {
        props: {
            page,
            path
        },
        revalidate: 1
    };
}

export default function Sandbox({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <PageRenderer page={page} />;
}
