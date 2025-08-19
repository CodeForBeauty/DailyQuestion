import LoginForm from "./components/LoginForm"
import AnswerList from "./components/AnswerList"
import AnswerForm from "./components/AnswerForm"
import QuestionList from "./components/QuestionList"

import { Route, Routes } from "react-router-dom"

const App = () => {
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
