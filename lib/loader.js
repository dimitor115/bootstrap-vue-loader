const componentReader = require('./componentReader')
const analyzeComponent = require('./componentAnalyzer')
const {installComponents, installDirectives} = require('./instalator')

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
                updatedContent = installComponents(updatedContent, components)
            }
            if(directives.length) {
                updatedContent = installDirectives(updatedContent, directives)
            }
            console.log(updatedContent)
            return this.callback(null, updatedContent, sourceMap)
        }
    }

    this.callback(null, content, sourceMap)
}
