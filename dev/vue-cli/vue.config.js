const BootstrapVueLoader = require("bootstrap-vue-loader")
module.exports = {
    configureWebpack: {
        plugins: [
            new BootstrapVueLoader()
        ]
    }
}