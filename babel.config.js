const loose = true

module.exports = {
  presets: [['@babel/preset-env', { loose }], '@babel/react'],
  plugins: [['@babel/plugin-proposal-class-properties', { loose }]]
}
