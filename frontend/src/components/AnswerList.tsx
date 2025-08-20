import { Link } from "react-router-dom"

import { useAppSelector } from "../reducers/hooks"

const Answer = ({ answer, user }: { answer: string; user: string }) => {
  return (
    <div>
      <div>{answer}</div>
      <div>By: {user}</div>
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
      <div>{answers.question}</div>
      {answers.answers.map((answer, index) => (
        <Answer answer={answer.answer} user={answer.user} key={index} />
      ))}
      {isToday && (
        <Link to="/answer">
          <button>leave answer</button>
        </Link>
      )}
    </div>
  )
}

export default AnswerList
