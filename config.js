require('dotenv').config(); // this loads the defined variables from .env
const convict = require('convict');

const config = convict({
    env: {
      format: ['prod', 'dev', 'test'],
      default: 'dev',
      arg: 'nodeEnv',
      env: 'NODE_ENV'
    },
    api_port: {
      format: Number,
      default: '80',
      arg: 'api-port',
      env: 'API_PORT'
    },
    api_endpoint: {
      format: String,
      default: '127.0.0.1',
      arg: 'api-endpoint',
      env: 'API_ENDPOINT'
    },
    web_port: {
      format: Number,
      default: '80',
      arg: 'web-port',
      env: 'WEB_PORT'
    },
    web_endpoint: {
      format: String,
      default: '127.0.0.1',
      arg: 'web-endpont',
      env: 'WEB_ENDPOINT'
    }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict' }); // throws error if config does not conform to schema

module.exports = config.getProperties(); // so we can operate with a plain old JavaScript object and abstract away convict (optional)

module.exports = config;
