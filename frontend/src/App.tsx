import { Route, Routes, Navigate, useNavigate, useMatch } from "react-router-dom"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "./reducers/hooks"

import LoginForm from "./components/LoginForm"
import AnswerList from "./components/AnswerList"
import AnswerForm from "./components/AnswerForm"
import QuestionList from "./components/QuestionList"

import { setToken } from "./reducers/tokenReducer"
import { getAnswers } from "./reducers/answersReducer"
import { getQuestions } from "./reducers/questionsReducer"

const App = () => {
  const token = useAppSelector(({ token }) => token)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const saved = localStorage.getItem("token")
    if (saved) {
      dispatch(setToken(saved))
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate])

  useEffect(() => {
    if (token) {
      dispatch(getAnswers(token, 0))
    }
  }, [token, dispatch])

  useEffect(() => {
    dispatch(getQuestions())
  })

  const match = useMatch("/:id")

  const questionId: number = match ? Number(match.params.id) : 0

  const date = new Date()
  date.setHours(0, 0, 0, 0)
  const dateNum = date.getTime()

  return (
    <div>
      <Routes>
        <Route path="/:id" element={<AnswerList isToday={dateNum === questionId} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/answer" element={<AnswerForm />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="" element={<Navigate to={"/" + dateNum} />} />
      </Routes>
    </div>
  )
}

export default App
