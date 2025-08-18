import config from "../utils/config"
import { createClient } from "@libsql/client"

import { Answer, User } from "../utils/types"
import { getQuestionNum } from "../utils/funcs"

const turso = createClient({
  url: config.TURSO_URI,
  authToken: config.TURSO_TOKEN,
})

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
      sql: "INSERT INTO answers (answer, user, question) ",
      args: [answer, user, dateNum],
    })
  } catch (e) {
    console.error("Error occured while trying to add an answer: ", e)
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
  try {
    await turso.execute({
      sql: "INSERT INTO users (name, password, lastAnswer) VALUES (?, ?, ?)",
      args: [user.name, user.password, 0],
    })
  } catch (e) {
    console.error("Error occured while trying to create a user: ", e)
    return false
  }

  return true
}
