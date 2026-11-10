# Release QA checklist

## Desktop
- [ ] Chrome/Edge: navigation, wizard, forms, copy brief
- [ ] 1366×768 and 1920×1080 layouts
- [ ] Keyboard focus and readable contrast
- [ ] Search empty/error/success states
- [ ] Project save/load

## Mobile
- [ ] Android Chrome 360px / 390px widths
- [ ] Sidebar open/close
- [ ] Wizard scroll and keyboard behavior
- [ ] PWA install and offline fallback
- [ ] No horizontal overflow

## Supabase
- [ ] Auth redirect URL configured
- [ ] Register/login/logout
- [ ] RLS blocks access to other users' rows
- [ ] Project insert/select/update/delete
- [ ] No service-role key in browser bundle

## Backend
- [ ] HTTPS enabled
- [ ] CORS restricted to known origins
- [ ] Rate limit active
- [ ] Health/capabilities endpoint
- [ ] Search RSS failure handled
- [ ] AI provider failure handled
- [ ] Secrets stored in host environment, not GitHub

## Release
- [ ] Privacy policy and terms
- [ ] Copyright and platform policy review
- [ ] Backup and rollback tested
- [ ] Actual feature status matches end-to-end test results
