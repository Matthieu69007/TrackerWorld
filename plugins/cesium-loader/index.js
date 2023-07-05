const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = function (context, options) {
    return {
        name: 'cesium-loader',
        configureWebpack(config, isServer) {
            config.plugins.push(
                new webpack.DefinePlugin({
                    CESIUM_BASE_URL: JSON.stringify("/cesium"),
                }))

                config.plugins.push(new NodePolyfillPlugin())
        },
    }
};