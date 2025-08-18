import config from "../utils/config"
import {createClient} from "@libsql/client"

import { Answer, User } from "../utils/types"

const turso = createClient({
  url: config.TURSO_URI,
  authToken: config.TURSO_TOKEN,
})

export const getAnswers = async (): Promise<Answer[]> => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dateNum = today.getTime()

  const res = await turso.execute({
    sql: "SELECT answer, user FROM answers WHERE question = ?",
    args: [dateNum],
  })

  return res.rows.map((row) => {
    return { answer: String(row.answer), user: String(row.user) }
  })
}

// Check if username and password are valid
export const checkUser = async (user: User): Promise<boolean> => {
  const res = await turso.execute({
    sql: "SELECT name, password FROM users WHERE name = ?",
    args: [user.name],
  })

  if (res.rows.length === 0 || !res.rows[0]) {
    return false
  }

  return res.rows[0].password === user.password
}

// Check if username exists
export const checkUserName = async (name: string): Promise<boolean> => {
  const res = await turso.execute({
    sql: "SELECT name FROM users WHERE name = ?",
    args: [name],
  })

  if (res.rows.length === 0 || !res.rows[0]) {
    return false
  }

  return true
}

export const createUser = async (user: User): Promise<boolean> => {
  await turso.execute({
    sql: "INSERT INTO users (name, password, lastAnswer) VALUES (?, ?, ?)",
    args: [user.name, user.password, 0],
  })

  return true
}
