require("dotenv").config()

if (!process.env.PORT) {
  console.error("PORT is not defined in .env file")
}
const PORT: number = Number(process.env.PORT)

if (!process.env.TURSO_URI) {
  console.error("TURSO_URI is not defined in .env file")
}
const TURSO_URI: string = process.env.TURSO_URI || ""
if (!process.env.TURSO_TOKEN) {
  console.error("TURSO_TOKEN is not defined in .env file")
}
const TURSO_TOKEN: string = process.env.TURSO_TOKEN || ""

if (!process.env.ENCRYPT_KEY) {
  console.error("ENCRYPT_KEY is not defined in .env file")
}
const ENCRYPT_KEY: string = process.env.ENCRYPT_KEY || ""

export = { PORT, TURSO_URI, TURSO_TOKEN, ENCRYPT_KEY }
