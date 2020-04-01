const { fixBabelImports, addLessLoader, override, addWebpackPlugin, addWebpackModuleRule } = require('customize-cra')
const path = require('path')
const webpack = require('webpack')

const setGlobalObject = value => config => {
  config.output.filename = 'static/js/starter-kit-[hash:6].js' // name of generated file
  config.output.jsonpFunction = 'starterKitFn' // name of webpack function, should be different with filename
  return config
}

module.exports = override(
  setGlobalObject('self'),

  addWebpackModuleRule({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader']
    // use: {
    //   loader: ['@svgr/webpack', 'url-loader'],
    //   options: {
    //     native: true
    //   }
    // }
  }),

  fixBabelImports(
    'antd', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }
  ),
  fixBabelImports(
    'antd-mobile', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true
    }
  ),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@ant-prefix': 'antd', // you should change this to specify your project
      '@primary-color': '#0086FF',
      '@link-color': '#0086FF',
      '@font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      '@success-color': '#008A62',
      '@warning-color': '#C3A875',
      '@error-color': '#F24471',
      '@font-size-base': '16px',
      '@border-radius-base': '4px',
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',

      // ant mobile
      '@brand-primary': '#0086FF',
      '@brand-primary-tap': '#007ded',
      '@switch-fill': '#0086FF',
      '@modal-zindex': '11000',
      '@toast-zindex': '11001',

      // this is important when your project has many layers of components.
      '@zindex-badge': 'auto',
      '@zindex-table-fixed': 'auto',
      '@zindex-affix': 10,
      '@zindex-back-top': 10,
      '@zindex-picker-panel': 10,
      '@zindex-popup-close': 10,
      '@zindex-modal': 10002,
      '@zindex-modal-mask': 10002,
      '@zindex-message': 10010,
      '@zindex-notification': 10010,
      '@zindex-popover': 10030,
      '@zindex-dropdown': 10050,
      '@zindex-picker': 10050,
      '@zindex-tooltip': 10060
    }
  }),

  // I will override default styles of Ant Design to reduce redundant css,
  // also make easier to add other css framework like Bootstrap without conflict.
  addWebpackPlugin(
    new webpack.NormalModuleReplacementPlugin(/node_modules\/antd\/es\/style\/index\.less/, path.resolve(__dirname, 'src/css/antd.less'))
  ),
  addWebpackPlugin(
    new webpack.NormalModuleReplacementPlugin(/node_modules\/normalize\.css\/normalize\.css/, path.resolve(__dirname, 'src/css/empty.less'))
  )
)
