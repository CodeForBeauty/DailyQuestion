import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../reducers/hooks"

import { setToken } from "../reducers/tokenReducer"

import login from "../services/login"

const LoginForm = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault()

    const token = await login.login(name, password)
    
    if (token !== null) {
      localStorage.setItem("token", token)
      dispatch(setToken(token))
      navigate("/")
    } else {
      setError("Username or password are incorrect")
    }
  }

  const handleRegister = async (event: React.MouseEvent) => {
    event.preventDefault()

    if (name.length > 15) {
      setError("Username exceeds 15 character limit")
      return
    }
    if (password.length > 15) {
      setError("Password exceeds 15 character limit")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 character")
      return
    }

    const token = await login.register(name, password)

    if (token) {
      localStorage.setItem("token", token)
      dispatch(setToken(token))
      navigate("/")
    } else {
      setError("Username is taken")
    }
  }

  return (
    <>
      <form>
        {error && <div>{error}</div>}
        <div>
          Username:{" "}
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          Password:{" "}
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button onClick={handleLogin}>login</button>
          <button onClick={handleRegister}>register</button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
