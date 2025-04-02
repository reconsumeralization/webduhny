## TODO
- see if we can avoid hardcoding of 45px height of the top app bar
- 175 duration const?
- packages/admin-ui/src/Sidebar/components/SidebarHeader.tsx ONCLICK CHECK... why t/o at all here?
- update generation script so that new vars are included
- finish storing of pinned / not pinned 
- chevron visible briefly when expanding

### Next PR
- improve caching of state so that also opened items are stored
- sidebar rerenders?
  - layout component not used?
  - secureRoute wrapping layout also kills sidebar?
  - gotta implement ls-based storing of open/closed state
  - HasPermissions instead of SecureRoute helps!
- HCMS SIDEBAR bug

- adminConfig APIs are directly using admin-ui packages, they should NOT be (sidebar)
- Widgets APIs (Pavel)
- No routes matched location "/" Error Component Stack
- what's this for? packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx:11
- logo.element or logo.src
- revisit <Menu.User.Link icon={<Menu.User.Link.Icon element={<AccountIcon />} label={"Account settings"} />} API