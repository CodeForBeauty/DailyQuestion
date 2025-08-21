import { Link } from "react-router-dom"

import { useAppSelector } from "../reducers/hooks"

import "./AnswerList.scss"

const Answer = ({ answer, user }: { answer: string; user: string }) => {
  return (
    <div className="answer">
      <div>{answer}</div>
      <div className="answer-user">By: {user}</div>
    </div>
  )
}

const AnswerList = ({ isToday }: { isToday: boolean }) => {
  const answers = useAppSelector(({ answers }) => answers)

  return (
    <div>
      <Link to="/questions">
        <button>question archive</button>
      </Link>
      {isToday && (
        <Link to="/answer">
          <button>leave answer</button>
        </Link>
      )}
      <h1>{answers.question}</h1>
      {answers.answers.map((answer, index) => (
        <Answer answer={answer.answer} user={answer.user} key={answer.answer + index} />
      ))}
    </div>
  )
}

export default AnswerList
