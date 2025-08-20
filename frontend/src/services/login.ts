import axios from "axios"

const login = async (
  name: string,
  password: string,
): Promise<string | null> => {
  const response = await axios.post("api/user/login", { name, password })

  if (response.status !== 200) {
    return null
  }

  return response.data.token
}

const register = async (
  name: string,
  password: string,
): Promise<string | null> => {
  const response = await axios.post("api/user/reg", { name, password })

  if (response.status !== 200) {
    return null
  }

  return response.data.token
}

export default { login, register }
