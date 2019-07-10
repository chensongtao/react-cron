export default {
  entry: 'src/',
  doc: {
    themeConfig: { mode: 'light' },
    base: '/'
  },
  
  esm: 'rollup',
  cjs: 'rollup',
  umd: true,
}