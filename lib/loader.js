const componentReader = require('./componentReader')
const analyzeComponent = require('./componentAnalyzer')
const {installComponents} = require('./instalator')

module.exports = async function (content, sourceMap) {
    this.async()
    this.cacheable()

    if (!this.resourceQuery) {
        this.addDependency(this.resourcePath)

        const componentContent = await componentReader(this.resourcePath, this.resolve)
        if (componentContent) {
            const [tags] = analyzeComponent(componentContent)
            if (tags.length) {
                console.log(tags)
                const newContent = installComponents(content, tags)
                console.log(newContent)
                return this.callback(null, newContent, sourceMap)
            }
        }
    }

    this.callback(null, content, sourceMap)
}
