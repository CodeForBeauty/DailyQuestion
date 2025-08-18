import express from "express"
const answersRoute = express.Router()
import jwt from "jsonwebtoken"

import { checkToken } from "../utils/auth"
import { addAnswer, getAnswers } from "../db"

const isValidToken = async (header: string): Promise<boolean> => {
  if (!header.startsWith("Bearer ")) {
    return false
  }

  return checkToken(header.replace("Bearer ", ""))
}

const queryAnswers = async (
  authorization: string,
  response: express.Response,
) => {
  const isValid = await isValidToken(authorization)
  if (isValid) {
    const answers = await getAnswers()
    response.status(200).send(answers)
  } else {
    response.status(401).send({ error: "invalid token" })
  }
}

answersRoute.get("/", (request, response) => {
  const authorization = request.get("authorization")
  if (!authorization) {
    response.status(401).send({ error: "no auth token is present" })
    return
  }

  queryAnswers(authorization, response)
})

const addAnswerAsync = async (
  authorization: string,
  response: express.Response,
  answer: string,
  user: string,
) => {
  const isValid = await isValidToken(authorization)
  if (!isValid) {
    response.status(401).send({ error: "invalid token" })
    return
  }

  const isSuccess = await addAnswer(answer, user)
  if (!isSuccess) {
    response.status(500).send({ error: "failed to add an answer" })
    return
  }

  response.status(200).send({ answer, user })
}

answersRoute.post("/", (request, response) => {
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

  let user = "Anonymous"
  if (request.body.isAnon) {
    user = String(jwt.decode(authorization))
  }

  addAnswerAsync(authorization, response, answer, user)
})

export default answersRoute
