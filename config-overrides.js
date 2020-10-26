const path = require('path')
const { useBabelRc, override, addWebpackAlias, addDecoratorsLegacy, useEslintRc } = require('customize-cra')

// const config = override(
//   useBabelRc(),
//   addWebpackAlias({
//     '@lib': path.resolve(__dirname, './src/lib'),
//   }),
//   addDecoratorsLegacy(),
// )

// module.exports = config

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = override(
  useEslintRc(),
  useBabelRc(),
)
