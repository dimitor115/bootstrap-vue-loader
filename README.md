#BootstrapVue Loader
A Webpack plugin for automatic importing BootstrapVue components and directives for treeshaking.

With this plugin help you can remove your global BootstrapVue import and forget about manually importing each component
for optimal bundle size. This plugin will do it for you!

This is some kind of [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) fork, and I would like to thank that team for hard work. 

This an early version and few things still have to be done: 
* Dealing with the bvModal / bvToast usage. (Some global import if usage detected?)
* Testing strategy (some Cypress tests?, vue unit tests?)


## Want to check it?
Just go to `/dev` directory, install dependencies (`yarn`) and run `yarn serve`. 
BootstrapVue components are rendered, but there is no import anywhere.
