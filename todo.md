## MH
- webiny logo clickable
- top app bar menu items via config (packages/app-admin/src/base/ui/UserMenu.tsx)
  - user menu okta/a0 - kill AddUserMenu
- logo.element or logo.src

---

## NEXT PR
- logo not visible on the login nscren
- hover gray color on ddown is reaching edges, but should not
- adminConfig APIs are directly using admin-ui packages, they should NOT be
- Widgets APIs (Pavel)
- hover effect on sidebar menu
- No routes matched location "/" Error Component Stack
- hcms menu bug
- what's this for? packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx:11
- sidebar rerenders?
  - layout component not used?
  - secureRoute wrapping layout also kills sidebar?
  - gotta implement ls-based storing of open/closed state
  - HasPermissions instead of SecureRoute helps!
- decorate sidebar items
- 45px
- bc Leo
