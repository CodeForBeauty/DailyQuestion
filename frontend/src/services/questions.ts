import axios from "axios"

export type QuestionData = {
  question: string
  id: number
}

const getAll = async (): Promise<QuestionData[]> => {
  const response = await axios.get("/api/question")

  if (response.status !== 200) {
    return []
  }

  return response.data
}

export default { getAll }
