# BootstrapVue Loader
A Webpack plugin for automatic importing BootstrapVue components and directives for treeshaking.

With this plugin help you can remove your global BootstrapVue import and forget about manually importing each component
for optimal bundle size. This plugin will do it for you!

This is some kind of [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) fork, and I would like to thank that team for hard work. 

Roadmap to first stable version (1.0)
* [x] Dynamic component importing
* [x] Dynamic directives importing
* [x] Component test setup (Generating test components from docs examples)
* [x] Testing proper components and directives loading

Current limitation: 
* Automatic global bvModal / bvToast plugin importing

## Want to check it?
Just go to `/dev` directory, install dependencies (`yarn`) and run `yarn serve`. 
BootstrapVue components are rendered, but there is no import anywhere.
