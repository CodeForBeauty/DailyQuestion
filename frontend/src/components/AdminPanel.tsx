import { useState } from "react"

import questions from "../services/questions"

const AdminPanel = () => {
  const [password, setPassword] = useState("")
  const [question, setQuestion] = useState("")
  const [day, setDay] = useState(0)

  const [answer, setAnswer] = useState("")

  const handleAdd = async () => {
    const isSuccess = await questions.addQuestion(password, question, day)

    if (isSuccess) {
      setAnswer("Success")
    } else {
      setAnswer("Failed")
    }
  }

  return (
    <form>
      <div>{answer}</div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="question">Question</label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="day">Day</label>
        <input
          id="day"
          type="number"
          value={day}
          onChange={(event) => setDay(Number(event.target.value))}
        />
      </div>
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault()
          handleAdd()
        }}
      >
        submit
      </button>
    </form>
  )
}

export default AdminPanel
