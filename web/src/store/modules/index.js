
const requireModule = require.context('.', false, /^\.\/(.+)\.store\.[j|t]s$/)
const modules = {}

requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/^\.\/(.+)\.store\.[j|t]s$/, '$1')
  const moduleConfig = requireModule(fileName).default ?? requireModule(fileName)

  modules[moduleName] = moduleConfig
})

export default modules
