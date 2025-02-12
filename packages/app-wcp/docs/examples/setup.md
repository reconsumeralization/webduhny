# Setup

The first step in using this package is to render the `WcpLicenseProvider` provider React component.

You do this by wrapping your existing application. This ensures that the [`useWcp`](./../../README.md) hook is ready to be used within child React components.

```tsx
import React from "react";
import { WcpLicenseProvider } from "@webiny/app-wcp";

const App = () => {
  return (
    <WcpLicenseProvider>
      <MyApp />
    </WcpLicenseProvider>
  );
};

export const App;
```

> ℹ️ **INFO**
>
> Internally, the [`WcpLicenseProvider`](#WcpProvider) provider retrieves WCP project information from the Webiny's default GraphQL API. Because of this, note that this project relies on [`@webiny/api-wcp`](./../api-wcp) when it comes to retrieving project information (via GraphQL).
