import config from "../utils/config"
import { createClient } from "@libsql/client"

import { Answer, User } from "../utils/types"
import { getQuestionNum } from "../utils/funcs"

import { hashPassword } from "../utils/auth"

import logger from "../utils/logger"

export const turso = createClient({
  url: config.EXEC_ENV !== "test" ? config.TURSO_URI : "file:tests/tests.db",
  authToken: config.TURSO_TOKEN,
})

export const clearDatabase = async () => {
  await turso.execute(
    "CREATE TABLE IF NOT EXISTS users (name TEXT UNIQUE NOT NULL, password TEXT NOT NULL, lastAnswer INTEGER NOT NULL)",
  )
  await turso.execute(
    "CREATE TABLE IF NOT EXISTS questions (id INTEGER, question TEXT UNIQUE NOT NULL)",
  )
  await turso.execute(
    "CREATE TABLE IF NOT EXISTS answers (answer TEXT NOT NULL DEFAULT 'Answer', user TEXT DEFAULT 'Anonymous', question INTEGER)",
  )

  await turso.execute("DELETE FROM users")
  await turso.execute("DELETE FROM questions")
  await turso.execute("DELETE FROM answers")
}

export const getAnswers = async (): Promise<Answer[]> => {
  const dateNum = getQuestionNum()

  const res = await turso.execute({
    sql: "SELECT answer, user FROM answers WHERE question = ?",
    args: [dateNum],
  })

  return res.rows.map((row) => {
    return { answer: String(row.answer), user: String(row.user) }
  })
}

export const addAnswer = async (
  answer: string,
  user: string,
): Promise<boolean> => {
  try {
    const dateNum = getQuestionNum()

    await turso.execute({
      sql: "INSERT INTO answers (answer, user, question) VALUES (?, ?, ?)",
      args: [answer, user, dateNum],
    })
    await turso.execute({
      sql: "UPDATE users SET lastAnswer=? WHERE name=?",
      args: [dateNum, user],
    })
  } catch (e) {
    logger.error(`Error occured while trying to add an answer: ${e}`)
    return false
  }
  return true
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

  const passwordHash = await hashPassword(user.password)
  return res.rows[0].password === passwordHash
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

export const checkUserAnswer = async (name: string): Promise<boolean> => {
  const res = await turso.execute({
    sql: "SELECT lastAnswer FROM users WHERE name = ?",
    args: [name],
  })

  if (res.rows.length === 0 || !res.rows[0]) {
    return false
  }

  return getQuestionNum() === res.rows[0].lastAnswer
}

export const createUser = async (user: User): Promise<boolean> => {
  try {
    const passwordHash = await hashPassword(user.password)
    await turso.execute({
      sql: "INSERT INTO users (name, password, lastAnswer) VALUES (?, ?, ?)",
      args: [user.name, passwordHash, 0],
    })
  } catch (e) {
    logger.error(`Error occured while trying to create a user: ${e}`)
    return false
  }

  return true
}
