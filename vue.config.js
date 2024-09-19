const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Agrega la configuración de publicPath para GitHub Pages
  publicPath: process.env.NODE_ENV === 'production'
    ? '/calculo_calificaciones/'  // Reemplaza por el nombre de tu repositorio
    : '/'
})
