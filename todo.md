## TODO
- main navigation - try to open on hover, not on click
- see if we can avoid hardcoding of 45px height of the top app bar
- [p] logo not visible on the login screen
- sidebar rerenders?
  - layout component not used?
  - secureRoute wrapping layout also kills sidebar?
  - gotta implement ls-based storing of open/closed state
  - HasPermissions instead of SecureRoute helps!
- HCMS SIDEBAR bug

### Next PR
- adminConfig APIs are directly using admin-ui packages, they should NOT be (sidebar)
- Widgets APIs (Pavel)
- No routes matched location "/" Error Component Stack
- what's this for? packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx:11
- logo.element or logo.src
- revisit <Menu.User.Link icon={<Menu.User.Link.Icon element={<AccountIcon />} label={"Account settings"} />} API