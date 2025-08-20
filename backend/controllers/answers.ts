import express from "express"
const answersRoute = express.Router()
import jwt from "jsonwebtoken"

import { checkToken } from "../utils/auth"
import { addAnswer, checkUserAnswer, getAnswers, getAnswersByQuestion, getQuestion } from "../db"
import config from "../utils/config"
import { getDateNum } from "../utils/funcs"

const MAX_ANSWER_LEN = 250

const isValidToken = async (header: string): Promise<boolean> => {
  if (!header.startsWith("Bearer ")) {
    return false
  }

  return checkToken(header.replace("Bearer ", ""))
}

answersRoute.get("/", async (request, response) => {
  const authorization = request.get("authorization")
  const page: number = Number(request.get("page") || 0)
  if (!authorization) {
    response.status(401).send({ error: "no auth token is present" })
    return
  }

  const question: string = await getQuestion(getDateNum(new Date()))

  const isValid = await isValidToken(authorization)
  if (isValid) {
    const answers = await getAnswers(page)
    response.status(200).send({ question, answers })
  } else {
    response.status(401).send({ error: "invalid token" })
  }
})

answersRoute.get("/:id", async (request, response) => {
  const id: number = Number(request.params.id)
  
  if (!id) {
    response.status(400).send({ error: "no id is provided" })
  }

  const authorization = request.get("authorization")
  const page: number = Number(request.get("page") || 0)
  if (!authorization) {
    response.status(401).send({ error: "no auth token is present" })
    return
  }

  const question: string = await getQuestion(id)

  const isValid = await isValidToken(authorization)
  if (isValid) {
    const answers = await getAnswersByQuestion(id, page)
    response.status(200).send({ question, answers })
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
  if (!answer || answer.length > MAX_ANSWER_LEN) {
    response.status(400).send({ error: "answer is not present or is too big" })
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
