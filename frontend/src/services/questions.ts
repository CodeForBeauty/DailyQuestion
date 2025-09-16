import axios from "axios"

export type QuestionData = {
  question: string
  id: number
}

const getAll = async (): Promise<QuestionData[]> => {
  try {
    const response = await axios.get("/api/question")

    if (response.status !== 200) {
      return []
    }

    return response.data
  } catch {
    return []
  }
}

const addQuestion = async (
  password: string,
  question: string,
  offset: number,
): Promise<boolean> => {
  try {
    const response = await axios.post("/api/question", {
      password,
      question,
      offset,
    })

    if (response.status !== 200) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export default { getAll, addQuestion }
