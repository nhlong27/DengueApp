import tbClient from './thingsboard-js-sdk.js';
// require('dotenv').config()
import {USERNAME, HOST, PASSWORD} from '../constants/credentials.js';

const config = {
  host: HOST,
  username: USERNAME,
  password: PASSWORD
}

const client = new tbClient(config);
export {client};