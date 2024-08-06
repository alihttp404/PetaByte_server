const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  if (result.error.code !== 'ENOENT') {
    throw result.error;
  }
}

const envs = process.env;
console.log(envs);
module.exports = envs;