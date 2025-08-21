import { Link } from "react-router-dom"

import { useAppSelector } from "../reducers/hooks"

import "./QuestionList.scss"

const Question = ({ question, id }: { question: string; id: number }) => {
  return (
    <div>
      <button className="question">
        <Link to={"/" + id}>{question}</Link>
      </button>
    </div>
  )
}

const QuestionList = () => {
  const questions = useAppSelector(({ questions }) => questions)

  return (
    <div>
      <Link to="/">
        <button>Today's question</button>
      </Link>
      {questions.map((question) => (
        <Question
          question={question.question}
          id={question.id}
          key={question.id}
        />
      ))}
    </div>
  )
}

export default QuestionList
