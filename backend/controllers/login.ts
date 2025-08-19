import express from "express"
const loginRoute = express.Router()

import { createUser, checkUser } from "../db"
import { createToken } from "../utils/auth"

import { User } from "../utils/types"

const MAX_CHARS = 15
const MIN_PASS_LEN = 6

const hasNonAllowed = (input: string): boolean => {
  const nonAllowedChars = [",", " ", "\t", "\n"]

  return nonAllowedChars.some((char) => input.includes(char))
}

loginRoute.post("/reg", (request, response) => {
  const user: User = {
    name: request.body.name,
    password: request.body.password,
  }
  if (!user.name || !user.password) {
    response.status(401).send({ error: "username or password are not present" })
    return
  }

  if (
    user.name.length > MAX_CHARS ||
    user.password.length > MAX_CHARS ||
    user.password.length < MIN_PASS_LEN
  ) {
    response.status(401).send({ error: "character length limit acceded" })
    return
  }

  if (hasNonAllowed(user.name) || hasNonAllowed(user.password)) {
    response
      .status(401)
      .send({ error: "username or password has non allowed character" })
    return
  }

  createUser(user).then((isSuccess) => {
    if (isSuccess) {
      response.status(200).send({ token: createToken(user.name) })
    } else {
      response.status(401).send({ error: "username or password it taken" })
    }
  })
})

loginRoute.post("/login", (request, response) => {
  const user = { name: request.body.name, password: request.body.password }
  if (!user.name || !user.password) {
    response.status(401).send({ error: "username or password are not present" })
    return
  }

  if (user.name.length > MAX_CHARS || user.password.length > MAX_CHARS) {
    response.status(401).send({ error: "character length limit acceded" })
    return
  }

  checkUser(user).then((isSuccess) => {
    if (isSuccess) {
      response.status(200).send({ token: createToken(user.name) })
    } else {
      response.status(401).send({ error: "username or password is incorrect" })
    }
  })
})

export default loginRoute
