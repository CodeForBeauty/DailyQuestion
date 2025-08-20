import { configureStore } from "@reduxjs/toolkit"

import tokenReducer from "./reducers/tokenReducer"
import answersReducer from "./reducers/answersReducer"

const store = configureStore({
  reducer: {
    token: tokenReducer,
    answers: answersReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
