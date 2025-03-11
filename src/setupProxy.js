const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.currentsapi.services',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};