import express = require("express")
import morgan = require("morgan")

const app = express()

app.use(morgan("tiny"))
app.use(express.json())

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

const PORT = 3333
app.listen(PORT, () => console.log(`Started server on port: ${PORT}`))
