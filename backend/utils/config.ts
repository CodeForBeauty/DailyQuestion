require("dotenv").config()

import logger from "./logger"

if (!process.env.PORT) {
  logger.error("PORT is not defined in .env file")
}
const PORT: number = Number(process.env.PORT)

if (!process.env.TURSO_URI) {
  logger.error("TURSO_URI is not defined in .env file")
}
const TURSO_URI: string = process.env.TURSO_URI || ""
if (!process.env.TURSO_TOKEN) {
  logger.error("TURSO_TOKEN is not defined in .env file")
}
const TURSO_TOKEN: string = process.env.TURSO_TOKEN || ""

if (!process.env.ENCRYPT_KEY) {
  logger.error("ENCRYPT_KEY is not defined in .env file")
}
const ENCRYPT_KEY: string = process.env.ENCRYPT_KEY || ""

const EXEC_ENV: string = process.env.NODE_ENV || "development"

export default { PORT, TURSO_URI, TURSO_TOKEN, ENCRYPT_KEY, EXEC_ENV }
