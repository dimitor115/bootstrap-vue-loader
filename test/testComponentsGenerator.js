const shell = require('shelljs')
const fs = require('fs').promises

extractEveryComponentExampleFromDocumentation()
    .then(saveComponentsToFiles)
    .then(generateRouterConfig)
    .then(saveRouterConfig)

async function saveRouterConfig(config) {
    const r = await fs.readFile('./test/test-vue-instance/src/router/index.js', 'utf8')
    const updated = r.replace('//TO BE INJECTED', config)
    console.log(updated)
    await fs.writeFile('./test/test-vue-instance/src/router/index.js', updated)
}

function generateRouterConfig(xs) {
    const imports = xs.map(x => `import ${x} from '../components/${x}.vue'`).join('\n')
    const routes = xs.map(x => `{path: '/${x}', component: ${x}}`).join(',')
    const content =
        `   ${imports}
            const routes = [${routes}]
        `
    return content
}

async function saveComponentsToFiles(components) {
    console.log(components.length)
    await Promise.all(
        components.map((c, i) =>
            fs.writeFile('./test/test-vue-instance/src/components/c' + i + '.vue', c)
        )
    )
    return components.map((c, i) => 'c' + i)
}

async function extractEveryComponentExampleFromDocumentation() {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git')
        shell.exit(1)
    }
// shell.exec('git clone https://github.com/bootstrap-vue/bootstrap-vue.git ./test/raw-bootstrap-vue')
    const dirs = await fs.readdir('./test/raw-bootstrap-vue/src/components')
    const examples = dirs.map(f =>
        fs.readFile('./test/raw-bootstrap-vue/src/components/' + f + '/README.md', 'utf8')
            .then(file => {
                if (!file) return undefined
                const i = file.indexOf('```html')
                const p = file.indexOf('```', i + 1)
                const example =  file.substring(i + 7, p)
                if(example.indexOf('<template>') < 0) {
                    return `<template> \n ${example} \n </template>`
                }
                return example
            })
            .catch(() => undefined)
    )
    return Promise.all(examples)
}