const tbClient = require('./thingsboard-js-sdk.js');
// require('dotenv').config()
const {USERNAME, HOST, PASSWORD} = require('../constants/credentials.js');

const config = {
  host: HOST,
  username: USERNAME,
  password: PASSWORD
}

const client = new tbClient(config);
module.exports = {client};