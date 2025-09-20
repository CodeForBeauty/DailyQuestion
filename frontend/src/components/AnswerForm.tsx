import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useAppSelector, useAppDispatch } from "../reducers/hooks"

import answers from "../services/answers"
import { addAnswer } from "../reducers/answersReducer"

const AnswerForm = () => {
  const token = useAppSelector(({ token }) => token)

  const [answer, setAnswer] = useState("")
  const [isAnon, setIsAnon] = useState(false)

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleAnswer = async (event: React.MouseEvent) => {
    event.preventDefault()

    const result = await answers.leaveAnswer(token, answer, isAnon)

    if (result !== null) {
      dispatch(addAnswer(result))
      navigate("/")
    } else {
      setError("Already answered")
    }
  }

  return (
    <div>
      <form>
        {error && <div className="error">{error}</div>}
        <div>
          <label htmlFor="answer-text">Answer:</label>
          <input
            type="text"
            id="answer-text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="is-anon">Anonymous:</label>
          <input
            type="checkbox"
            id="is-anon"
            checked={isAnon}
            onChange={() => setIsAnon(!isAnon)}
          />
        </div>
        <div>
          <button onClick={handleAnswer}>Submit</button>
        </div>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  )
}

export default AnswerForm
