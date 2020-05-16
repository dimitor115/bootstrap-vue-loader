const path = require('path')
const fs = require('fs')
const { requirePeer } = require('./utils')
const compiler = require('vue-template-compiler')

const readFileAsString = resourcePath => new Promise((resolve, reject) => {
    fs.readFile(resourcePath, (err, data) => {
        if (err) reject(err)
        else resolve(data.toString('utf8'))
    })
})

const loadExternalFile = resolve2 => (resourcePath, templateSrc) =>  new Promise((resolve, reject) =>
    resolve2(path.dirname(resourcePath), templateSrc, (err, result) => {
        if (err) reject(err)
        else resolve(result)
    })
)

async function readComponent(resourcePath, resolve) {
    const file = await readFileAsString(resourcePath)
    const component = compiler.parseComponent(file)
    if (component.template) {
        if (component.template.src) {
            const externalFile = loadExternalFile(resolve)(resourcePath, component.template.src)
            component.template.content = await readFileAsString(externalFile)
        }
        if (component.template.lang === 'pug') {
            const pug = requirePeer('pug')
            try {
                component.template.content = pug.render(component.template.content, {filename: this.resourcePath})
            } catch (err) {/* Ignore compilation errors, they'll be picked up by other loaders */
            }
        }
        return component.template.content
    }
}
module.exports = readComponent
