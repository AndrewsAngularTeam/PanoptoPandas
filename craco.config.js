const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === "development" && require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          content: paths.appSrc + "/chrome/content.js",
          background: paths.appSrc + "/chrome/background.js",
          panoptoPage: paths.appSrc + "/chrome/panoptoPage.js",
          options: paths.appSrc + "/options/index.jsx",
          jungle: paths.appSrc + "/chrome/jungle.js",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
        plugins: [
          ...webpackConfig.plugins,
          new HtmlWebpackPlugin({
            inject: true,
            chunks: ["options"],
            template: paths.appHtml,
            filename: "options.html",
          }),
          new HtmlWebpackPlugin({
            inject: true,
            chunks: ["main"],
            template: paths.appHtml,
            filename: "popup.html",
          }),
        ],
      };
    },
  },
};
