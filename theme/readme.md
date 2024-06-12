# Custom Theme

These are the style and js files that support our custom Localist theme, which can be found at `Admin Dashboard›Appearance›UC Davis Library›Editing Theme Templates`.

## Deployment To Production
Localist does not host custom assets, so we need to upload them to one of our own servers:
1. Run `npm run dist` to build production css and js
2. Increment package.json version.
3. Copy the css/js assets to `files.library.ucdavis.edu/localist/theme/<version>`
4. In Localist, navigate to the "Global Site Shell" file in our custom theme and update the corresponding `src` and `link` elements.
