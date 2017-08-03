# 5.8 - Webpack with Browsersync

This is a demonstration of how to configure webpack with Browsersync to automatically reload your WordPress site when JavaScript is used.

We assume you are already familiar with tools like webpack, live reloading, local development, npm, and some command line.

### Instructions

1. Install the theme
2. Using the command line, cd into the '/assets/js/' directory
3. Run the following: npm install
4. In webpack.config.js find the new BrowserSyncPlugin and set proxy to the local development URL you use for your site.
5. Run npm start.  This will launch localhost:3333 in your browser and automatically reload the page when you save changes to your JavaScript code.
