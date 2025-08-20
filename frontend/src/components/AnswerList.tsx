import { useAppSelector } from "../reducers/hooks"

const Answer = ({ answer, user }: { answer: string; user: string }) => {
  return (
    <div>
      <div>{answer}</div>
      <div>By: {user}</div>
    </div>
  )
}

const AnswerList = () => {
  const answers = useAppSelector(({ answers }) => answers)

  return (
    <div>
      <div>{answers.question}</div>
      {answers.answers.map((answer, index) => (
        <Answer answer={answer.answer} user={answer.user} key={index} />
      ))}
    </div>
  )
}

export default AnswerList
