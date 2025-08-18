import express from "express"
import morgan from "morgan"

import loginRoute from "./controllers/login"

const app = express()

app.use(morgan("tiny"))
app.use(express.json())

app.use("/user", loginRoute)

const data = [{ answer: "" }]

app.get("/", (_request, response) => {
  response.json(data)
})

app.post("/answer", (request, response) => {
  try {
    data.push(request.body)
    console.log(data)
  } catch (error) {
    console.log(error)
    response.status(500).json({ error })
    return
  }

  response.status(200).end()
})

export default app
