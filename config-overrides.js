// 这个文件大概是react-app-rewired的配置文件
// react-app-rewired比react-scripts功能多一点,本质是一样的
// 也就是说在start前react-app-rewired会根据此文件做一些配置,比如useBabelRc()应该是读取.babelrc这样graphql的语句应该就可以直接用了

const {
  override,
  useBabelRc,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = override(
  useBabelRc(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#027dcd",
        "@layout-body-background": "#fff",
        "@layout-header-background": "#fff",
      },
    },
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
