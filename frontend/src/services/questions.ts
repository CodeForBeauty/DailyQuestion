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

export default { getAll }
