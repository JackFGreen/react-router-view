import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
// 这个版本可以生成 d.ts
import rollupTypescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const MODULE_NAME = 'ReactRouterView'

const globals = {
  react: 'React',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDom'
}

const baseConfig = {
  input: 'src/index.tsx',
  external: ['react', 'react-router', 'react-router-dom'],
  plugins: [
    rollupTypescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    terser()
  ]
}

// https://rollupjs.org/guide/en/#outputformat
const configs = [
  {
    file: `dist/index.min.js`,
    format: 'umd'
  },
  // <script type=module> | esm import
  {
    file: `dist/index.esm.js`,
    format: 'es'
  },
  // 打包工具引入
  {
    file: `dist/index.cjs.js`,
    format: 'cjs'
  }
]

export default {
  ...baseConfig,
  output: configs.map(config => ({
    ...config,
    name: MODULE_NAME,
    globals
  }))
}
