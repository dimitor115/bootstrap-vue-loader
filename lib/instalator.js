const loaderUtils = require('loader-utils')

const runtimePaths = {
    installComponents: require.resolve('./runtime/installComponents'),
    installDirectives: require.resolve('./runtime/installDirectives')
}

function install(runtimeInstallationFunction, content, imports, importTransformator) {
    let newContent = '/*bootstrap-vue-loader */\n'
    newContent += `import ${runtimeInstallationFunction} from ${loaderUtils.stringifyRequest(this, '!' + runtimePaths[runtimeInstallationFunction])}\n`
    newContent += `import {${imports.join(', ')}} from 'bootstrap-vue' \n`
    newContent += `${runtimeInstallationFunction}(component, {${importTransformator()}})\n`

    // Insert our modification before the HMR code
    const hotReload = content.indexOf('/* hot reload */')
    if (hotReload > -1) {
        content = content.slice(0, hotReload) + newContent + '\n\n' + content.slice(hotReload)
    } else {
        content = newContent + '\n\n' + content
    }
    return content
}

const installComponents = (content, components) => install(
    'installComponents',
    content,
    components,
    () => components.join(', ')
)

const installDirectives = (content, directives) => install(
    'installDirectives',
    content,
    directives.map(d => d['import']),
    () => directives.map(d => `'${d.name}': ${d['import']}`).join(', ')
)

module.exports = {installComponents, installDirectives}