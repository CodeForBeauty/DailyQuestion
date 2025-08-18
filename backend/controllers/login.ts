import express from "express"
const loginRoute = express.Router()

import { createUser, checkUser } from "../db"
import { createToken } from "../utils/auth"

loginRoute.post("/reg", (request, response) => {
  const user = { name: request.body.name, password: request.body.password }
  if (!user.name || !user.password) {
    response.status(401).send({ error: "username or password are not present" })
    return
  }

  createUser(user).then((isSuccess) => {
    if (isSuccess) {
      response.status(200).end()
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

  checkUser(user).then((isSuccess) => {
    if (isSuccess) {
      response.status(200).send({ token: createToken(user.name) })
    } else {
      response.status(401).send({ error: "username or password is incorrect" })
    }
  })
})

export default loginRoute
