import {
  createSlice,
  type Dispatch,
  type PayloadAction,
} from "@reduxjs/toolkit"

import questions, { type QuestionData } from "../services/questions"

const initialState: QuestionData[] = []

const questionsReducer = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    setQuestions(_state, action: PayloadAction<QuestionData[]>) {
      return action.payload
    },
  },
})

export const { setQuestions } = questionsReducer.actions
export default questionsReducer.reducer

export const getQuestions = () => {
  return async (dispatch: Dispatch) => {
    const data = await questions.getAll()

    dispatch(setQuestions(data))
  }
}
