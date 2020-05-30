const shell = require('shelljs')
const fs = require('fs').promises

module.exports = function () {
    extractEveryComponentDirectiveExampleFromDocumentation()
        .then(saveComponentsToFiles)
        .then(generateCypressTests)
        .then(generateRouterConfig)
        .then(saveRouterConfig)
}

async function saveRouterConfig(config) {
    const router = await fs.readFile('./test/test-vue-instance/src/router/index.js', 'utf8')
    const updated = router.replace('//TO BE INJECTED', config)
    await fs.writeFile('./test/test-vue-instance/src/router/index.js', updated)
}

function generateRouterConfig(components) {
    const imports = components.map(component => `import ${component} from '../components/${component}.vue'`).join('\n')
    const routes = components.map(component => `{path: '/${component}', component: ${component}}`).join(',')
    return `
       ${imports}
       const routes = [${routes}]
    `
}

async function saveComponentsToFiles(components) {
    await Promise.all(
        components.map(({component, example}) =>
            fs.writeFile(`./test/test-vue-instance/src/components/${component}.vue`, example))
    )
    return components.map(({component}) => component)
}

async function generateCypressTests(components) {
    const scenarios = components.map(component => `
        it("${component}", () => {
            cy.visit("/${component}")
        })
    `)
    await fs.writeFile(`./test/integration/loading_spec.js`, scenarios.join('\n'))
    return components
}

async function extractEveryComponentDirectiveExampleFromDocumentation() {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git')
        shell.exit(1)
    }
    shell.exec('git clone https://github.com/bootstrap-vue/bootstrap-vue.git ./test/raw-bootstrap-vue')

    const components = await extractFromDocsDirectory('components')
    const directives = await extractFromDocsDirectory('directives')

    return Promise.all([...components, ...directives]).then(it => it.filter(c => !!c))
}

async function extractFromDocsDirectory(dir) {
    const dirs = await fs.readdir(`./test/raw-bootstrap-vue/src/${dir}`)
    if (!dirs.length) {
        throw Error('No components!')
    }

    return dirs.map(component =>
        fs.readFile(`./test/raw-bootstrap-vue/src/${dir}/${component}/README.md`, 'utf8')
            .then(file => {
                if (!file) return undefined
                const start = file.indexOf('```html')
                const end = file.indexOf('```', start + 1)
                const example = file.substring(start + 7, end)
                const name = camelize(component) + dir.substring(0,3).toUpperCase()
                if(explicitExamples[component]) {
                    return {component: name, example: explicitExamples[component]}
                }
                if (example.indexOf('<template>') < 0) {
                    return {component: name, example: `<template> \n ${example} \n </template>`}
                }
                return {component: name, example}
            })
            .catch(() => undefined)
    )
}

const camelizeRE = /-(\w)/g
const camelize = str => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

const explicitExamples = {
    visible: `
<template>
    <div v-b-visible="visibleHandler"> ... </div>
</template>
<script>
    export default {
        methods: {
            visibleHandler(isVisible) {
                if (isVisible) {
                    // Do something
                } else {
                    // Do something else
                }
            }
        }
    }
</script>
    `,
    hover: `
<template>
  <div v-b-hover="hoverHandler"> ... </div>
</template>

<script>
  export default {
    methods: {
      hoverHandler(isHovered) {
        if (isHovered) {
          // Do something
        } else {
          // Do something else
        }
      }
    }
  }
</script>
    `
}