import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "./reducers/hooks"

import LoginForm from "./components/LoginForm"
import AnswerList from "./components/AnswerList"
import AnswerForm from "./components/AnswerForm"
import QuestionList from "./components/QuestionList"

import { setToken } from "./reducers/tokenReducer"
import { getAnswers } from "./reducers/answersReducer"

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

  const date = new Date()
  date.setHours(0, 0, 0, 0)
  const dateNum = date.getTime()

  return (
    <div>
      <Routes>
        <Route path="/:id" element={<AnswerList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/answer" element={<AnswerForm />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="" element={<Navigate to={"/" + dateNum} />} />
      </Routes>
    </div>
  )
}

export default App
