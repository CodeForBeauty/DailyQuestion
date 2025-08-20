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
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}`, Page: page },
    }

    const response = await axios.get("api/answer", config)

    if (response.status !== 200) {
      return null
    }

    return response.data
  } catch {
    return null
  }
}

const getSelected = async (
  date: Date,
  token: string,
  page: number,
): Promise<AnswersData | null> => {
  try {
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
  } catch {
    return null
  }
}

const leaveAnswer = async (
  token: string,
  answer: string,
  isAnon: boolean = false,
): Promise<AnswerData | null> => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    const response = await axios.post("api/answer", { answer, isAnon }, config)

    if (response.status !== 200) {
      return null
    }

    return response.data
  } catch {
    return null
  }
}

export default { getTodays, getSelected, leaveAnswer }
