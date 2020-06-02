const componentReader = require('./componentReader')
const analyzeComponent = require('./componentAnalyzer')
const {injectComponents, injectDirectives} = require('./injector')

module.exports = async function (content, sourceMap) {
    this.async()
    this.cacheable()

    if (!this.resourceQuery) {
        this.addDependency(this.resourcePath)

        const componentContent = await componentReader(this.resourcePath, this.resolve)
        if (componentContent) {
            let updatedContent = content
            const [components, directives] = analyzeComponent(componentContent)
            if (components.length) {
                updatedContent = injectComponents(updatedContent, components)
            }
            if(directives.length) {
                updatedContent = injectDirectives(updatedContent, directives)
            }
            return this.callback(null, updatedContent, sourceMap)
        }
    }

    this.callback(null, content, sourceMap)
}
