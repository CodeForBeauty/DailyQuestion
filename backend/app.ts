import express from "express"
import morgan from "morgan"

import loginRoute from "./controllers/login"
import answersRoute from "./controllers/answers"
import questionsRoute from "./controllers/questions"
import config from "./utils/config"
import logger from "./utils/logger"

import { clearDatabase } from "./db"

const app = express()

if (config.EXEC_ENV !== "test") {
  app.use(morgan("tiny"))
}
app.use(express.json())

app.use("/api/user", loginRoute)
app.use("/api/answer", answersRoute)
app.use("/api/question", questionsRoute)

if (config.EXEC_ENV === "test") {
  app.get("/api/clear", (_request, response) => {
    clearDatabase().then(() => {
      response.status(200).end
    })
  })
}

const errorHandler = (
  error: any,
  _request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => {
  logger.error(error)

  if (error.name === "CastError") {
    return response.status(500).send({ error: "malformatted data" })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    })
  }

  next(error)
}

app.use(errorHandler)

export default app
