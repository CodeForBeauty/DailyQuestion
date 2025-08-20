import { configureStore } from "@reduxjs/toolkit"

import tokenReducer from "./reducers/tokenReducer"
import answersReducer from "./reducers/answersReducer"
import questionsReducer from "./reducers/questionsReducer"

const store = configureStore({
  reducer: {
    token: tokenReducer,
    answers: answersReducer,
    questions: questionsReducer
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
