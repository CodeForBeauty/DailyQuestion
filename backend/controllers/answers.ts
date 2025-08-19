import express from "express"
const answersRoute = express.Router()
import jwt from "jsonwebtoken"

import { checkToken } from "../utils/auth"
import { addAnswer, checkUserAnswer, getAnswers } from "../db"
import config from "../utils/config"

const isValidToken = async (header: string): Promise<boolean> => {
  if (!header.startsWith("Bearer ")) {
    return false
  }

  return checkToken(header.replace("Bearer ", ""))
}

answersRoute.get("/", async (request, response) => {
  const authorization = request.get("authorization")
  if (!authorization) {
    response.status(401).send({ error: "no auth token is present" })
    return
  }

  const isValid = await isValidToken(authorization)
  if (isValid) {
    const answers = await getAnswers()
    response.status(200).send(answers)
  } else {
    response.status(401).send({ error: "invalid token" })
  }
})

answersRoute.post("/", async (request, response) => {
  const authorization = request.get("authorization")
  if (!authorization) {
    response.status(401).send({ error: "no auth token is present" })
    return
  }

  const answer: string = request.body.answer
  if (!answer) {
    response.status(400).send({ error: "answer is not present" })
    return
  }

  const isValid = await isValidToken(authorization)
  if (!isValid) {
    response.status(401).send({ error: "invalid token" })
    return
  }

  let user = String(
    jwt.verify(authorization.replace("Bearer ", ""), config.ENCRYPT_KEY),
  )
  if (await checkUserAnswer(user)) {
    response.status(400).send({ error: "already answered today" })
    return
  }

  if (request.body.isAnon) {
    user = "Anonymous"
  }

  const isSuccess = await addAnswer(answer, user)
  if (!isSuccess) {
    response.status(500).send({ error: "failed to add an answer" })
    return
  }

  response.status(200).send({ answer, user })
})

export default answersRoute
