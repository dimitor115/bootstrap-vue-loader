const shell = require('shelljs')
shell.rm('./test/integration/loading_spec.js')
shell.rm('./test/test-vue-instance/src/components/*')
shell.rm('-rf','./test/raw-bootstrap-vue')