import type { Preview } from "@storybook/react";

import "../src/theme.scss";

const preview: Preview = {
    parameters: {
        layout: "centered",
        docs: { toc: { headingSelector: "h2, h3, h4" } }
    }
};

export default preview;
