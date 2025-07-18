# Custom Theme

These are the style and js files that support our custom Localist theme, which can be found at `Admin Dashboard›Appearance›UC Davis Library›Editing Theme Templates`.

## Deployment To Production
Localist does not host custom assets, so we need to upload them to one of our own servers:
1. Run `npm run dist` to build production css and js
2. Increment package.json version.
3. Copy the css/js assets to `files.library.ucdavis.edu/localist/theme/<version>`
4. In Localist, go to: `Settings` -> `Platform Settings` -> `Appearance` -> `Platform Themes` -> `UC Davis Library` -> `Global Site Shell` , search for `files.library` in the html template and update the corresponding `src` and `link` elements.
