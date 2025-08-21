import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../reducers/hooks"

import { setToken } from "../reducers/tokenReducer"

import login from "../services/login"

import "./LoginForm.scss"

const LoginForm = () => {
  const token = useAppSelector(({ token }) => token)

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

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
    <form>
      <h1>Please login</h1>
      {error && <div className="error">{error}</div>}
      <div>
        <div className="label">Username: </div>
        <input
          name="username"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <div className="label">Password: </div>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>login</button>
        <button onClick={handleRegister}>register</button>
      </div>
    </form>
  )
}

export default LoginForm
