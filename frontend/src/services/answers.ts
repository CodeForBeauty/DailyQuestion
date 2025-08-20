import axios from "axios"

export type AnswerData = {
  answer: string
  user: string
}

export type AnswersData = {
  question: string
  answers: AnswerData[]
}

const getTodays = async (
  token: string,
  page: number,
): Promise<AnswersData | null> => {
  const config = {
    headers: { Authorization: `Bearer ${token}`, Page: page },
  }

  const response = await axios.get("api/answer", config)

  if (response.status !== 200) {
    return null
  }

  return response.data
}

const getSelected = async (
  date: Date,
  token: string,
  page: number,
): Promise<AnswersData | null> => {
  const config = {
    headers: { Authorization: `Bearer ${token}`, Page: page },
  }

  date.setHours(0, 0, 0, 0)
  const dateNum = date.getTime()

  const response = await axios.get(`api/answer/${dateNum}`, config)

  if (response.status !== 200) {
    return null
  }

  return response.data
}

const leaveAnswer = async (token: string, answer: string): Promise<boolean> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await axios.post("api/answer", { answer }, config)

  if (response.status !== 200) {
    return false
  }

  return true
}

export default { getTodays, getSelected, leaveAnswer }
