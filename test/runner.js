(async function(){
    const shell = require('shelljs')
    const testSetupGenerator = require('./testComponentsGenerator')

    console.log("Starting tests!")
    await testSetupGenerator()
    await new Promise(resolve => setTimeout(() => resolve(), 4000))
    shell.exec('start-server-and-test serve:test http-get://localhost:8080/ test:cypress')
})()


