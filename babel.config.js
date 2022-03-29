module.exports = function (api) {
  api.cache(true)
  const presets = [
    'env'
  ]
  const plugins = [
    'syntax-object-rest-spread',
    'transform-object-rest-spread'
  ]
  return {
    presets,
    plugins
  }
}
