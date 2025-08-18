import express from "express"
import morgan from "morgan"

import loginRoute from "./controllers/login"
import answersRoute from "./controllers/answers"

const app = express()

app.use(morgan("tiny"))
app.use(express.json())

app.use("/user", loginRoute)
app.use("/answer", answersRoute)

export default app
