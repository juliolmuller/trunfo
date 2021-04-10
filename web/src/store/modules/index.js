
const modules = {}
const requireModule = require.context('.', false, /\.js$/)

requireModule.keys().forEach((fileName) => {

  if (fileName !== './index.js') {
    const moduleName = fileName.replace(/^\.\//, '').replace(/\.js$/, '')
    const moduleConfig = requireModule(fileName).default || requireModule(fileName)

    modules[moduleName] = moduleConfig
  }
})

export default modules
