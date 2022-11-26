
import * as dotenv from 'dotenv'
dotenv.config()

const HOST = process.env.HOST;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
module.exports =  {HOST, PASSWORD, USERNAME};