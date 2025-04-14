# @webiny/app-serverless-cms
[![](https://img.shields.io/npm/dw/@webiny/app-serverless-cms.svg)](https://www.npmjs.com/package/@webiny/app-serverless-cms) 
[![](https://img.shields.io/npm/v/@webiny/app-serverless-cms.svg)](https://www.npmjs.com/package/@webiny/app-serverless-cms)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

An app for creating forms that can be embedded into pages created with [Webiny Page Builder](../api-page-builder). 

Use together with [@webiny/api-i18n](../api-i18n) package.

## Install
```
npm install --save @webiny/app-serverless-cms
```

Or if you prefer yarn: 
```
yarn add @webiny/app-serverless-cms
```

## Setup
To setup, you must register a set of plugins. For more information on 
plugins, please visit [Webiny documentation](https://docs.webiny.com/docs/developer-tutorials/plugins-crash-course).

#### Admin
```
import { plugins } from "@webiny/plugins";
import i18nPlugins from "@webiny/app-serverless-cms/admin/plugins";

plugins.register(i18nPlugins);
```

Note: the `i18nCmsPlugins` contains plugins for the Page Builder, which will
enable you to embed i18n in your pages.
    
#### Site
```
import { plugins } from "@webiny/plugins";
import i18nPlugins from "@webiny/app-serverless-cms/site/plugins";

plugins.register(i18nPlugins);
```
