const RuleSet = require('webpack/lib/RuleSet')
let vueLoaderPath
try {
    vueLoaderPath = require.resolve('vue-loader')
} catch (err) {}

function isVueLoader (use) {
    return use.ident === 'vue-loader-options' ||
        use.loader === 'vue-loader' ||
        (vueLoaderPath && use.loader === vueLoaderPath)
}

class VuetifyLoaderPlugin {
    constructor (options) {
        this.options = options || {}
    }

    apply (compiler) {
        console.log("Running!!")
        // use webpack's RuleSet utility to normalize user rules
        const rawRules = compiler.options.module.rules
        const { rules } = new RuleSet(rawRules)

        // find the rule that applies to vue files
        const vueRuleIndex = rules.findIndex(rule => rule.use && rule.use.find(isVueLoader))
        const vueRule = rules[vueRuleIndex]

        if (!vueRule) {
            throw new Error(
                `[VuetifyLoaderPlugin Error] No matching rule for vue-loader found.\n` +
                `Make sure there is at least one root-level rule that uses vue-loader.`
            )
        }

        vueRule.use.unshift({
            loader: require.resolve('./loader'),
            options: {
                match: this.options.match || [],
                attrsMatch: this.options.attrsMatch || []
            }
        })

        compiler.options.module.rules = rules
    }
}

module.exports = VuetifyLoaderPlugin
