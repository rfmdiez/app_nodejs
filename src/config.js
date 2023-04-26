import { config } from "dotenv"

config()

const PORT = process.env.PORT || 3004
const PORT_REDIS = process.env.PORT_REDIS || 6379
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 3306
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'oOhP0#+j'
const DB_DATABASE = process.env.DB_DATABASE || 'companydb'

export {PORT,PORT_REDIS,DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,DB_DATABASE}