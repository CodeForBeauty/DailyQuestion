import axios from "axios"

const login = async (
  name: string,
  password: string,
): Promise<string | null> => {
  try {
    const response = await axios.post("api/user/login", { name, password })
    
    if (response.status !== 200) {
      return null
    }
    
    return response.data.token
  }
  catch {
    return null
  }
}

const register = async (
  name: string,
  password: string,
): Promise<string | null> => {
  try {

    const response = await axios.post("api/user/reg", { name, password })
    
    if (response.status !== 200) {
      return null
    }
    
    return response.data.token
  }
  catch {
    return null
  }
}

export default { login, register }
