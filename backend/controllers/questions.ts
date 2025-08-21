import express from "express"
const questionsRoute = express.Router()

import { getQuestions, addQuestion } from "../db"
import config from "../utils/config"

questionsRoute.get("/", (_request, response) => {
  getQuestions()
    .then((questions) => {
      response.status(200).send(questions)
    })
    .catch(() => {
      response.status(500).send({ error: "failed to retrieve data" })
    })
})

questionsRoute.post("/", (request, response) => {
  if (
    !config.ADMIN_PASSWORD ||
    request.body.password != config.ADMIN_PASSWORD
  ) {
    response.status(401).send({ error: "access denied" })
    return
  }

  if (!request.body.question || request.body.offset == null) {
    response.status(401).send({ error: "malformed data" })
    return
  }

  addQuestion(request.body.question, Number(request.body.offset)).then(
    (isSuccess) => {
      if (isSuccess) {
        response.status(200).end()
      } else {
        response.status(500).send({ error: "failed to add question" })
      }
    },
  )
})

export default questionsRoute
