export default {
  entry: '/src',
  doc: {
    themeConfig: { mode: 'light' },
    base: '/react-cron/',
  },
  
  esm: 'rollup',
  cjs: 'rollup',
  umd: true,
}