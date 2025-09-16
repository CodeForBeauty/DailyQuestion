import { Link } from "react-router-dom";

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

export default Question