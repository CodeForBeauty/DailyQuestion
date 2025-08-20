import { Link } from "react-router-dom"

import { useAppSelector } from "../reducers/hooks"

const Question = ({ question, id }: { question: string; id: number }) => {
  return <Link to={"/" + id}>{question}</Link>
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
