## TODO
- update generation script so that new vars are included
- improve caching of state so that also opened items are stored
- see if we can avoid hardcoding of 45px height of the top app bar

### Next PR
- chevron visible briefly when expanding
- sidebar rerenders?
  - layout component not used?
  - secureRoute wrapping layout also kills sidebar?
  - HasPermissions instead of SecureRoute helps!
- HCMS SIDEBAR bug
- adminConfig APIs are directly using admin-ui packages, they should NOT be (sidebar)
- Widgets APIs (Pavel)
- No routes matched location "/" Error Component Stack
- what's this for? packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx:11
- logo.element or logo.src
- revisit <Menu.User.Link icon={<Menu.User.Link.Icon element={<AccountIcon />} label={"Account settings"} />} API
- Theme remove, use only Theme.Color