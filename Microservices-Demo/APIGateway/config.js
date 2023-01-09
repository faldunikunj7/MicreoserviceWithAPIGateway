require('dotenv').config();

const config = {
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || 'http://localhost:4002',
  POST_SERVICE_URL: process.env.USER_SERVICE_URL || 'http://localhost:4003',
};
module.exports = config;
