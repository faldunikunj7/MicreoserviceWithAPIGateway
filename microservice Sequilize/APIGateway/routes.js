const { createProxyMiddleware, fixRequestBody, responseInterceptor } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { USER_SERVICE_URL, AUTH_SERVICE_URL, POST_SERVICE_URL } = require('./config');

class Routes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use('/user', createProxyMiddleware({
      target: USER_SERVICE_URL, onProxyReq: fixRequestBody,
      onProxyRes(proxyRes, req, _res) {
        const exchange = `${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
        console.log(exchange);
      },
      onError(err, req, res) {
        res.status(500);
        res.send({ message: 'Something went wrong. And we are reporting a custom error message.' });
        res.end();
      },
    }));

    this.app.use('/auth', createProxyMiddleware({
      target: AUTH_SERVICE_URL,
      onProxyReq: fixRequestBody,
      onProxyRes(proxyRes, req, _res) {
        const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
        console.log(exchange);
      },
      onError(err, req, res) {
        res.status(500);
        res.send({ message: 'Something went wrong. And we are reporting a custom error message.' });
        res.end();
      },
    }));

    this.app.use('/post', createProxyMiddleware({
      target: POST_SERVICE_URL, onProxyReq: fixRequestBody,
      onProxyRes(proxyRes, req, _res) {
        const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
        console.log(exchange);
      },
      onError(err, req, res) {
        res.status(500);
        res.send({ message: 'Something went wrong. And we are reporting a custom error message.' });
        res.end();
      },
    }));

    this.app.get('*', (_req, res) => {
      res.status(404).send({ message: 'Url not found' });
    });

    this.app.use(function (err, _req, res, _next) {
      console.error('Got an error!', err);
      res.end();
    });
  }

  routesConfig() {
    this.appRoutes();
  }
}

module.exports = Routes;
