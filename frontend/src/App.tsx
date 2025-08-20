import { Route, Routes, useNavigate } from "react-router-dom"
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

  return (
    <div>
      <Routes>
        <Route path="/" element={<AnswerList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/answer" element={<AnswerForm />} />
        <Route path="/questions" element={<QuestionList />} />
      </Routes>
    </div>
  )
}

export default App
