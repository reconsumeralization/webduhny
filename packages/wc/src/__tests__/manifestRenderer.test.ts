import { ManifestRenderer } from "~/Manifest/ManifestRenderer";
import path from "path";

describe("manifest render test", () => {
    it("should be able to render a simple manifest file", async () => {
        const renderedManifest = await ManifestRenderer.render(
            path.join(__dirname, "fixtures", "manifestRenderer", "simpleManifest.tsx")
        );

        expect(renderedManifest).toEqual({
            theme: [{ name: "default", path: "/themes/default" }],
            "website.publicAsset": [{ path: "/a/b/c.txt" }, { path: "/a/b/d.txt" }]
        });
    });
});
