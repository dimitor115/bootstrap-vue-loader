const compiler = require('vue-template-compiler')
const { camelize, capitalize } = require('./utils')

function analyze(content) {
    const tags = new Set()
    const attrs = new Set()
    compiler.compile(content, {
        modules: [{
            postTransformNode: node => {
                if ('directives' in node) {
                    node.directives.forEach(({name}) => attrs.add(name))
                }
                tags.add(node.tag)
            }
        }]
    })
    return [
        extractAndParseVueBootstrapComponents(tags),
        extractAndParseVueBootstrapDirectives(attrs)
    ]
}
const extractAndParseVueBootstrapComponents = componentsSet =>
    Array.from(componentsSet).filter(c => c.startsWith('b-')).map(c => capitalize(camelize(c)))

const extractAndParseVueBootstrapDirectives = componentsSet =>
    Array.from(componentsSet).filter(d => d.startsWith('b-')).map(d => ({'import': `V${capitalize(camelize(d))}`, 'name': d}))

module.exports = analyze