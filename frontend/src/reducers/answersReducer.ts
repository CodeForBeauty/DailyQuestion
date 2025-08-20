import { createSlice, type Dispatch } from "@reduxjs/toolkit"

import answers, { type AnswersData } from "../services/answers"


const emptyAnswerList: AnswersData = { question: "", answers: [] }

const answersReducer = createSlice({
  name: "answers",
  initialState: emptyAnswerList,
  reducers: {
    setAnswers(_state, action) {
      return action.payload
    },
  },
})

export const { setAnswers } = answersReducer.actions
export default answersReducer.reducer

export const getAnswers = (token: string, page: number) => {
  return async (dispatch: Dispatch) => {
    const data = await answers.getTodays(token, page)

    dispatch(setAnswers(data))
  }
}

export const getAnswersByDay = (date: Date, token: string, page: number) => {
  return async (dispatch: Dispatch) => {
    const data = await answers.getSelected(date, token, page)

    dispatch(setAnswers(data))
  }
}
