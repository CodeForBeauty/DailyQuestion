import { Route, Routes, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

import LoginForm from "./components/LoginForm"
import AnswerList from "./components/AnswerList"
import AnswerForm from "./components/AnswerForm"
import QuestionList from "./components/QuestionList"

import { setToken } from "./reducers/tokenReducer"

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const saved = localStorage.getItem("token")
    if (saved) {
      dispatch(setToken(saved))
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate])

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
