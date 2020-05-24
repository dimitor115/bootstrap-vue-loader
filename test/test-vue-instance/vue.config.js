const BootstrapVueLoader = require("../../lib/plugin")
module.exports = {
    configureWebpack: {
        plugins: [
            new BootstrapVueLoader()
        ]
    }
}