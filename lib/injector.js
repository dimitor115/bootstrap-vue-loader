const loaderUtils = require('loader-utils')

const runtimePaths = {
    installComponents: require.resolve('./runtime/installComponents'),
    installDirectives: require.resolve('./runtime/installDirectives')
}

function inject(runtimeInstallationFunction, content, imports, importTransformer) {
    const importsFragment =
    `
    import ${runtimeInstallationFunction} from ${loaderUtils.stringifyRequest(this, '!' + runtimePaths[runtimeInstallationFunction])}
    import {${imports.join(', ')}} from 'bootstrap-vue'
    ${runtimeInstallationFunction}(component, {${importTransformer()}})
    `

    const hotReload = content.indexOf('/* hot reload */')
    const afterComponent = content.indexOf('component.options.__file')
    if (hotReload > -1) {
        content = content.slice(0, hotReload) + importsFragment + '\n\n' + content.slice(hotReload)
    } else if(afterComponent > -1) {
        content = content.slice(0, afterComponent) + importsFragment + '\n\n' + content.slice(afterComponent)
    } else {
        content = importsFragment + '\n\n' + content
    }
    return content
}

const injectComponents = (content, components) => inject(
    'installComponents',
    content,
    components,
    () => components.join(', ')
)

const injectDirectives = (content, directives) => inject(
    'installDirectives',
    content,
    directives.map(d => d['import']),
    () => directives.map(d => `'${d.name}': ${d['import']}`).join(', ')
)

module.exports = {injectComponents, injectDirectives}