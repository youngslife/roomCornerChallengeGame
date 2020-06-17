module.exports = {
  devServer: {
    host: "localhost"
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },
  transpileDependencies: ["quasar"]
};
