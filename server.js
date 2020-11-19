const superstaic = require('superstatic')
const browserSync = require('browser-sync')

browserSync.init({
  server: {
    middleware: [superstaic({stack: 'strict'})]
  },
  port: 3474,
  watch: true,
  files: ['*.html', '*.css', '*.js']
})